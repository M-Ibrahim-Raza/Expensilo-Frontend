"use client";
import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useDate } from "@/hooks/useDate";
import { LineChart } from "@mui/x-charts";
import DateSelector from "@/components/ui/DateSelector";
import CategorySummary from "@/components/ui/CategorySummary";
import Summary from "../home/components/Summary";
import { Chart } from "react-google-charts";
import {
  getTotalExpense,
  getTotalIncome,
  getTotalBalance,
  getExpenses,
  getIncome,
} from "@/utils/transaction";
import { getDailySummary } from "@/utils/charts";

export default function AnalyticsPage() {
  const {
    transactions,
    loading,
    setTransactions,
    loadTransactions,
    addOrUpdateTransaction,
    handleDeleteTransaction,
  } = useTransactions();

  const { setDateRange, filteredTransactions } = useDate(transactions);

  const data = getDailySummary(filteredTransactions);

  const summary_data = [
    ["Transaction", "Amount"],
    ["Income", getTotalIncome(transactions)],
    ["Expense", getTotalExpense(transactions)],
  ];

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

  return (
    <div className="p-4">
      <div className="flex justify-end mb-2">
        <DateSelector onDateChange={setDateRange} className="mx-6" />
      </div>
      <div className="flex gap-2">
        <div className="flex-1 flex flex-row card-base p-4 gap-2 justify-around">
          <div className="flex-1 flex flex-col gap-1 justify-center bg-white rounded-xl border-3 border-theme-forest-dark/85 p-4">
            <div className="font-semibold text-theme-teal">EXPENSE</div>
            <div className="font-bold text-xl">
              Rs.{" "}
              {parseFloat(getTotalExpense(filteredTransactions)).toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1 justify-center bg-white rounded-xl border-3 border-theme-forest-dark/85 p-4">
            <div className="font-semibold text-theme-rose">INCOME</div>
            <div className="font-bold text-xl">
              Rs.{" "}
              {parseFloat(getTotalIncome(filteredTransactions)).toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1 justify-center bg-white rounded-xl border-3 border-theme-forest-dark/85 p-4">
            <div className="font-semibold text-theme-forest-dark">BALANCE</div>
            <div className="font-bold text-xl">
              Rs.{" "}
              {parseFloat(getTotalBalance(filteredTransactions)).toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-row card-base p-4 justify-around">
          <LineChart
            height={400}
            xAxis={[
              {
                data: data.map((d) => d.label),
                label: "Date",
                scaleType: "point",
              },
            ]}
            series={[
              {
                data: data.map((d) => d.expense),
                label: "Expense",
                color: "#e11d48",
              },
              {
                data: data.map((d) => d.income),
                label: "Income",
                color: "#0f766e",
              },
            ]}
            yAxis={[{ label: "Amount" }]}
            margin={{ top: 10, right: 30, bottom: 50, left: 10 }}
            sx={{
              ".MuiLineElement-root": { strokeWidth: 2 },
              ".MuiChartsLegend-root": { mt: 2 },
            }}
          />
        </div>
      </div>
      <div className="flex justify-between gap-2 mt-4 h-96">
        <div className="flex-1 card-base flex flex-col p-2">
          <h2 className="headings text-center my-2 uppercase">
            Income vs. Expense Overview
          </h2>
          <div className="flex-1">
            <Chart
              chartType="PieChart"
              data={summary_data}
              options={options}
              width={"100%"}
              height={"100%"}
            />
          </div>
        </div>
        <div className="flex-1">
        <CategorySummary
          type="EXPENSE"
          transactions={getExpenses(filteredTransactions)}
          showTotal={false}
          />
          </div>
        <div className="flex-1">
        <CategorySummary
          type="INCOME"
          transactions={getIncome(filteredTransactions)}
          showTotal={false}
          />
          </div>
      </div>
    </div>
  );
}
