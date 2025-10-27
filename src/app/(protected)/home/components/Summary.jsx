"use client";
import "react-tooltip/dist/react-tooltip.css";
import { Separator } from "@/components/ui/separator";
import {
  getTotalBalance,
  getTotalExpense,
  getTotalIncome,
} from "@/utils/transaction";
import { ArrowRight, Edit } from "lucide-react";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { Chart } from "react-google-charts";

export default function Summary({ transactions, className }) {
  const options = {
    title: null,
    colors: ["#0f766e", "#e11d48"],
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#31326f",
        fontSize: 12,
      },
    },
  };

  const data = [
    ["Transaction", "Amount"],
    ["Income", getTotalIncome(transactions)],
    ["Expense", getTotalExpense(transactions)],
  ];

  const totalBalance = getTotalBalance(transactions);

  return (
    // <div
    //   id="summary"
    //   className={`flex flex-row justify-evenly items-center card-base px-4 py-2 h-80 ${className}`}
    // >
    //   <div className="flex-3 flex flex-col justify-around h-full mx-4">
    <div
      id="summary"
      className={`flex flex-col md:flex-row justify-evenly items-center gap-4 card-base px-4 py-6 md:py-4 w-full ${className}`}
    >
      {/* Left Summary Section */}
      <div className="flex flex-col justify-around w-full md:w-1/2 space-y-3">
        <h2 className="headings text-center mb-2 uppercase">Summary</h2>

        {/* Income Row */}
        <Link
          data-tooltip-id="income-tip"
          href="/income"
          className="cursor-pointer rounded-md transition"
        >
          <div
            id="income-highlights"
            className="group summary-highlight items-center bg-theme-teal/5 hover:border-1 hover:shadow-theme-forest-dark hover:shadow-sm hover:bg-theme-teal/10 hover:border-theme-forest-dark"
          >
            <div className="headings">
              Income <Edit size={18} className="inline group-hover:hidden" />
              <ArrowRight size={20} className="hidden group-hover:inline" />
            </div>
            <div className="headings !text-theme-teal">
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
          content="View income details"
        />

        {/* Expense Row */}
        <Link
          data-tooltip-id="expense-tip"
          href="/expenses"
          className="cursor-pointer rounded-md transition"
        >
          <div className="group summary-highlight items-center bg-theme-rose/5 hover:border-1 hover:shadow-theme-forest-dark hover:shadow-sm hover:bg-theme-rose/10 hover:border-theme-forest-dark">
            <div className="headings">
              Expense
              <ArrowRight size={20} className="hidden group-hover:inline" />
            </div>

            <div className="headings !text-theme-rose">
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
          content="View expense details"
        />
        <Separator className="my-2" />

        {/* Balance Row */}
        <div
          className={`group summary-highlight items-center !py-4 ${
            totalBalance < 0 ? "bg-theme-rose/5" : "bg-theme-teal/5"
          }`}
        >
          <div className="headings">Balance</div>
          <div
            className={`text-2xl font-bold ${
              totalBalance < 0 ? "text-theme-rose" : "text-theme-teal"
            }`}
          >
            {totalBalance < 0 ? "- " : "+ "}
            Rs.{" "}
            {parseFloat(Math.abs(totalBalance)).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
        </div>
      </div>
      {/* Income vs Expense Overview */}
      {transactions.length > 0 && (
        <>
          <Separator
            orientation="vertical"
            className="hidden md:block mx-2 h-40"
          />
          <Separator className="md:hidden my-4" />
          <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-64">
            <h2 className="headings text-center my-2 uppercase">
              Income vs. Expense Overview
            </h2>
            <Chart
              chartType="PieChart"
              data={data}
              options={options}
              width={"100%"}
              height={"100%"}
            />
          </div>
        </>
      )}
    </div>
  );
}
