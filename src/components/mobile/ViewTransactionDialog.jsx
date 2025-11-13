"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { formatDateShort } from "@/utils/transaction";

export default function ViewTransactionDialog({
  open,
  onOpenChange,
  modalType,
  transaction,
  handleDelete,
  handleEdit,
}) {
  const isExpense = modalType === "EXPENSE";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {isExpense ? "Expense" : "Income"} Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-4 bg-muted/30 rounded-2xl">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium">
              Title
            </span>
            <span className="text-base font-semibold text-foreground">
              {transaction?.title || "—"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium">
              Amount
            </span>
            <span
              className={`flex-1 flex items-center text-start headings  ${
                isExpense ? " !text-theme-rose" : " !text-theme-teal"
              }`}
            >
              {isExpense ? "- " : "+ "}Rs.{" "}
              {transaction?.amount
                ? transaction.amount >= 100000
                  ? (transaction.amount / 1000).toLocaleString() + "k"
                  : parseFloat(transaction.amount).toLocaleString()
                : "0"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium">
              Date
            </span>
            <span className="flex-1 flex items-center text-base font-semibold text-foreground">
              {transaction?.created_at
                ? formatDateShort(transaction.created_at)
                : "—"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium">
              Category
            </span>
            <span className="text-base font-semibold text-foreground">
              {transaction?.category || "—"}
            </span>
          </div>

          <div className="col-span-2 flex flex-col">
            <span className="text-sm text-muted-foreground font-medium">
              Details
            </span>
            <span className="text-base font-semibold text-foreground break-words">
              {transaction?.details || "—"}
            </span>
          </div>
        </div>

        <DialogFooter className="mt-6 flex-row justify-center">
          <DialogClose asChild>
            <Button
              variant="destructive"
              size="lg"
              onClick={() => handleDelete(transaction.id, transaction.type)}
            >
              Delete
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="default"
              className="bg-theme-teal-2 px-10"
              size="lg"
              onClick={() => handleEdit(transaction)}
            >
              Edit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
