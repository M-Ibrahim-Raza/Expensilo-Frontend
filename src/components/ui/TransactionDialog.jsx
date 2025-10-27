"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { FieldSet, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function TransactionDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  handleSubmit,
  categories,
  modalType,
  balance,
  editingTransaction,
  submitting,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFuture, setIsFuture] = useState(false);
  const [isBalanceNegative, setIsBalanceNegative] = useState(false);

  useEffect(() => {
    if (open) {
      setIsFocused(false);
      setIsFuture(false);
      setIsBalanceNegative(false);
    }
  }, [open]);

  const isExpense = modalType === "EXPENSE";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {editingTransaction ? "Edit" : "Add"}{" "}
            {isExpense ? "Expense" : "Income"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldSet>
            {/* Title */}
            <Field>
              <FieldLabel htmlFor="title">Title *</FieldLabel>
              <Input
                id="title"
                type="text"
                placeholder="e.g. Salary, Grocery Shopping"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Field>

            {/* Amount */}
            <Field>
              <FieldLabel htmlFor="amount">Amount *</FieldLabel>
              <Input
                id="amount"
                type="number"
                step="1"
                min="0"
                placeholder="e.g. 2500"
                value={formData.amount}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^\d.]/g, "");
                  const parts = value.split(".");
                  if (parts.length > 2) return;
                  const integerPart = parts[0].slice(0, 8);
                  const decimalPart = parts[1]?.slice(0, 2);
                  value = decimalPart
                    ? `${integerPart}.${decimalPart}`
                    : integerPart;

                  if (value === "" || Number(value) >= 0) {
                    if (modalType === "EXPENSE") {
                      if (!(balance < 0)) {
                        if (editingTransaction) {
                          setIsBalanceNegative(
                            Number(value) >
                              balance + Number(editingTransaction.amount)
                          );
                        } else {
                          setIsBalanceNegative(Number(value) > balance);
                        }
                      } else {
                        setIsBalanceNegative(false);
                      }
                    }
                    setFormData({ ...formData, amount: value });
                  }
                }}
              />
              {isBalanceNegative && (
                <FieldError>
                  ⚠︎ Amount exceeds available balance. Please double-check it.
                </FieldError>
              )}
            </Field>

            {/* Date */}
            <Field>
              <FieldLabel htmlFor="created_at">Date</FieldLabel>
              <Input
                id="created_at"
                type="date"
                value={formData.created_at || ""}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setIsFuture(selectedDate > new Date());
                  setFormData({ ...formData, created_at: e.target.value });
                }}
              />
              {isFuture && (
                <FieldError>
                  ⚠︎ You’ve selected a future date. Please double-check it.
                </FieldError>
              )}
            </Field>

            {/* Category */}
            <Field>
              <FieldLabel htmlFor="category">Category *</FieldLabel>
              <Command>
                <CommandInput
                  id="category"
                  placeholder="Select or type a new category"
                  value={formData.category || ""}
                  onValueChange={(value) => {
                    setIsFocused(true);
                    setFormData({ ...formData, category: value });
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                {isFocused && formData.category.trim() !== "" && (
                  <CommandList>
                    {categories
                      .filter((category) =>
                        category.name
                          .toLowerCase()
                          .includes(formData.category.toLowerCase())
                      )
                      .map((category) => (
                        <CommandItem
                          key={category.id}
                          onSelect={() => {
                            setFormData({
                              ...formData,
                              category: category.name,
                            });
                            setIsFocused(false);
                          }}
                        >
                          {category.name}
                        </CommandItem>
                      ))}
                  </CommandList>
                )}
              </Command>
            </Field>

            {/* Details */}
            <Field>
              <FieldLabel htmlFor="details">
                Details{" "}
                <span className="text-muted-foreground text-sm">
                  (optional)
                </span>
              </FieldLabel>
              <Textarea
                id="details"
                placeholder="Add any optional details"
                className="resize-none"
                value={formData.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
              />
            </Field>
          </FieldSet>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" size="lg" disabled={submitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={
                submitting ||
                !formData.title ||
                !formData.amount ||
                !formData.category
              }
            >
              {submitting
                ? editingTransaction
                  ? "Updating..."
                  : "Adding..."
                : editingTransaction
                ? "Update"
                : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
