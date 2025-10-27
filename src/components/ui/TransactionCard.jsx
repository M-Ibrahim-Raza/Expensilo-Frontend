"use client";

import { Pencil, Trash } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function TransactionCard({
  transaction,
  openEditModal,
  handleDelete,
}) {
  const isExpense = transaction.type === "EXPENSE";

  return (
    <div
      key={transaction.id}
      className={`item-card-base p-3 !border-l-4 ${
        isExpense ? " !border-l-theme-rose" : " !border-l-theme-teal"
      } flex items-center justify-between gap-4`}
    >
      {/* Left: Title, Category & Date */}
      <div className="flex flex-col justify-between items-start gap-2 flex-shrink-0">
        <div className="flex">
          <h3 className="item-card-headings text-left truncate">
            {transaction.title}
          </h3>
        </div>
        <Separator />
        <div className="flex flex-row gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">
              {new Date(transaction.created_at).toLocaleDateString()}
            </span>
          </div>
          {transaction.category && (
            <Badge variant="default">{transaction.category}</Badge>
          )}
        </div>
      </div>

      {/* Center: Details */}
      <div className="flex-1 min-w-0 px-4">
        {transaction.details && (
          <p className="text-sm text-gray-600 text-center truncate">
            {transaction.details}
          </p>
        )}
      </div>

      {/* Middle: Amount */}
      <div className=" text-sm min-w-[10%] font-semibold text-gray-400 text-left">
        <h3>Amount</h3>
        <div
          className={`headings whitespace-nowrap flex-shrink-0 ${
            isExpense ? " !text-theme-rose" : " !text-theme-teal"
          }`}
        >
          {isExpense ? "- " : "+ "}Rs.{" "}
          {parseFloat(transaction.amount).toLocaleString()}
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex gap-2 flex-shrink-0">
        <Button
          variant="default"
          size="icon"
          className="rounded-full"
          onClick={() => openEditModal(transaction)}
        >
          <Pencil />
        </Button>

        <Button
          variant="destructive"
          size="icon"
          className="rounded-full"
          onClick={() => handleDelete(transaction.id, transaction.type)}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
}
