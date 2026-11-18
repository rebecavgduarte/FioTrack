/* Screenshots mobile (e desktop) do app FioTrack — tabbar com ícones, botão voltar e logos */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP = 'file:///' + path.resolve('fiotrack-app/index.html').replace(/\\/g, '/');
const OUT = path.resolve('wireframes/screenshots/app-mobile');

const perfis = {
  parceiro: { userId: 3, nome: 'Salão Beleza Pura', perfil: 'parceiro', parceiroId: 1 },
  // o perfil operador foi removido: as telas de operação agora são do gestor
  operador: { userId: 2, nome: 'Gestor Rebeca', perfil: 'gestor' },
  gestor:   { userId: 2, nome: 'Gestor Rebeca', perfil: 'gestor' },
};

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('  PAGEERROR:', e.message));

  // abre o app já com a sessão desejada: grava no localStorage e força um
  // carregamento novo (query aleatória) para o Store reler os dados
  const open = async (route = '/', perfil = null) => {
    await page.evaluate((sess) => {
      const raw = localStorage.getItem('fiotrack_db');
      const db = raw ? JSON.parse(raw) : {};
      db.session = sess;
      localStorage.setItem('fiotrack_db', JSON.stringify(db));
    }, perfil);
    await page.goto(`${APP}?t=${Date.now()}-${Math.random().toString(36).slice(2)}${route}`, { waitUntil: 'networkidle0', timeout: 20000 });
    await new Promise(r => setTimeout(r, 450));
  };

  const shot = async (name) => {
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('  OK  ' + name + '.png  → ' + (await page.title()) + ' | ' + page.url().split('index.html')[1]);
  };

  // ---------- MOBILE ----------
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(APP, { waitUntil: 'networkidle0', timeout: 20000 }); // carrega a origem (localStorage)

  await open('/', null);
  await shot('01-login-mobile');

  await open('#/parceiro', perfis.parceiro);
  await shot('02-dashboard-parceiro-mobile');

  await open('#/solicitacao', perfis.parceiro);
  await shot('03-solicitacao-mobile');

  await open('#/coleta/5', perfis.operador);
  await shot('04-coleta-voltar-mobile');

  await open('#/destinacao', perfis.operador);
  await shot('05-destinacao-voltar-mobile');

  await open('#/operador', perfis.operador);
  await page.click('#btnMenu');
  await new Promise(r => setTimeout(r, 450));
  await shot('06-drawer-mobile');

  // ---------- DESKTOP ----------
  await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 2 });
  await open('#/parceiro', perfis.parceiro);
  await shot('07-dashboard-parceiro-desktop');

  await open('/', null);
  await shot('08-login-desktop');

  await browser.close();
  console.log('Screenshots → ' + OUT);
})();
