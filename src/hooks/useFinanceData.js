import { useMemo } from 'react';

/**
 * A custom hook to calculate and filter financial data.
 * @param {Array} transactions - The list of transactions.
 * @param {string} search - The search string.
 * @param {string} filterType - The filter for income/expense.
 * @param {string} filterCat - The filter for categories.
 * @param {string} filterMonth - The filter for months (YYYY-MM).
 * @param {string} sortKey - The key to sort transactions.
 * @param {string} sortDir - The sorting direction (asc/desc).
 * @returns {object} The filtered transactions, stats, and groupings.
 */
export function useFinanceData(transactions, search, filterType, filterCat, filterMonth, sortKey, sortDir) {
  const filteredTxns = useMemo(() => {
    return transactions
      .filter((t) =>
        (!search ||
          t.description.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase())) &&
        (!filterType || t.type === filterType) &&
        (!filterCat || t.category === filterCat) &&
        (!filterMonth || t.date.startsWith(filterMonth))
      )
      .sort((a, b) => {
        let va = a[sortKey], vb = b[sortKey];
        if (sortKey === 'amount') {
          va = +va;
          vb = +vb;
        }
        return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
      });
  }, [transactions, search, filterType, filterCat, filterMonth, sortKey, sortDir]);

  const stats = useMemo(() => {
    let income = 0,
      expense = 0;
    transactions.forEach((t) => (t.type === 'income' ? (income += t.amount) : (expense += t.amount)));
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const monthlyGroup = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      const m = t.date.slice(0, 7);
      if (!map[m]) map[m] = { income: 0, expense: 0 };
      t.type === 'income' ? (map[m].income += t.amount) : (map[m].expense += t.amount);
    });
    return map;
  }, [transactions]);

  const categoryGroup = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return map;
  }, [transactions]);

  return { filteredTxns, stats, monthlyGroup, categoryGroup };
}
