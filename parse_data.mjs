import fs from 'fs';
import * as cheerio from 'cheerio';

async function main() {
    const html = fs.readFileSync('data.txt', 'utf-8');
    const $ = cheerio.load(html);

    let currentMonthTitle = '';
    const tablesData = [];
    let currentTable = null;

    $('p, table').each((i, el) => {
        if (el.tagName === 'p') {
            const text = $(el).text().replace(/\s+/g, ' ').trim();
            if (text.includes('2026년') && text.includes('일정')) {
                currentMonthTitle = text;
                currentTable = {
                    id: Math.random().toString(36).substr(2, 9),
                    title: currentMonthTitle,
                    rows: []
                };
                tablesData.push(currentTable);
            }
        } else if (el.tagName === 'table') {
            if (!currentTable) return;

            $(el).find('tr').each((j, tr) => {
                const tds = $(tr).find('td');
                if (tds.length >= 4) {
                    let dateText = $(tds[0]).text().trim();
                    let timeText = $(tds[1]).text().trim();
                    let titleText = $(tds[2]).text().trim();
                    let deptText = $(tds[3]).text().trim();
                    
                    // Skip headers
                    if (dateText.includes('날짜') || timeText.includes('기간') || titleText.includes('제 목') || titleText.includes('제목')) {
                        return;
                    }
                    if (!timeText && !titleText) {
                        return; // empty row
                    }

                    // parse invisible chars
                    dateText = dateText.replace(/[\u00A0\u3000]/g, '').trim();
                    if (!(/[0-9]/.test(dateText))) {
                        dateText = '';
                    }

                    timeText = timeText.replace(/[\u00A0\u200b]/g, ' ').trim();
                    titleText = titleText.replace(/[\u00A0\u200b]/g, ' ').trim();
                    deptText = deptText.replace(/[\u00A0\u200b]/g, ' ').trim();

                    currentTable.rows.push({
                        id: Math.random().toString(36).substr(2, 9),
                        date: dateText,
                        time: timeText,
                        title: titleText,
                        dept: deptText
                    });
                }
            });
        }
    });

    console.log(`Parsed ${tablesData.length} months data:`);
    for (const t of tablesData) {
        console.log(`- ${t.title}: ${t.rows.length} rows`);
    }

    try {
        const response = await fetch('https://prokworldmap-default-rtdb.asia-southeast1.firebasedatabase.app/shared_schedule_editor/data.json', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tablesData)
        });
        
        if (response.ok) {
            console.log('Successfully uploaded to Firebase!');
        } else {
            console.error('Failed to upload:', await response.text());
        }
    } catch (e) {
        console.error('Network error during upload:', e);
    }
}

main();
