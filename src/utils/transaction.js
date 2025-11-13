export function formatType(type) {
  if (!type || typeof type !== "string") return "";
  return type[0].toUpperCase() + type.slice(1).toLowerCase();
}

export function isSameDate(d1, d2) {
  if (
    !(d1 instanceof Date) ||
    isNaN(d1) ||
    !(d2 instanceof Date) ||
    isNaN(d2)
  ) {
    return false;
  }

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function formatDateShort(dateInput) {
  const date = new Date(dateInput);

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);

  return `${day}${suffix} ${month} ${year}`;
}

export function getExpenses(transactions) {
  return transactions.filter((transaction) => transaction.type === "EXPENSE");
}

export function getIncome(transactions) {
  return transactions.filter((transaction) => transaction.type === "INCOME");
}

export function sortTransactions(transactions, column, isDescending = true) {
  if (!["created_at", "amount"].includes(column)) {
    throw new Error("Invalid column. Allowed: 'created_at' or 'amount'");
  }

  return [...transactions].sort((a, b) => {
    let valA, valB;

    if (column === "created_at") {
      valA = new Date(a.created_at).getTime();
      valB = new Date(b.created_at).getTime();
    } else {
      valA = parseFloat(a.amount);
      valB = parseFloat(b.amount);
    }

    return isDescending ? valB - valA : valA - valB;
  });
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

export function searchTransactions(transactions, searchValue, column) {
  if (searchValue === "") {
    return transactions;
  }
  const allowed = ["title", "category", "amount", "details"];
  if (!allowed.includes(column.toLowerCase())) return [];

  const query = searchValue.trim().toLowerCase();

  return transactions.filter((tx) => {
    const value = (tx[column.toLowerCase()] || "").toString().toLowerCase();
    return value.includes(query);
  });
}
