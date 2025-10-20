"use client";

import { useState, useEffect } from "react";

import api from "@/utils/api";
import AddExpenseButton from "./components/AddExpenseButton";
import AddIncomeButton from "./components/AddIncomeButton";
import TransactionCard from "./components/TransactionCard";
import TransactionModal from "./components/TransactionModel";
import Summary from "./components/Summary";
import ExportDropdown from "./components/ExportDropdown";
import DateSelector from "@/components/ui/DateSelector";
import {
  filterTransactionsByDate,
  getTotalBalance,
  getExpenses,
} from "@/utils/transaction";
import { toast } from "react-toastify";

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
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
    created_at: new Date().toISOString().split("T")[0],
    details: "",
    attachments: [],
  });

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users/transaction");
      setTransactions(response.data.transactions || []);
      return response.data.transactions;
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/users/category");
      setCategories(response.data.categories || []);
      return response.data.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDateChange = async (start, end) => {
    const response = await fetchTransactions();
    const result = filterTransactionsByDate(response, start, end);
    setTransactions(result);
  };

  const openModal = (type) => {
    setModalType(type);
    setEditingTransaction(null);
    setFormData({
      title: "",
      amount: "",
      category: "",
      created_at: new Date().toISOString().split("T")[0],
      details: "",
      attachments: [],
    });
    setShowModal(true);
  };

  const openEditModal = async (transaction) => {
    setModalType(transaction.type);
    setEditingTransaction(transaction);
    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category || "",
      created_at: new Date(transaction.created_at).toISOString().split("T")[0],
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
        created_at: formData.created_at || undefined,
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
      toast.success(
        `${payload.type[0] + payload.type.slice(1).toLowerCase()} ${
          editingTransaction ? "updated" : "added"
        } successfully!`
      );
      fetchTransactions();
      fetchCategories();
    } catch (error) {
      console.error("Error saving transaction:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      await api.delete(`/users/transaction/${id}`);
      toast.success(
        `${type[0] + type.slice(1).toLowerCase()} deleted successfully!`
      );
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary */}
        <Summary transactions={transactions} />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 my-8">
          <AddExpenseButton openModal={openModal} />
          <AddIncomeButton openModal={openModal} />
        </div>

        {/* Expenses Section */}
        <div className="bg-theme-turquoise-0 rounded-lg shadow-lg p-6 !pt-2">
          <div className="flex items-center">
            <div className="flex flex-1 justify-start">
              <DateSelector
                onDateChange={handleDateChange}
                fetchTransactions={fetchTransactions}
              />
            </div>
            <div className="flex flex-1 justify-end">
              <ExportDropdown transactions={transactions} />
            </div>
          </div>
          <h2 className="text-3xl uppercase font-bold font-sans text-theme-blue-2 mb-6 text-center">
            Expenses
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-blue-2"></div>
            </div>
          ) : transactions.length === 0 ? (
            <p className="text-theme-blue-2 text-center py-8">
              No Transactions Yet. Add Your First Transaction!
            </p>
          ) : (
            <div className="space-y-4">
              {/* Transactions Cards */}
              {getExpenses(transactions).map((transaction) => (
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
        balance={getTotalBalance(transactions)}
      />
    </>
  );
}
