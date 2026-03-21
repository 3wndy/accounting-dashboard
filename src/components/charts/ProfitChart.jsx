import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ProfitChart({ data }) {
  const labels = data.map((d) => d.분기);

  const profitPlan = data.map(
    (d) =>
      d.매출계획 -
      d.고정비계획 -
      d.매입비계획 -
      d.영업수수료계획 -
      d.omp수수료계획
  );
  const profitActual = data.map(
    (d) =>
      d.매출실적 -
      d.고정비실적 -
      d.매입비실적 -
      d.영업수수료실적 -
      d.omp수수료실적
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: '영업이익 계획',
        data: profitPlan,
        borderColor: 'rgba(99,102,241,0.9)',
        backgroundColor: 'rgba(99,102,241,0.1)',
        pointBackgroundColor: 'rgba(99,102,241,1)',
        tension: 0.4,
        fill: false,
        borderDash: [5, 5],
        pointRadius: 5,
      },
      {
        label: '영업이익 실적',
        data: profitActual,
        borderColor: 'rgba(52,211,153,0.9)',
        backgroundColor: 'rgba(52,211,153,0.1)',
        pointBackgroundColor: 'rgba(52,211,153,1)',
        tension: 0.4,
        fill: false,
        pointRadius: 5,
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
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}억원`,
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
      <h3 className="text-sm font-semibold text-gray-300 mb-4">영업이익 (계획 vs 실적)</h3>
      <div className="h-56">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
