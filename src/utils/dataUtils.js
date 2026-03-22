export const SAMPLE_CSV = `분기,매출계획,매출실적,고정비계획,고정비실적,매입비계획,매입비실적,영업수수료계획,영업수수료실적,omp수수료계획,omp수수료실적
Q1,130,138,56,58,28,31,12,13,8,9
Q2,145,148,60,61,31,33,14,14,9,10
Q3,155,150,62,63,33,32,15,14,10,10
Q4,170,182,65,68,36,40,16,17,11,12`;

export function parseCSVData(rows) {
  return rows.map((row) => ({
    분기: row['분기'],
    매출계획: parseFloat(row['매출계획']) || 0,
    매출실적: parseFloat(row['매출실적']) || 0,
    고정비계획: parseFloat(row['고정비계획']) || 0,
    고정비실적: parseFloat(row['고정비실적']) || 0,
    매입비계획: parseFloat(row['매입비계획']) || 0,
    매입비실적: parseFloat(row['매입비실적']) || 0,
    영업수수료계획: parseFloat(row['영업수수료계획']) || 0,
    영업수수료실적: parseFloat(row['영업수수료실적']) || 0,
    omp수수료계획: parseFloat(row['omp수수료계획']) || 0,
    omp수수료실적: parseFloat(row['omp수수료실적']) || 0,
  }));
}

export function filterData(data, tab) {
  if (tab === '연간') return data;
  return data.filter((d) => d.분기 === tab);
}

export function aggregateData(data) {
  const sum = (key) => data.reduce((acc, d) => acc + (d[key] || 0), 0);
  return {
    분기: '합계',
    매출계획: sum('매출계획'),
    매출실적: sum('매출실적'),
    고정비계획: sum('고정비계획'),
    고정비실적: sum('고정비실적'),
    매입비계획: sum('매입비계획'),
    매입비실적: sum('매입비실적'),
    영업수수료계획: sum('영업수수료계획'),
    영업수수료실적: sum('영업수수료실적'),
    omp수수료계획: sum('omp수수료계획'),
    omp수수료실적: sum('omp수수료실적'),
  };
}

export function calcKPIs(agg) {
  const 변동비계획 = agg.매입비계획 + agg.영업수수료계획 + agg.omp수수료계획;
  const 변동비실적 = agg.매입비실적 + agg.영업수수료실적 + agg.omp수수료실적;
  const 총비용계획 = agg.고정비계획 + 변동비계획;
  const 총비용실적 = agg.고정비실적 + 변동비실적;
  const 영업이익계획 = agg.매출계획 - 총비용계획;
  const 영업이익실적 = agg.매출실적 - 총비용실적;
  const 달성률 = agg.매출계획 > 0 ? (agg.매출실적 / agg.매출계획) * 100 : 0;

  return {
    매출실적: agg.매출실적,
    매출계획: agg.매출계획,
    달성률,
    매출연계비용실적: 변동비실적,
    매출연계비용계획: 변동비계획,
    영업이익실적,
    영업이익계획,
  };
}

// ── 프로젝트별 매출/비용/손익 샘플 데이터 ──────────────────────────────────
export const PROJECT_PL_DATA = [
  {
    프로젝트: '서비스',
    매출계획: 250, 매출실적: 268,
    직접비계획: 120, 직접비실적: 135,
    인건비계획: 80,  인건비실적: 90,
    간접비계획: 20,  간접비실적: 22,
  },
  {
    프로젝트: '오피스',
    매출계획: 150, 매출실적: 145,
    직접비계획: 60,  직접비실적: 58,
    인건비계획: 50,  인건비실적: 48,
    간접비계획: 15,  간접비실적: 14,
  },
  {
    프로젝트: '협업',
    매출계획: 120,  매출실적: 130,
    직접비계획: 45,  직접비실적: 48,
    인건비계획: 38,  인건비실적: 40,
    간접비계획: 12,  간접비실적: 13,
  },
  {
    프로젝트: '보안',
    매출계획: 80,  매출실적: 75,
    직접비계획: 28,  직접비실적: 27,
    인건비계획: 24,  인건비실적: 23,
    간접비계획: 8,   간접비실적: 8,
  },
];

// ── 프로젝트별 인력 투입 현황 샘플 데이터 (단위: MM) ────────────────────────
export const PROJECT_WORKFORCE_DATA = [
  {
    프로젝트: '서비스',
    Q1계획: 10, Q1실적: 12,
    Q2계획: 10, Q2실적: 12,
    Q3계획: 10, Q3실적: 11,
    Q4계획: 10, Q4실적: 10,
  },
  {
    프로젝트: '오피스',
    Q1계획: 7,  Q1실적: 6,
    Q2계획: 6,  Q2실적: 6,
    Q3계획: 6,  Q3실적: 5,
    Q4계획: 6,  Q4실적: 5,
  },
  {
    프로젝트: '협업',
    Q1계획: 6,  Q1실적: 6,
    Q2계획: 6,  Q2실적: 7,
    Q3계획: 5,  Q3실적: 6,
    Q4계획: 5,  Q4실적: 5,
  },
  {
    프로젝트: '보안',
    Q1계획: 4,  Q1실적: 3,
    Q2계획: 4,  Q2실적: 4,
    Q3계획: 4,  Q3실적: 4,
    Q4계획: 4,  Q4실적: 3,
  },
];

export function downloadSampleCSV() {
  const blob = new Blob([SAMPLE_CSV], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sample_accounting.csv';
  a.click();
  URL.revokeObjectURL(url);
}
