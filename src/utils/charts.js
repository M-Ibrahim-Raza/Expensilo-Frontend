export function getDailySummary(transactions) {
  const grouped = {};

  for (const tx of transactions) {
    const date = tx.created_at.split("T")[0];
    const amount = parseFloat(tx.amount);
    if (!grouped[date]) grouped[date] = { expense: 0, income: 0 };

    if (tx.type === "EXPENSE") grouped[date].expense += amount;
    else if (tx.type === "INCOME") grouped[date].income += amount;
  }

  return Object.entries(grouped)
    .map(([date, { expense, income }]) => ({
      label: date,
      expense,
      income,
    }))
    .sort((a, b) => new Date(a.label) - new Date(b.label));
}
