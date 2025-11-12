"use client";

import { Ellipsis, BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  getTotalBalance,
  getTotalExpense,
  getTotalIncome,
} from "@/utils/transaction";

export default function SummaryCard({ transactions }) {
  const income = getTotalIncome(transactions);
  const expense = getTotalExpense(transactions);
  const balance = getTotalBalance(transactions);

  return (
    <>
      <div
        id="mobile-summary-card"
        className="grid grid-cols-[2fr_1fr_2fr] py-6 px-4 shadow-lg shadow-theme-teal-2/30 rounded-3xl gap-y-6 text-white bg-theme-teal-2"
      >
        <div id="total-balance" className="col-span-2">
          <div className="flex flex-col">
            <div className="text-base">Total Balance</div>
            <div className="text-2xl font-semibold text-nowrap">
              {balance < 0 ? "- " : "+ "}
              Rs.{" "}
              {parseFloat(Math.abs(balance)).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-end" id="icon">
          <Button variant="ghost" className="">
            <Ellipsis className="!w-8 !h-8" />
          </Button>
        </div>
        <div id="income" className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <BanknoteArrowUp /> Income
          </div>
          <div className="text-xl font-medium text-nowrap">
            Rs.{" "}
            {parseFloat(income).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
        </div>
        <div id="expense" className="col-start-3 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <BanknoteArrowDown />
            Expense
          </div>
          <div className="text-xl font-medium text-nowrap">
            - Rs.{" "}
            {parseFloat(expense).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
        </div>
      </div>
    </>
  );
}
