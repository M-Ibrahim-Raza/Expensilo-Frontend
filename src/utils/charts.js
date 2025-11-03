export function getLineChartSummary(transactions, type) {
  if (type === "Daily") {
    return getLineChartDailySummary(transactions);
  }
  if (type === "Weekly") {
    return getLineChartWeeklySummary(transactions);
  }
  if (type === "Monthly") {
    return getLineChartMonthlySummary(transactions);
  }
  if (type === "Yearly") {
    return getLineChartYearlySummary(transactions);
  }
}

function getLineChartDailySummary(transactions) {
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

function getLineChartWeeklySummary(transactions) {
  const grouped = {};

  function getWeekRangeLabel(dateString) {
    const date = new Date(dateString);

    // Get start (Monday) of the week
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);

    // Get end (Sunday) of the week
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const format = (d) =>
      d.toLocaleString("en-US", { month: "short", day: "numeric" });

    // e.g. Oct 21–27 or Oct 28–Nov 3
    const sameMonth = start.getMonth() === end.getMonth();
    return sameMonth
      ? `${format(start)}–${end.getDate()}`
      : `${format(start)}–${format(end)}`;
  }

  for (const tx of transactions) {
    const date = tx.created_at.split("T")[0];
    const label = getWeekRangeLabel(date);
    const amount = parseFloat(tx.amount);

    if (!grouped[label]) grouped[label] = { expense: 0, income: 0 };

    if (tx.type === "EXPENSE") grouped[label].expense += amount;
    else if (tx.type === "INCOME") grouped[label].income += amount;
  }

  return Object.entries(grouped)
    .map(([label, { expense, income }]) => ({
      label,
      expense,
      income,
    }))
    .sort(
      (a, b) =>
        new Date(a.label.split("–")[0]) - new Date(b.label.split("–")[0])
    );
}

function getLineChartMonthlySummary(transactions) {
  const summary = {};

  transactions.forEach(({ amount, type, created_at }) => {
    const date = new Date(created_at);
    if (isNaN(date)) return;

    const label = `${date.toLocaleString("default", {
      month: "short",
    })} ${String(date.getFullYear()).slice(-2)}`;

    if (!summary[label]) {
      summary[label] = { income: 0, expense: 0 };
    }

    const numericAmount = parseFloat(amount) || 0;

    if (type === "INCOME") summary[label].income += numericAmount;
    else if (type === "EXPENSE") summary[label].expense += numericAmount;
  });

  return Object.entries(summary)
    .map(([label, { income, expense }]) => {
      const [monthStr, yearStr] = label.split(" ");
      const date = new Date(`01 ${monthStr} 20${yearStr}`);
      return {
        label,
        income,
        expense,
        balance: income - expense,
        sortDate: date,
      };
    })
    .sort((a, b) => a.sortDate - b.sortDate)
    .map(({ sortDate, ...rest }) => rest);
}

function getLineChartYearlySummary(transactions) {
  const summary = {};

  transactions.forEach(({ amount, type, created_at }) => {
    const date = new Date(created_at);
    if (isNaN(date)) return;

    const label = String(date.getFullYear()); // e.g. "2025"

    if (!summary[label]) {
      summary[label] = { income: 0, expense: 0 };
    }

    const numericAmount = parseFloat(amount) || 0;

    if (type === "INCOME") summary[label].income += numericAmount;
    else if (type === "EXPENSE") summary[label].expense += numericAmount;
  });

  return Object.entries(summary)
    .map(([label, { income, expense }]) => ({
      label,
      income,
      expense,
      sortDate: new Date(`${label}-01-01`),
    }))
    .sort((a, b) => a.sortDate - b.sortDate)
    .map(({ sortDate, ...rest }) => rest);
}

export function getCategoryDistribution(transactions) {
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    const numericAmount = parseFloat(amount);
    acc[category] = (acc[category] || 0) + numericAmount;
    return acc;
  }, {});

  const total = Object.values(categoryTotals).reduce(
    (sum, val) => sum + val,
    0
  );

  return Object.entries(categoryTotals).map(
    ([category, totalValue], index) => ({
      id: index,
      label: category,
      value: totalValue,
      percentage: total ? Math.round((totalValue / total) * 100) : 0,
    })
  );
}

export function getSparkLineData(transactions) {
  if (!Array.isArray(transactions)) return [];
  if (transactions.length <= 1) return [];

  // parse valid timestamps only
  const parsed = transactions
    .map((t) => {
      const d = new Date(t.created_at);
      return Number.isFinite(d.getTime())
        ? { ts: d.getTime(), amt: Number(t.amount) || 0 }
        : null;
    })
    .filter(Boolean);

  if (parsed.length <= 1) return null;

  // sort oldest to latest
  parsed.sort((a, b) => a.ts - b.ts);

  const start = parsed[0].ts;
  const end = parsed[parsed.length - 1].ts;

  const range = end - start;
  if (range <= 0) return null;

  // 10 bins
  const bins = new Array(10).fill(0);

  for (const item of parsed) {
    const ratio = (item.ts - start) / range;
    let idx = Math.floor(ratio * 10);
    if (idx === 10) idx = 9; // catch exact end boundary
    bins[idx] += item.amt;
  }

  return bins;
}
