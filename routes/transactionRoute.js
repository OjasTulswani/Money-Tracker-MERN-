const express = require('express');
const { addTransaction, getAllTransactions, editTransaction, deleteTransaction } = require('../controllers/transContoller')

//router object
const router = express.Router();

//routers
// add transaction POST method
router.post('/add-transaction', addTransaction);
// edit transaction POST method
router.post('/edit-transaction', editTransaction);
//delete transaction POST method
router.post('/delete-transaction', deleteTransaction);

// get the required transactions
router.post('/get-transaction', getAllTransactions);

module.exports = router;