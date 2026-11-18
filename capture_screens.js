/* Gera screenshots das 15 telas do FioTrack usando Chrome do sistema */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP = 'file:///' + path.resolve('fiotrack-app/index.html').replace(/\\/g, '/');
const OUT = path.resolve('wireframes/screenshots');

const perfis = {
  // o perfil operador foi removido: as telas de operação agora são do gestor
  operador: { userId: 2, nome: 'Gestor Rebeca', perfil: 'gestor' },
  gestor:   { userId: 2, nome: 'Gestor Rebeca', perfil: 'gestor' },
  parceiro: { userId: 3, nome: 'Salão Beleza Pura', perfil: 'parceiro', parceiroId: 1 },
};

// [arquivo, rota, perfil]
const telas = [
  ['01-login',            '/',                          null],
  ['02-cadastro',         '/cadastro',                  'gestor'],
  ['03-solicitacao',      '/solicitacao',               'parceiro'],
  ['04-dashboard-parceiro','/parceiro',                 'parceiro'],
  ['05-lista-coletas',    '/coletas',                   'operador'],
  ['06-coleta-pendente',  '/coleta/5',                  'operador'],
  ['06b-coleta-concluida','/coleta/1',                  'operador'],
  ['07-dashboard-operador','/operador',                 'operador'],
  ['08-pesagem-lote',     '/pesagem/5',                 'operador'],
  ['10-triagem',          '/triagem/3',                 'operador'],
  ['11-estoque',          '/estoque',                   'operador'],
  ['12-destinacao',       '/destinacao/3',              'operador'],
  ['13a-rastreio-busca',  '/rastreio',                  'operador'],
  ['13b-rastreio-timeline','/rastreio/1',               'operador'],
  ['14-indicadores',      '/indicadores',               'gestor'],
  ['15-contribuicoes',    '/contribuicoes',             'parceiro'],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 2 });

  let ok = 0, fail = 0;
  for (const [nome, rota, perfil] of telas) {
    try {
      // abrir app
      await page.goto(APP, { waitUntil: 'networkidle0', timeout: 15000 });
      // definir sessão direto no localStorage (se perfil)
      if (perfil) {
        await page.evaluate((sess) => {
          const raw = localStorage.getItem('fiotrack_db');
          const db = raw ? JSON.parse(raw) : {};
          db.session = sess;
          localStorage.setItem('fiotrack_db', JSON.stringify(db));
        }, perfis[perfil]);
      } else {
        // limpar sessão para tela de login
        await page.evaluate(() => {
          const raw = localStorage.getItem('fiotrack_db');
          if (raw) { const db = JSON.parse(raw); db.session = null; localStorage.setItem('fiotrack_db', JSON.stringify(db)); }
        });
      }
      // navegar para a rota
      await page.evaluate((r) => { location.hash = r; }, rota);
      await page.waitForFunction(
        (n) => document.getElementById('app') && document.getElementById('app').innerHTML.length > 500,
        { timeout: 8000 }, rota
      );
      await new Promise(r => setTimeout(r, 350)); // render/anim settle

      const file = path.join(OUT, nome + '.png');
      await page.screenshot({ path: file, fullPage: true });
      ok++;
      console.log(`  OK   ${nome}.png  (${rota})`);
    } catch (e) {
      fail++;
      console.log(`  FAIL ${nome}: ${e.message}`);
    }
  }

  await browser.close();
  console.log(`\nScreenshots: ${ok} ok, ${fail} fail → ${OUT}`);
  process.exit(fail > 0 ? 1 : 0);
})();
