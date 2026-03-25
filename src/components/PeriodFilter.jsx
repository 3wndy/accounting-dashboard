const QUARTERS = ['연간', 'Q1', 'Q2', 'Q3', 'Q4'];
const MIN_YEAR = 2020;
const MAX_YEAR = 2030;

export default function PeriodFilter({ year, quarter, onYearChange, onQuarterChange }) {
  return (
    <div className="flex items-center gap-3">
      {/* Year selector */}
      <div className="flex items-center gap-1 bg-[#161b22] border border-[#21262d] rounded-xl px-3 py-1">
        <button
          onClick={() => onYearChange(Math.max(MIN_YEAR, year - 1))}
          disabled={year <= MIN_YEAR}
          className="w-6 h-6 flex items-center justify-center text-[#7d8590] hover:text-[#e6edf3] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-[#e6edf3] w-12 text-center">{year}</span>
        <button
          onClick={() => onYearChange(Math.min(MAX_YEAR, year + 1))}
          disabled={year >= MAX_YEAR}
          className="w-6 h-6 flex items-center justify-center text-[#7d8590] hover:text-[#e6edf3] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded"
        >
          ›
        </button>
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
