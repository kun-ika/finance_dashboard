import React, { useState, useEffect, useMemo } from 'react';
import { SEED } from './data';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useFinanceData } from './hooks/useFinanceData';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Overview } from './components/Overview';
import { Transactions } from './components/Transactions';
import { Insights } from './components/Insights';
import { TxModal } from './components/TxModal';

/**
 * Main application component for Fintrak Dashboard.
 */
export default function App() {
  const [transactions, setTransactions] = useLocalStorage('fintrak_txns', SEED);
  const [role, setRole] = useLocalStorage('fintrak_role', 'admin');
  const [theme, setTheme] = useLocalStorage('fintrak_theme', 'dark');

  const [activeView, setActiveView] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filters & Sorting state
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    category: 'Food',
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [theme]);

  const showToast = (msg) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  const { filteredTxns, stats, monthlyGroup, categoryGroup } = useFinanceData(
    transactions,
    search,
    filterType,
    filterCat,
    filterMonth,
    sortKey,
    sortDir
  );

  const recentTxns = useMemo(
    () => [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5),
    [transactions]
  );
  const categories = useMemo(
    () => [...new Set(transactions.map((t) => t.category))].sort(),
    [transactions]
  );
  const months = useMemo(
    () => [...new Set(transactions.map((t) => t.date.slice(0, 7)))].sort().reverse(),
    [transactions]
  );

  // ── Handlers ──
  const handleSort = (key) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const handleEdit = (id) => {
    if (role !== 'admin') {
      showToast('⚠ Viewer role cannot edit transactions.');
      return;
    }
    const t = transactions.find((x) => x.id === id);
    setFormData(t);
    setEditId(id);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (role !== 'admin') return;
    if (!window.confirm('Delete this transaction?')) return;
    setTransactions(transactions.filter((t) => t.id !== id));
    showToast('🗑 Transaction deleted.');
  };

  const handleSaveModal = () => {
    if (editId) {
      setTransactions(transactions.map((t) => (t.id === editId ? { ...t, ...formData } : t)));
      showToast('✓ Transaction updated.');
    } else {
      setTransactions([...transactions, { ...formData, id: Date.now() }]);
      showToast('✓ Transaction added.');
    }
    setModalOpen(false);
  };

  const handleExport = () => {
    const csv = [
      'Date,Description,Category,Type,Amount',
      ...filteredTxns.map((t) => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'fintrak-transactions.csv';
    a.click();
    showToast('✓ CSV exported.');
  };

  return (
    <div className="app">
      <button
        className="mob-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      ></div>

      <Sidebar
        role={role}
        setRole={setRole}
        activeView={activeView}
        setActiveView={(v) => {
          setActiveView(v);
          setSidebarOpen(false);
        }}
        sidebarOpen={sidebarOpen}
      />

      <main className="main">
        <Topbar
          role={role}
          theme={theme}
          setTheme={setTheme}
          onAdd={() => {
            if (role !== 'admin') {
              showToast('⚠ Viewer role cannot add transactions.');
              return;
            }
            setEditId(null);
            setFormData({
              description: '',
              amount: '',
              date: new Date().toISOString().split('T')[0],
              type: 'expense',
              category: 'Food',
            });
            setModalOpen(true);
          }}
          onExport={handleExport}
          activeTitle={activeView.charAt(0).toUpperCase() + activeView.slice(1)}
        />

        <div className="content">
          {activeView === 'overview' && (
            <div className="view active">
              <Overview
                stats={stats}
                monthlyGroup={monthlyGroup}
                categoryGroup={categoryGroup}
                recentTxns={recentTxns}
                setView={setActiveView}
                theme={theme}
              />
            </div>
          )}

          {activeView === 'transactions' && (
            <div className="view active">
              <Transactions
                data={filteredTxns}
                role={role}
                search={search}
                setSearch={setSearch}
                filterType={filterType}
                setFilterType={setFilterType}
                filterCat={filterCat}
                setFilterCat={setFilterCat}
                cats={categories}
                filterMonth={filterMonth}
                setFilterMonth={setFilterMonth}
                mos={months}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}

          {activeView === 'insights' && (
            <div className="view active">
              <Insights
                transactions={transactions}
                monthlyGroup={monthlyGroup}
                categoryGroup={categoryGroup}
                stats={stats}
                theme={theme}
                active={activeView === 'insights'}
              />
            </div>
          )}
        </div>
      </main>

      <TxModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={formData}
        setData={setFormData}
        onSave={handleSaveModal}
        isEdit={!!editId}
      />

      <aside className="toast-container" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            {t.msg}
          </div>
        ))}
      </aside>
    </div>
  );
}
