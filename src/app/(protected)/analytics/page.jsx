"use client";
import { useState } from "react";
import { ChevronDown, Eye, EyeClosed } from "lucide-react";
import { LineChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DateSelector from "@/components/ui/DateSelector";
import { useTransactions } from "@/hooks/useTransactions";
import { useDate } from "@/hooks/useDate";
import {
  getTotalExpense,
  getTotalIncome,
  getTotalBalance,
  getExpenses,
  getIncome,
} from "@/utils/transaction";
import { getLineChartSummary, getCategoryDistribution } from "@/utils/charts";

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

  const [showIncome, setShowIncome] = useState(true);
  const [lineChartSummary, setLineChartSummary] = useState("Monthly");

  const income = getTotalIncome(filteredTransactions);
  const expense = getTotalExpense(filteredTransactions);
  const balance = getTotalBalance(filteredTransactions);

  const income_category_data = getCategoryDistribution(
    getIncome(filteredTransactions)
  );
  const expense_category_data = getCategoryDistribution(
    getExpenses(filteredTransactions)
  );

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
      <div className="flex gap-2">
        <div className="flex flex-4 flex-col card-base p-4 gap-2">
          <h2 className="headings">FINANCIAL OVERVIEW</h2>
          <div className="flex-1 flex flex-row gap-2 justify-around">
            <div className="flex-1 flex flex-col gap-1 justify-center bg-white rounded-xl border-3 border-theme-forest-dark/85 p-4">
              <div className="font-semibold text-theme-rose">EXPENSE</div>
              <div className="font-bold text-xl">
                Rs.{" "}
                {parseFloat(expense).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1 justify-center bg-white rounded-xl border-3 border-theme-forest-dark/85 p-4">
              <div className="font-semibold text-theme-teal">INCOME</div>
              <div className="font-bold text-xl">
                Rs.{" "}
                {parseFloat(income).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1 justify-center bg-white rounded-xl border-3 border-theme-forest-dark/85 p-4">
              <div className="font-semibold text-theme-forest-dark">
                BALANCE
              </div>
              <div className="font-bold text-xl">
                Rs.{" "}
                {parseFloat(balance).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-6 flex flex-col card-base p-4 justify-around">
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
                  {lineChartSummary} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onSelect={() => {
                    setLineChartSummary("Daily");
                  }}
                >
                  Daily
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setLineChartSummary("Weekly")}
                >
                  Weekly
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setLineChartSummary("Monthly")}
                >
                  Monthly
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setLineChartSummary("Yearly")}
                >
                  Yearly
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex-1">
            <LineChart
              height={400}
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
                lineChartSummary
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 mt-4 h-96">
        <div className="flex-1 card-base flex flex-col p-2">
          <h2 className="headings text-center my-2 uppercase">
            Income vs. Expense Overview
          </h2>
          <div className="flex-1">
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
        </div>
        <div className="flex-1 card-base flex flex-col p-2">
          <h2 className="headings text-center my-2 uppercase">
            Income Category Overview
          </h2>
          <div className="flex-1">
            <PieChart
              sx={{
                "& .MuiPieArcLabel-root": {
                  fill: "#ffffff",
                  fontWeight: 600,
                },
              }}
              series={[
                {
                  data: income_category_data,
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
        </div>
        <div className="flex-1 card-base flex flex-col p-2">
          <h2 className="headings text-center my-2 uppercase">
            Expense Category Overview
          </h2>
          <div className="flex-1">
            <PieChart
              sx={{
                "& .MuiPieArcLabel-root": {
                  fill: "#ffffff",
                  fontWeight: 600,
                },
              }}
              series={[
                {
                  data: expense_category_data,
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
        </div>
      </div>
    </div>
  );
}
