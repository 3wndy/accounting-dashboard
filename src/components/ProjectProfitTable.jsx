import { PROJECT_PL_DATA } from '../utils/dataUtils';

function fmt(v) {
  return typeof v === 'number' ? v.toFixed(1) : '-';
}

function pctColor(actual, plan) {
  if (!plan) return '#7d8590';
  const v = (actual / plan) * 100;
  return v >= 100 ? '#3fb950' : '#f85149';
}

export default function ProjectProfitTable() {
  const rows = PROJECT_PL_DATA.map((d) => {
    const 총비용계획 = d.직접비계획 + d.인건비계획 + d.간접비계획;
    const 총비용실적 = d.직접비실적 + d.인건비실적 + d.간접비실적;
    const 손익계획 = d.매출계획 - 총비용계획;
    const 손익실적 = d.매출실적 - 총비용실적;
    const 달성률 = d.매출계획 > 0 ? (d.매출실적 / d.매출계획) * 100 : 0;
    return { ...d, 총비용계획, 총비용실적, 손익계획, 손익실적, 달성률 };
  });

  const totals = rows.reduce(
    (acc, d) => {
      acc.매출계획 += d.매출계획;
      acc.매출실적 += d.매출실적;
      acc.총비용계획 += d.총비용계획;
      acc.총비용실적 += d.총비용실적;
      acc.손익계획 += d.손익계획;
      acc.손익실적 += d.손익실적;
      return acc;
    },
    { 매출계획: 0, 매출실적: 0, 총비용계획: 0, 총비용실적: 0, 손익계획: 0, 손익실적: 0 }
  );
  totals.달성률 = totals.매출계획 > 0 ? (totals.매출실적 / totals.매출계획) * 100 : 0;

  const thCls = 'px-4 py-3 text-right text-xs font-semibold text-[#484f58] uppercase tracking-wider';
  const thLeftCls = 'px-4 py-3 text-left text-xs font-semibold text-[#484f58] uppercase tracking-wider';

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#21262d]">
        <h3 className="text-sm font-semibold text-[#8b949e]">프로젝트별 매출 / 비용 / 손익</h3>
        <p className="text-xs text-[#484f58] mt-0.5">단위: 억원</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#21262d]">
              <th className={thLeftCls}>프로젝트</th>
              <th className={thCls}>매출계획</th>
              <th className={thCls}>매출실적</th>
              <th className={thCls}>달성률</th>
              <th className={thCls}>총비용계획</th>
              <th className={thCls}>총비용실적</th>
              <th className={thCls}>손익계획</th>
              <th className={thCls}>손익실적</th>
              <th className={thCls}>손익 차이</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d]">
            {rows.map((d) => {
              const diff = d.손익실적 - d.손익계획;
              return (
                <tr key={d.프로젝트} className="hover:bg-[#1c2128] transition-colors">
                  <td className="px-4 py-2.5 font-medium text-[#adbac7]">{d.프로젝트}</td>
                  <td className="px-4 py-2.5 text-right text-[#7d8590]">{fmt(d.매출계획)}</td>
                  <td className="px-4 py-2.5 text-right text-[#e6edf3]">{fmt(d.매출실적)}</td>
                  <td className="px-4 py-2.5 text-right text-xs font-semibold" style={{ color: pctColor(d.매출실적, d.매출계획) }}>
                    {d.달성률.toFixed(1)}%
                  </td>
                  <td className="px-4 py-2.5 text-right text-[#7d8590]">{fmt(d.총비용계획)}</td>
                  <td className="px-4 py-2.5 text-right text-[#e6edf3]">{fmt(d.총비용실적)}</td>
                  <td className="px-4 py-2.5 text-right text-[#7d8590]">{fmt(d.손익계획)}</td>
                  <td className={`px-4 py-2.5 text-right font-semibold ${d.손익실적 >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                    {fmt(d.손익실적)}
                  </td>
                  <td className={`px-4 py-2.5 text-right text-xs font-semibold ${diff >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                    {diff > 0 ? '+' : ''}{fmt(diff)}
                  </td>
                </tr>
              );
            })}
            {/* 합계 행 */}
            <tr className="bg-[#1c2128] border-t border-[#30363d]">
              <td className="px-4 py-2.5 font-bold text-[#e6edf3]">합계</td>
              <td className="px-4 py-2.5 text-right text-[#7d8590] font-semibold">{fmt(totals.매출계획)}</td>
              <td className="px-4 py-2.5 text-right text-[#e6edf3] font-semibold">{fmt(totals.매출실적)}</td>
              <td className="px-4 py-2.5 text-right text-xs font-bold" style={{ color: pctColor(totals.매출실적, totals.매출계획) }}>
                {totals.달성률.toFixed(1)}%
              </td>
              <td className="px-4 py-2.5 text-right text-[#7d8590] font-semibold">{fmt(totals.총비용계획)}</td>
              <td className="px-4 py-2.5 text-right text-[#e6edf3] font-semibold">{fmt(totals.총비용실적)}</td>
              <td className="px-4 py-2.5 text-right text-[#7d8590] font-semibold">{fmt(totals.손익계획)}</td>
              <td className={`px-4 py-2.5 text-right font-bold ${totals.손익실적 >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                {fmt(totals.손익실적)}
              </td>
              <td className={`px-4 py-2.5 text-right text-xs font-bold ${(totals.손익실적 - totals.손익계획) >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                {(totals.손익실적 - totals.손익계획) > 0 ? '+' : ''}{fmt(totals.손익실적 - totals.손익계획)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
