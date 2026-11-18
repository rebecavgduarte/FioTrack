/* Verificação por DOM da landing: logos 64×64 e ausência do botão "Acessar o app" */
const p = require('puppeteer-core');
const path = require('path');
const LANDING = 'file:///' + path.resolve('index.html').split('\\').join('/');

(async () => {
  const b = await p.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox'],
  });
  const pg = await b.newPage();

  const check = async (label) => console.log(label, await pg.evaluate(() => {
    const size = sel => {
      const i = document.querySelector(sel);
      if (!i) return sel + ': AUSENTE';
      const r = i.getBoundingClientRect();
      return `${sel}: ${Math.round(r.width)}x${Math.round(r.height)}`;
    };
    return [
      size('.brand-mark'), size('.footer-logo'),
      '"Acessar o app": ' + ([...document.querySelectorAll('a')].some(a => /acessar o app/i.test(a.textContent)) ? 'PRESENTE (erro)' : 'ausente ✓'),
      'CTA parceiro: ' + ([...document.querySelectorAll('a')].some(a => /tornar parceiro/i.test(a.textContent)) ? 'presente ✓' : 'AUSENTE (erro)'),
    ].join(' | ');
  }));

  await pg.setViewport({ width: 1366, height: 900 });
  await pg.goto(LANDING, { waitUntil: 'networkidle0' });
  await check('LANDING desktop:');

  await pg.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await new Promise(r => setTimeout(r, 300));
  await check('LANDING mobile: ');

  await b.close();
})();
