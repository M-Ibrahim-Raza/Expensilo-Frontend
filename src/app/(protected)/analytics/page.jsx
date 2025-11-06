"use client";
import { useState } from "react";

import { ChevronDown, Eye, EyeClosed } from "lucide-react";

import { LineChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts";
import { Box } from "@mui/material";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  getTotalExpense,
  getTotalIncome,
  getTotalBalance,
  getExpenses,
  getIncome,
} from "@/utils/transaction";

import {
  getLineChartSummary,
  getCategoryDistribution,
  getCategoryLineChartSummary,
} from "@/utils/charts";

import DateSelector from "@/components/ui/DateSelector";
import { useTransactions } from "@/hooks/useTransactions";
import { useDate } from "@/hooks/useDate";

export default function AnalyticsPage() {
  const { transactions, loading } = useTransactions();

  const { setDateRange, filteredTransactions } = useDate(transactions);

  const [showIncome, setShowIncome] = useState(true);
  const [lineChartSummaryDuration, setLineChartSummaryDuration] =
    useState("Monthly");

  const [categoryBreakdownType, setCategoryBreakdownType] = useState("Expense");
  const [
    categoryLineChartSummaryDuration,
    setCategoryLineChartSummaryDuration,
  ] = useState("Monthly");

  const income = getTotalIncome(filteredTransactions);
  const expense = getTotalExpense(filteredTransactions);
  const balance = getTotalBalance(filteredTransactions);

  const categoryBreakdownData = getCategoryDistribution(
    categoryBreakdownType === "Expense"
      ? getExpenses(filteredTransactions)
      : getIncome(filteredTransactions)
  );

  const categoryLineChartSummaryData = getCategoryLineChartSummary(
    categoryBreakdownType === "Expense"
      ? getExpenses(filteredTransactions)
      : getIncome(filteredTransactions),
    categoryLineChartSummaryDuration
  );

  const seriesKeys =
    categoryLineChartSummaryData.length > 0
      ? Object.keys(categoryLineChartSummaryData[0]).filter(
          (k) => k !== "label"
        )
      : [];

  const summary_data = [
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
    <div className="p-4">
      <div className="flex justify-end mb-2">
        <DateSelector onDateChange={setDateRange} className="mx-6" />
      </div>

      <div
        id="main-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 grid-flow-dense"
      >
        <div
          id="financial-overview"
          className="col-span-1 grid grid-cols-1 grid-rows-[auto_1fr] card-base p-4 gap-2"
        >
          <h2 className="headings">FINANCIAL OVERVIEW</h2>
          <div className="flex flex-row gap-2 justify-around">
            <div className="flex-1 flex flex-col gap-1 justify-center bg-white rounded-xl border-3 border-theme-forest-dark/85 p-2">
              <div className="font-semibold text-theme-rose">EXPENSE</div>
              <div className="font-bold text-lg">
                Rs.{" "}
                {parseFloat(expense).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1 justify-center bg-white rounded-xl border-3 border-theme-forest-dark/85 p-2">
              <div className="font-semibold text-theme-teal">INCOME</div>
              <div className="font-bold text-lg">
                Rs.{" "}
                {parseFloat(income).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1 justify-center bg-white rounded-xl border-3 border-theme-forest-dark/85 p-2">
              <div className="font-semibold text-theme-forest-dark">
                BALANCE
              </div>
              <div className="font-bold text-lg">
                Rs.{" "}
                {parseFloat(balance).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          id="financial-activity"
          className="flex col-span-1 sm:col-span-2 lg:row-span-2 flex-col card-base p-4 justify-around"
        >
          <div className="flex justify-end gap-2">
            <div className="flex-1">
              <h2 className="headings">FINANCIAL ACTIVITY</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowIncome((prev) => !prev)}
            >
              Income {showIncome ? <Eye /> : <EyeClosed />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {lineChartSummaryDuration} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onSelect={() => {
                    setLineChartSummaryDuration("Daily");
                  }}
                >
                  Daily
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setLineChartSummaryDuration("Weekly")}
                >
                  Weekly
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setLineChartSummaryDuration("Monthly")}
                >
                  Monthly
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setLineChartSummaryDuration("Yearly")}
                >
                  Yearly
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex-1 h-40 lg:h-auto">
            <LineChart
              height={undefined}
              margin={{ right: 50 }}
              xAxis={[
                {
                  dataKey: "label",
                  label: "Date",
                  scaleType: "point",
                },
              ]}
              series={[
                {
                  dataKey: "expense",
                  label: "Expense",
                  color: "#e11d48",
                },
                ...(showIncome
                  ? [
                      {
                        dataKey: "income",
                        label: "Income",
                        color: "#0f766e",
                      },
                    ]
                  : []),
              ]}
              yAxis={[
                {
                  label: "Amount",
                  width: 75,
                },
              ]}
              sx={{
                ".MuiLineElement-root": { strokeWidth: 4 },
                ".MuiChartsLegend-root": { mt: 2 },
              }}
              dataset={getLineChartSummary(
                filteredTransactions,
                lineChartSummaryDuration
              )}
            />
          </div>
        </div>

        <div
          id="income-expense-overview"
          className="col-span-1 card-base grid grid-cols-1 p-4 grid-rows-[auto_1fr] gap-2"
        >
          <h2 className="headings uppercase">Income vs. Expense Overview</h2>
          <div className="h-36 sm:h-48 lg:h-60">
            <PieChart
              sx={{
                "& .MuiPieArcLabel-root": {
                  fill: "#ffffff",
                  fontWeight: 600,
                },
              }}
              series={[
                {
                  data: summary_data,
                  valueFormatter: (item) => (
                    <div className="flex flex-col text-sm">
                      <span>Rs. {item.value}</span>
                      <span className="text-gray-500">{item.percentage}%</span>
                    </div>
                  ),
                  arcLabel: (item) => `${item.percentage}%`,
                  arcLabelMinAngle: 35,
                  arcLabelRadius: "70%",
                  innerRadius: 15,
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

        <div
          id="category-breakdown"
          className="col-span-1 card-base grid grid-cols-1 p-4 grid-rows-[auto_1fr] gap-2"
        >
          <div className="flex justify-end gap-2">
            <div className="flex-1">
              <h2 className="headings uppercase">Category Breakdown</h2>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {categoryBreakdownType} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onSelect={() => {
                    setCategoryBreakdownType("Expense");
                  }}
                >
                  Expense
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setCategoryBreakdownType("Income")}
                >
                  Income
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Box className="h-48 sm:h-48 lg:h-60">
            <PieChart
              sx={{
                "& .MuiPieArcLabel-root": {
                  fill: "#ffffff",
                  fontWeight: 600,
                },
              }}
              series={[
                {
                  data: categoryBreakdownData,
                  valueFormatter: (item) => (
                    <div className="flex flex-col text-sm">
                      <span>Rs. {item.value}</span>
                      <span className="text-gray-500">{item.percentage}%</span>
                    </div>
                  ),

                  arcLabel: (item) => `${item.percentage}%`,
                  arcLabelMinAngle: 35,
                  arcLabelRadius: "70%",
                  innerRadius: 15,
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
          </Box>
        </div>

        <div
          id="category-trends"
          className="flex lg:col-span-2 flex-col card-base p-4 justify-around"
        >
          <div className="flex justify-end gap-2">
            <div className="flex-1">
              <h2 className="headings uppercase">Category Trends</h2>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {categoryBreakdownType} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onSelect={() => {
                    setCategoryBreakdownType("Expense");
                  }}
                >
                  Expense
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setCategoryBreakdownType("Income")}
                >
                  Income
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {categoryLineChartSummaryDuration} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onSelect={() => {
                    setCategoryLineChartSummaryDuration("Daily");
                  }}
                >
                  Daily
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setCategoryLineChartSummaryDuration("Weekly")}
                >
                  Weekly
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    setCategoryLineChartSummaryDuration("Monthly")
                  }
                >
                  Monthly
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setCategoryLineChartSummaryDuration("Yearly")}
                >
                  Yearly
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex-1 h-40 lg:h-auto">
            <LineChart
              height={undefined}
              margin={{ right: 50 }}
              xAxis={[
                {
                  dataKey: "label",
                  label: "Date",
                  scaleType: "point",
                },
              ]}
              series={seriesKeys.map((key) => ({
                dataKey: key,
                label: key,
              }))}
              yAxis={[
                {
                  label: "Amount",
                  width: 75,
                },
              ]}
              sx={{
                ".MuiLineElement-root": { strokeWidth: 4 },
                ".MuiChartsLegend-root": { mt: 2 },
              }}
              dataset={categoryLineChartSummaryData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
