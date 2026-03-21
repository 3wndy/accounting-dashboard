import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesChart({ data }) {
  const labels = data.map((d) => d.분기);

  const chartData = {
    labels,
    datasets: [
      {
        label: '매출계획',
        data: data.map((d) => d.매출계획),
        backgroundColor: 'rgba(99,102,241,0.7)',
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: '매출실적',
        data: data.map((d) => d.매출실적),
        backgroundColor: 'rgba(52,211,153,0.7)',
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#9ca3af', font: { size: 12 } },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}억원`,
        },
      },
    },
    scales: {
      x: { ticks: { color: '#6b7280' }, grid: { color: '#1f2937' } },
      y: {
        ticks: { color: '#6b7280', callback: (v) => `${v}억` },
        grid: { color: '#1f2937' },
      },
    },
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 shadow-lg">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">매출 계획 vs 실적</h3>
      <div className="h-56">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
