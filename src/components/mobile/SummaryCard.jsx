"use client";

import { useState } from "react";

import { Ellipsis, BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { PieChart } from "@mui/x-charts/PieChart";

import {
  getTotalBalance,
  getTotalExpense,
  getTotalIncome,
} from "@/utils/transaction";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function SummaryCard({ transactions }) {
  const income = getTotalIncome(transactions);
  const expense = getTotalExpense(transactions);
  const balance = getTotalBalance(transactions);

  const [openPieChartDialog, openPieChartDialogChange] = useState(false);

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
    <>
      <div
        id="mobile-summary-card"
        className="grid grid-cols-[2fr_1fr_2fr] py-6 px-4 shadow-lg shadow-theme-teal-2/30 rounded-3xl gap-y-6 text-white bg-theme-teal-2"
      >
        <div id="total-balance" className="col-span-2">
          <div className="flex flex-col">
            <div className="text-base">Total Balance</div>
            <div className="text-2xl font-semibold text-nowrap">
              {balance < 0 ? "- " : "+ "}
              Rs.{" "}
              {parseFloat(Math.abs(balance)).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-end" id="icon">
          <Button
            onClick={() => openPieChartDialogChange((prev) => !prev)}
            variant="ghost"
            className=""
          >
            <Ellipsis className="!w-8 !h-8" />
          </Button>
        </div>
        <div id="income" className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <BanknoteArrowUp /> Income
          </div>
          <div className="text-xl font-medium text-nowrap">
            Rs.{" "}
            {parseFloat(income).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
        </div>
        <div id="expense" className="col-start-3 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <BanknoteArrowDown />
            Expense
          </div>
          <div className="text-xl font-medium text-nowrap">
            - Rs.{" "}
            {parseFloat(expense).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
        </div>
      </div>
      <Dialog open={openPieChartDialog} onOpenChange={openPieChartDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Income vs. Expense Overview
              <div className="h-52 pt-4">
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
                          <span className="text-gray-500">
                            {item.percentage}%
                          </span>
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
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-center"></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
