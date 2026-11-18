/* Gera screenshots da landing page (index.html) usando Chrome do sistema */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PAGE = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
const OUT = path.resolve('wireframes/screenshots/landing');

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('  PAGEERROR:', e.message));
  page.on('console', m => { if (m.type() === 'error') console.log('  CONSOLE:', m.text()); });

  // --- desktop ---
  await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 2 });
  await page.goto(PAGE, { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(OUT, '01-hero-slide1.png') });

  await page.click('.hero-arrow--next');
  await new Promise(r => setTimeout(r, 1400));
  await page.screenshot({ path: path.join(OUT, '02-hero-slide2.png') });

  // clica no banner do slide 2 (link âncora) e espera a rolagem até a seção de notícias
  await page.click('.slide-stretch');
  await new Promise(r => setTimeout(r, 1500));
  const scrolled = await page.evaluate(() => Math.round(document.getElementById('noticias').getBoundingClientRect().top));
  console.log('  banner do slide 2 levou à seção de notícias (topo em px): ' + scrolled);
  await page.screenshot({ path: path.join(OUT, '03-cartoes.png') });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(OUT, '04-rodape.png') });

  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT, '05-completa.png'), fullPage: true });

  // --- mobile ---
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(PAGE, { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(OUT, '06-mobile-hero.png') });
  await page.screenshot({ path: path.join(OUT, '07-mobile-completa.png'), fullPage: true });

  // --- app a partir do link da landing (deve abrir no login, mesmo com sessão ativa) ---
  await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 2 });
  const APP = 'file:///' + path.resolve('fiotrack-app/index.html').replace(/\\/g, '/');
  await page.goto(PAGE, { waitUntil: 'networkidle0', timeout: 20000 });
  await page.evaluate(() => {
    const raw = localStorage.getItem('fiotrack_db');
    const db = raw ? JSON.parse(raw) : {};
    db.session = { userId: 2, nome: 'Gestor Rebeca', perfil: 'gestor' };
    localStorage.setItem('fiotrack_db', JSON.stringify(db));
  });
  await page.goto(APP + '?tela=login', { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, 900));
  const isLogin = await page.evaluate(() => !!document.querySelector('#loginEmail'));
  console.log('  link da landing abre no login: ' + isLogin);
  await page.screenshot({ path: path.join(OUT, '08-app-login.png') });

  await browser.close();
  console.log('Screenshots → ' + OUT);
})();
