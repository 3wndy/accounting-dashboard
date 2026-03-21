function fmt(v) {
  return typeof v === 'number' ? v.toFixed(1) : '-';
}

function pct(actual, plan) {
  if (!plan) return '-';
  const v = (actual / plan) * 100;
  return (
    <span className={v >= 100 ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
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
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-[#2a2a2a]">
        <h3 className="text-sm font-semibold text-gray-300">분기별 현황</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2a]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">분기</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">매출계획</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">매출실적</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">달성률</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">고정비</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">매입비</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">수수료</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">영업이익</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222]">
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
                      ? 'bg-[#222] border-t border-[#333]'
                      : 'hover:bg-[#1f1f1f] transition-colors'
                  }
                >
                  <td className={`px-4 py-2.5 font-semibold ${isTotal ? 'text-white' : 'text-gray-300'}`}>
                    {d.분기}
                  </td>
                  <td className="px-4 py-2.5 text-right text-gray-400">{fmt(d.매출계획)}</td>
                  <td className="px-4 py-2.5 text-right text-white">{fmt(d.매출실적)}</td>
                  <td className="px-4 py-2.5 text-right">{pct(d.매출실적, d.매출계획)}</td>
                  <td className="px-4 py-2.5 text-right text-gray-400">{fmt(d.고정비실적)}</td>
                  <td className="px-4 py-2.5 text-right text-gray-400">{fmt(d.매입비실적)}</td>
                  <td className="px-4 py-2.5 text-right text-gray-400">{fmt(수수료실적)}</td>
                  <td className={`px-4 py-2.5 text-right font-semibold ${영업이익 >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
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
