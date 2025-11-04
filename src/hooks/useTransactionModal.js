import { useState } from "react";

export function useTransactionModel() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("EXPENSE");
  const [editingTransaction, setEditingTransaction] = useState(null);

  const openNewModal = (type) => {
    setModalType(type);
    setEditingTransaction(null);
    setShowModal(true);
  };

  const openEditModal = (transaction) => {
    setModalType(transaction.type);
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  return {
    showModal,
    modalType,
    editingTransaction,
    setShowModal,
    openNewModal,
    openEditModal,
  };
}
