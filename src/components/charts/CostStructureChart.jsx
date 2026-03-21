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

export default function CostStructureChart({ data }) {
  const labels = data.map((d) => d.분기);

  const chartData = {
    labels,
    datasets: [
      {
        label: '고정비',
        data: data.map((d) => d.고정비실적),
        backgroundColor: 'rgba(239,68,68,0.75)',
        borderRadius: 4,
        borderSkipped: false,
        stack: 'stack',
      },
      {
        label: '변동비',
        data: data.map(
          (d) => d.매입비실적 + d.영업수수료실적 + d.omp수수료실적
        ),
        backgroundColor: 'rgba(251,146,60,0.75)',
        borderRadius: 4,
        borderSkipped: false,
        stack: 'stack',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#9ca3af', font: { size: 12 } } },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}억원`,
        },
      },
    },
    scales: {
      x: { stacked: true, ticks: { color: '#6b7280' }, grid: { color: '#1f2937' } },
      y: {
        stacked: true,
        ticks: { color: '#6b7280', callback: (v) => `${v}억` },
        grid: { color: '#1f2937' },
      },
    },
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 shadow-lg">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">비용 구조 (고정비 / 변동비)</h3>
      <div className="h-56">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
