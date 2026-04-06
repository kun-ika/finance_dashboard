import React from 'react';

/**
 * Sidebar component for the finance dashboard.
 * @param {object} props - Component props.
 * @param {string} props.role - Current user role.
 * @param {Function} props.setRole - Function to update the user role.
 * @param {string} props.activeView - The currently active view.
 * @param {Function} props.setActiveView - Function to switch the active view.
 * @param {boolean} props.sidebarOpen - Whether the sidebar is open on mobile.
 */
export function Sidebar({ role, setRole, activeView, setActiveView, sidebarOpen }) {
  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} aria-label="Main navigation">
      <div className="logo">
        <div className="logo-icon" aria-hidden="true">💹</div>
        <span className="logo-text">Fin<span>trak</span></span>
      </div>
      <nav className="nav-section" aria-label="Menu sections">
        <div className="nav-label">Main</div>
        <button
          className={`nav-item ${activeView === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveView('overview')}
          aria-current={activeView === 'overview' ? 'page' : undefined}
        >
          <span className="nav-icon" aria-hidden="true">▦</span> Overview
        </button>
        <button
          className={`nav-item ${activeView === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveView('transactions')}
          aria-current={activeView === 'transactions' ? 'page' : undefined}
        >
          <span className="nav-icon" aria-hidden="true">⇄</span> Transactions
        </button>
        <button
          className={`nav-item ${activeView === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveView('insights')}
          aria-current={activeView === 'insights' ? 'page' : undefined}
        >
          <span className="nav-icon" aria-hidden="true">◈</span> Insights
        </button>
      </nav>
      <div className="role-selector">
        <span className="role-label" id="role-select-label">Current Role</span>
        <select
          aria-labelledby="role-select-label"
          className="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">⚙ Admin Account</option>
          <option value="viewer">👁 Viewer Only</option>
        </select>
      </div>
    </aside>
  );
}
