"use client";
import {
  formatType,
  getCategoryDistribution,
  getTotalIncome,
  getTotalExpense,
} from "@/utils/transaction";
import { Chart } from "react-google-charts";
import { Separator } from "@/components/ui/separator";

export default function CategorySummary({ type, transactions, className }) {
  const data = getCategoryDistribution(transactions);

  data.unshift(["Category", "Amount"]);

  const transaction_type = formatType(type);
  const chartHeading =
    type == "INCOME" ? "Income Category Overview" : "Expense Category Overview";
  const totalTransaction =
    type == "INCOME"
      ? getTotalIncome(transactions)
      : getTotalExpense(transactions);

  const options = {
    legend: {
      position: "right",
      alignment: "center",
      textStyle: {
        color: "#31326f",
        fontSize: 14,
      },
    },
    colors: [
      "#8AD1C2", // soft teal
      "#9F8AD1", // lavender purple
      "#D18A99", // muted rose
      "#BCD18A", // olive green
      "#D1C28A", // warm beige
      "#6CB2E0", // cool sky blue
      "#F2A88C", // peach
      "#A8E6CF", // mint
      "#FFD3B6", // soft apricot
      "#FFAAA5", // coral pink
      "#D4A5A5", // dusty pink
      "#A0CED9", // pastel cyan
      "#CBAACB", // soft violet
      "#B5EAD7", // light mint green
      "#FFDAC1", // cream peach
      "#E2F0CB", // pale lime
      "#C7CEEA", // powder lavender
      "#F3C5C5", // rose mist
      "#A2D2FF", // baby blue
      "#FFC8DD", // light pink
    ],
    chartArea: {
      left: 40,
      top: 10,
      width: "100%",
      height: "90%",
    },
    pieHole: 0,
    backgroundColor: "transparent",
  };
  return (
    <div
      className={`flex flex-col card-base px-4 py-2 ${
        transactions && data.length > 1 && "h-96"
      } ${className}`}
    >
      <div
        className={`summary-highlight items-center ${
          type == "EXPENSE" ? "bg-theme-rose/5" : "bg-theme-teal/5"
        }`}
      >
        <div className="headings">{`Total ${transaction_type}`}</div>
        <div
          className={`headings ${
            type == "EXPENSE" ? "!text-theme-rose" : "!text-theme-teal"
          }`}
        >
          Rs.{" "}
          {parseFloat(totalTransaction).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </div>
      </div>

      {transactions && data.length > 1 && (
        <>
          <Separator className="my-2" />
          <h2 className="headings text-center my-2 uppercase">
            {chartHeading}
          </h2>
          <div className="flex-1 w-full">
            <Chart
              chartType="PieChart"
              data={data}
              options={options}
              width="100%"
              height="100%"
            />
          </div>
        </>
      )}
    </div>
  );
}
