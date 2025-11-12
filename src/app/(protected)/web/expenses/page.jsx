"use client";

import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useTransactionModel } from "@/hooks/useTransactionModal";
import { useDate } from "@/hooks/useDate";

import CategorySummary from "@/components/ui/CategorySummary";
import TransactionActionsBar from "@/components/ui/TransactionActionsBar";
import TransactionSection from "@/components/sections/TransactionSection";
import TransactionDialog from "@/components/mobile/TransactionDialog";
import { getExpenses, getTotalBalance } from "@/utils/transaction";

export default function ExpensePage() {
  const {
    transactions,
    loading,
    setTransactions,
    loadTransactions,
    addOrUpdateTransaction,
    handleDeleteTransaction,
  } = useTransactions();

  const {
    showModal,
    modalType,
    editingTransaction,
    setShowModal,
    openNewModal,
    openEditModal,
  } = useTransactionModel();

  const { categories, loadCategories } = useCategories();

  const { setDateRange, filteredTransactions } = useDate(transactions);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    const payload = {
      ...values,
      amount: parseFloat(values.amount),
      type: modalType,
      attachments: undefined,
    };
    await addOrUpdateTransaction(payload, editingTransaction);
    loadCategories();
    setShowModal(false);
    setSubmitting(false);
  };

  const balance = getTotalBalance(filteredTransactions);

  return (
    <>
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategorySummary
          type="EXPENSE"
          transactions={getExpenses(filteredTransactions)}
          className="mb-6"
        />

        <TransactionActionsBar
          type="EXPENSE"
          className="mb-2"
          transactions={getExpenses(filteredTransactions)}
          openNewModal={openNewModal}
        />

        <TransactionSection
          type="EXPENSE"
          transactions={getExpenses(filteredTransactions)}
          onDateChange={setDateRange}
          handleDeleteTransaction={handleDeleteTransaction}
          openNewModal={openNewModal}
          openEditModal={openEditModal}
        />
      </main>

      <TransactionDialog
        open={showModal}
        onOpenChange={setShowModal}
        onSubmit={handleSubmit}
        categories={categories}
        modalType={modalType}
        balance={balance}
        editingTransaction={editingTransaction}
        submitting={submitting}
      />
    </>
  );
}
