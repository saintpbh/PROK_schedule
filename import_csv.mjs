/**
 * import_csv.mjs
 * CSV 파일(2026총회일정.CSV)을 파싱하여 Firebase RTDB에 업로드합니다.
 * - EUC-KR 인코딩 처리
 * - 월별 그룹핑
 * - 기존 데이터와 병합 (기존 월 데이터는 유지, 새 월만 추가 또는 기존 월 일정 append)
 */

import fs from 'fs';
import iconv from 'iconv-lite';

// ─── CSV 파싱 ───────────────────────────────────────────────────────────────
const csvBuf = fs.readFileSync('./2026총회일정.CSV');
// Try EUC-KR first, then UTF-8
let csvText;
try {
  csvText = iconv.decode(csvBuf, 'euc-kr');
} catch {
  csvText = csvBuf.toString('utf8');
}

// Simple CSV line parser (handles quoted fields with commas)
function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current.trim());
  return fields;
}

const lines = csvText.split(/\r?\n/).filter(l => l.trim() !== '');

// ─── 행 데이터 구조화 ────────────────────────────────────────────────────────
const allRows = [];
let rowCounter = 0;

for (const line of lines) {
  const [date, time, titleRaw, deptRaw] = parseCSVLine(line);
  
  // Clean title: remove leading '?' character
  let title = (titleRaw || '').replace(/^\?/, '').trim();
  let dept = (deptRaw || '').trim();
  let timeClean = (time || '').trim();
  
  if (!title && !timeClean) continue; // skip empty lines
  
  rowCounter++;
  allRows.push({
    id: `csv_${rowCounter}_${Math.random().toString(36).substr(2, 5)}`,
    date: (date || '').trim(),
    time: timeClean,
    title,
    dept
  });
}

// ─── 월별 그룹핑 ────────────────────────────────────────────────────────────
const monthGroups = {};
let currentMonth = null;

for (const row of allRows) {
  // Determine month from date field
  if (row.date) {
    const monthMatch = row.date.match(/^(\d{1,2})\./);
    if (monthMatch) {
      currentMonth = parseInt(monthMatch[1], 10);
    }
  }
  
  if (currentMonth === null) continue;
  
  if (!monthGroups[currentMonth]) {
    monthGroups[currentMonth] = [];
  }
  monthGroups[currentMonth].push(row);
}

// ─── Firebase 형식으로 변환 ──────────────────────────────────────────────────
const monthNames = {
  1: '1월', 2: '2월', 3: '3월', 4: '4월', 5: '5월', 6: '6월',
  7: '7월', 8: '8월', 9: '9월', 10: '10월', 11: '11월', 12: '12월'
};

const tables = [];
const sortedMonths = Object.keys(monthGroups).map(Number).sort((a, b) => a - b);

for (const month of sortedMonths) {
  // 월이 1이면 다음 해(01이 마지막에 오는 경우)
  const year = month <= 4 ? 2026 : 2026; // 모두 2026년
  tables.push({
    id: `csv-${month < 10 ? '0' + month : month}-2026`,
    title: `2026년 ${monthNames[month]} 일정`,
    rows: monthGroups[month]
  });
}

// ─── JSON 출력 (Firebase에 업로드할 데이터) ──────────────────────────────────
const outputPath = './csv_schedule_data.json';
fs.writeFileSync(outputPath, JSON.stringify(tables, null, 2), 'utf8');

console.log(`✅ CSV 파싱 완료!`);
console.log(`   총 ${allRows.length}개 일정 항목`);
console.log(`   ${sortedMonths.length}개 월 데이터: ${sortedMonths.map(m => monthNames[m]).join(', ')}`);
console.log(`\n📁 출력 파일: ${outputPath}`);
console.log(`\n다음 단계: Firebase RTDB에 업로드합니다...`);

// ─── Firebase RTDB 직접 업로드 ──────────────────────────────────────────────
// Firebase REST API를 사용하여 업로드
const FIREBASE_DB_URL = 'https://prokworldmap-default-rtdb.asia-southeast1.firebasedatabase.app';
const SCHEDULE_PATH = '/shared_schedule_editor/data';

async function uploadToFirebase() {
  try {
    // 1. 기존 데이터 가져오기
    const getRes = await fetch(`${FIREBASE_DB_URL}${SCHEDULE_PATH}.json`);
    const existingData = await getRes.json();
    
    let merged;
    
    if (existingData && Array.isArray(existingData)) {
      // 기존 데이터가 있는 경우: 기존 월 ID 확인 후 병합
      const existingIds = new Set(existingData.map(t => t.id));
      
      // 새 월 데이터 중 기존에 없는 것만 추가
      const newTables = tables.filter(t => !existingIds.has(t.id));
      
      // 기존 데이터 중 CSV에서 업데이트할 것은 교체
      merged = existingData.map(existing => {
        const csvVersion = tables.find(t => t.id === existing.id);
        if (csvVersion) {
          // CSV 데이터로 교체 (rows 병합이 아닌 교체)
          return csvVersion;
        }
        return existing;
      });
      
      // 새로 추가될 월 데이터 append
      merged = [...merged, ...newTables];
      
      // 월 순서로 정렬
      merged.sort((a, b) => {
        const monthA = a.title.match(/(\d{1,2})월/);
        const monthB = b.title.match(/(\d{1,2})월/);
        if (monthA && monthB) return parseInt(monthA[1]) - parseInt(monthB[1]);
        return 0;
      });
      
    } else {
      // 기존 데이터가 없으면 새 데이터 그대로
      merged = tables;
    }
    
    // 2. Firebase에 업로드
    const putRes = await fetch(`${FIREBASE_DB_URL}${SCHEDULE_PATH}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(merged)
    });
    
    if (putRes.ok) {
      console.log(`\n🎉 Firebase 업로드 성공!`);
      console.log(`   총 ${merged.length}개 월 일정이 저장되었습니다.`);
    } else {
      const errText = await putRes.text();
      console.error(`❌ Firebase 업로드 실패: ${putRes.status}`, errText);
    }
  } catch (err) {
    console.error('❌ 에러:', err.message);
  }
}

uploadToFirebase();
