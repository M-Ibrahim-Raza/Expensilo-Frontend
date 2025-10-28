"use client";
import { useEffect } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { searchTransactions } from "@/utils/transaction";

export default function TestPage() {
  const {
    transactions,
    loading,
    setTransactions,
    loadTransactions,
    addOrUpdateTransaction,
    handleDeleteTransaction,
  } = useTransactions();

  useEffect(() => {
    console.log(transactions);
    console.log(searchTransactions(transactions,"test","Category"))
  });

  return <div>Check the console for results.</div>;
}
