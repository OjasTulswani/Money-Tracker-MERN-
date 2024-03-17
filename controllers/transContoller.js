const trasanctionModel = require('../models/transactionModel')

// get all transactions
const getAllTransactions = async (req,res) => {
    try {
        const transactions = await trasanctionModel.find({});
        res.status(200).json(transactions);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

// add transaction
const addTransaction = async (req,res) => {
    try {
        const newTransaction = new trasanctionModel(req.body)
        await newTransaction.save()
        res.status(201).send('Transaction added successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

module.exports = {getAllTransactions, addTransaction}