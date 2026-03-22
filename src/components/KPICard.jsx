export default function KPICard({ title, value, sub, positive, unit = '억원', badge }) {
  const isPositive = positive === true;
  const isNegative = positive === false;

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#7d8590] font-medium tracking-wide uppercase">{title}</span>
        {badge && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
              isPositive
                ? 'bg-[#1a3a2a] text-[#3fb950]'
                : isNegative
                ? 'bg-[#3a1a1a] text-[#f85149]'
                : 'bg-[#21262d] text-[#8b949e]'
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <div
        className={`text-3xl font-bold ${
          isPositive ? 'text-[#3fb950]' : isNegative ? 'text-[#f85149]' : 'text-[#e6edf3]'
        }`}
      >
        {typeof value === 'number' ? value.toFixed(1) : value}
        <span className="text-sm font-normal text-[#7d8590] ml-1">{unit}</span>
      </div>
      {sub && <div className="text-xs text-[#484f58]">{sub}</div>}
    </div>
  );
}
