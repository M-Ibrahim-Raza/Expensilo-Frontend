"use client";
import {
  formatType,
  getTotalIncome,
  getTotalExpense,
} from "@/utils/transaction";
import { PieChart } from "@mui/x-charts/PieChart";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { getCategoryDistribution, getSparkLineData } from "@/utils/charts";

export default function CategorySummary({ type, transactions, className }) {
  const pieChartData = getCategoryDistribution(transactions);
  const sparkLineDate = getSparkLineData(transactions);

  const transactionType = formatType(type);

  const chartHeading =
    type == "INCOME" ? "Income Category Overview" : "Expense Category Overview";

  const totalTransaction =
    type == "INCOME"
      ? getTotalIncome(transactions)
      : getTotalExpense(transactions);

  const color = type == "INCOME" ? "#0f766e" : "#e11d48";

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))] divide-border divide-y-1 md:divide-y-0 md:divide-x-1 card-base px-4 py-6 ${className}`}
    >
      <div id="summary-left" className="pb-4 md:pb-0 px-4 py-2 md:col-span-2">
        <div className="space-y-2 flex h-full bg-white rounded-xl border-3 border-theme-forest-dark/85 p-2">
          <div className="flex-1 grid grid-cols-1 gap-1 justify-items-center">
            <span
              className={`self-end font-semibold text-xl ${
                type === "EXPENSE" ? "text-theme-rose" : "text-theme-teal"
              }`}
            >
              {transactionType}
            </span>
            <div className="font-bold text-2xl">
              Rs.{" "}
              {parseFloat(totalTransaction).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
          </div>

          {transactions && sparkLineDate.length > 1 && (
            <div className="relative flex-2 max-h-32 md:max-h-70 md:min-h-32">
              <div className="absolute -left-15 text-lg font-bold">Trends</div>
              <SparkLineChart
                data={sparkLineDate}
                color={color}
                height={undefined}
              />
            </div>
          )}
        </div>
      </div>

      {transactions && pieChartData.length > 1 && (
        <div className="grid grid-cols-1">
          <h2 className="headings text-center my-2 uppercase">
            {chartHeading}
          </h2>
          <div className="h-52 md:h-60">
            <PieChart
              slotProps={{
                legend: {
                  direction: "vertical",
                  position: {
                    vertical: "bottom",
                    horizontal: "center",
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
                  data: getCategoryDistribution(transactions),
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
