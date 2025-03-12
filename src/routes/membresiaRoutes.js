const express = require("express");
const { getMembresias, getMembresiaByWallet, buyMembresia } = require("../controllers/membresiaController");

const router = express.Router();

router.get("/", getMembresias);
router.get("/:wallet", getMembresiaByWallet);
router.post("/buy", buyMembresia);

module.exports = router;
