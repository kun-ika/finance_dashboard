import React from 'react';
import { fmt, fmtDate, catClass } from '../utils/formatters';
import { TrendChart } from './charts/LineChart';
import { DonutChart } from './charts/DonutChart';

/**
 * Overview component for the dashboard.
 * @param {object} props - Component props.
 * @param {object} props.stats - Summary statistics (income, expense, balance).
 * @param {object} props.monthlyGroup - The monthly data grouping for charts.
 * @param {object} props.categoryGroup - The category data grouping for charts.
 * @param {Array} props.recentTxns - The list of recent transactions.
 * @param {Function} props.setView - Function to switch the active view.
 * @param {string} props.theme - The current theme.
 */
export function Overview({ stats, monthlyGroup, categoryGroup, recentTxns, setView, theme }) {
  const savings = stats.income > 0 ? ((stats.balance / stats.income) * 100).toFixed(1) : 0;

  return (
    <section aria-labelledby="overview-heading">
      <h2 id="overview-heading" className="sr-only">Dashboard Overview</h2>
      <div className="cards-grid">
        <article className="card" tabIndex="0">
          <div className="card-glow" style={{ background: '#c8f135' }} aria-hidden="true"></div>
          <div className="card-icon" aria-hidden="true">🏦</div>
          <div className="card-label">Total Balance</div>
          <div className="card-value">{fmt(stats.balance)}</div>
          <div className="card-sub">
            <span className="card-delta up" role="status" aria-label={`Savings rate is ${savings}%`}>
              {savings}% savings rate
            </span>
          </div>
        </article>
        <article className="card" tabIndex="0">
          <div className="card-glow" style={{ background: '#64dc96' }} aria-hidden="true"></div>
          <div className="card-icon" aria-hidden="true">📈</div>
          <div className="card-label">Total Income</div>
          <div className="card-value">{fmt(stats.income)}</div>
        </article>
        <article className="card" tabIndex="0">
          <div className="card-glow" style={{ background: '#ff6b6b' }} aria-hidden="true"></div>
          <div className="card-icon" aria-hidden="true">📉</div>
          <div className="card-label">Total Expenses</div>
          <div className="card-value">{fmt(stats.expense)}</div>
        </article>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Balance Trend</h3>
              <p className="chart-subtitle">Monthly net balance over time</p>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Last 6 months</div>
          </div>
          <div className="chart-wrap">
            <TrendChart data={monthlyGroup} theme={theme} />
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Spending Breakdown</h3>
              <p className="chart-subtitle">By category</p>
            </div>
          </div>
          <div className="chart-wrap">
            <DonutChart data={categoryGroup} theme={theme} />
          </div>
        </div>
      </div>

      <div className="chart-card">
        <div className="section-header">
          <h3 className="section-title">Recent Transactions</h3>
          <button
            className="topbar-btn"
            style={{ padding: '6px 12px', fontSize: '12px' }}
            onClick={() => setView('transactions')}
            aria-label="View all transactions"
          >
            View all →
          </button>
        </div>
        <div className="table-responsive">
          <table className="txn-table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTxns.map((t) => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--muted)', fontFamily: '"DM Mono", monospace', fontSize: '12px' }}>
                    {fmtDate(t.date)}
                  </td>
                  <td style={{ fontWeight: 500 }}>{t.description}</td>
                  <td><span className={`cat-badge ${catClass(t.category)}`}>{t.category}</span></td>
                  <td className={`amount-cell ${t.type}`}>
                    {t.type === 'income' ? '+' : '-'} {fmt(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
