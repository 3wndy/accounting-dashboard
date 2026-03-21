import { useRef } from 'react';
import Papa from 'papaparse';
import { parseCSVData, downloadSampleCSV } from '../utils/dataUtils';

export default function FileUpload({ onDataLoad }) {
  const inputRef = useRef(null);

  function handleFile(file) {
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = parseCSVData(results.data);
        onDataLoad(parsed);
      },
    });
  }

  function handleChange(e) {
    handleFile(e.target.files[0]);
    e.target.value = '';
  }

  return (
    <div className="flex items-center gap-3">
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleChange}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        CSV 업로드
      </button>
      <button
        onClick={downloadSampleCSV}
        className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#333] text-gray-300 rounded-lg text-sm font-semibold hover:border-gray-500 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        샘플 CSV
      </button>
    </div>
  );
}
