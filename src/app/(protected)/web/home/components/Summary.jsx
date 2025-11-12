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
      percentage: Math.round((income / (income + expense)) * 100),
      color: "#0f766e",
    },
    {
      id: 1,
      label: "Expense",
      value: expense,
      percentage: Math.round((expense / (income + expense)) * 100),
      color: "#e11d48",
    },
  ];

  return (
    <div
      id="summary"
      className={`grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))] divide-border divide-y-1 md:divide-y-0 md:divide-x-1 card-base px-4 py-6 ${className}`}
    >
      {/* Left Summary Section */}
      <div id="summary-left" className="pb-4 md:pb-0 px-4">
        <div className="grid grid-cols-1 space-y-2 w-3/4 mx-auto">
          <h2 className="headings text-center my-2 uppercase">Summary</h2>

          {/* Income Row */}
          <Link
            data-tooltip-id="income-tip"
            href="/income"
            className="cursor-pointer rounded-md transition"
          >
            <div
              id="income-highlights"
              className="summary-highlight group bg-theme-teal/5 border-1 border-transparent hover:shadow-theme-forest-dark hover:shadow-sm hover:bg-theme-teal/10 hover:border-theme-forest-dark"
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
            <Tooltip
              id="income-tip"
              place="top-end"
              content="View income details"
            />
          </Link>

          {/* Expense Row */}
          <Link
            data-tooltip-id="expense-tip"
            href="/expenses"
            className="cursor-pointer rounded-md transition"
          >
            <div className="summary-highlight group bg-theme-rose/5 border-1 border-transparent hover:shadow-theme-forest-dark hover:shadow-sm hover:bg-theme-rose/10 hover:border-theme-forest-dark">
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
            <Tooltip
              id="expense-tip"
              place="top-end"
              content="View expense details"
            />
          </Link>

          <Separator className="mb-4" />

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
      </div>

      {/* Income vs Expense Overview */}
      {transactions.length > 0 && (
        <div id="summary-right" className="grid grid-cols-1 px-4 pt-4 md:pt-0">
          <h2 className="headings text-center my-2 uppercase">
            Income vs. Expense Overview
          </h2>
          <div className="h-52 md:h-60 mr-28 pl-4">
            <PieChart
              slotProps={{
                legend: {
                  direction: "vertical",
                  position: {
                    vertical: "center",
                    horizontal: "start",
                  },
                },
              }}
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
                  arcLabelRadius: "70%",
                  innerRadius: 10,
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
        </div>
      )}
    </div>
  );
}
