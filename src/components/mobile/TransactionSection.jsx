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

import {
  searchTransactions,
  sortTransactions,
  getExpenses,
  getIncome,
} from "@/utils/transaction";

export default function TransactionSection({
  className,
  transactions,
  loading,
  openNewModal,
  openViewModal,
  searchValue,
  setSearchValue,
  searchOption,
}) {
  const heading = "Transactions";

  const [sortColumn, setSortColumn] = useState("created_at");
  const [isDescending, setIsDescending] = useState(true);

  const [transactionType, setTransactionType] = useState("Expense");

  const transactionsFilter =
    transactionType === "Expense" ? getExpenses : getIncome;

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
        <div className="flex flex-row gap-1 justify-between items-center mb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="large" className="headings gap-1">
                {transactionType}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setTransactionType("Expense")}>
                <BanknoteArrowDown />
                Expense
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTransactionType("Income")}>
                <BanknoteArrowUp />
                Income
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {searchValue && (
            <ButtonGroup>
              <Button className="text-xs px-1 h-6" variant="outline" asChild>
                <span className="text-xs">
                  {searchOption}:{" "}
                  <span className="text-gray-600 font-normal">
                    {searchValue}
                  </span>
                </span>
              </Button>
              <Button
                variant="outline"
                className="text-xs !px-1 h-6"
                onClick={() => setSearchValue("")}
              >
                <X className="!w-3 !h-3" />
              </Button>
            </ButtonGroup>
          )}
          <ButtonGroup>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {sortColumn === "created_at" ? "Date" : "Amount"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortColumn("created_at")}>
                  <Calendar />
                  Date
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortColumn("amount")}>
                  <Coins />
                  Amount
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setIsDescending((prev) => !prev)}
              aria-label="Toggle sort direction"
            >
              <ArrowDownUp />
            </Button>
          </ButtonGroup>
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
            {sortTransactions(
              searchTransactions(
                transactionsFilter(transactions),
                searchValue,
                searchOption
              ),
              sortColumn,
              isDescending
            ).map((transaction) => (
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
