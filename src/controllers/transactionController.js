const Transaction = require("../models/transaction");
// Obtener todas las transacciones
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las transacciones" });
    }
};

// Obtener transacciones por dirección de wallet
const getTransactionsByWallet = async (req, res) => {
    const { wallet } = req.params;
    try {
        const transactions = await Transaction.find({ "user_info.wallet_address": wallet });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las transacciones" });
    }
};

module.exports = { getTransactions, getTransactionsByWallet };
