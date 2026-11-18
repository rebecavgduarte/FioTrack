/* Verificação por DOM: tabbar com ícones, botão voltar, logos 64 (web) / 32 (mobile) */
const p = require('puppeteer-core');
const path = require('path');
const APP = 'file:///' + path.resolve('fiotrack-app/index.html').split('\\').join('/');

const perfis = {
  parceiro: { userId: 3, nome: 'Salão Beleza Pura', perfil: 'parceiro', parceiroId: 1 },
  // o perfil operador foi removido: as telas de operação agora são do gestor
  operador: { userId: 2, nome: 'Gestor Rebeca', perfil: 'gestor' },
};

(async () => {
  const b = await p.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox'],
  });
  const pg = await b.newPage();
  await pg.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await pg.goto(APP, { waitUntil: 'networkidle0' });

  const open = async (route, sess) => {
    await pg.evaluate((s) => {
      const r = localStorage.getItem('fiotrack_db');
      const d = r ? JSON.parse(r) : {};
      d.session = s;
      localStorage.setItem('fiotrack_db', JSON.stringify(d));
    }, sess);
    await pg.goto(APP + '?t=' + Date.now() + Math.random().toString(36).slice(2) + route, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));
  };

  // LOGIN (mobile) — logo 32px
  await pg.evaluate(() => {
    const r = localStorage.getItem('fiotrack_db');
    const d = r ? JSON.parse(r) : {};
    d.session = null;
    localStorage.setItem('fiotrack_db', JSON.stringify(d));
  });
  await pg.goto(APP + '?t=' + Date.now() + '/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 400));
  console.log('LOGIN mobile:', await pg.evaluate(() => {
    const i = document.querySelector('.login-logo .logo-mark img');
    if (!i) return 'logo AUSENTE';
    const r = i.getBoundingClientRect();
    return `src=${i.getAttribute('src')} size=${Math.round(r.width)}x${Math.round(r.height)}`;
  }));

  // DASHBOARD PARCEIRO (mobile) — tabbar com ícones, sem Menu, topbar logo 32px
  await open('#/parceiro', perfis.parceiro);
  console.log('DASHBOARD mobile:', await pg.evaluate(() => {
    const tabs = [...document.querySelectorAll('.tabbar .tab')].map(t =>
      `${t.textContent.trim()}${t.querySelector('svg') ? ' [ico]' : ' [SEM ICO]'}`);
    const menu = document.getElementById('btnTabMenu');
    const logo = document.querySelector('.topbar-logo');
    const lr = logo && logo.getBoundingClientRect();
    return JSON.stringify({
      tabs,
      btnTabMenu: !!menu,
      topbarLogo: logo ? `${Math.round(lr.width)}x${Math.round(lr.height)}` : 'AUSENTE',
    });
  }));

  // SOLICITAÇÃO (mobile) — botão voltar circular com seta
  await open('#/solicitacao', perfis.parceiro);
  console.log('SOLICITAÇÃO mobile:', await pg.evaluate(() => {
    const a = document.querySelector('.back-link');
    if (!a) return 'back-link AUSENTE';
    const r = a.getBoundingClientRect();
    return JSON.stringify({
      texto: a.textContent.trim(),
      temSvg: !!a.querySelector('svg'),
      aria: a.getAttribute('aria-label'),
      size: `${Math.round(r.width)}x${Math.round(r.height)}`,
    });
  }));

  // DRAWER (mobile) — logo 32px
  await open('#/operador', perfis.operador);
  await pg.click('#btnMenu');
  await new Promise(r => setTimeout(r, 400));
  console.log('DRAWER mobile:', await pg.evaluate(() => {
    const i = document.querySelector('.brand-logo');
    if (!i) return 'brand-logo AUSENTE';
    const r = i.getBoundingClientRect();
    return `brand-logo ${Math.round(r.width)}x${Math.round(r.height)} visível=${r.width > 0}`;
  }));

  // DESKTOP — logo 64px
  await pg.setViewport({ width: 1366, height: 900, deviceScaleFactor: 1 });
  await open('#/parceiro', perfis.parceiro);
  console.log('SIDEBAR desktop:', await pg.evaluate(() => {
    const i = document.querySelector('.brand-logo');
    if (!i) return 'brand-logo AUSENTE';
    const r = i.getBoundingClientRect();
    return `brand-logo ${Math.round(r.width)}x${Math.round(r.height)}`;
  }));

  // LOGIN desktop — logo 64px, só o pill Gestor e sem credencial do parceiro
  await pg.evaluate(() => {
    const r = localStorage.getItem('fiotrack_db');
    const d = r ? JSON.parse(r) : {};
    d.session = null;
    localStorage.setItem('fiotrack_db', JSON.stringify(d));
  });
  await pg.goto(APP + '?t=' + Date.now() + '/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 400));
  console.log('LOGIN desktop:', await pg.evaluate(() => {
    const i = document.querySelector('.login-logo .logo-mark img');
    const pills = [...document.querySelectorAll('#perfilPills button')].map(b => b.textContent.trim());
    const creds = (document.querySelector('.demo-creds')?.textContent || '').replace(/\s+/g, ' ').trim();
    if (!i) return 'logo AUSENTE';
    const r = i.getBoundingClientRect();
    return JSON.stringify({
      size: `${Math.round(r.width)}x${Math.round(r.height)}`,
      pills,
      mencionaParceiro: /parceiro@/i.test(creds),
      creds,
    });
  }));

  await b.close();
})();
