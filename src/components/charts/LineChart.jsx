import React, { useEffect, useRef } from 'react';
import { CHART_DEFAULTS } from '../../utils/formatters';

/**
 * Line chart for balance trends over time.
 * @param {object} props - Component props.
 * @param {object} props.data - The monthly data grouping.
 * @param {string} props.theme - The current theme.
 */
export function TrendChart({ data, theme }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!window.Chart || !canvasRef.current) return;
    const months = Object.keys(data).sort().slice(-6);
    const labels = months.map((m) => {
      const [y, mo] = m.split('-');
      return new Date(y, mo - 1).toLocaleString('en-IN', { month: 'short' }) + ' ' + y.slice(2);
    });
    const vals = months.map((m) => data[m].income - data[m].expense);

    if (chartRef.current) chartRef.current.destroy();
    const ctx = canvasRef.current.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 220);
    grad.addColorStop(0, 'rgba(200, 241, 53, 0.25)');
    grad.addColorStop(1, 'rgba(200, 241, 53, 0)');

    chartRef.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data: vals,
            borderColor: '#c8f135',
            backgroundColor: grad,
            borderWidth: 2.5,
            fill: true,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: CHART_DEFAULTS.gridColor } },
          y: { grid: { color: CHART_DEFAULTS.gridColor } },
        },
      },
    });
    return () => chartRef.current && chartRef.current.destroy();
  }, [data, theme]);

  return <canvas ref={canvasRef} aria-label="Balance trend line chart"></canvas>;
}
