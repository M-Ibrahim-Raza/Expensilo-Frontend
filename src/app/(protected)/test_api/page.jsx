"use client";
import { useEffect } from "react";
import api from "@/utils/api";


const fetchTransactions = async () => {
  try {
    const response = await api.get("/users/transaction");
    return response.data.transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

export default function TestPage() {
  useEffect(() => {
    fetchTransactions()
      .then((data) => console.log("Transactions:", data))
      .catch((err) => console.error(err));
  }, []);

  return <div>Check the console for results.</div>;
}
