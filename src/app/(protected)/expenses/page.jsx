"use client";

import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useTransactionModel } from "@/hooks/useTransactionModal";
import { useDate } from "@/hooks/useDate";

import CategorySummary from "@/components/ui/CategorySummary";
import TransactionModal from "@/app/(protected)/home/components/TransactionModel";
import TransactionActionsBar from "@/components/ui/TransactionActionsBar";
import TransactionSection from "@/components/sections/TransactionSection";
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

  const { categories, loadCategories } = useCategories();

  const {
    showModal,
    modalType,
    formData,
    editingTransaction,
    setShowModal,
    setFormData,
    openNewModal,
    openEditModal,
  } = useTransactionModel();

  const { setDateRange, filteredTransactions } = useDate(transactions);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      title: formData.title,
      amount: parseFloat(formData.amount),
      type: modalType,
      category: formData.category || undefined,
      created_at: formData.created_at || undefined,
      details: formData.details || undefined,
      attachments:
        formData.attachments.length > 0 ? formData.attachments : undefined,
    };
    await addOrUpdateTransaction(payload, editingTransaction);
    loadCategories();
    setShowModal(false);
    setSubmitting(false);
  };
  return (
    <>
      {/* Main Content */}
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

      <TransactionModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        submitting={submitting}
        editingTransaction={editingTransaction}
        categories={categories}
        balance={getTotalBalance(filteredTransactions)}
      />
    </>
  );
}
