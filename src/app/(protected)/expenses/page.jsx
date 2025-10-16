"use client";

import { useState, useEffect } from "react";
import api from "@/utils/api";
import AddExpenseButton from "@/app/(protected)/home/components/AddExpenseButton";
import TransactionCard from "@/app/(protected)/home/components/TransactionCard";
import TransactionModal from "@/app/(protected)/home/components/TransactionModel";
import { getExpenses } from "@/utils/transaction";
import { getTotalExpense } from "@/utils/transaction";

export default function HomePage() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("EXPENSE");
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    details: "",
    attachments: [],
  });

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users/transaction");
      const expenses_data = getExpenses(response.data.transactions || []);

      setExpenses(expenses_data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/users/category");
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setEditingTransaction(null);
    setFormData({
      title: "",
      amount: "",
      category: "",
      details: "",
      attachments: [],
    });
    setShowModal(true);
  };

  const openEditModal = (transaction) => {
    setModalType(transaction.type);
    setEditingTransaction(transaction);
    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category || "",
      details: transaction.details || "",
      attachments: transaction.attachments || [],
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const payload = {
        title: formData.title,
        amount: parseFloat(formData.amount),
        type: modalType,
        category: formData.category || undefined,
        details: formData.details || undefined,
        attachments:
          formData.attachments.length > 0 ? formData.attachments : undefined,
      };

      if (editingTransaction) {
        await api.put(`/users/transaction/${editingTransaction.id}`, payload);
      } else {
        await api.post("/users/transaction", payload);
      }
      setShowModal(false);
      fetchExpenses();
    } catch (error) {
      console.error("Error saving transaction:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/transaction/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-around items-center border-2 border-white px-4 py-3 mb-2 bg-gradient-to-r from-theme-red-1 to-theme-red-2 rounded-md">
          <div className="text-2xl font-semibold text-white">Total Expenses</div>
          <div className="text-2xl font-bold text-white">
            - Rs.{" "}
            {parseFloat(getTotalExpense(expenses)).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row my-8 justify-center">
          <div className="flex w-1/2">
            <AddExpenseButton openModal={openModal} />
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-theme-turquoise-0 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl uppercase font-bold font-sans text-theme-blue-2 mb-6 text-center">
            Expenses
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-blue-2"></div>
            </div>
          ) : expenses.length === 0 ? (
            <p className="text-theme-blue-2 text-center py-8">
              No Expenses Yet. Add Your First Expense!
            </p>
          ) : (
            <div className="space-y-4">
              {/* Expenses Cards */}
              {expenses.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  openEditModal={openEditModal}
                  handleDelete={handleDelete}
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
      />
    </>
  );
}
