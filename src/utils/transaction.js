export function getExpenses(transactions) {
  return transactions
    .filter((transaction) => transaction.type === "EXPENSE")
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function getIncome(transactions) {
  return transactions
    .filter((transaction) => transaction.type === "INCOME")
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function getCategoryDistribution(transactions) {
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    const numericAmount = parseFloat(amount);

    if (!acc[category]) {
      acc[category] = numericAmount;
    } else {
      acc[category] += numericAmount;
    }

    return acc;
  }, {});

  return Object.entries(categoryTotals);
}

export function getTotalExpense(transactions) {
  return transactions
    .filter((transaction) => transaction.type === "EXPENSE")
    .reduce(
      (total, transaction) => total + (parseFloat(transaction.amount) || 0),
      0
    );
}

export function getTotalIncome(transactions) {
  return transactions
    .filter((transaction) => transaction.type === "INCOME")
    .reduce(
      (total, transaction) => total + (parseFloat(transaction.amount) || 0),
      0
    );
}

export function getTotalBalance(transactions) {
  return getTotalIncome(transactions) - getTotalExpense(transactions);
}

export function filterTransactionsByDate(transactions, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  const filtered = transactions.filter((txn) => {
    const txnDate = new Date(txn.created_at);
    return txnDate >= start && txnDate <= end;
  });

  return filtered;
}

import axios from "axios";

export async function downloadCSV(transactions) {
  const data = { transactions: transactions };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/transaction/export-csv`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/users/transaction/export-pdf`,
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
