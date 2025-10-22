import { useState } from "react";

export function useTransactionModel() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("EXPENSE");
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    created_at: new Date().toISOString().split("T")[0],
    details: "",
    attachments: [],
  });

  const defaultFormData = () => {
    return {
      title: "",
      amount: "",
      category: "",
      created_at: new Date().toISOString().split("T")[0],
      details: "",
      attachments: [],
    };
  };

  const openNewModal = (type) => {
    setModalType(type);
    setEditingTransaction(null);
    setFormData(defaultFormData());
    setShowModal(true);
  };

  const openEditModal = (transaction) => {
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

  return {
    showModal,
    modalType,
    formData,
    editingTransaction,
    setShowModal,
    setFormData,
    openNewModal,
    openEditModal,
  };
}
