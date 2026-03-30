const QUARTERS = ['연간', '분기'];
const YEARS = Array.from({ length: 11 }, (_, i) => 2020 + i);

export default function PeriodFilter({ startYear, endYear, quarter, onStartYearChange, onEndYearChange, onQuarterChange }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Range selector */}
      <div className="flex items-center gap-2 bg-[#161b22] border border-[#21262d] rounded-xl px-3 py-1.5">
        <span className="text-xs text-[#7d8590] font-medium mr-1">기간</span>
        <select
          value={startYear}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            onStartYearChange(val);
            if (val > endYear) onEndYearChange(val);
          }}
          className="bg-transparent text-[#e6edf3] text-sm font-semibold focus:outline-none cursor-pointer"
        >
          {YEARS.map((y) => (
            <option key={y} value={y} className="bg-[#161b22]">{y}년</option>
          ))}
        </select>
        <span className="text-[#484f58] text-xs font-semibold">~</span>
        <select
          value={endYear}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            onEndYearChange(val);
            if (val < startYear) onStartYearChange(val);
          }}
          className="bg-transparent text-[#e6edf3] text-sm font-semibold focus:outline-none cursor-pointer"
        >
          {YEARS.map((y) => (
            <option key={y} value={y} className="bg-[#161b22]">{y}년</option>
          ))}
        </select>
      </div>

      {/* Quarter selector */}
      <div className="flex gap-1 bg-[#161b22] border border-[#21262d] rounded-xl p-1">
        {QUARTERS.map((q) => (
          <button
            key={q}
            onClick={() => onQuarterChange(q)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              quarter === q
                ? 'bg-[#21262d] text-[#e6edf3] shadow-sm'
                : 'text-[#7d8590] hover:text-[#adbac7]'
            }`}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
