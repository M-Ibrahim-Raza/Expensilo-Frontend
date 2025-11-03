"use client";
import "react-tooltip/dist/react-tooltip.css";
import { Separator } from "@/components/ui/separator";
import {
  getTotalBalance,
  getTotalExpense,
  getTotalIncome,
} from "@/utils/transaction";
import { ArrowRight, Edit } from "lucide-react";
import { PieChart } from "@mui/x-charts/PieChart";
import Link from "next/link";
import { Tooltip } from "react-tooltip";

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

  const income = getTotalIncome(transactions);
  const expense = getTotalExpense(transactions);
  const balance = getTotalBalance(transactions);

  const data = [
    {
      id: 0,
      label: "Income",
      value: income,
      percentage: Math.round((income / balance) * 100),
      color: "#0f766e",
    },
    {
      id: 1,
      label: "Expense",
      value: expense,
      percentage: Math.round((expense / balance) * 100),
      color: "#e11d48",
    },
  ];

  return (
    <div
      id="summary"
      className={`flex flex-col md:flex-row justify-evenly items-center gap-4 card-base px-4 py-6 md:py-4 w-full md:h-80 ${className}`}
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
            className="group summary-highlight items-center bg-theme-teal/5 border-1 border-transparent hover:shadow-theme-forest-dark hover:shadow-sm hover:bg-theme-teal/10 hover:border-theme-forest-dark"
          >
            <div className="headings">
              Income <Edit size={18} className="inline group-hover:hidden" />
              <ArrowRight size={20} className="hidden group-hover:inline" />
            </div>
            <div className="headings !text-theme-teal">
              + Rs.{" "}
              {parseFloat(income).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
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
          <div className="group summary-highlight items-center bg-theme-rose/5 border-1 border-transparent hover:shadow-theme-forest-dark hover:shadow-sm hover:bg-theme-rose/10 hover:border-theme-forest-dark">
            <div className="headings">
              Expense
              <ArrowRight size={20} className="hidden group-hover:inline" />
            </div>

            <div className="headings !text-theme-rose">
              - Rs.{" "}
              {parseFloat(expense).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
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
            balance < 0 ? "bg-theme-rose/5" : "bg-theme-teal/5"
          }`}
        >
          <div className="headings">Balance</div>
          <div
            className={`text-2xl font-bold ${
              balance < 0 ? "text-theme-rose" : "text-theme-teal"
            }`}
          >
            {balance < 0 ? "- " : "+ "}
            Rs.{" "}
            {parseFloat(Math.abs(balance)).toLocaleString(undefined, {
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
            className="hidden md:block mx-2"
          />
          <Separator className="md:hidden my-4" />
          <div className="flex flex-1 flex-col items-center h-full justify-center w-full md:w-1/2">
            <h2 className="headings text-center my-2 uppercase">
              Income vs. Expense Overview
            </h2>
            <PieChart
              sx={{
                "& .MuiPieArcLabel-root": {
                  fill: "#ffffff",
                  fontWeight: 600,
                },
              }}
              series={[
                {
                  data: data,
                  valueFormatter: (item) => (
                    <div className="flex flex-col text-sm">
                      <span>Rs. {item.value}</span>
                      <span className="text-gray-500">{item.percentage}%</span>
                    </div>
                  ),
                  arcLabel: (item) => `${item.percentage}%`,
                  arcLabelMinAngle: 35,
                  arcLabelRadius: "60%",
                  innerRadius: 30,
                  cornerRadius: 5,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -10,
                    color: "gray",
                  },
                },
              ]}
              width={undefined}
              height={undefined}
            />
          </div>
        </>
      )}
    </div>
  );
}
