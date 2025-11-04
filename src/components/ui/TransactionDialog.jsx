"use client";

import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { transactionSchema } from "@/validations/transactions";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  FieldSet,
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

export default function TransactionDialog({
  open,
  onOpenChange,
  onSubmit,
  categories,
  modalType,
  balance,
  editingTransaction,
  submitting,
}) {
  const [isFuture, setIsFuture] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isBalanceNegative, setIsBalanceNegative] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
    setError,
  } = useForm({ resolver: yupResolver(transactionSchema), mode: "onChange" });

  const categoryValue = watch("category") || "";

  useEffect(() => {
    setIsFocused(false);
    setIsFuture(false);
    setIsBalanceNegative(false);
    if (!open) return;
    if (editingTransaction) {
      reset({
        title: editingTransaction.title,
        amount: editingTransaction.amount,
        category: editingTransaction.category || "",
        created_at: new Date(editingTransaction.created_at)
          .toISOString()
          .split("T")[0],
        details: editingTransaction.details || "",
      });
    } else {
      reset({
        title: "",
        amount: "",
        category: "",
        created_at: new Date().toISOString().split("T")[0],
        details: "",
      });
    }
  }, [open, editingTransaction, reset]);

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              {/* Title */}
              <Field data-invalid={errors.title ? true : undefined}>
                <FieldLabel htmlFor="title">Title *</FieldLabel>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g. Salary, Grocery Shopping"
                  {...register("title")}
                  aria-invalid={errors.title ? true : undefined}
                />
                {errors.title && (
                  <FieldError>{errors.title.message}</FieldError>
                )}
              </Field>

              {/* Amount */}
              <Field data-invalid={errors.amount ? true : undefined}>
                <FieldLabel htmlFor="amount">Amount *</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>Rs.</InputGroupAddon>
                  <InputGroupInput
                    id="amount"
                    type="number"
                    placeholder="e.g. 2500"
                    step="1"
                    {...register("amount", {
                      onChange: (e) => {
                        let value = Number(e.target.value);
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
                      },
                    })}
                    aria-invalid={errors.amount ? true : undefined}
                  />
                </InputGroup>
                {errors.amount && (
                  <FieldError>{errors.amount.message}</FieldError>
                )}

                {isBalanceNegative && (
                  <FieldError>
                    ⚠︎ Amount exceeds available balance. Please double-check it.
                  </FieldError>
                )}
              </Field>

              {/* Date */}
              <Field data-invalid={errors.created_at ? true : undefined}>
                <FieldLabel htmlFor="created_at">Date</FieldLabel>
                <Input
                  id="created_at"
                  type="date"
                  {...register("")}
                  {...register("created_at", {
                    onChange: (e) => {
                      const selectedDate = new Date(e.target.value);
                      setIsFuture(selectedDate > new Date());
                    },
                  })}
                  aria-invalid={errors.created_at ? true : undefined}
                />
                {errors.created_at && (
                  <FieldError>{errors.created_at.message}</FieldError>
                )}
                {isFuture && (
                  <FieldError>
                    ⚠︎ You’ve selected a future date. Please double-check it.
                  </FieldError>
                )}
              </Field>

              {/* Category */}
              <Field data-invalid={errors.category ? true : undefined}>
                <FieldLabel htmlFor="category">Category *</FieldLabel>
                <Command>
                  <CommandInput
                    id="category"
                    placeholder="Select or type a new category"
                    value={categoryValue}
                    onValueChange={(value) => {
                      setIsFocused(true);
                      setValue("category", value, { shouldValidate: true });
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      setTimeout(() => setIsFocused(false), 150);
                    }}
                    aria-invalid={errors.category ? true : undefined}
                  />
                  {isFocused && categoryValue.trim() !== "" && (
                    <CommandList>
                      {categories
                        .filter((category) =>
                          category.name
                            .toLowerCase()
                            .includes(categoryValue.toLowerCase())
                        )
                        .map((category) => (
                          <CommandItem
                            key={category.id}
                            onSelect={(value) => {
                              setValue("category", value, {
                                shouldValidate: true,
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
                {errors.category && (
                  <FieldError>{errors.category.message}</FieldError>
                )}
              </Field>

              {/* Details */}
              <Field data-invalid={errors.details ? true : undefined}>
                <FieldLabel htmlFor="details">
                  Details{" "}
                  <span className="text-muted-foreground text-sm">
                    (optional)
                  </span>
                </FieldLabel>
                <Textarea
                  id="details"
                  placeholder="Add any optional details"
                  className="resize-none break-words break-all"
                  {...register("details")}
                  rows={3}
                  aria-invalid={errors.details ? true : undefined}
                />
                {errors.details && (
                  <FieldError>{errors.details.message}</FieldError>
                )}
              </Field>
            </FieldSet>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button variant="outline" size="lg" disabled={submitting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" size="lg" disabled={submitting || !isValid}>
                {submitting
                  ? editingTransaction
                    ? "Updating..."
                    : "Adding..."
                  : editingTransaction
                  ? "Update"
                  : "Add"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
