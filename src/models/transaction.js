const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    user_info: {
        first_name: String,
        last_name: String,
        email: String,
        wallet_address: String
    },
    membership: { type: mongoose.Schema.Types.ObjectId, ref: "Membresia" },
    transaction_hash: String,
    amount: Number,
    currency: String,
    status: String
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
