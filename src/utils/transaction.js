export function formatType(type) {
  if (!type || typeof type !== "string") return "";
  return type[0].toUpperCase() + type.slice(1).toLowerCase();
}

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

export function searchTransactions(transactions, searchValue, column) {
  if ((searchValue === "")) {
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
