import React from 'react';
import { fmt, fmtDate, catClass } from '../utils/formatters';

/**
 * Transactions view component.
 * @param {object} props - Component props.
 * @param {Array} props.data - The filtered transactions to display.
 * @param {string} props.role - Current user role (admin/viewer).
 * @param {string} props.search - Current search query.
 * @param {Function} props.setSearch - Function to update search query.
 * @param {string} props.filterType - Current filter level (income/expense).
 * @param {Function} props.setFilterType - Function to update filter level.
 * @param {string} props.filterCat - Current category filter.
 * @param {Function} props.setFilterCat - Function to update category filter.
 * @param {Array<string>} props.cats - List of categories for filter dropdown.
 * @param {string} props.filterMonth - Current month filter (YYYY-MM).
 * @param {Function} props.setFilterMonth - Function to update month filter.
 * @param {Array<string>} props.mos - List of months for filter dropdown.
 * @param {string} props.sortKey - Current column being sorted.
 * @param {string} props.sortDir - Sorting direction.
 * @param {Function} props.onSort - Handler for column header clicks.
 * @param {Function} props.onEdit - Function to open transaction in edit mode.
 * @param {Function} props.onDelete - Function to delete a transaction.
 */
export function Transactions({
  data,
  role,
  search,
  setSearch,
  filterType,
  setFilterType,
  filterCat,
  setFilterCat,
  cats,
  filterMonth,
  setFilterMonth,
  mos,
  sortKey,
  sortDir,
  onSort,
  onEdit,
  onDelete,
}) {
  const getSortClass = (k) => (sortKey === k ? (sortDir === 'asc' ? 'sort-asc' : 'sort-desc') : '');

  return (
    <section aria-labelledby="transactions-heading">
      <h2 id="transactions-heading" className="sr-only">Transactions list and filters</h2>
      <div className="txn-toolbar" role="search" aria-label="Transaction filters">
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            className="txn-search"
            type="search"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search through transactions"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filterType" className="sr-only">Show Type</label>
          <select
            id="filterType"
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <label htmlFor="filterCat" className="sr-only">Show Category</label>
          <select
            id="filterCat"
            className="filter-select"
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
          >
            <option value="">All categories</option>
            {cats.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <label htmlFor="filterMonth" className="sr-only">Show Month</label>
          <select
            id="filterMonth"
            className="filter-select"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            <option value="">All months</option>
            {mos.map((m) => {
              const [y, mo] = m.split('-');
              const label = new Date(y, mo - 1).toLocaleString('en-IN', {
                month: 'long',
                year: 'numeric',
              });
              return (
                <option key={m} value={m}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="chart-card">
        <div className="table-responsive">
          <table className="txn-table">
            <thead>
              <tr>
                <th scope="col" className={getSortClass('date')} onClick={() => onSort('date')} tabIndex="0" role="button">
                  Date
                </th>
                <th scope="col" className={getSortClass('description')} onClick={() => onSort('description')} tabIndex="0" role="button">
                  Description
                </th>
                <th scope="col" className={getSortClass('category')} onClick={() => onSort('category')} tabIndex="0" role="button">
                  Category
                </th>
                <th scope="col" className={getSortClass('type')} onClick={() => onSort('type')} tabIndex="0" role="button">
                  Type
                </th>
                <th scope="col" className={getSortClass('amount')} onClick={() => onSort('amount')} tabIndex="0" role="button">
                  Amount
                </th>
                {role === 'admin' && <th scope="col">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((t) => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--muted)', fontFamily: '"DM Mono", monospace', fontSize: '12px' }}>
                    {fmtDate(t.date)}
                  </td>
                  <td style={{ fontWeight: 500 }}>{t.description}</td>
                  <td>
                    <span className={`cat-badge ${catClass(t.category)}`}>{t.category}</span>
                  </td>
                  <td>
                    <span
                      className={`cat-badge ${t.type === 'income' ? 'cat-salary' : 'cat-health'}`}
                      style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className={`amount-cell ${t.type}`}>
                    {t.type === 'income' ? '+' : '-'} {fmt(t.amount)}
                  </td>
                  {role === 'admin' && (
                    <td>
                      <button className="action-btn" onClick={() => onEdit(t.id)} aria-label={`Edit transaction ${t.description}`}>
                        Edit
                      </button>
                      <button className="action-btn del" onClick={() => onDelete(t.id)} aria-label={`Delete transaction ${t.description}`}>
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon" aria-hidden="true">🔍</div>
            <p>No transactions match your filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
