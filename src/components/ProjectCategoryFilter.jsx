import { useState } from 'react';
import { PROJECT_CATEGORIES } from '../utils/dataUtils';

export default function ProjectCategoryFilter({ active, onChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (cat) => {
    onChange(cat);
    setOpen(false);
  };

  return (
    <div className="relative w-fit">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 bg-[#161b22] border border-[#21262d] rounded-xl px-3 py-1.5 text-sm font-semibold text-[#7d8590] hover:text-[#adbac7] transition-all duration-200"
      >
        <span>프로젝트 구분</span>
        {active !== '전체' && (
          <span className="text-[#58a6ff]">· {active}</span>
        )}
        <svg
          className={`w-3.5 h-3.5 ml-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 16 16" fill="currentColor"
        >
          <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-[#161b22] border border-[#21262d] rounded-xl p-1 flex gap-1 shadow-lg animate-slideDown min-w-max">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleSelect(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                active === cat
                  ? 'bg-[#21262d] text-[#e6edf3] shadow-sm'
                  : 'text-[#7d8590] hover:text-[#adbac7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
