"use client";
import {
  getTotalBalance,
  getTotalExpense,
  getTotalIncome,
} from "@/utils/transaction";
import { ArrowRight,Edit } from "lucide-react";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function Summary({ transactions }) {
  const totalBalance = getTotalBalance(transactions);

  return (
    <div className="bg-white flex flex-col justify-center rounded-lg p-2 mb-6 shadow-lg">
      <h2 className="text-2xl uppercase font-bold font-sans text-theme-blue-2 mb-2 text-center">
        Summary
      </h2>
      {/* Income Row */}
      <Link
        data-tooltip-id="income-tip"
        href="/income"
        className="cursor-pointer rounded-md transition"
      >
        <div className="group flex justify-around items-center hover:border-1 hover:shadow-theme-turquoise-2 hover:shadow-sm hover:bg-theme-turquoise-1/20 hover:border-b-theme-green-3 px-4 py-2 mb-2 bg-theme-turquoise-0 rounded-md">
          <div className="text-2xl font-semibold text-theme-blue-2">
            Income{" "}
              <Edit size={18} className="inline group-hover:hidden" />
            <ArrowRight size={20} className="hidden group-hover:inline" />
          </div>
          <div className="text-2xl font-bold text-theme-turquoise-3">
            + Rs.{" "}
            {parseFloat(getTotalIncome(transactions)).toLocaleString(
              undefined,
              {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }
            )}
          </div>
        </div>
      </Link>
      <Tooltip
        id="income-tip"
        place="top-end"
        className="!bg-theme-green-3"
        content="View income details"
      />
      {/* Expense Row */}
      <Link
        data-tooltip-id="expense-tip"
        href="/expenses"
        className="cursor-pointer rounded-md transition"
      >
        <div className="group flex justify-around items-center px-4 py-2 mb-2 bg-theme-red-1/5 rounded-md hover:border-1 hover:shadow-theme-red-2 hover:shadow-sm hover:bg-theme-red-1/10 hover:border-b-theme-red-3">
          <div className="text-2xl font-semibold text-theme-blue-2">
            Expense
            <ArrowRight size={20} className="hidden group-hover:inline" />
          </div>

          <div className="text-2xl font-bold text-theme-red-1">
            - Rs.{" "}
            {parseFloat(getTotalExpense(transactions)).toLocaleString(
              undefined,
              {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }
            )}
          </div>
        </div>
      </Link>
      <Tooltip
        id="expense-tip"
        place="top-end"
        className="!bg-theme-red-3"
        content="View expense details"
      />

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
