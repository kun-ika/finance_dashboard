import React from 'react';

/**
 * Modal component for entering or editing transaction details.
 * @param {object} props - Component props.
 * @param {boolean} props.open - Whether the modal is visible.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {object} props.data - Current form state.
 * @param {Function} props.setData - Function to update form state.
 * @param {Function} props.onSave - Function to save the transaction.
 * @param {boolean} props.isEdit - Whether we are editing or adding.
 */
export function TxModal({ open, onClose, data, setData, onSave, isEdit }) {
  if (!open) return null;

  return (
    <div className="modal-overlay open" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        <h2 className="modal-title" id="modal-title">{isEdit ? 'Edit' : 'Add'} Transaction</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          <div className="form-row">
            <label className="form-label" htmlFor="fDesc">Description</label>
            <input
              id="fDesc"
              className="form-input"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              placeholder="e.g. Grocery shopping"
              required
            />
          </div>
          <div className="form-row-2">
            <div className="form-row" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="fAmount">Amount (₹)</label>
              <input
                id="fAmount"
                className="form-input"
                type="number"
                step="0.01"
                min="0"
                value={data.amount}
                onChange={(e) => setData({ ...data, amount: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
            <div className="form-row" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="fDate">Date</label>
              <input
                id="fDate"
                className="form-input"
                type="date"
                value={data.date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-row" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="fType">Type</label>
              <select
                id="fType"
                className="form-input"
                value={data.type}
                onChange={(e) => setData({ ...data, type: e.target.value })}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="form-row" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="fCat">Category</label>
              <select
                id="fCat"
                className="form-input"
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
              >
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Health">Health</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Utilities">Utilities</option>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Investment">Investment</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit">Save Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
}
