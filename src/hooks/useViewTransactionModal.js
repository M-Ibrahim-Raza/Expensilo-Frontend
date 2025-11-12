import { useState } from "react";

export function useViewTransactionModal() {
  const [showViewModal, setShowViewModal] = useState(false);
  const [transaction, setTransaction] = useState(null);

  const openViewModal = (transaction) => {
    setTransaction(transaction);
    setShowViewModal(true);
  };

  return {
    showViewModal,
    transaction,
    setShowViewModal,
    openViewModal,
  };
}
