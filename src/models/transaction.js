const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    tx_hash: { type: String, required: true, unique: true },
    type: { type: String, enum: ["compra", "transferencia"], required: true },
    amount: { type: String, required: true },
    from: { type: String, default: null },
    to: { type: String, default: null },
    timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
