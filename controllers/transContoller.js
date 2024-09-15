const transactionModel = require("../models/transactionModel");
const moment = require("moment");


// get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transactions = await transactionModel.find({
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
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//edit a transaction
const editTransaction = async (req, res) => {
  // try {
  //   await transactionModel.findOneAndUpdate(
  //     { _id: req.body.transactionId },
  //     req.body.payload
  //   );
  //   res.status(200).send("Edit Successfully");
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json(error);
  // }
  try {
    const updatedTransaction = await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload,
      { new: true } // Return the updated document
    );

    if (!updatedTransaction) {
      return res.status(404).send("Transaction not found");
    }

    res.status(200).json(updatedTransaction); // Respond with the updated transaction object
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//delete transaction
const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send("transaction deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
