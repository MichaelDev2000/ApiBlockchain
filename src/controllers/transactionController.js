const Transaction = require("../models/Transaction");

// 🔹 Obtener todas las transacciones
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate("membership");
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener transacciones", error });
    }
};

// 🔹 Obtener transacciones de una wallet específica
exports.getTransactionsByWallet = async (req, res) => {
    try {
        const { wallet } = req.params;
        const transactions = await Transaction.find({ "user_info.wallet_address": wallet })
            .populate("membership"); // Aquí traemos los detalles de la membresía
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error al obtener transacciones:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

