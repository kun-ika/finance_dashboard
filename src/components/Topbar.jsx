import React from 'react';

/**
 * Topbar component for the finance dashboard.
 * @param {object} props - Component props.
 * @param {string} props.role - Current user role.
 * @param {string} props.theme - Current theme (light/dark).
 * @param {Function} props.setTheme - Function to switch the theme.
 * @param {Function} props.onAdd - Function to open the add transaction modal.
 * @param {Function} props.onExport - Function to export the transactions data.
 * @param {string} props.activeTitle - The title of the currently active view.
 */
export function Topbar({ role, theme, setTheme, onAdd, onExport, activeTitle }) {
  return (
    <header className="topbar">
      <h1 className="page-title">{activeTitle}</h1>
      <div className="topbar-right">
        <span
          className={`role-badge ${role}`}
          role="status"
          aria-label={`Current Role: ${role}`}
        >
          {role === 'admin' ? '⚙ Admin' : '👁 Viewer'}
        </span>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title="Toggle theme"
        >
          {theme === 'dark' ? '☀' : '🌙'}
        </button>
        {role === 'admin' && (
          <button
            className="topbar-btn primary"
            onClick={onAdd}
            aria-label="Add a new transaction"
          >
            + Add Transaction
          </button>
        )}
        <button
          className="topbar-btn"
          onClick={onExport}
          aria-label="Export data as CSV"
        >
          ↓ Export
        </button>
      </div>
    </header>
  );
}
