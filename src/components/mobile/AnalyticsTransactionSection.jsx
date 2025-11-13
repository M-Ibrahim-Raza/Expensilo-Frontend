"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ButtonGroup } from "@/components/ui/button-group";

import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  CircleGauge,
  ChevronDown,
  ArrowDownUp,
  Calendar,
  Coins,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import TransactionCard from "@/components/mobile/TransactionCard";

import { sortTransactions } from "@/utils/transaction";

export default function AnalyticsTransactionSection({
  className,
  transactionType,
  transactions,
  loading,
  openNewModal,
  openViewModal,
}) {
  const [isDescending, setIsDescending] = useState(true);

  const heading =
    (isDescending ? "Top" : "Least") +
    " " +
    (transactionType === "Expense" ? "Spendings" : "Earnings");

  const no_transaction_message_heading = "No Expenses Yet";

  const no_transaction_message =
    "Start tracking your finances by adding your first expense";

  return (
    <>
      <div className={`mt-6 ${className}`}>
        <div className="flex flex-row gap-1 justify-between items-center mb-2">
          <div className="headings">{heading}</div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDescending((prev) => !prev)}
          >
            <ArrowDownUp />
          </Button>
        </div>

        <Separator className="my-2" />

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-blue-2"></div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col text-center justify-center items-center gap-4 py-8">
            <CircleGauge size="34px" />
            <h2 className="headings">{no_transaction_message_heading}</h2>
            {no_transaction_message}
          </div>
        ) : (
          <div>
            {sortTransactions(transactions, "amount", isDescending).map(
              (transaction) => (
                <TransactionCard
                  key={transaction.id}
                  openViewModal={openViewModal}
                  transaction={transaction}
                />
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}
