/* FioTrack — App shell + roteador (hash-based) */
(() => {
  const app = document.getElementById('app');

  // acesso vindo da landing page: o app começa pela tela indicada
  // (?tela=login → login | ?tela=cadastro-parceiro → cadastro público de parceiros)
  const tela = new URLSearchParams(location.search).get('tela');
  if (tela === 'login') Store.logout();
  if (tela === 'cadastro-parceiro') location.hash = '#/cadastro-parceiro';

  // ===== ÍCONES DA BARRA DE NAVEGAÇÃO (mobile) =====
  const ICONS = {
    '/parceiro': '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
    '/solicitacao': '<path d="M9 2.5h6v3H9z"/><rect x="5" y="4.5" width="14" height="16.5" rx="2"/><path d="M12 10.5v6M9 13.5h6"/>',
    '/contribuicoes': '<path d="M12 20.5S4.5 16 4.5 10.8A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 3.2C19.5 16 12 20.5 12 20.5z"/>',
    '/coletas': '<path d="M3 6.5h11v10H3z"/><path d="M14 10h4l3 3.5v3h-7z"/><circle cx="7" cy="18.5" r="1.8"/><circle cx="17" cy="18.5" r="1.8"/>',
    '/rastreio': '<circle cx="11" cy="11" r="7"/><path d="m20 20-4.3-4.3"/>',
    '/indicadores': '<path d="M3 21h18"/><path d="M6.5 17.5v-6M11.5 17.5v-11M16.5 17.5v-8"/>',
    '/estoque': '<path d="M3 8.2 12 4l9 4.2v7.6L12 20l-9-4.2z"/><path d="m3 8.2 9 4.2 9-4.2M12 12.4V20"/>',
    '/operador': '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
    '/cadastro': '<circle cx="9.5" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.9-5.2 6.5-5.2 1.2 0 2.3.2 3.2.7"/><path d="M18 13.5v6M15 16.5h6"/>',
    '/parceiros': '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.4 2.9-5.4 6.5-5.4 1.4 0 2.7.3 3.8.8"/><circle cx="17.5" cy="16.5" r="4"/><path d="M17.5 14.8v3.4M15.8 16.5h3.4"/>',
    '/aprovacoes': '<path d="M9 3.5h6v3H9z"/><rect x="4.5" y="5.5" width="15" height="15" rx="2"/><path d="m8.5 13 2.5 2.5 4.5-5"/>',
    '/emails': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  };
  const tabIcon = (href) => `<span class="tab-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[href] || ICONS['/parceiro']}</svg></span>`;
  // rótulos curtos para a barra inferior (o drawer mantém o nome completo)
  const TAB_LABELS = { '/solicitacao': 'Solicitar', '/contribuicoes': 'Contribuições', '/indicadores': 'Indicadores',
                       '/cadastro': 'Cadastrar', '/parceiros': 'Parceiros', '/aprovacoes': 'Aprovações', '/emails': 'E-mails' };

  // ===== SHELL (sidebar + main) =====
  function shell(content, activePath) {
    const sess = Store.session();
    const perfil = sess?.perfil;
    const links = [];
    if (perfil === 'parceiro') {
      links.push(['/parceiro', ' Início'], ['/solicitacao', ' Nova Solicitação'],
                 ['/contribuicoes', ' Contribuições'],
                 ['/coletas', ' Coletas'], ['/rastreio', 'Rastrear']);
    } else {
      // gestor: operação, aprovação e gestão de parceiros
      links.push(['/indicadores', 'Indicadores'], ['/aprovacoes', 'Aprovações'],
                 ['/parceiros', 'Parceiros'], ['/cadastro', 'Cadastrar Parceiro'],
                 ['/emails', 'E-mails'], ['/operador', 'Painel da Operação'],
                 ['/coletas', 'Coletas'], ['/estoque', 'Estoque'], ['/rastreio', 'Rastrear']);
    }

    return `
    <div class="app-shell">
      <a class="skip-link" id="skipLink" href="#main">Pular para o conteúdo</a>
      <aside class="sidebar" id="sidebar">
        <div class="brand">
          <img class="brand-logo" src="logo.svg" alt="" aria-hidden="true">
          <div class="brand-text">
            <h2>FIO TRACK</h2>
            <small>Transformando fios em proteção</small>
          </div>
        </div>
        <nav>
          ${links.map(([href, label]) => `
            <a href="#${href}" class="${activePath === href ? 'active' : ''}"${activePath === href ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
        </nav>
        <div class="user-box">
          <div class="u-name">${esc(sess?.nome)}</div>
          <div class="u-perfil">${esc(sess?.perfil)}</div>
          <button id="btnLogout">Sair</button>
        </div>
      </aside>
      <div class="shell-main">
        <header class="topbar">
          <button class="hamburger" id="btnMenu" aria-label="Abrir menu" aria-expanded="false" aria-controls="sidebar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
          <img class="topbar-logo" src="logo.svg" alt="" aria-hidden="true">
          <strong>FioTrack</strong>
        </header>
        <main class="main" id="main" tabindex="-1">${content}</main>
      </div>
      <nav class="tabbar" aria-label="Navegação">
        ${links.slice(0, 4).map(([href, label]) => `
          <a href="#${href}" class="tab${activePath === href ? ' active' : ''}"${activePath === href ? ' aria-current="page"' : ''}>${tabIcon(href)}<span class="tab-label">${esc((TAB_LABELS[href] || label).trim())}</span></a>`).join('')}
      </nav>
      <div class="scrim" id="scrim"></div>
    </div>`;
  }

  function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  // ===== ROUTER =====
  const OPERACAO = ['gestor']; // rotas de operação/cadastro: acesso apenas do gestor
  const routes = [
    // pública
    { path: '/', render: () => Views.login(), bind: (r) => Views.loginBind(r), public: true },
    { path: '/cadastro-parceiro', render: () => Views.cadastroParceiroPublico(),
      bind: () => Views.cadastroParceiroPublicoBind(), public: true },
    // parceiro (escopo: apenas os próprios dados — ver views.js)
    { path: '/parceiro', render: () => Views.dashboardParceiro() },
    { path: '/cadastro', perfis: OPERACAO, render: () => Views.cadastro(), bind: (r) => Views.cadastroBind(r) },
    { path: '/cadastro/:id', perfis: OPERACAO, render: (m) => Views.cadastro(+m.id), bind: (r, m) => Views.cadastroBind(r, +m.id) },
    { path: '/parceiros', perfis: ['gestor'], render: () => Views.listaParceiros() },
    { path: '/aprovacoes', perfis: ['gestor'], render: () => Views.aprovacoes(), bind: (r) => Views.aprovacoesBind(r) },
    { path: '/emails', perfis: ['gestor'], render: () => Views.caixaEmails() },
    { path: '/solicitacao', render: () => Views.solicitacao(), bind: (r) => Views.solicitacaoBind(r) },
    { path: '/contribuicoes', perfis: ['parceiro'], render: () => Views.contribuicoes() },
    // coletas (parceiro vê apenas as próprias)
    { path: '/coletas', render: () => Views.listaColetas(), bind: () => Views.listaColetasBind() },
    { path: '/coleta/:id', render: (m) => Views.detalheColeta(+m.id), bind: (r, m) => Views.detalheColetaBind(+m.id, r) },
    { path: '/pesagem/:id', perfis: OPERACAO, render: (m) => Views.pesagemLote(+m.id), bind: (r, m) => Views.pesagemLoteBind(+m.id, r) },
    // operação (painel da operação, triagem, estoque, destinação) — só gestor
    { path: '/operador', perfis: OPERACAO, render: () => Views.dashboardOperador() },
    { path: '/triagem/:id', perfis: OPERACAO, render: (m) => Views.triagem(+m.id), bind: (r, m) => Views.triagemBind(+m.id, r) },
    { path: '/estoque', perfis: OPERACAO, render: () => Views.estoque(), bind: () => Views.estoqueBind() },
    { path: '/destinacao', perfis: OPERACAO, render: () => Views.destinacao(null), bind: (r) => Views.destinacaoBind(null, r) },
    { path: '/destinacao/:id', perfis: OPERACAO, render: (m) => Views.destinacao(+m.id), bind: (r, m) => Views.destinacaoBind(+m.id, r) },
    { path: '/rastreio', render: () => Views.rastreio(null), bind: () => Views.rastreioBind() },
    { path: '/rastreio/:id', render: (m) => Views.rastreio(+m.id), bind: () => Views.rastreioBind() },
    // gestor
    { path: '/indicadores', perfis: OPERACAO, render: () => Views.indicadores() },
  ];

  function matchRoute(path) {
    for (const r of routes) {
      const rp = r.path.split('/').filter(Boolean);
      const pp = path.split('/').filter(Boolean);
      if (rp.length !== pp.length) continue;
      const params = {};
      let ok = true;
      for (let i = 0; i < rp.length; i++) {
        if (rp[i].startsWith(':')) params[rp[i].slice(1)] = pp[i];
        else if (rp[i] !== pp[i]) { ok = false; break; }
      }
      if (ok) return { route: r, params };
    }
    return null;
  }

  const router = {
    navigate(path) {
      if (location.hash === '#' + path) render();
      else location.hash = path;
    },
  };

  function render() {
    const hash = location.hash.slice(1) || '/';
    const sess = Store.session();

    // rota pública
    const m = matchRoute(hash);
    if (!m) {
      app.innerHTML = shell(Views.notFound(), '');
      bindShell();
      return;
    }

    // proteção: sem sessão → login
    if (!sess && !m.route.public) { router.navigate('/'); return; }
    // com sessão e em login → dashboard
    if (sess && m.route.public && hash === '/') {
      location.hash = sess.perfil === 'parceiro' ? '/parceiro' : '/indicadores';
      return;
    }

    // permissões por perfil (parceiro não cadastra parceiros nem acessa a operação)
    if (sess && !m.route.public && m.route.perfis && !m.route.perfis.includes(sess.perfil)) {
      const dest = sess.perfil === 'parceiro' ? '/parceiro' : '/indicadores';
      if (hash !== dest) { location.hash = dest; return; }
    }

    const content = m.route.render(m.params);
    app.innerHTML = m.route.public ? content : shell(content, hash.split('/').length > 1 ? '/' + hash.split('/')[1] : hash);
    bindShell();
    if (m.route.bind) m.route.bind(router, m.params);
    // foco após navegação: leitores de tela e teclado começam no conteúdo novo
    if (booted) document.getElementById('main')?.focus({ preventScroll: true });
    booted = true;
    window.scrollTo(0, 0);
  }

  function bindShell() {
    const sidebar = document.getElementById('sidebar');
    const shellEl = document.querySelector('.app-shell');
    const shellMain = document.querySelector('.shell-main');
    const tabbar = document.querySelector('.tabbar');
    const btnMenu = document.getElementById('btnMenu');
    let opener = null;
    const setOpen = (open) => {
      sidebar?.classList.toggle('open', open);
      btnMenu?.setAttribute('aria-expanded', String(open));
      // drawer aberto: o resto da tela sai da ordem de tabulação (inert)
      shellMain?.toggleAttribute('inert', open);
      tabbar?.toggleAttribute('inert', open);
      if (open) {
        opener = document.activeElement;
        sidebar?.querySelector('nav a')?.focus();
      } else if (opener && document.contains(opener)) {
        opener.focus();
        opener = null;
      }
    };
    const toggle = () => setOpen(!sidebar?.classList.contains('open'));
    const btnOut = document.getElementById('btnLogout');
    if (btnOut) btnOut.addEventListener('click', () => { Store.logout(); router.navigate('/'); });
    if (btnMenu) btnMenu.addEventListener('click', toggle);
    const scrim = document.getElementById('scrim');
    if (scrim) scrim.addEventListener('click', () => setOpen(false));
    // Esc fecha o drawer e devolve o foco ao botão que o abriu
    shellEl?.addEventListener('keydown', e => {
      if (e.key === 'Escape' && sidebar?.classList.contains('open')) setOpen(false);
    });
    // link de pular: foca o conteúdo principal sem mudar a rota (hash)
    document.getElementById('skipLink')?.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('main')?.focus({ preventScroll: true });
    });
    // fecha sidebar ao clicar em link (mobile)
    document.querySelectorAll('.sidebar nav a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    // tabela em modo cartão: o cabeçalho visual vira rótulo de célula, então sai da árvore de acessibilidade
    syncTables();
  }

  // modo cartão (<48rem) esconde o thead da árvore; modo tabela o expõe como cabeçalho
  const mqCards = window.matchMedia('(max-width: 47.999rem)');
  const mqDesk = window.matchMedia('(min-width: 64rem)');
  function syncTables() {
    document.querySelectorAll('table thead').forEach(th => {
      if (mqCards.matches) th.setAttribute('aria-hidden', 'true');
      else th.removeAttribute('aria-hidden');
    });
  }
  mqCards.addEventListener('change', syncTables);
  // redimensionar para desktop com o drawer aberto não pode deixar a tela inerte
  mqDesk.addEventListener('change', matches => {
    if (!matches.matches) return;
    document.querySelector('.shell-main')?.removeAttribute('inert');
    document.querySelector('.tabbar')?.removeAttribute('inert');
    document.getElementById('sidebar')?.classList.remove('open');
  });

  let booted = false;

  window.addEventListener('hashchange', render);
  render();
})();
