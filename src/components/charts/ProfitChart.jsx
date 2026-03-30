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
  const labels = data.map((d) => d.label || d.분기);

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
        borderColor: 'rgba(99,110,140,0.8)',
        backgroundColor: 'rgba(99,110,140,0.05)',
        pointBackgroundColor: 'rgba(99,110,140,1)',
        tension: 0.4,
        fill: false,
        borderDash: [5, 5],
        pointRadius: 4,
      },
      {
        label: '영업이익 실적',
        data: profitActual,
        borderColor: 'rgba(88,166,255,0.9)',
        backgroundColor: 'rgba(88,166,255,0.08)',
        pointBackgroundColor: 'rgba(88,166,255,1)',
        tension: 0.4,
        fill: false,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#7d8590', font: { size: 12 } } },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}억원`,
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
      <h3 className="text-sm font-semibold text-[#8b949e] mb-4">영업이익 (계획 vs 실적)</h3>
      <div className="h-56">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
