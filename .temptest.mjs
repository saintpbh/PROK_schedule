import https from 'https';

https.get('https://prok.org/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/<img[^>]+src="([^"]*?)"/gi);
    if(matches) {
       matches.forEach(m => console.log(m));
    }
  });
});
