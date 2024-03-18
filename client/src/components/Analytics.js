import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransection }) => {
  const totalTransaction = allTransection.allTransection;
  const totalIncomeTransactions = allTransection.filter(
    (transaction) => transaction.type === "Income"
  );
  const totalExpenseTransactions = allTransection.filter(
    (transaction) => transaction.type === "Expense"
  );
  const totalIncomePercent = (totalIncomeTransactions / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions / totalTransaction) * 100;

  //total turnover
  const totalTurnover = allTransection.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransection
    .filter((transaction) => transaction.type === "Income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransection
    .filter((transaction) => transaction.type === "Expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-3">
        <div className="md:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="font-bold text-xl mb-2">
              Total Transactions : {totalTransaction}
            </div>
            <div className="mb-4">
              <h5 className="text-green-500">
                Income : {totalIncomeTransactions.length}
              </h5>
              <h5 className="text-red-500">
                Expense : {totalExpenseTransactions.length}
              </h5>
            </div>
            <div className="flex justify-center space-x-4">
              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2"
                percent={totalIncomePercent.toFixed(0)}
              />
              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2"
                percent={totalExpensePercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="font-bold text-xl mb-2">
              Total TurnOver : {totalTurnover}
            </div>
            <div className="mb-4">
              <h5 className="text-green-500">Income : {totalIncomeTurnover}</h5>
              <h5 className="text-red-500">Expense : {totalExpenseTurnover}</h5>
            </div>
            <div className="flex justify-center space-x-4">
              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2"
                percent={totalIncomeTurnoverPercent.toFixed(0)}
              />
              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2"
                percent={totalExpenseTurnoverPercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
