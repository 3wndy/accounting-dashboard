const TABS = ['연간', 'Q1', 'Q2', 'Q3', 'Q4'];

export default function TabFilter({ active, onChange }) {
  return (
    <div className="flex gap-1 bg-[#161b22] border border-[#21262d] rounded-xl p-1 w-fit">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            active === tab
              ? 'bg-[#21262d] text-[#e6edf3] shadow-sm'
              : 'text-[#7d8590] hover:text-[#adbac7]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
