
const fs = require('fs');
const path = require('path');

const file = 'history_data.js';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

// Keep lines 1..1801 (0-indexed: 0..1800)
const keepLines = lines.slice(0, 1801);
const keepText = keepLines.join('\n');

const secretaryData = `  {
    "id": "1681_166852",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "\\"안티오키아에 세워지는 기장 마을\\"",
    "author": "김창주",
    "date": "2025-04-23",
    "url": "https://www.prok.org/Board/Detail/1681/166852",
    "content": "<div class=\\"detail-content\\"><p>안티오키아에 세워지는 기장 마을 관련 현장 방문 및 활동 기록입니다.</p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166852/WeqeuOuvuOq4sF0yMDI1MDQyM1nthLDtgqQg6rG07LaVICgxKS5qcGdkaW1vZGVfNDE5NzU1Nl9lbmMc.jpg\\" style=\\"max-width:100%\\" /></p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166852/WeqeuOuvuOq4sF0yMDI1MDQyM1nthLDtgqQg6rG07LaVICgyKS5qcGdkaW1vZGVfODc3Njg2NF9lbmMc.jpg\\" style=\\"max-width:100%\\" /></p><p class=\\"each-img\\"><img src=\\"https://data.dimode.co.kr/UserData/prok/data/geditor/2504/764337996_88b3454f_5BEABEB8EBAFB8EAB8B05DKakaoTalk_20250423_153449336_13.jpg\\" style=\\"max-width:100%\\" /></p></div>"
  },
  {
    "id": "1681_166849",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "아카데미하우스 공사 현장",
    "author": "김창주",
    "date": "2025-04-01",
    "url": "https://www.prok.org/Board/Detail/1681/166849",
    "content": "<div class=\\"detail-content\\"><p>아카데미하우스 공사 현장 방문 기록입니다. 공사 진행 상황을 확인하였습니다.</p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166849/MjAyNTA0MDFfMTExNDQ3LmpwZ2RpbW9kZV81OTExNTc2X2VuYwcc.jpg\\" style=\\"max-width:100%\\" /></p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166849/MjAyNTA0MDFfMTExMzIzLmpwZ2RpbW9kZV8zODkwNDEyX2VuYwcc.jpg\\" style=\\"max-width:100%\\" /></p></div>"
  },
  {
    "id": "1681_166847",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "대한기독교서회 이사회와 NCCK 정책협의회",
    "author": "김창주",
    "date": "2025-03-17",
    "url": "https://www.prok.org/Board/Detail/1681/166847",
    "content": "<div class=\\"detail-content\\"><p>대한기독교서회 이사회 및 NCCK 정책협의회에 참석하였습니다.</p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166847/MjAyNTAzMTdfMTY1MTIwLmpwZ2RpbW9kZV84NDUxMzg0X2VuYwcc.jpg\\" style=\\"max-width:100%\\" /></p></div>"
  },
  {
    "id": "1681_166845",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "서울북노회장님과 함께 미얀마장로교회 대표들을 만났습니다.",
    "author": "김창주",
    "date": "2025-03-13",
    "url": "https://www.prok.org/Board/Detail/1681/166845",
    "content": "<div class=\\"detail-content\\"><p>2021년 2월 1일 미얀마의 군부 쿠데타로 미얀마는 오늘까지 위기에 처해 있습니다. 서울북노회장님 일행과 함께 미얀마장로교회(PCM) 총무, 선교부총무, 청년국장과 만났습니다. 2003년 처음 미얀마 방문에 참여하였던 저에게는 의미있는 22년만의 방문이었습니다.</p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166845/MTc0MTgyNDQwNDMwOS5qcGdkaW1vZGVfNTE4MzA3Ml9lbmMc.jpg\\" style=\\"max-width:100%\\" /></p></div>"
  },
  {
    "id": "1681_166842",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "마다가스카르 방문 보고 (2025년 2월 3일~ 13일)",
    "author": "김창주",
    "date": "2025-02-03",
    "url": "https://www.prok.org/Board/Detail/1681/166842",
    "content": "<div class=\\"detail-content\\"><p>2025년 2월 3일(월)부터 13일까지 마다가스카르를 방문하여 현지 교회와의 협력 선교 활동을 진행하였습니다.</p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166842/MTczOTE2NDc4OTg2OC5qcGdkaW1vZGVfNDM3Mjc1OF9lbmMc.jpg\\" style=\\"max-width:100%\\" /></p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166842/MTczOTM1NDgzMDgxNC5qcGdkaW1vZGVfOTUzMzkyOV9lbmMc.jpg\\" style=\\"max-width:100%\\" /></p></div>"
  },
  {
    "id": "1681_166838",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "마다가스카르어-영어-한글 신약성서 출판, 제작, 기증 감사예배",
    "author": "김창주",
    "date": "2025-01-22",
    "url": "https://www.prok.org/Board/Detail/1681/166838",
    "content": "<div class=\\"detail-content\\"><p>마다가스카르어-영어-한글 신약성서의 출판, 제작, 기증 감사예배가 진행되었습니다.</p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166838/MTczNzUyNTM2NjQ0NS5qcGdkaW1vZGVfNTM1MDkzMF9lbmMc.jpg\\" style=\\"max-width:100%\\" /></p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166838/MTczNzUzMDkwOTg2Mi5qcGdkaW1vZGVfNTc3MzczM19lbmMc.jpg\\" style=\\"max-width:100%\\" /></p></div>"
  },
  {
    "id": "1681_166836",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "김호식 목사님 임종, 입관, 장례예배",
    "author": "김창주",
    "date": "2024-12-18",
    "url": "https://www.prok.org/Board/Detail/1681/166836",
    "content": "<div class=\\"detail-content\\"><p>우리 교단과 한국 교회의 큰 어른이신 김호식 목사께서 하나님의 부르심을 받으셨습니다. 연세대학 세브란스 장례식장과 예닮교회에서 엄숙히 천국으로 보내드렸습니다.</p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166836/MjAyNDEyMThfMjMyODI5LmpwZ2RpbW9kZV8yMTU0MTA5X2VuYwcc.jpg\\" style=\\"max-width:100%\\" /></p></div>"
  },
  {
    "id": "1681_166835",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "한국기독교장로회 비상시국기도회",
    "author": "김창주",
    "date": "2024-12-12",
    "url": "https://www.prok.org/Board/Detail/1681/166835",
    "content": "<div class=\\"detail-content\\"><p>지난 12월 3일, 윤석열 대통령의 비상계엄선포로 시작된 온 국민의 불안과 분노가 극에 달했습니다. 이에 우리 교단은 12월 12일(목) 오후 2시 국회 앞에서 긴급비상기도회를 개최하였습니다. 전국에서 많은 목사님과 성도님들이 참석하였습니다.</p></div>"
  },
  {
    "id": "1681_166831",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "한국그리스도인 일치순례 생명과 평화의 길 참석",
    "author": "김창주",
    "date": "2024-11-14",
    "url": "https://www.prok.org/Board/Detail/1681/166831",
    "content": "<div class=\\"detail-content\\"><p>한국그리스도인 일치순례 생명과 평화의 길에 참석하였습니다.</p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166831/MTczMjg2NTk2MTI3OC5qcGdkaW1vZGVfNzA0ODU5MF9lbmMc.jpg\\" style=\\"max-width:100%\\" /></p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166831/MTczMzkxMTYwNjIxNS5qcGdkaW1vZGVfNTg1MjAwOF9lbmMc.jpg\\" style=\\"max-width:100%\\" /></p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166831/MTczMzE0NjIyNzYyOC5qcGdkaW1vZGVfNjc4NzIxM19lbmMc.jpg\\" style=\\"max-width:100%\\" /></p></div>"
  },
  {
    "id": "1681_166829",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "독일개신교복음주의선교연대(EMS) 실행위원회 총회 참석",
    "author": "김창주",
    "date": "2024-11-08",
    "url": "https://www.prok.org/Board/Detail/1681/166829",
    "content": "<div class=\\"detail-content\\"><p>독일개신교복음주의선교연대(EMS) 실행위원회 및 총회에 참석하였습니다.</p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166829/MTczMTUzMTA5MDMwMi5qcGdkaW1vZGVfODIyNTQwM19lbmMc.jpg\\" style=\\"max-width:100%\\" /></p></div>"
  },
  {
    "id": "1681_166828",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "한국기독교장로회 총회총무 인계인수",
    "author": "김창주",
    "date": "2024-11-06",
    "url": "https://www.prok.org/Board/Detail/1681/166828",
    "content": "<div class=\\"detail-content\\"><p>11월 6일(수) 오후 5시, 총회 본부에서 총회 일반사무, 총회재정, 총회유지재단 등에 대한 인계인수를 마쳤습니다.</p></div>"
  },
  {
    "id": "1681_166827",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "한국기독교장로회 총회총무 이훈삼 목사 취임감사예식",
    "author": "김창주",
    "date": "2024-10-25",
    "url": "https://www.prok.org/Board/Detail/1681/166827",
    "content": "<div class=\\"detail-content\\"><p>10월 25일(금) 오후 2시 총회총무 이훈삼 목사 취임 감사예식이 열렸습니다.</p></div>"
  },
  {
    "id": "1681_166826",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "대한기독교서회 이사회",
    "author": "김창주",
    "date": "2024-10-18",
    "url": "https://www.prok.org/Board/Detail/1681/166826",
    "content": "<div class=\\"detail-content\\"><p>지난 4월부터 대한기독교서회에 교단 파송 이사가 되었습니다. 대한기독교서회 이사회가 있어서 처음으로 참석하였습니다.</p></div>"
  },
  {
    "id": "1681_166824",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "총무 이임인사, 제 109회 총회에서...",
    "author": "김창주",
    "date": "2024-09-25",
    "url": "https://www.prok.org/Board/Detail/1681/166824",
    "content": "<div class=\\"detail-content\\"><p>2024년 9월 24일부터 26일까지 제 109회 총회를 하나님의 은혜 가운데 잘 마쳤습니다. 우리 교단 총회를 섬기는 총무(總務)로서 지난 4년, 참으로 행복했습니다!</p><p class=\\"each-img\\"><img src=\\"http://data.dimode.co.kr/UserData/prok/files/1681/166824/MTcyNzIxNDE4NTc1OC5qcGdkaW1vZGVfMzI5MTQ5NF9lbmMc.jpg\\" style=\\"max-width:100%\\" /></p></div>"
  },
  {
    "id": "1681_166815",
    "board_id": "1681",
    "dept": "총무 동정",
    "title": "[총무 동정 1660] 제 109회 총회 준비를 마쳤습니다",
    "author": "김창주",
    "date": "2024-09-24",
    "url": "https://www.prok.org/Board/Detail/1681/166815",
    "content": "<div class=\\"detail-content\\"><p>제 109회 총회 준비를 모두 마쳤습니다.</p><p class=\\"each-img\\"><img src=\\"https://data.dimode.co.kr/UserData/prok/data/geditor/2409/606518126_c2c12c2e_5BEABEB8EBAFB8EAB8B05DKakaoTalk_20240924_111309468_03.jpg\\" style=\\"max-width:100%\\" /></p><p class=\\"each-img\\"><img src=\\"https://data.dimode.co.kr/UserData/prok/data/geditor/2409/606518126_98b9c8a7_5BEABEB8EBAFB8EAB8B05DKakaoTalk_20240924_111309468_05.jpg\\" style=\\"max-width:100%\\" /></p><p class=\\"each-img\\"><img src=\\"https://data.dimode.co.kr/UserData/prok/data/geditor/2409/606518126_9300d150_5BEABEB8EBAFB8EAB8B05DKakaoTalk_20240924_111309468.jpg\\" style=\\"max-width:100%\\" /></p><p class=\\"each-img\\"><img src=\\"https://data.dimode.co.kr/UserData/prok/data/geditor/2409/606518126_81afff6f_5BEABEB8EBAFB8EAB8B05DKakaoTalk_20240924_111442023_04.jpg\\" style=\\"max-width:100%\\" /></p><p class=\\"each-img\\"><img src=\\"https://data.dimode.co.kr/UserData/prok/data/geditor/2409/606518126_1eb77d3c_5BEABEB8EBAFB8EAB8B05DKakaoTalk_20240924_111442023_05.jpg\\" style=\\"max-width:100%\\" /></p></div>"
  }
];`;

const finalContent = keepText + '\n' + secretaryData;
fs.writeFileSync(file, finalContent, 'utf8');

// Verify
const check = fs.readFileSync(file, 'utf8');
const checkLines = check.split('\n');
console.log('Total lines:', checkLines.length);
console.log('Line 1802:', checkLines[1801]);
console.log('Line 1805:', checkLines[1804]);
