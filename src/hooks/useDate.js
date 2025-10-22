import { useState, useMemo } from "react";
import { filterTransactionsByDate } from "@/utils/transaction";

export function useDate(transactions = []) {
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });

  const filteredTransactions = useMemo(() => {
    console.log(dateRange);
    if (!dateRange.start || !dateRange.end) {
      return transactions;
    }
    return filterTransactionsByDate(
      transactions,
      dateRange.start,
      dateRange.end
    );
  }, [transactions, dateRange]);

  const updateDateRange = (start, end) => {
    setDateRange({
      start: start || null,
      end: end || null,
    });
  };

  return {
    setDateRange: updateDateRange,
    filteredTransactions,
  };
}
