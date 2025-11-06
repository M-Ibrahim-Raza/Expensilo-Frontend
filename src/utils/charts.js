export function getCategoryLineChartSummary(transactions, type) {
  if (type === "Daily") {
    return getCategoryLineChartDailySummary(transactions);
  }
  if (type === "Weekly") {
    return getCategoryLineChartWeeklySummary(transactions);
  }
  if (type === "Monthly") {
    return getCategoryLineChartMonthlySummary(transactions);
  }
  if (type === "Yearly") {
    return getCategoryLineChartYearlySummary(transactions);
  }
}

function getCategoryLineChartDailySummary(transactions) {
  if (!transactions?.length) return [];

  const categories = [...new Set(transactions.map((t) => t.category))];
  const parseDay = (d) => d.split("T")[0];

  const dates = transactions.map((t) => parseDay(t.created_at));
  const minDate = new Date(Math.min(...dates.map((d) => new Date(d))));
  const maxDate = new Date(Math.max(...dates.map((d) => new Date(d))));

  const days = [];
  for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
    days.push(d.toISOString().split("T")[0]);
  }

  const daily = {};
  for (const t of transactions) {
    const day = parseDay(t.created_at);
    const amt = parseFloat(t.amount);
    if (!daily[day]) daily[day] = {};
    if (!daily[day][t.category]) daily[day][t.category] = 0;
    daily[day][t.category] += amt;
  }

  const result = days.map((day) => {
    const row = { label: day };
    for (const c of categories) {
      row[c] = daily[day]?.[c] ?? 0;
    }
    return row;
  });

  return result.filter((row) => categories.some((c) => row[c] !== 0));
}

function getCategoryLineChartWeeklySummary(transactions) {
  if (!transactions?.length) return [];

  const categories = [...new Set(transactions.map((t) => t.category))];
  const parseDay = (d) => d.split("T")[0];

  const getWeekRangeLabel = (dayStr) => {
    const date = new Date(dayStr);

    const start = new Date(date);
    const dow = start.getDay();
    const diff = start.getDate() - dow + (dow === 0 ? -6 : 1);
    start.setDate(diff);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const format = (d) =>
      d.toLocaleString("en-US", { month: "short", day: "numeric" });

    const sameMonth = start.getMonth() === end.getMonth();
    return sameMonth
      ? `${format(start)}–${end.getDate()}`
      : `${format(start)}–${format(end)}`;
  };

  const weekly = {};
  for (const t of transactions) {
    const day = parseDay(t.created_at);
    const weekKey = getWeekRangeLabel(day);
    const amt = parseFloat(t.amount);

    if (!weekly[weekKey]) weekly[weekKey] = {};
    if (!weekly[weekKey][t.category]) weekly[weekKey][t.category] = 0;

    weekly[weekKey][t.category] += amt;
  }

  const sortedWeekKeys = Object.keys(weekly).sort((a, b) => {
    const startA = new Date(a.split("–")[0]);
    const startB = new Date(b.split("–")[0]);
    return startA - startB;
  });

  const result = sortedWeekKeys.map((label) => {
    const row = { label };
    for (const c of categories) {
      row[c] = weekly[label][c] ?? 0;
    }
    return row;
  });

  return result;
}

function getCategoryLineChartMonthlySummary(transactions) {
  if (!transactions?.length) return [];

  const categories = [...new Set(transactions.map((t) => t.category))];

  const parseDay = (d) => d.split("T")[0];

  const getMonthKey = (dayStr) => {
    const d = new Date(dayStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  const monthly = {};
  for (const t of transactions) {
    const day = parseDay(t.created_at);
    const key = getMonthKey(day);
    const amt = parseFloat(t.amount);

    if (!monthly[key]) monthly[key] = {};
    if (!monthly[key][t.category]) monthly[key][t.category] = 0;

    monthly[key][t.category] += amt;
  }

  // sort (YYYY-MM)
  const sortedKeys = Object.keys(monthly).sort((a, b) => {
    const [yA, mA] = a.split("-").map(Number);
    const [yB, mB] = b.split("-").map(Number);
    return new Date(yA, mA - 1) - new Date(yB, mB - 1);
  });

  const result = sortedKeys.map((key) => {
    const [y, m] = key.split("-").map(Number);
    const date = new Date(y, m - 1);

    const label = `${date.toLocaleString("default", {
      month: "short",
    })} ${String(date.getFullYear()).slice(-2)}`;

    const row = { label };
    for (const c of categories) {
      row[c] = monthly[key][c] ?? 0;
    }
    return row;
  });

  return result;
}

function getCategoryLineChartYearlySummary(transactions) {
  if (!transactions?.length) return [];

  const categories = [...new Set(transactions.map((t) => t.category))];

  const parseDay = (d) => d.split("T")[0];

  const getYearKey = (dayStr) => {
    const d = new Date(dayStr);
    return `${d.getFullYear()}`; // YYYY
  };

  const yearly = {};
  for (const t of transactions) {
    const day = parseDay(t.created_at);
    const key = getYearKey(day);
    const amt = parseFloat(t.amount);

    if (!yearly[key]) yearly[key] = {};
    if (!yearly[key][t.category]) yearly[key][t.category] = 0;

    yearly[key][t.category] += amt;
  }

  // sort numerically
  const sortedYears = Object.keys(yearly).sort((a, b) => Number(a) - Number(b));

  const result = sortedYears.map((key) => {
    // label: e.g. "2025"
    const label = key;

    const row = { label };
    for (const c of categories) {
      row[c] = yearly[key][c] ?? 0;
    }
    return row;
  });

  return result;
}

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

  const parsed = transactions
    .map((t) => {
      const d = new Date(t.created_at);
      return Number.isFinite(d.getTime())
        ? { ts: d.getTime(), amt: Number(t.amount) || 0 }
        : null;
    })
    .filter(Boolean);

  if (parsed.length <= 1) return [];

  parsed.sort((a, b) => a.ts - b.ts);

  const start = parsed[0].ts;
  const end = parsed[parsed.length - 1].ts;

  const range = end - start;
  if (range <= 0) return [];

  const bins = new Array(10).fill(0);

  for (const item of parsed) {
    const ratio = (item.ts - start) / range;
    let idx = Math.floor(ratio * 10);
    if (idx === 10) idx = 9;
    bins[idx] += item.amt;
  }

  return bins;
}
