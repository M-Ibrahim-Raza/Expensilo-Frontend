"use client";
import {
  formatType,
  getTotalIncome,
  getTotalExpense,
} from "@/utils/transaction";
import { PieChart } from "@mui/x-charts/PieChart";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { Separator } from "@/components/ui/separator";
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
      className={`main-card card-base flex flex-col md:flex-row md:h-80 px-4 py-2 ${className}`}
    >
      <div className="transaction-box flex h-32 md:h-full md:flex-1 flex-row bg-white rounded-xl border-3 border-theme-forest-dark/85 p-4">
        <div className="flex-1 flex flex-col gap-1 justify-center">
          <div
            className={`font-semibold text-xl ${
              type === "EXPENSE" ? "text-theme-rose" : "text-theme-teal"
            }`}
          >
            {transactionType}
          </div>
          <div className="font-bold text-2xl">
            Rs.{" "}
            {parseFloat(totalTransaction).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
        </div>
        {transactions && sparkLineDate.length > 1 && (
          <div className="flex-2">
            <SparkLineChart
              data={sparkLineDate}
              color={color}
              height={undefined}
            />
          </div>
        )}
      </div>

      {transactions && pieChartData.length > 1 && (
        <>
          <Separator orientation="vertical" className="hidden md:block mx-4" />
          <Separator className="md:hidden my-4" />

          <div className="flex-1">
            <h2 className="headings text-center my-2 uppercase">
              {chartHeading}
            </h2>
            <div className="flex-1 flex flex-col w-full h-[77%] items-center justify-center">
              <PieChart
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
                        <span className="text-gray-500">
                          {item.percentage}%
                        </span>
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
        </>
      )}
    </div>
  );
}
