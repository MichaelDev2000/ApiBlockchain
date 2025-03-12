const express = require("express");
const { getTransactions, getTransactionsByWallet } = require("../controllers/transactionController");

const router = express.Router();

router.get("/", getTransactions);
router.get("/:wallet", getTransactionsByWallet);

module.exports = router;
