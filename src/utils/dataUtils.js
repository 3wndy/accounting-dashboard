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

export function downloadSampleCSV() {
  const blob = new Blob([SAMPLE_CSV], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sample_accounting.csv';
  a.click();
  URL.revokeObjectURL(url);
}
