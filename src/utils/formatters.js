/**
 * Formats a number as a currency string in INR format.
 * @param {number} n - The number to format.
 * @returns {string} The formatted currency string.
 */
export const fmt = (n) => '₹' + Math.abs(n).toLocaleString('en-IN', {
  minimumFractionDigits: 0,
});

/**
 * Formats a date string into a readable Indian date format.
 * @param {string} d - The date string (YYYY-MM-DD).
 * @returns {string} The formatted date string (DD MMM YYYY).
 */
export const fmtDate = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

/**
 * Generates a CSS class name for a category based on its name.
 * @param {string} c - The category name.
 * @returns {string} The CSS class name.
 */
export const catClass = (c) => 'cat-' + c.toLowerCase().replace(/\s/g, '');

/**
 * Chart.js default font and color settings.
 */
export const CHART_DEFAULTS = {
  color: '#e8eaf2',
  gridColor: 'rgba(255,255,255,0.05)',
  font: {
    family: 'DM Mono',
    size: 11,
  },
};
