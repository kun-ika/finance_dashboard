import React, { useEffect, useRef } from 'react';
import { CHART_DEFAULTS } from '../../utils/formatters';

/**
 * Bar chart for comparing monthly income and expenses.
 * @param {object} props - Component props.
 * @param {object} props.data - The monthly data grouping.
 * @param {string} props.theme - The current theme.
 * @param {boolean} props.active - Whether the insights view is active.
 */
export function BarChart({ data, theme, active }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!window.Chart || !canvasRef.current || !active) return;
    const months = Object.keys(data).sort().slice(-6);
    const labels = months.map((m) => {
      const [y, mo] = m.split('-');
      return new Date(y, mo - 1).toLocaleString('en-IN', { month: 'short' });
    });

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new window.Chart(canvasRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Income',
            data: months.map((m) => data[m].income),
            backgroundColor: 'rgba(200, 241, 53, 0.7)',
            borderRadius: 6,
          },
          {
            label: 'Expenses',
            data: months.map((m) => data[m].expense),
            backgroundColor: 'rgba(255, 107, 107, 0.7)',
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: CHART_DEFAULTS.gridColor } },
          y: { grid: { color: CHART_DEFAULTS.gridColor } },
        },
      },
    });
    return () => chartRef.current && chartRef.current.destroy();
  }, [data, theme, active]);

  return <canvas ref={canvasRef} aria-label="Monthly income vs expenses bar chart"></canvas>;
}
