export default async function handler(req, res) {
  // CORS 설정 (모든 도메인 허용)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT,PROPFIND,REPORT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Depth'
  );

  // 브라우저의 OPTIONS 사전 요청 파스
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const targetUrl = req.query.url;
    if (!targetUrl) {
      return res.status(400).json({ error: 'Missing target URL parameter (?url=)' });
    }

    const fetchMethod = req.method;
    const fetchHeaders = { ...req.headers };
    
    // 호스트 및 불필요한 Vercel 헤더 제거
    delete fetchHeaders['host'];
    delete fetchHeaders['origin'];
    delete fetchHeaders['referer'];
    delete fetchHeaders['x-forwarded-for'];
    delete fetchHeaders['x-forwarded-host'];
    delete fetchHeaders['x-forwarded-proto'];
    delete fetchHeaders['x-vercel-id'];

    // Vercel Edge/Serverless 환경에서 fetch
    const response = await fetch(targetUrl, {
      method: fetchMethod,
      headers: fetchHeaders,
      body: (fetchMethod !== 'GET' && fetchMethod !== 'HEAD' && req.body) ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body)) : undefined
    });

    const data = await response.text();
    
    // 원본 응답 상태 코드 반영
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Proxy error' });
  }
}
