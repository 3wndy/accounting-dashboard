import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { PROJECT_WORKFORCE_DATA } from '../utils/dataUtils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function overColor(actual, plan) {
  return actual > plan ? 'text-[#f85149]' : 'text-[#3fb950]';
}

export default function ProjectWorkforceChart() {
  const data = PROJECT_WORKFORCE_DATA;
  const labels = data.map((d) => d.프로젝트);

  const totalPlan = data.map((d) => d.Q1계획 + d.Q2계획 + d.Q3계획 + d.Q4계획);
  const totalActual = data.map((d) => d.Q1실적 + d.Q2실적 + d.Q3실적 + d.Q4실적);

  const chartData = {
    labels,
    datasets: [
      {
        label: '계획 (MM)',
        data: totalPlan,
        backgroundColor: 'rgba(99,110,140,0.6)',
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: '실적 (MM)',
        data: totalActual,
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
      legend: { labels: { color: '#7d8590', font: { size: 12 } } },
      tooltip: { callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}MM` } },
    },
    scales: {
      x: { ticks: { color: '#484f58' }, grid: { color: '#21262d' } },
      y: {
        beginAtZero: true,
        ticks: { color: '#484f58', callback: (v) => `${v}MM` },
        grid: { color: '#21262d' },
      },
    },
  };

  const thC = 'px-3 py-3 text-center text-xs font-semibold text-[#484f58]';
  const thS = 'px-3 py-2 text-center text-xs text-[#484f58]';

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#21262d]">
        <h3 className="text-sm font-semibold text-[#8b949e]">프로젝트별 인력 투입 현황</h3>
        <p className="text-xs text-[#484f58] mt-0.5">단위: MM (Man-Month)</p>
      </div>

      <div className="px-5 pt-5 pb-4">
        <div className="h-52">
          <Bar data={chartData} options={options} />
        </div>
      </div>

      <div className="border-t border-[#21262d] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#21262d]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#484f58] uppercase tracking-wider">프로젝트</th>
              <th className={thC} colSpan={2}>Q1</th>
              <th className={thC} colSpan={2}>Q2</th>
              <th className={thC} colSpan={2}>Q3</th>
              <th className={thC} colSpan={2}>Q4</th>
              <th className={thC} colSpan={2}>합계</th>
            </tr>
            <tr className="border-b border-[#21262d]">
              <th className="px-4 py-2"></th>
              <th className={thS}>계획</th><th className={thS}>실적</th>
              <th className={thS}>계획</th><th className={thS}>실적</th>
              <th className={thS}>계획</th><th className={thS}>실적</th>
              <th className={thS}>계획</th><th className={thS}>실적</th>
              <th className={thS}>계획</th><th className={thS}>실적</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d]">
            {data.map((d) => {
              const tp = d.Q1계획 + d.Q2계획 + d.Q3계획 + d.Q4계획;
              const ta = d.Q1실적 + d.Q2실적 + d.Q3실적 + d.Q4실적;
              return (
                <tr key={d.프로젝트} className="hover:bg-[#1c2128] transition-colors">
                  <td className="px-4 py-2.5 font-medium text-[#adbac7]">{d.프로젝트}</td>
                  <td className="px-3 py-2.5 text-center text-[#7d8590]">{d.Q1계획}</td>
                  <td className={`px-3 py-2.5 text-center font-semibold ${overColor(d.Q1실적, d.Q1계획)}`}>{d.Q1실적}</td>
                  <td className="px-3 py-2.5 text-center text-[#7d8590]">{d.Q2계획}</td>
                  <td className={`px-3 py-2.5 text-center font-semibold ${overColor(d.Q2실적, d.Q2계획)}`}>{d.Q2실적}</td>
                  <td className="px-3 py-2.5 text-center text-[#7d8590]">{d.Q3계획}</td>
                  <td className={`px-3 py-2.5 text-center font-semibold ${overColor(d.Q3실적, d.Q3계획)}`}>{d.Q3실적}</td>
                  <td className="px-3 py-2.5 text-center text-[#7d8590]">{d.Q4계획}</td>
                  <td className={`px-3 py-2.5 text-center font-semibold ${overColor(d.Q4실적, d.Q4계획)}`}>{d.Q4실적}</td>
                  <td className="px-3 py-2.5 text-center text-[#7d8590] font-semibold">{tp}</td>
                  <td className={`px-3 py-2.5 text-center font-bold ${overColor(ta, tp)}`}>{ta}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
