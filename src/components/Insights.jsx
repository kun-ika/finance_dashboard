import React from 'react';
import { fmt } from '../utils/formatters';
import { BarChart } from './charts/BarChart';

/**
 * Insights view component.
 * @param {object} props - Component props.
 * @param {Array} props.transactions - All transactions.
 * @param {object} props.monthlyGroup - Transactions grouped by month.
 * @param {object} props.categoryGroup - Expenses grouped by category.
 * @param {object} props.stats - Totals (income, expense, balance).
 * @param {string} props.theme - The current theme.
 * @param {boolean} props.active - Whether the view is active.
 */
export function Insights({ transactions, monthlyGroup, categoryGroup, stats, theme, active }) {
  const topCat = Object.entries(categoryGroup).sort((a, b) => b[1] - a[1])[0];
  const sortedMonths = Object.keys(monthlyGroup).sort();
  const lastM = sortedMonths[sortedMonths.length - 1];
  const prevM = sortedMonths[sortedMonths.length - 2];
  const lastExp = lastM ? monthlyGroup[lastM].expense : 0;
  const prevExp = prevM ? monthlyGroup[prevM].expense : 0;
  const expChange = prevExp ? (((lastExp - prevExp) / prevExp) * 100).toFixed(1) : 0;
  const avgMonthly = sortedMonths.length
    ? (Object.values(monthlyGroup).reduce((s, m) => s + m.expense, 0) / sortedMonths.length).toFixed(0)
    : 0;
  const savingsRate = stats.income > 0 ? ((stats.balance / stats.income) * 100).toFixed(1) : 0;

  const mThs = sortedMonths.slice(-6);
  const maxExp = Math.max(...mThs.map((m) => monthlyGroup[m].expense), 1);

  return (
    <section aria-labelledby="insights-heading">
      <h2 id="insights-heading" className="sr-only">Data Insights and Stats</h2>
      <div className="insights-grid">
        <InsightCard
          icon="🔥"
          title="Highest Spending"
          val={topCat ? topCat[0] : 'N/A'}
          desc={topCat ? fmt(topCat[1]) + ' total spent' : 'No data'}
        />
        <InsightCard
          icon={expChange >= 0 ? '📈' : '📉'}
          title="MoM Expenses"
          val={`${expChange >= 0 ? '+' : ''}${expChange}%`}
          desc="Compared to prev month"
          valColor={expChange >= 0 ? 'var(--expense)' : 'var(--income)'}
        />
        <InsightCard icon="💰" title="Savings Rate" val={`${savingsRate}%`} desc="Of total income saved" />
        <InsightCard icon="📊" title="Avg Monthly Expense" val={fmt(avgMonthly)} desc="Across all months" />
        <InsightCard
          icon="🎯"
          title="Expense-to-Income"
          val={`${stats.income > 0 ? ((stats.expense / stats.income) * 100).toFixed(1) : 0}%`}
          desc={stats.income > 0 && stats.expense / stats.income < 0.7 ? 'Healthy' : 'Consider reducing'}
        />
        <InsightCard
          icon="🧾"
          title="Total Transactions"
          val={transactions.length}
          desc={`${transactions.filter((t) => t.type === 'income').length} inc · ${
            transactions.filter((t) => t.type === 'expense').length
          } exp`}
        />
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Monthly Income vs Expenses</h3>
              <p className="chart-subtitle">Side-by-side comparison</p>
            </div>
          </div>
          <div className="chart-wrap">
            <BarChart data={monthlyGroup} theme={theme} active={active} />
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Top Spending Months</h3>
              <p className="chart-subtitle">Total expenses by month</p>
            </div>
          </div>
          <div className="monthly-bars">
            {[...mThs]
              .reverse()
              .map((m) => {
                const [y, mo] = m.split('-');
                const pct = (monthlyGroup[m].expense / maxExp) * 100;
                return (
                  <div className="month-row" key={m}>
                    <span className="month-name">
                      {new Date(y, mo - 1).toLocaleString('en-IN', { month: 'short' })}
                    </span>
                    <div className="month-bar-wrap">
                      <div
                        className="month-bar"
                        style={{ width: `${pct.toFixed(1)}%` }}
                        aria-valuenow={pct}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        role="progressbar"
                      ></div>
                    </div>
                    <span className="month-amount">{fmt(monthlyGroup[m].expense)}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Single card within the insights grid.
 * @param {object} props - Component props.
 * @param {string} props.icon - Icon to display.
 * @param {string} props.title - Title of the insight.
 * @param {string|number} props.val - Main value.
 * @param {string} props.desc - Descriptive text.
 * @param {string} props.valColor - Color override for the value text.
 */
function InsightCard({ icon, title, val, desc, valColor }) {
  return (
    <article className="insight-card">
      <div className="insight-ico" aria-hidden="true">{icon}</div>
      <div>
        <div className="insight-title">{title}</div>
        <div className="insight-value" style={valColor ? { color: valColor } : {}}>{val}</div>
        <div className="insight-desc">{desc}</div>
      </div>
    </article>
  );
}
