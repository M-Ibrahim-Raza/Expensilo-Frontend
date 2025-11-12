"use client";

import { useState } from "react";

import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useTransactionModel } from "@/hooks/useTransactionModal";
import { useViewTransactionModal } from "@/hooks/useViewTransactionModal";

import { Button } from "@/components/ui/button";
import { BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";

import { getTotalBalance } from "@/utils/transaction";

import TransactionSection from "@/components/mobile/TransactionSection";

import TransactionDialog from "@/components/mobile/TransactionDialog";
import ViewTransactionDialog from "@/components/mobile/ViewTransactionDialog";

export default function TransactionPage() {
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
      <div className="flex bg-theme-teal-1 h-16 text-white justify-between px-4 py-4 items-center">
        <div>back</div>
        <div>Transactions</div>
        <div>Search</div>
      </div>
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8 rounded-t-3xl bg-theme-neutral-gray">
        {/* <div
          id="background"
          className="absolute -top-[70%] -left-[50%] w-[200%] h-[100%] bg-theme-teal-1 rounded-b-full mx-auto"
        ></div> */}
        {/* <div className="relative">
          <div className="h-12"></div>
        </div> */}
        {/* <SummaryCard transactions={transactions} /> */}

        <div className="flex justify-center">
          <div className="flex gap-2">
            <>
              <Button
                onClick={() => openNewModal("INCOME")}
                variant="default"
                size="lg"
                className="bg-theme-teal hover:bg-theme-teal/90"
              >
                <BanknoteArrowUp />
                Add Income
              </Button>

              <Button
                onClick={() => openNewModal("EXPENSE")}
                variant="default"
                size="lg"
                className="bg-theme-rose hover:bg-theme-rose/90"
              >
                <BanknoteArrowDown />
                Add Expense
              </Button>
            </>
          </div>
        </div>

        <TransactionSection
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
