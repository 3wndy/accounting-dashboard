const TABS = ['연간', 'Q1', 'Q2', 'Q3', 'Q4'];

export default function TabFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-1 w-fit">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            active === tab
              ? 'bg-white text-black shadow'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
