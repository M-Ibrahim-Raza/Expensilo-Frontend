"use client";

import { useState } from "react";

import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useTransactionModel } from "@/hooks/useTransactionModal";
import { useViewTransactionModal } from "@/hooks/useViewTransactionModal";

import SummaryCard from "@/components/mobile/SummaryCard";

import { getTotalBalance } from "@/utils/transaction";

import RecentTransactionSection from "@/components/mobile/RecentTransactionSection";

import TransactionDialog from "@/components/mobile/TransactionDialog";
import ViewTransactionDialog from "@/components/mobile/ViewTransactionDialog";

export default function HomePage() {
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

  const { showViewModal, transaction, setShowViewModal, openViewModal } =
    useViewTransactionModal();

  const { categories, loadCategories } = useCategories();

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

  const balance = getTotalBalance(transactions);

  return (
    <>
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-2 min-h-screen bg-theme-neutral-gray">
        <SummaryCard transactions={transactions} />

        <RecentTransactionSection
          transactions={transactions}
          loading={loading}
          openNewModal={openNewModal}
          openViewModal={openViewModal}
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

      <ViewTransactionDialog
        open={showViewModal}
        onOpenChange={setShowViewModal}
        modalType={modalType}
        transaction={transaction}
        handleDelete={handleDeleteTransaction}
        handleEdit={openEditModal}
      />
    </>
  );
}
