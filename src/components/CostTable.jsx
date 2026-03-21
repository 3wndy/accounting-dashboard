function fmt(v) {
  return typeof v === 'number' ? v.toFixed(1) : '-';
}

function DiffCell({ plan, actual }) {
  const diff = actual - plan;
  const isOver = diff > 0;
  return (
    <td className={`px-4 py-2.5 text-right text-xs font-semibold ${isOver ? 'text-red-400' : 'text-emerald-400'}`}>
      {diff > 0 ? '+' : ''}{fmt(diff)}
    </td>
  );
}

function Row({ label, planKey, actualKey, data, highlight }) {
  const plan = data[planKey] || 0;
  const actual = data[actualKey] || 0;
  return (
    <tr className={highlight ? 'bg-[#222]' : 'hover:bg-[#1f1f1f] transition-colors'}>
      <td className="px-4 py-2.5 text-sm text-gray-300 font-medium">{label}</td>
      <td className="px-4 py-2.5 text-right text-sm text-gray-400">{fmt(plan)}</td>
      <td className="px-4 py-2.5 text-right text-sm text-white">{fmt(actual)}</td>
      <DiffCell plan={plan} actual={actual} />
      <td className="px-4 py-2.5 text-right text-sm text-gray-500">
        {plan > 0 ? ((actual / plan) * 100).toFixed(1) + '%' : '-'}
      </td>
    </tr>
  );
}

export default function CostTable({ data }) {
  const 변동비계획 = data.매입비계획 + data.영업수수료계획 + data.omp수수료계획;
  const 변동비실적 = data.매입비실적 + data.영업수수료실적 + data.omp수수료실적;
  const 총비용계획 = data.고정비계획 + 변동비계획;
  const 총비용실적 = data.고정비실적 + 변동비실적;

  const enriched = {
    ...data,
    변동비계획,
    변동비실적,
    총비용계획,
    총비용실적,
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-[#2a2a2a]">
        <h3 className="text-sm font-semibold text-gray-300">비용 상세 내역</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2a]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">항목</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">계획 (억원)</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">실적 (억원)</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">차이</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">달성률</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222]">
            <Row label="매입비" planKey="매입비계획" actualKey="매입비실적" data={enriched} />
            <Row label="영업수수료" planKey="영업수수료계획" actualKey="영업수수료실적" data={enriched} />
            <Row label="OMP수수료" planKey="omp수수료계획" actualKey="omp수수료실적" data={enriched} />
            <Row label="변동비 소계" planKey="변동비계획" actualKey="변동비실적" data={enriched} highlight />
            <Row label="고정비" planKey="고정비계획" actualKey="고정비실적" data={enriched} />
            <Row label="총비용" planKey="총비용계획" actualKey="총비용실적" data={enriched} highlight />
          </tbody>
        </table>
      </div>
    </div>
  );
}
