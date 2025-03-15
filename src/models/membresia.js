const mongoose = require("mongoose");

const MembresiaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration_days: { type: Number, required: true }, // Duración en días
}, { timestamps: true });

module.exports = mongoose.model("Membresia", MembresiaSchema);
