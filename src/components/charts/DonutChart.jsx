import React, { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

/**
 * Donut chart for spending breakdown by category.
 * @param {object} props - Component props.
 * @param {object} props.data - The category data grouping.
 * @param {string} props.theme - The current theme.
 */
export function DonutChart({ data, theme }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const labels = Object.keys(data);
    const vals = Object.values(data);
    const COLORS = ['#c8f135', '#5b8fff', '#ff6b6b', '#ffb347', '#b482ff', '#ff91c8', '#50c8c8', '#64dc96', '#f0f135', '#aaa'];

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{ data: vals, backgroundColor: COLORS, borderColor: theme === 'light' ? '#fff' : '#12141a', borderWidth: 3 }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'right' } },
        cutout: '65%',
      },
    });
    return () => chartRef.current && chartRef.current.destroy();
  }, [data, theme]);

  return <canvas ref={canvasRef} aria-label="Spending breakdown donut chart"></canvas>;
}
