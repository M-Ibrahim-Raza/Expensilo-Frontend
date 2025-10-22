import axios from "axios";
import api from "@/utils/api";
import { env } from "@/env.mjs";

export async function fetchTransactions() {
  try {
    const res = await api.get("/users/transaction");
    return res.data.transactions || [];
  } catch (error) {
    const msg = error?.response?.data?.detail || error?.message || "Error";
    throw new Error(msg);
  }
}

export async function addTransaction(payload) {
  try {
    await api.post("/users/transaction", payload);
  } catch (error) {
    const msg = error?.response?.data?.detail || error?.message || "Error";
    throw new Error(msg);
  }
}

export async function updateTransaction(id, payload) {
  try {
    await api.put(`/users/transaction/${id}`, payload);
  } catch (error) {
    const msg = error?.response?.data?.detail || error?.message || "Error";
    throw new Error(msg);
  }
}

export async function deleteTransaction(id) {
  try {
    await api.delete(`/users/transaction/${id}`);
  } catch (error) {
    const msg = error?.response?.data?.detail || error?.message || "Error";
    throw new Error(msg);
  }
}

export async function downloadCSV(transactions) {
  const data = { transactions: transactions };

  try {
    const response = await axios.post(
      `${env.NEXT_PUBLIC_API_URL}/users/transaction/export-csv`,
      data,
      {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
    link.remove();
  } catch (error) {
    console.error("Error downloading CSV:", error);
    alert("Failed to download CSV file");
  }
}

export async function downloadPDF(transactions) {
  const data = { transactions: transactions };

  try {
    const response = await axios.post(
      `${env.NEXT_PUBLIC_API_URL}/users/transaction/export-pdf`,
      data,
      {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.pdf");
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
    link.remove();
  } catch (error) {
    console.error("Error downloading PDF:", error);
    alert("Failed to download PDF file");
  }
}
