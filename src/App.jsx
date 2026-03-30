import { useState } from 'react';
import Papa from 'papaparse';
import { SAMPLE_CSV, parseCSVData, filterByRange, buildChartRows, aggregateData, calcKPIs } from './utils/dataUtils';
import KPICard from './components/KPICard';
import PeriodFilter from './components/PeriodFilter';
import FileUpload from './components/FileUpload';
import SalesChart from './components/charts/SalesChart';
import CostStructureChart from './components/charts/CostStructureChart';
import LinkedCostChart from './components/charts/LinkedCostChart';
import ProfitChart from './components/charts/ProfitChart';
import CostTable from './components/CostTable';
import DivisionTable from './components/DivisionTable';
import ProjectProfitTable from './components/ProjectProfitTable';
import ProjectWorkforceChart from './components/ProjectWorkforceChart';

function loadDefaultData() {
  const result = Papa.parse(SAMPLE_CSV, { header: true, skipEmptyLines: true });
  return parseCSVData(result.data);
}

export default function App() {
  const [allData, setAllData] = useState(loadDefaultData);
  const [startYear, setStartYear] = useState(2024);
  const [endYear, setEndYear] = useState(2026);
  const [activeQuarter, setActiveQuarter] = useState('연간');

  const rangeData = filterByRange(allData, startYear, endYear);
  // KPI 집계: 연간=전체합산, 분기=모든 분기 합산(동일)
  const rangeFiltered = rangeData;
  const rangeAgg = aggregateData(rangeFiltered);
  const kpis = calcKPIs(rangeAgg);

  const chartRows = buildChartRows(rangeData, activeQuarter);

  const salesPositive = kpis.달성률 >= 100;
  const costPositive = kpis.매출연계비용실적 <= kpis.매출연계비용계획;
  const profitPositive = kpis.영업이익실적 >= kpis.영업이익계획;

  const periodLabel = startYear === endYear
    ? `${startYear}년`
    : `${startYear}년 ~ ${endYear}년`;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      {/* Header */}
      <header className="border-b border-[#21262d] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">관리회계 대시보드</h1>
          <p className="text-xs text-[#7d8590] mt-0.5">Management Accounting Dashboard · 단위: 억원</p>
        </div>
        <FileUpload onDataLoad={setAllData} />
      </header>

      {/* Sticky Period Filter Bar */}
      <div className="sticky top-0 z-30 bg-[#0d1117]/90 backdrop-blur-sm border-b border-[#21262d] px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <PeriodFilter
            startYear={startYear}
            endYear={endYear}
            quarter={activeQuarter}
            onStartYearChange={setStartYear}
            onEndYearChange={setEndYear}
            onQuarterChange={setActiveQuarter}
          />
          <span className="text-xs text-[#484f58]">
            {periodLabel} · {activeQuarter === '연간' ? '전체 분기 합산' : '분기 단독 현황'}
          </span>
        </div>
      </div>

      <main className="px-6 py-6 space-y-6 max-w-[1600px] mx-auto">

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="매출 실적"
            value={kpis.매출실적}
            sub={`계획 ${kpis.매출계획.toFixed(1)}억원`}
            positive={salesPositive}
            badge={`${kpis.달성률.toFixed(1)}%`}
          />
          <KPICard
            title="매출 달성률"
            value={kpis.달성률.toFixed(1)}
            unit="%"
            sub={`목표 100%`}
            positive={salesPositive}
          />
          <KPICard
            title="매출 연계 비용"
            value={kpis.매출연계비용실적}
            sub={`계획 ${kpis.매출연계비용계획.toFixed(1)}억원`}
            positive={costPositive}
            badge={costPositive ? '절감' : '초과'}
          />
          <KPICard
            title="영업이익"
            value={kpis.영업이익실적}
            sub={`계획 ${kpis.영업이익계획.toFixed(1)}억원`}
            positive={profitPositive}
            badge={profitPositive ? '달성' : '미달'}
          />
        </div>

        {/* Charts - 2x2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SalesChart data={chartRows} />
          <CostStructureChart data={chartRows} />
          <LinkedCostChart data={chartRows} />
          <ProfitChart data={chartRows} />
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CostTable data={rangeAgg} />
          <DivisionTable data={chartRows} />
        </div>

        {/* Project P&L Table */}
        <ProjectProfitTable />

        {/* Project Workforce */}
        <ProjectWorkforceChart />
      </main>
    </div>
  );
}
