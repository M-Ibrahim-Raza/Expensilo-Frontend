"use client";

import { BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import DateSelector from "@/components/ui/DateSelector";
import TransactionCard from "@/components/ui/TransactionCard";
import { CircleGauge } from "lucide-react";

export default function TransactionSection({
  className,
  type,
  transactions,
  loading,
  onDateChange,
  handleDeleteTransaction,
  openNewModal,
  openEditModal,
}) {
  const heading = type == "EXPENSE" ? "Recent Expenses" : "Recent Income";
  const no_transaction_message_heading =
    type == "EXPENSE" ? "No Expenses Yet" : "No Income Yet";
  const no_transaction_message =
    type == "EXPENSE"
      ? "Start tracking your finances by adding your first expense"
      : "Start tracking your finances by adding your first income";
  const add_transaction_button = "EXPENSE" ? (
    <Button
      onClick={() => openNewModal("EXPENSE")}
      variant="default"
      size="lg"
      className="bg-theme-rose hover:bg-theme-rose/90"
    >
      <BanknoteArrowDown />
      Add Expense
    </Button>
  ) : (
    <Button
      onClick={() => openNewModal("INCOME")}
      variant="default"
      size="lg"
      className="bg-theme-teal hover:bg-theme-teal/90"
    >
      <BanknoteArrowUp />
      Add Income
    </Button>
  );
  return (
    <>
      <div className={`card-base p-6 !pt-4 ${className}`}>
        <div className="flex flex-row justify-between items-center mb-2">
          <h2 className="headings text-center">{heading}</h2>
          <DateSelector onDateChange={onDateChange} className="mx-6" />
        </div>
        <Separator className="my-4" />

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-blue-2"></div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col text-center justify-center items-center gap-4 py-8">
            <CircleGauge size="34px" />
            <h2 className="headings">{no_transaction_message_heading}</h2>
            {no_transaction_message}
            {add_transaction_button}
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                openEditModal={openEditModal}
                handleDelete={() =>
                  handleDeleteTransaction(transaction.id, transaction.type)
                }
              />
            ))}
          </div>
        )}
      </div>
      ;
    </>
  );
}
