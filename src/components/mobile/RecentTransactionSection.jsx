"use client";

import { BanknoteArrowDown, CircleGauge } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import TransactionCard from "@/components/mobile/TransactionCard";

import { sortTransactions } from "@/utils/transaction";

export default function RecentTransactionSection({
  className,
  transactions,
  loading,
  openNewModal,
  openViewModal,
}) {
  const heading = "Recent Transactions";

  const no_transaction_message_heading = "No Expenses Yet";

  const no_transaction_message =
    "Start tracking your finances by adding your first expense";

  const add_transaction_button = (
    <Button
      onClick={() => openNewModal("EXPENSE")}
      variant="default"
      size="lg"
      className="bg-theme-rose hover:bg-theme-rose/90"
    >
      <BanknoteArrowDown />
      Add Expense
    </Button>
  );

  return (
    <>
      <div className={`mt-6 ${className}`}>
        <div className="flex flex-row justify-between items-center mb-2">
          <h2 className="headings text-center">{heading}</h2>
          <Link href="/transactions">
            <Button variant="link" className="text-gray-600">
              See all
            </Button>
          </Link>
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
            {add_transaction_button}
          </div>
        ) : (
          <div>
            {sortTransactions(transactions, "created_at", true)
              .slice(0, 7)
              .map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  openViewModal={openViewModal}
                  transaction={transaction}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
}
