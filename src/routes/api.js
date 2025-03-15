const express = require("express");
const router = express.Router();
const membresiaController = require("../controllers/membresiaController");
const transactionController = require("../controllers/transactionController");

// 🔹 Rutas de Membresías
router.get("/membresias", membresiaController.getAllMembresias);
router.get("/membresia/:wallet", membresiaController.getMembresiaByWallet);
router.post("/membresia/comprar", membresiaController.buyMembresia);

// 🔹 Rutas de Transacciones
router.get("/transacciones", transactionController.getAllTransactions);
router.get("/transacciones/:wallet", transactionController.getTransactionsByWallet);

module.exports = router;
