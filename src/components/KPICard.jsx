export default function KPICard({ title, value, sub, positive, unit = '억원', badge }) {
  const isPositive = positive === true;
  const isNegative = positive === false;

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 flex flex-col gap-2 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">{title}</span>
        {badge && (
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isPositive
                ? 'bg-emerald-900/40 text-emerald-400'
                : isNegative
                ? 'bg-red-900/40 text-red-400'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <div
        className={`text-3xl font-bold ${
          isPositive ? 'text-emerald-400' : isNegative ? 'text-red-400' : 'text-white'
        }`}
      >
        {typeof value === 'number' ? value.toFixed(1) : value}
        <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>
      </div>
      {sub && <div className="text-xs text-gray-500">{sub}</div>}
    </div>
  );
}
