/* Gera o PDF do documento de avaliação a partir de Projeto_FioTrack_avaliacao.html */
const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PAGE = 'file:///' + path.resolve('Projeto_FioTrack_avaliacao.html').replace(/\\/g, '/');
const OUT = path.resolve('Projeto_FioTrack_avaliacao.pdf');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });
  const page = await browser.newPage();
  await page.goto(PAGE, { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, 300));
  await page.pdf({
    path: OUT,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  });
  await browser.close();
  console.log('PDF gerado → ' + OUT);
})().catch(e => { console.error('ERRO: ' + e.message); process.exit(1); });
