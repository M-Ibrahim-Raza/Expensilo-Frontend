"use client";
import {
  getTotalBalance,
  getTotalExpense,
  getTotalIncome,
} from "@/utils/transaction";

export default function Summary({ transactions }) {
  const totalBalance = getTotalBalance(transactions);

  return (
    <div className="bg-white flex flex-col justify-center rounded-lg p-2 mb-6 shadow-lg">
      <h2 className="text-2xl uppercase font-bold font-sans text-theme-blue-2 mb-2 text-center">
        Summary
      </h2>

      {/* Income Row */}
      <div className="flex justify-around items-center px-4 py-2 mb-2 bg-theme-turquoise-0 rounded-md">
        <div className="text-2xl font-semibold text-theme-blue-2">Income</div>
        <div className="text-2xl font-bold text-theme-turquoise-3">
          + Rs.{" "}
          {parseFloat(getTotalIncome(transactions)).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </div>
      </div>

      {/* Expense Row */}
      <div className="flex justify-around items-center px-4 py-2 mb-2 bg-theme-red-1/5 rounded-md">
        <div className="text-2xl font-semibold text-theme-blue-2">Expense</div>
        <div className="text-2xl font-bold text-theme-red-1">
          - Rs.{" "}
          {parseFloat(getTotalExpense(transactions)).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-theme-turquoise-2 my-3"></div>

      {/* Balance Row */}
      <div className="flex justify-around items-center px-4 py-4 bg-gradient-to-r from-theme-turquoise-1/20 to-theme-turquoise-2/20 rounded-md">
        <div className="text-2xl font-bold text-theme-blue-2">Balance</div>
        <div
          className={`text-2xl font-bold ${
            parseFloat(totalBalance) < 0
              ? "text-theme-red-1"
              : "text-theme-green-3"
          }`}
        >
          {parseFloat(totalBalance) < 0 ? "- " : "+ "}
          Rs.{" "}
          {parseFloat(Math.abs(totalBalance)).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </div>
      </div>
    </div>
  );
}
