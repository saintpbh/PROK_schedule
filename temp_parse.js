const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('article.html', 'utf8');
const $ = cheerio.load(html);
const text = $('.article-body').text().replace(/\s+/g, ' ').trim();
console.log(text.substring(0, 2000));
