"use client";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatDateShort } from "@/utils/transaction";

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
          <div className="flex flex-row gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">
                {formatDateShort(transaction.created_at)}
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
          className={`text-end headings !text-xl ${
            isExpense ? "!text-theme-rose" : "!text-theme-teal"
          }`}
        >
          {isExpense ? "- " : "+ "}Rs.{" "}
          {transaction?.amount
            ? transaction.amount >= 100000
              ? (transaction.amount / 1000).toLocaleString() + "k"
              : parseFloat(transaction.amount).toLocaleString()
            : "0"}
        </div>
      </div>
      <Separator className="my-4 bg-theme-teal-2/20" />
    </>
  );
}
