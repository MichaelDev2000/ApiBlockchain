const mongoose = require("mongoose");
const Transaction = require("./transaction");

const MembresiaSchema = new mongoose.Schema({
    wallet_address: { type: String, required: true, unique: false },
    is_member: { type: Boolean, default: false },
    membership_price: { type: String, required: true },
    currency: { type: String, default: "ETH" },
    transactions: [Transaction.schema], 
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

MembresiaSchema.pre("save", function (next) {
    this.updated_at = Date.now();
    next();
});

const Membresia = mongoose.model("Membresia", MembresiaSchema);
module.exports = Membresia;
