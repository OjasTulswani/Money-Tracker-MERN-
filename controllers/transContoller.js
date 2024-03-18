const trasanctionModel = require("../models/transactionModel");
const moment = require("moment");

// get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transactions = await trasanctionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// add transaction
const addTransaction = async (req, res) => {
  try {
    const newTransaction = new trasanctionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllTransactions, addTransaction };
