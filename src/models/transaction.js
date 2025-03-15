const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    user_info: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        wallet_address: { type: String, required: true },
    },
    membership: { type: mongoose.Schema.Types.ObjectId, ref: "Membresia", required: true },
    transaction_hash: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "ETH" },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "completed" },
}, { timestamps: true });

// ✅ Verificar si el modelo ya está definido antes de crearlo
module.exports = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
