"use client";

import { Chart } from "react-google-charts";
import { getCategoryDistribution, getTotalExpense } from "@/utils/transaction";

export default function ExpenseSummary({ expense }) {
  const data = getCategoryDistribution(expense);
  data.unshift(["Category", "Amount"]);

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
      "#8AD1C2",
      "#9F8AD1",
      "#D18A99",
      "#BCD18A",
      "#D1C28A",
      "#6CB2E0",
      "#F2A88C",
      "#A8E6CF",
      "#FFD3B6",
      "#FFAAA5",
      "#D4A5A5",
      "#A0CED9",
      "#CBAACB",
      "#B5EAD7",
      "#FFDAC1",
      "#E2F0CB",
      "#C7CEEA",
      "#F3C5C5",
      "#A2D2FF",
      "#FFC8DD",
    ],
    titleTextStyle: {
      color: "#31326f",
      alignment: "center",
      fontSize: 14,
      fontName: "Roboto",
      bold: true,
    },
    chartArea: {
      left: 20,
      top: 20,
      width: "95%",
      height: "80%",
    },
    pieHole: 0,
    backgroundColor: "transparent",
  };


  return (
    <div
      className={`bg-white flex flex-col justify-evenly items-center shadow-lg rounded-lg px-4 py-2 w-full max-w-full ${
        expense && data.length > 1 && "h-auto md:h-96"
      }`}
    >
      <div className="flex flex-col md:flex-row w-full justify-between md:justify-around items-center gap-2 md:gap-0 text-theme-blue-2 shadow-sm shadow-theme-red-1 p-3 m-2 bg-gradient-to-r from-theme-red-1/5 to-theme-red-2/5 rounded-lg">
        <div className="text-xl md:text-2xl font-semibold text-center md:text-left">
          Total Expense
        </div>
        <div className="text-xl md:text-2xl font-bold text-center md:text-right">
          Rs.{" "}
          {parseFloat(getTotalExpense(expense)).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </div>
      </div>

      {expense && data.length > 1 && (
        <div className="flex-1 w-full h-[300px] md:h-full">
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width="100%"
            height="100%"
          />
        </div>
      )}
    </div>
  );
}
