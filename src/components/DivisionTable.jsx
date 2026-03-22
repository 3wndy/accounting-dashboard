function fmt(v) {
  return typeof v === 'number' ? v.toFixed(1) : '-';
}

function pct(actual, plan) {
  if (!plan) return '-';
  const v = (actual / plan) * 100;
  return (
    <span className={v >= 100 ? 'text-[#3fb950] font-semibold' : 'text-[#f85149] font-semibold'}>
      {v.toFixed(1)}%
    </span>
  );
}

export default function DivisionTable({ data }) {
  const totals = data.reduce(
    (acc, d) => {
      acc.매출계획 += d.매출계획;
      acc.매출실적 += d.매출실적;
      acc.고정비계획 += d.고정비계획;
      acc.고정비실적 += d.고정비실적;
      acc.매입비계획 += d.매입비계획;
      acc.매입비실적 += d.매입비실적;
      acc.영업수수료계획 += d.영업수수료계획;
      acc.영업수수료실적 += d.영업수수료실적;
      acc.omp수수료계획 += d.omp수수료계획;
      acc.omp수수료실적 += d.omp수수료실적;
      return acc;
    },
    {
      매출계획: 0, 매출실적: 0, 고정비계획: 0, 고정비실적: 0,
      매입비계획: 0, 매입비실적: 0, 영업수수료계획: 0, 영업수수료실적: 0,
      omp수수료계획: 0, omp수수료실적: 0,
    }
  );

  const rows = [...data, { 분기: '합계', ...totals }];

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#21262d]">
        <h3 className="text-sm font-semibold text-[#8b949e]">분기별 현황</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#21262d]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#484f58] uppercase tracking-wider">분기</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[#484f58]">매출계획</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[#484f58]">매출실적</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[#484f58]">달성률</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[#484f58]">고정비</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[#484f58]">매입비</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[#484f58]">수수료</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[#484f58]">영업이익</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#21262d]">
            {rows.map((d, i) => {
              const isTotal = d.분기 === '합계';
              const 수수료실적 = d.영업수수료실적 + d.omp수수료실적;
              const 총비용실적 = d.고정비실적 + d.매입비실적 + 수수료실적;
              const 영업이익 = d.매출실적 - 총비용실적;
              return (
                <tr
                  key={i}
                  className={
                    isTotal
                      ? 'bg-[#1c2128] border-t border-[#30363d]'
                      : 'hover:bg-[#1c2128] transition-colors'
                  }
                >
                  <td className={`px-4 py-2.5 font-semibold ${isTotal ? 'text-[#e6edf3]' : 'text-[#adbac7]'}`}>
                    {d.분기}
                  </td>
                  <td className="px-4 py-2.5 text-right text-[#7d8590]">{fmt(d.매출계획)}</td>
                  <td className="px-4 py-2.5 text-right text-[#e6edf3]">{fmt(d.매출실적)}</td>
                  <td className="px-4 py-2.5 text-right">{pct(d.매출실적, d.매출계획)}</td>
                  <td className="px-4 py-2.5 text-right text-[#7d8590]">{fmt(d.고정비실적)}</td>
                  <td className="px-4 py-2.5 text-right text-[#7d8590]">{fmt(d.매입비실적)}</td>
                  <td className="px-4 py-2.5 text-right text-[#7d8590]">{fmt(수수료실적)}</td>
                  <td className={`px-4 py-2.5 text-right font-semibold ${영업이익 >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                    {fmt(영업이익)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
