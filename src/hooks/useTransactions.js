import { useState, useEffect } from "react";
import {
  addTransaction,
  fetchTransactions,
  updateTransaction,
  deleteTransaction,
} from "@/api/transaction";
import { formatType, filterTransactionsByDate } from "@/utils/transaction";
import { notifyError, notifySuccess } from "@/utils/notifications";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await fetchTransactions();
      setTransactions(data);
      return data;
    } catch (error) {
      console.error("Error loading transactions:", error);
      notifyError("Error loading transactions");
    } finally {
      setLoading(false);
    }
  };

  const addOrUpdateTransaction = async (payload, editingTransaction) => {
    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, payload);
      } else {
        await addTransaction(payload);
      }
      notifySuccess(
        `${formatType(payload.type)} ${
          editingTransaction ? "updated" : "added"
        } successfully!`
      );
      await loadTransactions();
    } catch (err) {
      console.error("Error saving transaction:", err);
      notifyError("Failed to save transaction");
    }
  };

  const handleDeleteTransaction = async (id, type) => {
    try {
      await deleteTransaction(id);
      notifySuccess(`${formatType(type)} deleted successfully!`);
      await loadTransactions();
    } catch (err) {
      console.error("Error deleting transaction:", err);
      notifyError("Failed to delete transaction");
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return {
    transactions,
    loading,
    setTransactions,
    loadTransactions,
    addOrUpdateTransaction,
    handleDeleteTransaction,
  };
}
