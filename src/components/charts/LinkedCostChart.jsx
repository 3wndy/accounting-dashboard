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

export default function LinkedCostChart({ data }) {
  const labels = data.map((d) => d.분기);

  const chartData = {
    labels,
    datasets: [
      {
        label: '매입비',
        data: data.map((d) => d.매입비실적),
        backgroundColor: 'rgba(56,139,253,0.8)',
        borderRadius: 4,
        borderSkipped: false,
        stack: 'stack',
      },
      {
        label: '영업수수료',
        data: data.map((d) => d.영업수수료실적),
        backgroundColor: 'rgba(110,64,201,0.75)',
        borderRadius: 4,
        borderSkipped: false,
        stack: 'stack',
      },
      {
        label: 'OMP수수료',
        data: data.map((d) => d.omp수수료실적),
        backgroundColor: 'rgba(139,148,158,0.6)',
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
      legend: { labels: { color: '#7d8590', font: { size: 12 } } },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}억원`,
        },
      },
    },
    scales: {
      x: { stacked: true, ticks: { color: '#484f58' }, grid: { color: '#21262d' } },
      y: {
        stacked: true,
        ticks: { color: '#484f58', callback: (v) => `${v}억` },
        grid: { color: '#21262d' },
      },
    },
  };

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[#8b949e] mb-4">매출 연계 비용 상세</h3>
      <div className="h-56">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
