"use client";

import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useTransactionModel } from "@/hooks/useTransactionModal";
import { useDate } from "@/hooks/useDate";

import IncomeSummary from "./components/IncomeSummary";
import AddIncomeButton from "@/components/archive/AddIncomeButton";
import TransactionCard from "@/components/ui/TransactionCard";
import TransactionModal from "@/app/(protected)/home/components/TransactionModel";
import ExportDropdown from "@/components/archive/ExportDropdown";
import DateSelector from "@/components/ui/DateSelector";
import { getIncome, getTotalBalance } from "@/utils/transaction";

export default function IncomePage() {
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <IncomeSummary income={getIncome(filteredTransactions)} />
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row my-8 justify-center">
          <div className="flex w-1/2">
            <AddIncomeButton openModal={openNewModal} />
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-theme-turquoise-0 rounded-lg shadow-lg p-6 !pt-2">
          <div className="flex items-center">
            <div className="flex flex-1 justify-start">
              <DateSelector onDateChange={setDateRange} />
            </div>
            <div className="flex flex-1 justify-end">
              <ExportDropdown transactions={getIncome(filteredTransactions)} />
            </div>
          </div>
          <h2 className="text-3xl uppercase font-bold font-sans text-theme-blue-2 mb-6 text-center">
            Income
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-blue-2"></div>
            </div>
          ) : getIncome(filteredTransactions).length === 0 ? (
            <p className="text-theme-blue-2 text-center py-8">
              No Income Yet. Add Your First Income!
            </p>
          ) : (
            <div className="space-y-4">
              {/* Transactions Cards */}
              {getIncome(filteredTransactions).map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  openEditModal={openEditModal}
                  handleDelete={() =>
                    handleDeleteTransaction(transaction.id, transaction.type)
                  }
                />
              ))}
            </div>
          )}
        </div>
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
