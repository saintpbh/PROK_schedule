import fs from 'fs';

let content = fs.readFileSync('index.html', 'utf8');

// --- 1. Tailwind Config & Dark Mode Initial Setup ---
content = content.replace(
  '<script src="https://cdn.tailwindcss.com"></script>',
  `<script src="https://cdn.tailwindcss.com"></script>
  <script>tailwind.config = { darkMode: 'class' };</script>
  <style>
    .dark body { background-color: #0f172a; }
    .dark .bg-white { background-color: #1e293b !important; color: #f8fafc; border-color: #334155; }
    .dark .text-slate-800 { color: #f1f5f9 !important; }
    .dark .text-slate-700 { color: #f1f5f9 !important; }
    .dark .text-slate-600 { color: #cbd5e1 !important; }
    .dark .text-slate-500 { color: #94a3b8 !important; }
    .dark .border-slate-200 { border-color: #334155 !important; }
    .dark .bg-slate-50 { background-color: #0f172a !important; }
    .dark input { background-color: #0f172a !important; color: #f8fafc !important; border-color: #334155 !important; }
    .dark .glass-panel { background: rgba(30, 41, 59, 0.8) !important; border-color: #334155 !important; }
  </style>`
);

// --- 2. Add React States & Toast ---
content = content.replace(
  'function App() {',
  `function App() {
      // ===== 🎯 UX Upgrades =====
      const [toasts, setToasts] = useState([]);
      const [darkMode, setDarkMode] = useState(false);
      const [dragOverRowInfo, setDragOverRowInfo] = useState(null);
      const [displayMode, setDisplayMode] = useState('list');
      
      const addToast = (message, type = 'success') => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
      };

      React.useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      }, [darkMode]);
`
);

// Replace alert with addToast safely
content = content.replace(/alert\(`/g, 'addToast(`');
content = content.replace(/alert\('/g, "addToast('");
// Convert specific toasts to error
content = content.replace(/addToast\((.*?)(실패|오류|필수|없습니다)(.*?)\)/g, "addToast($1$2$3, 'error')");

// Add Toast Container to DOM
content = content.replace(
  /<datalist id="title-suggestions">/,
  `
            {/* Toast Container */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
              {toasts.map(toast => (
                <div key={toast.id} className={\`font-medium text-sm px-6 py-3 rounded-full flex items-center gap-3 shadow-xl transition-all animate-fade-in \${toast.type === 'error' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-white'}\`}>
                  <i className={\`fa-solid \${toast.type === 'error' ? 'fa-circle-exclamation' : 'fa-check'}\`}></i>
                  {toast.message}
                </div>
              ))}
            </div>
            <datalist id="title-suggestions">`
);

// --- 3. Dark Mode Toggle ---
content = content.replace(
  /<button onClick=\{downloadCsv\} /g,
  `<button onClick={() => setDarkMode(!darkMode)} title="다크모드 전환" className="p-2 sm:px-4 sm:py-2 flex items-center justify-center space-x-1.5 sm:space-x-2 bg-slate-800/50 hover:bg-slate-800/80 transition-all rounded-lg sm:rounded-full border border-white/10 group backdrop-blur-sm mr-2 text-white">
            <i className={\`fa-solid \${darkMode ? 'fa-sun text-yellow-300' : 'fa-moon text-indigo-300'}\`}></i>
            <span className="text-[13px] font-medium hidden sm:inline">{darkMode ? '라이트 모드' : '다크 모드'}</span>
   </button>
   <button onClick={downloadCsv} `
);

// --- 4. Filter Chips ---
// Apply dark mode styles to the search input
content = content.replace(
  /className="w-full pl-12 pr-4 py-3\.5 bg-white border border-slate-200 shadow-sm rounded-2xl text-\[15px\] focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium text-slate-700"/,
  `className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 shadow-sm rounded-2xl text-[15px] focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-white"`
);

// Insert filter chips above the fixed control panel
content = content.replace(
  /<\/div>\s*<div className="flex flex-col lg:flex-row gap-8 items-start relative pb-10">/,
  `</div>
                    {/* Filter Chips */}
                    <div className="flex flex-wrap gap-2 mb-8 justify-center animate-fade-in mx-auto w-full max-w-2xl">
                      {['전체', '총회장', '총무', '교육국', '국내선교', '해외선교', '사회봉사', '선교동역자'].map(chip => (
                        <button 
                          key={chip}
                          onClick={() => setSearchQuery(chip === '전체' ? '' : chip)}
                          className={\`px-4 py-1.5 rounded-full text-sm font-medium transition-all shadow-sm border \${searchQuery === chip || (chip === '전체' && !searchQuery) ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}\`}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8 items-start relative pb-10">`
);

// --- 5. Mobile Responsive & Drag & Drop & Sticky Header ---
content = content.replace(
  /<table className="w-full text-left min-w-\[700px\]">/g,
  `<table className="w-full text-left md:min-w-[700px] block md:table">`
);
content = content.replace(
  /<thead className="bg-slate-50 border-b border-slate-200">/g,
  `<thead className="bg-slate-50 border-b border-slate-200 hidden md:table-header-group sticky top-0 z-10 dark:bg-slate-800 dark:border-slate-700 shadow-sm">`
);
content = content.replace(
  /<tbody className="divide-y divide-slate-100">/g,
  `<tbody className="divide-y divide-slate-100 block md:table-row-group dark:divide-slate-700">`
);
content = content.replace(
  /<tr key=\{row\.id\} id=\{\`row-\$\{row\.id\}\`\} className="group hover:bg-blue-50\/30 transition-colors">/g,
  `<tr 
    key={row.id} 
    id={\`row-\${row.id}\`} 
    className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/40 transition-colors block md:table-row bg-white dark:bg-slate-800 mb-4 md:mb-0 rounded-xl shadow-sm md:shadow-none border border-slate-200 md:border-none p-3 md:p-0 relative"
    draggable="true"
    onDragStart={(e) => { e.dataTransfer.setData('text/plain', JSON.stringify({tableId: table.id, rowIdx: i})); e.target.classList.add('opacity-50'); }}
    onDragEnd={(e) => { e.target.classList.remove('opacity-50'); setDragOverRowInfo(null); }}
    onDragOver={(e) => { e.preventDefault(); setDragOverRowInfo({tableId: table.id, rowIdx: i}); }}
    onDrop={(e) => { 
      e.preventDefault(); 
      try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        if(data.tableId === table.id && data.rowIdx !== i) {
          const rows = [...table.rows];
          const [moved] = rows.splice(data.rowIdx, 1);
          rows.splice(i, 0, moved);
          setTables(tables.map(t => t.id === table.id ? {...t, rows} : t));
          dataChanged.current = true;
          addToast('순서가 변경되었습니다.', 'success');
        }
      } catch(err){}
      setDragOverRowInfo(null);
    }}
    style={{ borderTop: dragOverRowInfo?.tableId === table.id && dragOverRowInfo?.rowIdx === i ? '3px dashed #3b82f6' : '' }}
  >`
);

content = content.replace(
  /<td className="p-2 w-28">(\s*)<input value=\{row.date\}/g,
  `<td className="block md:table-cell px-2 py-2 w-full md:w-28 relative"><div className="md:hidden text-xs font-bold text-slate-400 mb-1">날짜</div>$1<input value={row.date}`
);
content = content.replace(
  /<td className="p-2 w-48 relative">(\s*)<input id=\{\`time-input-\$\{row.id\}\`\}/g,
  `<td className="block md:table-cell px-2 py-2 w-full md:w-48 relative"><div className="md:hidden text-xs font-bold text-slate-400 mb-1">시간</div>$1<input id={\`time-input-\${row.id}\`}`
);
content = content.replace(
  /<td className="p-2">(\s*)<input list="title-suggestions" value=\{row.title\}/g,
  `<td className="block md:table-cell px-2 py-2 w-full relative"><div className="md:hidden text-xs font-bold text-slate-400 mb-1 mt-2">일정 제목</div>$1<input list="title-suggestions" value={row.title}`
);
content = content.replace(
  /<td className="p-2">(\s*)<input list="dept-suggestions" value=\{row.dept\}/g,
  `<td className="block md:table-cell px-2 py-2 w-full relative"><div className="md:hidden text-xs font-bold text-slate-400 mb-1 mt-2">담당 부서</div>$1<input list="dept-suggestions" value={row.dept}`
);
content = content.replace(
  /<td className="p-2">(\s*)<div className="flex justify-center/g,
  `<td className="block md:table-cell px-2 py-2 w-full relative border-t md:border-t-0 mt-3 md:mt-0 pt-3 md:pt-2 border-slate-100">$1<div className="flex justify-center md:opacity-20 group-hover:opacity-100 transition-opacity"`
);

// Fix <div className="opacity-20 to md:opacity-20 inside the actions TD
content = content.replace(
  /className="flex justify-center gap-0\.5 opacity-20/g,
  `className="flex justify-center gap-0.5 md:opacity-20`
);

fs.writeFileSync('index.html', content);
console.log("Transformation completed. Check index.html");
