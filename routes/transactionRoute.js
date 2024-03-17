const express = require('express');
const { addTransaction, getAllTransactions } = require('../controllers/transContoller')

//router object
const router = express.Router();

//routers
// add transaction POST method
router.post('/add-transaction', addTransaction);

// get all transactions
router.get('/get-transaction', getAllTransactions);

module.exports = router;