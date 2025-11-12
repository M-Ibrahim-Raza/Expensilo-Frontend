"use client";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function TransactionCard({ transaction, openViewModal }) {
  const isExpense = transaction.type === "EXPENSE";

  return (
    <>
      <div
        key={transaction.id}
        onClick={() => openViewModal(transaction)}
        className={`flex items-center justify-between gap-2`}
      >
        <div className="grid flex-col justify-between items-start gap-1">
          <div className="flex">
            <h3 className="item-card-headings text-left truncate">
              {transaction.title}
            </h3>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">
                {new Date(transaction.created_at).toLocaleDateString()}
              </span>
            </div>
            {transaction.category && (
              <Badge className="bg-theme-teal-2" variant="default">
                {transaction.category}
              </Badge>
            )}
          </div>
        </div>

        <div
          className={`text-end headings ${
            transaction.amount.toString().length >= 10 ? "!text-base" : "!text-xl"
          }  ${isExpense ? " !text-theme-rose" : " !text-theme-teal"}`}
        >
          {isExpense ? "- " : "+ "}Rs.{" "}
          {parseFloat(transaction.amount).toLocaleString()}
        </div>
      </div>
      <Separator className="my-4 bg-theme-teal-2/20" />
    </>
  );
}
