/* Gera o PNG do fluxograma (slide 16:9) a partir de slide_fluxograma.html */
const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PAGE = 'file:///' + path.resolve('slide_fluxograma.html').replace(/\\/g, '/');
const OUT = path.resolve('Fluxograma_FioTrack.png');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 2 });
  await page.goto(PAGE, { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, 300));
  // avisa se o conteúdo não coube nos 900px do slide
  const alt = await page.evaluate(() => {
    document.body.style.overflow = 'visible';
    return document.body.scrollHeight;
  });
  if (alt > 900) console.log('ATENÇÃO: conteúdo com ' + alt + 'px (slide tem 900px)');
  await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: 1600, height: 900 } });
  await browser.close();
  console.log('PNG gerado → ' + OUT);
})().catch(e => { console.error('ERRO: ' + e.message); process.exit(1); });
