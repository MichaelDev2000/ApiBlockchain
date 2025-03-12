const Membresia = require("../models/membresia");
const contratoMembresias = require("../config/contracts");
const Transaction = require("../models/transaction");
const web3 = require("../config/web3");

// Obtener todas las membresías
const getMembresias = async (req, res) => {
    try {
        const membresias = await Membresia.find();
        res.json(membresias);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las membresías" });
    }
};

// Obtener membresía por dirección de wallet
const getMembresiaByWallet = async (req, res) => {
    const { wallet } = req.params;
    try {
        const membresia = await Membresia.findOne({ wallet_address: wallet });
        if (!membresia) return res.status(404).json({ error: "Membresía no encontrada" });
        res.json(membresia);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar la membresía" });
    }
};

// Comprar membresía (transacción blockchain)
const buyMembresia = async (req, res) => {
    const { wallet_address, price } = req.body;

    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0]; // Primera cuenta de Ganache

        const transaction = await contratoMembresias.methods.comprarToken().send({
            from: sender,
            value: web3.utils.toWei(price, "ether"),
        });

        // Crear membresía
        const nuevaMembresia = new Membresia({
            wallet_address,
            is_member: true,
            membership_price: price,
            currency: "ETH"
        });

        await nuevaMembresia.save();

        // 🔥 Guardar la transacción en la base de datos
        const nuevaTransaccion = new Transaction({
            tx_hash: transaction.transactionHash,
            from: sender,
            to: wallet_address,
            amount: price,
            type: "compra"
        });

        await nuevaTransaccion.save();

        res.json({
            message: "✅ Membresía comprada con éxito",
            transactionHash: transaction.transactionHash
        });

    } catch (error) {
        console.error("❌ Error en la compra:", error);
        res.status(500).json({ error: "Error al comprar la membresía" });
    }
};

module.exports = { getMembresias, getMembresiaByWallet, buyMembresia };
