const Membresia = require("../models/membresia");
const Transaction = require("../models/transaction");
const contratoMembresias = require("../config/contracts");
const web3 = require("../config/web3");

// 🔹 Obtener todas las membresías
const getAllMembresias = async (req, res) => {
    try {
        const membresias = await Membresia.find();
        res.json(membresias);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las membresías" });
    }
};

const getMembresiaByWallet = async (req, res) => {
    const { wallet } = req.params;
    console.log("🔍 Buscando membresía de la wallet:", wallet);

    try {
        // 🔹 Buscar la transacción más reciente del usuario con esa wallet
        const transaction = await Transaction.findOne({ "user_info.wallet_address": wallet })
            .populate("membership") // Trae los detalles de la membresía
            .sort({ createdAt: -1 }); // Ordena por fecha, de la más reciente a la más antigua

        if (!transaction) {
            return res.status(404).json({ error: "No se encontró membresía para esta wallet" });
        }

        res.json({
            membership: transaction.membership, // Detalles de la membresía
            transactionDetails: {
                transaction_hash: transaction.transaction_hash,
                amount: transaction.amount,
                currency: transaction.currency,
                status: transaction.status,
            }
        });
    } catch (error) {
        console.error("❌ Error al buscar la membresía:", error);
        res.status(500).json({ error: "Error al buscar la membresía" });
    }
};


// 🔹 Comprar membresía y guardar la transacción en la base de datos
const buyMembresia = async (req, res) => {
    const { first_name, last_name, email, wallet_address, membership_id } = req.body;

    try {
        // 📌 Buscar la membresía en la base de datos
        const membresia = await Membresia.findById(membership_id);
        if (!membresia) return res.status(404).json({ error: "Membresía no encontrada" });

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0]; // Primera cuenta de Ganache

        // 📌 Ejecutar la compra en la blockchain
        const transaction = await contratoMembresias.methods.comprarToken().send({
            from: sender,
            value: web3.utils.toWei(membresia.price.toString(), "ether"),
        });

        const transactionHash = transaction.transactionHash; // Obtener el hash de la transacción

        console.log("✅ Transacción confirmada:", transactionHash);

        // 📌 Guardar la transacción en la base de datos
        const nuevaTransaccion = new Transaction({
            user_info: {
                first_name,
                last_name,
                email,
                wallet_address
            },
            membership: membership_id,  // Referencia a la membresía comprada
            transaction_hash: transactionHash,
            amount: membresia.price,
            currency: "ETH",
            status: "completed"
        });

        await nuevaTransaccion.save();

        res.json({
            message: "✅ Membresía comprada con éxito",
            transactionHash
        });

    } catch (error) {
        console.error("❌ Error en la compra:", error);
        res.status(500).json({ error: "Error al comprar la membresía" });
    }
};

module.exports = { getAllMembresias, getMembresiaByWallet, buyMembresia };
