"use client";
import { getCategoryDistribution, getTotalIncome } from "@/utils/transaction";
import { Chart } from "react-google-charts";

export default function IncomeSummary({ income }) {
  const data = getCategoryDistribution(income);

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
      className={`bg-white flex flex-col justify-evenly items-center shadow-lg rounded-lg px-4 py-2 ${
        income && data.length > 1 && "h-96"
      }`}
    >
      <div className="flex w-full text-theme-blue-2 justify-around items-center shadow-sm shadow-theme-turquoise-2 p-2 m-2 bg-gradient-to-r from-theme-turquoise-0 to-theme-green-1/25 rounded-lg">
        <div className="text-2xl font-semibold">Total Income</div>
        <div className="text-2xl font-bold">
          Rs.{" "}
          {parseFloat(getTotalIncome(income)).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </div>
      </div>
      {income && data.length > 1 && (
        <div className="flex-1 w-full">
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
