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
  const labels = data.map((d) => d.label || d.분기);

  const chartData = {
    labels,
    datasets: [
      {
        label: '매출계획',
        data: data.map((d) => d.매출계획),
        backgroundColor: 'rgba(99,110,140,0.6)',
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: '매출실적',
        data: data.map((d) => d.매출실적),
        backgroundColor: 'rgba(88,166,255,0.8)',
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
        labels: { color: '#7d8590', font: { size: 12 } },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}억원`,
        },
      },
    },
    scales: {
      x: { ticks: { color: '#484f58' }, grid: { color: '#21262d' } },
      y: {
        ticks: { color: '#484f58', callback: (v) => `${v}억` },
        grid: { color: '#21262d' },
      },
    },
  };

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[#8b949e] mb-4">매출 계획 vs 실적</h3>
      <div className="h-56">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
