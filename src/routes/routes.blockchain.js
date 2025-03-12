const express = require('express');
const { createBlock, saludar } = require("../controllers/blockchain.controller.js");
const router = express.Router();

router.post('/CreateBlock',createBlock);
router.get('/saludar', saludar);

module.exports = router;