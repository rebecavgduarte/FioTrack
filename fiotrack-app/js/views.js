/* FioTrack — Views (todas as telas) */
const Views = (() => {

  // helpers
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = n => Number(n).toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
  const badge = st => `<span class="badge badge-${String(st ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z]/g, '')}">${esc(st)}</span>`;
  // botão de navegação de volta (seta) no topo das telas internas
  const SETA_VOLTAR = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';
  const backBtn = (href, label = 'Voltar') =>
    `<a class="back-link" href="${href}" aria-label="${esc(label)}" title="${esc(label)}">${SETA_VOLTAR}</a>`;
  const pad = n => String(n).padStart(2, '0');
  // data e hora locais no armazenamento ISO: YYYY-MM-DDTHH:MM
  const agora = () => { const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  const hoje = () => agora().slice(0, 10);
  const horaAgora = () => agora().slice(11, 16);
  // junta o que veio dos campos de data e de hora
  const combina = (data, hora) => (data ? `${data}T${hora || horaAgora()}` : '');
  // partes de um valor gravado, para repor nos campos do formulário
  const parte = (iso, i) => { const s = String(iso ?? ''); return i ? s.slice(11, 16) : s.slice(0, 10); };
  // exibição no padrão pt-BR: dd/mm/yyyy (HH:MM quando o registro tem hora)
  const dt = iso => {
    const s = String(iso ?? '');
    const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(s);
    return m ? `${m[3]}/${m[2]}/${m[1]}${m[4] ? ` ${m[4]}:${m[5]}` : ''}` : s;
  };
  const souParceiro = () => Store.session()?.perfil === 'parceiro';
  // parceiro só enxerga as próprias solicitações
  const minhasSols = sols => {
    const pid = Store.session()?.parceiroId;
    return souParceiro() && pid ? sols.filter(s => s.parceiroId === pid) : sols;
  };
  // parceiro só enxerga os próprios lotes
  const meusLotes = () => {
    if (!souParceiro()) return Store.list('lotes');
    const ids = minhasSols(Store.list('solicitacoes')).map(s => s.id);
    return Store.list('lotes').filter(l => ids.includes(l.solId));
  };

  function toast(msg, isError) {
    document.querySelectorAll('.toast').forEach(t=>t.remove());
    const t = document.createElement('div');
    t.className = 'toast' + (isError ? ' error' : '');
    t.setAttribute('role', isError ? 'alert' : 'status');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(()=>t.remove(), 3200);
  }

  function getParceiro(id) { return Store.find('parceiros', id); }

  // ===== TELA 01 — LOGIN =====
  function login() {
    return `
    <div class="login-wrap">
      <div class="login-grid">
        <aside class="login-pass" aria-label="FioTrack">
          <div class="login-logo">
            <span class="logo-mark" aria-hidden="true">
              <img src="logo.svg" alt="">
            </span>
            <h1>FIO TRACK</h1>
            <div class="slogan">Transformando fios em proteção para nossos mares.</div>
          </div>
        </aside>
        <div class="login-card">
          <form id="loginForm">
            <div class="form-group">
              <label for="loginEmail">E-mail <span class="req" aria-hidden="true">*</span></label>
              <input type="email" id="loginEmail" placeholder="usuario@email.com" required autocomplete="email">
            </div>
            <div class="form-group">
              <label for="loginSenha">Senha <span class="req" aria-hidden="true">*</span></label>
              <input type="password" id="loginSenha" placeholder="••••••••" required autocomplete="current-password">
            </div>
            <div class="form-error" id="loginError" role="alert">E-mail ou senha inválidos</div>
            <button type="submit" class="btn btn-primary btn-block u-mt-s">Entrar</button>
          </form>
          <p class="u-mt-s" style="text-align:center">
            <a href="#/cadastro-parceiro">Quero me tornar parceiro</a>
          </p>
          <div class="perfil-pills" id="perfilPills" role="group" aria-label="Acesso rápido de demonstração">
            <button type="button" data-email="gestor@fiotrack.com" aria-pressed="false">Gestor</button>
          </div>
          <div class="demo-creds">
            <strong>Credenciais demo:</strong><br>
            Gestor: <code>gestor@fiotrack.com</code><br>
            Senha: <code>demo</code>
          </div>
        </div>
      </div>
    </div>`;
  }

  function loginBind(router) {
    document.querySelectorAll('#perfilPills button').forEach(b => {
      b.addEventListener('click', () => {
        document.getElementById('loginEmail').value = b.dataset.email;
        document.getElementById('loginSenha').value = 'demo';
        document.querySelectorAll('#perfilPills button').forEach(x=>{ x.classList.remove('active'); x.setAttribute('aria-pressed','false'); });
        b.classList.add('active');
        b.setAttribute('aria-pressed','true');
      });
    });
    document.getElementById('loginForm').addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const senha = document.getElementById('loginSenha').value;
      const u = Store.login(email, senha);
      if (u) {
        const dest = u.perfil === 'parceiro' ? '/parceiro' : '/indicadores';
        router.navigate(dest);
      } else {
        document.getElementById('loginError').classList.add('show');
      }
    });
  }

  // ===== TELA 02 — CADASTRO / EDIÇÃO DE PARCEIRO (gestor) =====
  function cadastro(id) {
    const p = id ? getParceiro(id) : null;
    if (id && !p) return `<div class="empty-state">Parceiro não encontrado.</div>`;
    const v = k => esc(p?.[k] ?? '');
    return `
    ${backBtn('#/parceiros', 'Voltar aos parceiros')}
    <div class="page-header"><div><h1>${p ? 'Editar Parceiro' : 'Cadastro de Parceiro'}</h1>
      <div class="sub">${p ? esc(p.nome) : 'Dados do estabelecimento gerador'}</div></div></div>
    <div class="card">
      <form id="cadForm">
        <div class="form-grid">
          <div class="form-group"><label for="cNome">Nome <span class="req" aria-hidden="true">*</span></label><input id="cNome" required placeholder="Salão Beleza Pura" value="${v('nome')}"></div>
          <div class="form-group"><label for="cTipo">Tipo <span class="req" aria-hidden="true">*</span></label>
            <select id="cTipo" required>
              <option value="">Selecione...</option>
              <option ${p?.tipo === 'Salão' ? 'selected' : ''}>Salão</option>
              <option ${p?.tipo === 'Barbearia' ? 'selected' : ''}>Barbearia</option>
              <option ${p?.tipo === 'Pet Shop' ? 'selected' : ''}>Pet Shop</option>
              <option ${p?.tipo === 'Banho e Tosa' ? 'selected' : ''}>Banho e Tosa</option>
              <option ${p?.tipo === 'Clínica Veterinária' ? 'selected' : ''}>Clínica Veterinária</option>
              <option ${p?.tipo === 'Pessoa Física' ? 'selected' : ''}>Pessoa Física</option>
              <option ${p?.tipo === 'Outro' ? 'selected' : ''}>Outro</option>
            </select>
          </div>
          <div class="form-group"><label for="cDoc">Documento <span class="req" aria-hidden="true">*</span></label><input id="cDoc" required placeholder="CPF ou CNPJ" value="${v('documento')}"></div>
          <div class="form-group"><label for="cTel">Telefone <span class="req" aria-hidden="true">*</span></label><input id="cTel" required placeholder="(22) 99999-9999" type="tel" autocomplete="tel" value="${v('telefone')}"></div>
          <div class="form-group"><label for="cEmail">E-mail <span class="req" aria-hidden="true">*</span></label><input id="cEmail" type="email" required placeholder="contato@empresa.com" value="${v('email')}"></div>
        </div>
        <h3 style="margin-top:1rem">Endereço</h3>
        <div class="form-grid">
          <div class="form-group"><label for="cRua">Rua <span class="req" aria-hidden="true">*</span></label><input id="cRua" required placeholder="Rua, número" value="${v('rua')}"></div>
          <div class="form-group"><label for="cBairro">Bairro <span class="req" aria-hidden="true">*</span></label><input id="cBairro" required placeholder="Centro" value="${v('bairro')}"></div>
          <div class="form-group"><label for="cMun">Município <span class="req" aria-hidden="true">*</span></label><input id="cMun" required placeholder="Maricá" value="${v('municipio')}"></div>
          <div class="form-group"><label for="cCep">CEP <span class="req" aria-hidden="true">*</span></label><input id="cCep" required placeholder="28900-000" inputmode="numeric" value="${v('cep')}"></div>
        </div>
        <div class="form-error" id="cadError" role="alert"></div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">${p ? 'Salvar alterações' : 'Cadastrar parceiro'}</button>
          ${p && p.status === 'Pendente' ? `<a class="btn btn-outline" href="#/aprovacoes">Ver aprovações</a>` : ''}
        </div>
      </form>
    </div>`;
  }

  function cadastroBind(router, id) {
    document.getElementById('cadForm').addEventListener('submit', e => {
      e.preventDefault();
      const g = i => document.getElementById(i).value.trim();
      const err = document.getElementById('cadError');
      const falha = msg => { err.textContent = msg; err.classList.add('show'); };
      const doc = g('cDoc');
      const email = g('cEmail');
      const emailNorm = email.toLowerCase();

      // duplicidade: documento ou e-mail já usados por outro parceiro/usuário
      if (Store.list('parceiros').some(x => x.id !== id && x.documento === doc)) {
        return falha('Documento já cadastrado');
      }
      const emailEmUso =
        Store.list('parceiros').some(x => x.id !== id && String(x.email || '').trim().toLowerCase() === emailNorm) ||
        Store.list('usuarios').some(u => String(u.email || '').trim().toLowerCase() === emailNorm);
      if (emailEmUso) return falha('E-mail já cadastrado');

      const dados = {
        nome: g('cNome'), tipo: g('cTipo'), documento: doc, telefone: g('cTel'),
        email, rua: g('cRua'), bairro: g('cBairro'),
        municipio: g('cMun'), cep: g('cCep'),
      };

      if (id) {
        Store.update('parceiros', id, dados);
        // o e-mail do parceiro é também o usuário: sincroniza o login
        const u = Store.list('usuarios').find(x => x.parceiroId === id);
        if (u && u.email !== email) Store.update('usuarios', u.id, { email });
        toast('Cadastro atualizado!');
        router.navigate('/parceiros');
      } else {
        Store.insert('parceiros', { ...dados, status: 'Ativo', criadoEm: agora() });
        toast('Cadastro realizado com sucesso!');
        router.navigate('/parceiros');
      }
    });
  }

  // ===== TELA — CADASTRO PÚBLICO DE PARCEIRO (vindo da landing page) =====
  function cadastroParceiroPublico() {
    return `
    <div class="login-wrap">
      <div class="login-grid">
        <aside class="login-pass" aria-label="FioTrack">
          <div class="login-logo">
            <span class="logo-mark" aria-hidden="true">
              <img src="logo.svg" alt="">
            </span>
            <h1>FIO TRACK</h1>
            <div class="slogan">Transformando fios em proteção para nossos mares.</div>
          </div>
        </aside>
        <div class="login-card" id="cadPubCard">
          <h2 class="u-mt-0" style="margin-top:0">Seja um parceiro FioTrack</h2>
          <p class="sub u-mt-s" style="margin-bottom:1rem">Preencha seus dados. Após a análise e aprovação pela nossa equipe, você receberá o acesso por e-mail.</p>
          <form id="pcForm">
            <div class="form-grid">
              <div class="form-group"><label for="pcNome">Nome <span class="req" aria-hidden="true">*</span></label><input id="pcNome" required placeholder="Seu salão, barbearia ou pet shop" autocomplete="organization"></div>
              <div class="form-group"><label for="pcTipo">Tipo <span class="req" aria-hidden="true">*</span></label>
                <select id="pcTipo" required>
                  <option value="">Selecione...</option>
                  <option>Salão</option><option>Barbearia</option><option>Pet Shop</option>
                  <option>Banho e Tosa</option><option>Clínica Veterinária</option>
                  <option>Pessoa Física</option><option>Outro</option>
                </select>
              </div>
              <div class="form-group"><label for="pcDoc">Documento <span class="req" aria-hidden="true">*</span></label><input id="pcDoc" required placeholder="CPF ou CNPJ"></div>
              <div class="form-group"><label for="pcTel">Telefone <span class="req" aria-hidden="true">*</span></label><input id="pcTel" required placeholder="(22) 99999-9999" type="tel" autocomplete="tel"></div>
              <div class="form-group"><label for="pcEmail">E-mail <span class="req" aria-hidden="true">*</span></label><input id="pcEmail" type="email" required placeholder="contato@empresa.com" autocomplete="email" aria-describedby="pcEmailHint"><div class="hint" id="pcEmailHint">Este e-mail será seu usuário no app.</div></div>
            </div>
            <h3 style="margin-top:1rem">Endereço</h3>
            <div class="form-grid">
              <div class="form-group"><label for="pcRua">Rua <span class="req" aria-hidden="true">*</span></label><input id="pcRua" required placeholder="Rua, número" autocomplete="street-address"></div>
              <div class="form-group"><label for="pcBairro">Bairro <span class="req" aria-hidden="true">*</span></label><input id="pcBairro" required placeholder="Centro"></div>
              <div class="form-group"><label for="pcMun">Município <span class="req" aria-hidden="true">*</span></label><input id="pcMun" required placeholder="Maricá"></div>
              <div class="form-group"><label for="pcCep">CEP <span class="req" aria-hidden="true">*</span></label><input id="pcCep" required placeholder="28900-000" inputmode="numeric"></div>
            </div>
            <div class="form-error" id="pcError" role="alert"></div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary btn-block">Enviar cadastro</button>
            </div>
          </form>
          <p class="u-mt-s" style="text-align:center">Já é parceiro? <a href="#/">Entrar</a></p>
        </div>
      </div>
    </div>`;
  }

  function cadastroParceiroPublicoBind() {
    const form = document.getElementById('pcForm');
    const err = document.getElementById('pcError');
    form.addEventListener('submit', e => {
      e.preventDefault();
      err.classList.remove('show');
      const g = i => document.getElementById(i).value.trim();
      const falha = msg => { err.textContent = msg; err.classList.add('show'); };
      const email = g('pcEmail');
      const emailNorm = email.toLowerCase();
      const doc = g('pcDoc');

      // validação de duplicidade nos dados principais (e-mail é obrigatório e único)
      if (Store.list('usuarios').some(u => String(u.email || '').trim().toLowerCase() === emailNorm)) {
        return falha('Este e-mail já está cadastrado. Entre em contato com a equipe FioTrack.');
      }
      const existente = Store.list('parceiros').find(x =>
        x.documento === doc || String(x.email || '').trim().toLowerCase() === emailNorm);
      if (existente) {
        if (existente.status !== 'Rejeitado') {
          return falha('E-mail ou documento já cadastrado. Entre em contato com a equipe FioTrack.');
        }
        // recusado antes: reenvia o mesmo cadastro para nova análise
        Store.update('parceiros', existente.id, {
          nome: g('pcNome'), tipo: g('pcTipo'), documento: doc, telefone: g('pcTel'),
          email, rua: g('pcRua'), bairro: g('pcBairro'),
          municipio: g('pcMun'), cep: g('pcCep'), status: 'Pendente', reenviadoEm: agora(),
        });
      } else {
        Store.insert('parceiros', {
          nome: g('pcNome'), tipo: g('pcTipo'), documento: doc, telefone: g('pcTel'),
          email, rua: g('pcRua'), bairro: g('pcBairro'),
          municipio: g('pcMun'), cep: g('pcCep'), status: 'Pendente', criadoEm: agora(),
        });
      }

      // confirmação no lugar do formulário
      document.getElementById('cadPubCard').innerHTML = `
        <div class="empty-state" style="padding:1rem 0">
          <div class="empty-icon"> </div>
          <h2>Cadastro enviado!</h2>
          <p>Recebemos o cadastro de <strong>${esc(g('pcNome') || email)}</strong> com o e-mail <strong>${esc(email)}</strong>.</p>
          <p>A equipe FioTrack irá analisá-lo. Assim que for aprovado, você receberá um e-mail com o seu usuário e uma senha provisória para entrar no app.</p>
          <a class="btn btn-primary u-mt-s" href="#/">Ir para o login</a>
        </div>`;
      toast('Cadastro enviado para análise!');
    });
  }

  // ===== TELA — LISTA DE PARCEIROS (gestor) =====
  function listaParceiros() {
    const ps = Store.list('parceiros');
    const pend = ps.filter(p => p.status === 'Pendente').length;
    return `
    <div class="page-header">
      <div><h1>Parceiros</h1><div class="sub">${ps.length} cadastro(s) · ${pend} aguardando aprovação</div></div>
      <div class="btn-group">
        <a class="btn btn-outline" href="#/aprovacoes">Aprovações${pend ? ` (${pend})` : ''}</a>
        <a class="btn btn-primary" href="#/cadastro">+ Novo Parceiro</a>
      </div>
    </div>
    ${ps.length === 0 ? `<div class="card"><div class="empty-state"><div class="empty-icon"> </div>Nenhum parceiro cadastrado.</div></div>` : `
    <div class="card">
      <div class="table-wrap"><table>
        <thead><tr><th>Nome</th><th>Tipo</th><th>E-mail</th><th>Documento</th><th>Status</th><th></th></tr></thead>
        <tbody>${ps.map(p => `<tr>
          <td data-label="Nome"><strong>${esc(p.nome)}</strong></td>
          <td data-label="Tipo">${esc(p.tipo)}</td>
          <td data-label="E-mail">${esc(p.email)}</td>
          <td data-label="Documento">${esc(p.documento)}</td>
          <td data-label="Status">${badge(p.status)}</td>
          <td data-label="" class="td-actions">
            <a class="btn btn-sm btn-outline" href="#/cadastro/${p.id}">Editar</a>
            ${p.status === 'Pendente' ? `<a class="btn btn-sm btn-primary" href="#/aprovacoes">Aprovar</a>` : ''}
          </td>
        </tr>`).join('')}</tbody>
      </table></div>
    </div>`}`;
  }

  // ===== TELA — CADASTROS PENDENTES DE AUTORIZAÇÃO (gestor) =====
  function aprovacoes() {
    const pend = Store.list('parceiros').filter(p => p.status === 'Pendente');
    return `
    <div class="page-header">
      <div><h1>Cadastros Pendentes</h1><div class="sub">Parceiros aguardando autorização</div></div>
      <div class="btn-group">
        <a class="btn btn-outline" href="#/parceiros">Parceiros</a>
        <a class="btn btn-outline" href="#/emails">E-mails enviados</a>
      </div>
    </div>
    ${pend.length === 0 ? `
    <div class="card"><div class="empty-state"><div class="empty-icon"> </div>Nenhum cadastro pendente de autorização.</div></div>` : `
    <div class="item-list">
      ${pend.map(p => `
      <div class="item-card">
        <div class="ic-head">
          <div>
            <div class="ic-title">${esc(p.nome)}</div>
            <div class="ic-partner">${esc(p.email)}</div>
            <div class="ic-meta">
              <span>${esc(p.tipo)}</span>
              <span>${esc(p.documento)}</span>
              <span>${esc(p.telefone)}</span>
              <span>${esc(p.rua)}, ${esc(p.bairro)} — ${esc(p.municipio)}</span>
              <span>Cadastrado em ${esc(dt(p.criadoEm))}</span>
            </div>
          </div>
          ${badge(p.status)}
        </div>
        <div class="ic-actions">
          <button type="button" class="btn btn-sm btn-primary" data-aprovar="${p.id}">Aprovar</button>
          <a class="btn btn-sm btn-outline" href="#/cadastro/${p.id}">Ver dados</a>
          <button type="button" class="btn btn-sm btn-danger" data-recusar="${p.id}">Recusar</button>
        </div>
      </div>`).join('')}
    </div>`}`;
  }

  function aprovacoesBind(router) {
    document.querySelectorAll('[data-aprovar]').forEach(btn =>
      btn.addEventListener('click', () => {
        const id = +btn.dataset.aprovar;
        const r = Store.aprovarParceiro(id);
        if (!r) { toast('Não foi possível aprovar: e-mail já utilizado por outro usuário.', true); return; }
        const p = Store.find('parceiros', id);
        toast(`Parceiro aprovado! E-mail enviado para ${p.email}`);
        router.navigate('/aprovacoes');
      }));
    document.querySelectorAll('[data-recusar]').forEach(btn =>
      btn.addEventListener('click', () => {
        const id = +btn.dataset.recusar;
        const p = Store.find('parceiros', id);
        if (!p) return;
        if (confirm(`Recusar o cadastro de "${p.nome}"?`)) {
          Store.update('parceiros', id, { status: 'Rejeitado' });
          toast('Cadastro recusado');
          router.navigate('/aprovacoes');
        }
      }));
  }

  // ===== TELA — CAIXA DE E-MAILS ENVIADOS (gestor) =====
  function caixaEmails() {
    const mails = Store.list('emails').slice().reverse();
    return `
    <div class="page-header">
      <div><h1>E-mails Enviados</h1><div class="sub">Caixa de saída do app (simulada) — acessos gerados na aprovação</div></div>
      <a class="btn btn-outline" href="#/aprovacoes">Aprovações</a>
    </div>
    ${mails.length === 0 ? `
    <div class="card"><div class="empty-state"><div class="empty-icon"> </div>Nenhum e-mail enviado ainda.</div></div>` :
    mails.map(m => `
    <div class="card">
      <div class="list-head">
        <h2>${esc(m.assunto)}</h2>
        ${badge('Enviado')}
      </div>
      <div class="form-grid">
        <div><strong>Para:</strong> ${esc(m.para)}</div>
        <div><strong>Data:</strong> ${esc(dt(m.enviadoEm))}</div>
      </div>
      <pre class="mail-body">${esc(m.corpo)}</pre>
    </div>`).join('')}`;
  }

  // ===== TELA 03 — SOLICITAÇÃO DE COLETA =====
  function solicitacao() {
    const sess = Store.session();
    // no select só entram parceiros aprovados (pendentes/recusados ficam fora)
    const pts = Store.list('parceiros').filter(p => p.status === 'Ativo');
    const pid = sess?.parceiroId;
    return `
    ${backBtn('#/parceiro')}
    <div class="page-header"><div><h1>Nova Solicitação de Coleta</h1><div class="sub">Solicite a coleta do seu material</div></div></div>
    <div class="card">
      <form id="solForm">
        ${!pid ? `
        <div class="form-group">
          <label for="sParceiro">Parceiro <span class="req" aria-hidden="true">*</span></label>
          <select id="sParceiro" required>
            ${pts.length ? pts.map(p=>`<option value="${p.id}">${esc(p.nome)}</option>`).join('')
              : `<option value="">Nenhum parceiro aprovado</option>`}
          </select>
        </div>` : ''}
        <div class="form-group">
          <span class="group-label" id="materialLbl">Tipo de Material <span class="req" aria-hidden="true">*</span></span>
          <div class="radio-group" role="radiogroup" aria-labelledby="materialLbl">
            <label><input type="radio" name="material" value="Cabelo humano" checked> Cabelo humano</label>
            <label><input type="radio" name="material" value="Pelo de animal"> Pelo de animal</label>
            <label><input type="radio" name="material" value="Misto"> Misto</label>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group"><label for="sQtd">Quantidade Estimada (kg)</label><input id="sQtd" type="number" step="0.1" min="0.1" placeholder="2.5" inputmode="decimal"></div>
          <div class="form-group"><label for="sData">Data Desejada</label><input id="sData" type="date" value="${hoje()}"></div>
          <div class="form-group"><label for="sHora">Hora Desejada</label><input id="sHora" type="time" value="${horaAgora()}"></div>
        </div>
        <div class="form-group"><label for="sObs">Observações</label><textarea id="sObs" rows="2" placeholder="Material separado em sacos..."></textarea></div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Solicitar coleta</button>
        </div>
      </form>
    </div>`;
  }

  function solicitacaoBind(router) {
    document.getElementById('solForm').addEventListener('submit', e => {
      e.preventDefault();
      const sess = Store.session();
      const sel = document.getElementById('sParceiro');
      const pid = sess?.parceiroId || (sel ? +sel.value : 0);
      if (!pid) { toast('Selecione o parceiro', true); return; }
      const material = document.querySelector('input[name=material]:checked').value;
      const seq = Store.list('solicitacoes').length + 1;
      Store.insert('solicitacoes', {
        protocolo: 'SOL-' + String(seq).padStart(4,'0'),
        parceiroId: pid, material,
        qtdEstimada: +document.getElementById('sQtd').value || 0,
        dataDesejada: combina(document.getElementById('sData').value, document.getElementById('sHora').value),
        observacao: document.getElementById('sObs').value,
        status: 'Pendente', criadoEm: agora(),
      });
      toast('Solicitação registrada!');
      router.navigate('/parceiro');
    });
  }

  // ===== TELA 04 — DASHBOARD PARCEIRO =====
  function dashboardParceiro() {
    const sess = Store.session();
    const pid = sess?.parceiroId;
    const contrib = pid ? Store.contribuicoes(pid) : null;
    const sols = Store.list('solicitacoes').filter(s => !pid || s.parceiroId === pid);
    const nome = pid ? getParceiro(pid)?.nome : sess?.nome;
    return `
    <div class="page-header">
      <div><h1>Dashboard do Parceiro</h1><div class="sub">Olá, ${esc(nome)}!</div></div>
      <div class="btn-group">
        <a class="btn btn-primary" href="#/solicitacao">+ Nova Solicitação</a>
        ${pid ? `<a class="btn btn-outline" href="#/contribuicoes">Contribuições</a>` : `<a class="btn btn-outline" href="#/cadastro">+ Cadastrar Parceiro</a>`}
      </div>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="num">${sols.filter(s=>s.status==='Concluída').length}</div><div class="lbl">Coletas Realizadas</div></div>
      <div class="stat-card alert"><div class="num">${sols.filter(s=>s.status==='Pendente').length}</div><div class="lbl">Solicitações Pendentes</div></div>
      <div class="stat-card accent"><div class="num">${fmt(contrib?.peso ?? 0)} kg</div><div class="lbl">Total Contribuído</div></div>
      <div class="stat-card"><div class="num">${contrib?.lotes ?? 0}</div><div class="lbl">Lotes Gerados</div></div>
    </div>
    <div class="card card--impact">
      <h2>Três passos para transformar fios em impacto</h2>
      <ol class="impact-steps">
        <li>
          <span class="impact-num" aria-hidden="true">1</span>
          <div><h3>Escolha o local da sua coleta e o tipo de material</h3><p> preencha todas as informações de acordo com as opções.</p></div>
        </li>
        <li>
          <span class="impact-num" aria-hidden="true">2</span>
          <div><h3>Registre no FioTrack</h3><p>Informe a Quantidade Estimada (kg),Data Desejada e a hora Desejada.</p></div>
        </li>
        <li>
          <span class="impact-num" aria-hidden="true">3</span>
          <div><h3>Acompanhe a solicitação e o destino da sua doação</h3><p> Após a confirmação, acompanhe as solicitações e suas contribuições.</p></div>
        </li>
      </ol>
    </div>
    <div class="card">
      <h2>Minhas Solicitações</h2>
      ${sols.length === 0 ? `<div class="empty-state"><div class="empty-icon"></div>Nenhuma solicitação ainda.</div>` : `
      <div class="table-wrap"><table>
        <thead><tr><th>Protocolo</th><th>Material</th><th>Qtd.</th><th>Data e Hora</th><th>Status</th></tr></thead>
        <tbody>${sols.slice().reverse().map(s=>`
          <tr>
            <td data-label="Protocolo"><strong>${esc(s.protocolo)}</strong></td>
            <td data-label="Material">${esc(s.material)}</td>
            <td data-label="Qtd.">${fmt(s.qtdEstimada)} kg</td>
            <td data-label="Data e Hora">${esc(dt(s.dataDesejada))}</td>
            <td data-label="Status">${badge(s.status)}</td>
          </tr>`).join('')}</tbody>
      </table></div>`}
    </div>`;
  }

  // ===== TELA 05 — LISTA DE COLETAS (OPERADOR) =====
  function listaColetas() {
    const sols = minhasSols(Store.list('solicitacoes'));
    return `
    <div class="page-header">
      <div><h1>Coletas</h1><div class="sub">Solicitações e acompanhamento</div></div>
      <a class="btn btn-primary" href="#/operador">Dashboard</a>
    </div>
    <div class="filter-bar">
      <div class="form-group"><label for="fStatus">Status</label>
        <select id="fStatus"><option value="">Todos</option><option>Pendente</option><option>Em Andamento</option><option>Concluída</option><option>Cancelada</option></select>
      </div>
      <div class="form-group"><label for="fMat">Material</label>
        <select id="fMat"><option value="">Todos</option><option>Cabelo humano</option><option>Pelo de animal</option><option>Misto</option></select>
      </div>
    </div>
    <div class="item-list" id="coletaList">
      ${renderColetas(sols)}
    </div>`;
  }

  function renderColetas(sols) {
    if (!sols.length) return `<div class="empty-state"><div class="empty-icon"> </div>Nenhuma coleta encontrada.</div>`;
    return sols.slice().reverse().map(s => {
      const p = getParceiro(s.parceiroId);
      return `
      <div class="item-card">
        <div class="ic-head">
          <div>
            <div class="ic-title">${esc(s.protocolo)}</div>
            <div class="ic-partner">${esc(p?.nome ?? 'Parceiro')}</div>
            <div class="ic-meta">
              <span>${esc(p?.municipio ?? '')}, ${esc(p?.bairro ?? '')}</span>
              <span>${esc(s.material)}</span>
              <span>~${fmt(s.qtdEstimada)} kg</span>
              <span>${esc(dt(s.dataDesejada))}</span>
            </div>
          </div>
          ${badge(s.status)}
        </div>
        <div class="ic-actions">
          <a class="btn btn-sm btn-primary" href="#/coleta/${s.id}">Ver Detalhes</a>
        </div>
      </div>`;
    }).join('');
  }

  function listaColetasBind() {
    const apply = () => {
      const st = document.getElementById('fStatus').value;
      const mat = document.getElementById('fMat').value;
      let sols = minhasSols(Store.list('solicitacoes'));
      if (st) sols = sols.filter(s => s.status === st);
      if (mat) sols = sols.filter(s => s.material === mat);
      document.getElementById('coletaList').innerHTML = renderColetas(sols);
    };
    document.getElementById('fStatus').addEventListener('change', apply);
    document.getElementById('fMat').addEventListener('change', apply);
  }

  // ===== TELA 06 — DETALHES DA COLETA / REGISTRO =====
  function detalheColeta(id) {
    const s = Store.find('solicitacoes', id);
    if (!s) return `<div class="empty-state">Solicitação não encontrada.</div>`;
    // parceiro só acessa as próprias solicitações
    if (souParceiro() && s.parceiroId !== Store.session()?.parceiroId) {
      return `${backBtn('#/coletas', 'Voltar às coletas')}
      <div class="empty-state"><div class="empty-icon"> </div>Acesso restrito: esta solicitação não pertence ao seu perfil.
      <a class="btn btn-primary" style="margin-top:1rem" href="#/parceiro">Meu Dashboard</a></div>`;
    }
    const p = getParceiro(s.parceiroId);
    const temColeta = !!s.coleta;
    const lote = Store.list('lotes').find(l => l.solId === s.id);
    return `
    ${backBtn('#/coletas', 'Voltar às coletas')}
    <div class="page-header"><div><h1>${esc(s.protocolo)}</h1><div class="sub">Status: ${badge(s.status)}</div></div></div>
    <div class="card">
      <h2>Dados da Solicitação</h2>
      <div class="form-grid">
        <div><strong>Parceiro:</strong> ${esc(p?.nome)}</div>
        <div><strong>Endereço:</strong> ${esc(p?.rua)}, ${esc(p?.bairro)}</div>
        <div><strong>Município:</strong> ${esc(p?.municipio)}</div>
        <div><strong>Material:</strong> ${esc(s.material)}</div>
        <div><strong>Qtd. Estimada:</strong> ~${fmt(s.qtdEstimada)} kg</div>
        <div><strong>Data e Hora Desejada:</strong> ${esc(dt(s.dataDesejada))}</div>
        ${s.observacao ? `<div><strong>Obs:</strong> ${esc(s.observacao)}</div>` : ''}
      </div>
    </div>
    ${temColeta ? `
    <div class="card">
      <h2>Coleta Registrada ✓</h2>
      <div class="form-grid">
        <div><strong>Data e Hora:</strong> ${esc(dt(s.coleta.data))}</div>
        <div><strong>Responsável:</strong> ${esc(s.coleta.responsavel)}</div>
        <div><strong>Peso:</strong> ${fmt(s.coleta.peso)} kg</div>
      </div>
      ${lote ? `<p style="margin-top:.7rem">Lote: <a href="#/rastreio/${lote.id}"><strong>${esc(lote.codigo)}</strong></a> ${badge(lote.status)}</p>`
             : souParceiro() ? `<p class="note u-mt-s">Pesagem e geração de lote ficam com a equipe operacional.</p>`
             : `<a class="btn btn-accent" style="margin-top:.8rem" href="#/pesagem/${s.id}">Registrar Pesagem & Gerar Lote</a>`}
    </div>` : s.status === 'Pendente' ? (souParceiro() ? `
    <div class="card">
      <h2>Aguardando coleta</h2>
      <p>Sua solicitação está na fila. A equipe do centro de triagem fará o registro da coleta.</p>
      <div class="btn-group" style="margin-top:.8rem">
        <button type="button" class="btn btn-danger" id="btnCancel">Cancelar solicitação</button>
      </div>
    </div>` : `
    <div class="card">
      <h2>Registrar Coleta</h2>
      <form id="coletaForm">
        <div class="form-grid">
          <div class="form-group"><label for="kData">Data da Coleta <span class="req" aria-hidden="true">*</span></label><input id="kData" type="date" value="${hoje()}" required></div>
          <div class="form-group"><label for="kHora">Hora da Coleta <span class="req" aria-hidden="true">*</span></label><input id="kHora" type="time" value="${horaAgora()}" required></div>
          <div class="form-group"><label for="kResp">Responsável <span class="req" aria-hidden="true">*</span></label><input id="kResp" placeholder="João Silva" required></div>
          <div class="form-group"><label for="kPeso">Peso Coletado (kg) <span class="req" aria-hidden="true">*</span></label><input id="kPeso" type="number" step="0.1" min="0.1" placeholder="2.5" required inputmode="decimal"></div>
        </div>
        <div class="form-error" id="coletaErr" role="alert"></div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Concluir coleta</button>
          <button type="button" class="btn btn-danger" id="btnCancel">Cancelar</button>
        </div>
      </form>
    </div>`) : `
    <div class="card"><p>Solicitação ${badge(s.status)}.</p></div>`}`;
  }

  function detalheColetaBind(id, router) {
    const form = document.getElementById('coletaForm');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const peso = +document.getElementById('kPeso').value;
        if (peso <= 0) { const er = document.getElementById('coletaErr'); er.textContent='Peso deve ser maior que zero'; er.classList.add('show'); return; }
        Store.update('solicitacoes', id, {
          status: 'Concluída',
          coleta: { data: combina(document.getElementById('kData').value, document.getElementById('kHora').value), responsavel: document.getElementById('kResp').value.trim(), peso },
        });
        toast('Coleta registrada!');
        router.navigate('/coleta/' + id);
      });
    }
    const btnCancel = document.getElementById('btnCancel');
    if (btnCancel) btnCancel.addEventListener('click', () => {
      if (confirm('Cancelar esta solicitação?')) {
        Store.update('solicitacoes', id, { status: 'Cancelada' });
        toast('Solicitação cancelada');
        router.navigate(souParceiro() ? '/parceiro' : '/coletas');
      }
    });
  }

  // ===== TELA 07 — DASHBOARD OPERADOR =====
  function dashboardOperador() {
    const ind = Store.indicadores();
    const pend = Store.list('solicitacoes').filter(s => s.status === 'Pendente');
    const emEstoque = Store.list('lotes').filter(l => l.status === 'Em Estoque' || l.status === 'Em Triagem');
    return `
    <div class="page-header">
      <div><h1>Painel da Operação</h1><div class="sub">Operação logística do dia</div></div>
      <div class="btn-group">
        <a class="btn btn-primary" href="#/coletas">Ver Coletas</a>
        <a class="btn btn-outline" href="#/estoque">Estoque</a>
        <a class="btn btn-outline" href="#/rastreio">Rastrear</a>
      </div>
    </div>
    <div class="stat-grid">
      <div class="stat-card alert"><div class="num">${ind.coletasPendentes}</div><div class="lbl">Pendentes</div></div>
      <div class="stat-card accent"><div class="num">${ind.coletasRealizadas}</div><div class="lbl">Coletas Realizadas</div></div>
      <div class="stat-card"><div class="num">${fmt(ind.pesoColetado)} kg</div><div class="lbl">Peso Coletado</div></div>
      <div class="stat-card"><div class="num">${ind.lotesTotal}</div><div class="lbl">Lotes</div></div>
    </div>
    <div class="card">
      <h2>Coletas Pendentes</h2>
      ${pend.length === 0 ? `<div class="empty-state"><div class="empty-icon"> </div>Nenhuma coleta pendente.</div>` : `
      <div class="item-list">${pend.map(s => {
        const p = getParceiro(s.parceiroId);
        return `<div class="item-card">
          <div class="ic-head">
            <div><div class="ic-title">${esc(s.protocolo)}</div>
            <div class="ic-partner">${esc(p?.nome)}</div>
            <div class="ic-meta"><span> ${esc(p?.municipio)}</span><span> ${esc(s.material)}</span><span>~${fmt(s.qtdEstimada)} kg</span><span>${esc(dt(s.dataDesejada))}</span></div></div>
            ${badge(s.status)}
          </div>
          <div class="ic-actions"><a class="btn btn-sm btn-primary" href="#/coleta/${s.id}">Registrar Coleta</a></div>
        </div>`;
      }).join('')}</div>`}
    </div>
    <div class="card">
      <h2>Lotes para Triagem / Estoque</h2>
      ${emEstoque.length === 0 ? `<div class="empty-state">Nenhum lote pendente.</div>` : `
      <div class="table-wrap"><table>
        <thead><tr><th>Código</th><th>Material</th><th>Peso</th><th>Status</th><th></th></tr></thead>
        <tbody>${emEstoque.map(l => `<tr>
          <td data-label="Código"><strong>${esc(l.codigo)}</strong></td><td data-label="Material">${esc(l.material)}</td>
          <td data-label="Peso">${fmt(l.pesoInicial)} kg</td><td data-label="Status">${badge(l.status)}</td>
          <td data-label="">${l.status === 'Em Triagem' ? `<a class="btn btn-sm btn-accent" href="#/triagem/${l.id}">Triar</a>` : ''}</td>
        </tr>`).join('')}</tbody>
      </table></div>`}
    </div>`;
  }

  // ===== TELA 08 — PESAGEM + TELA 09 — LOTE (combinadas em wizard) =====
  function pesagemLote(solId) {
    const s = Store.find('solicitacoes', solId);
    if (!s) return `<div class="empty-state">Solicitação não encontrada.</div>`;
    const p = getParceiro(s.parceiroId);
    // peso registrado na coleta: é o material que existe de fato, e o teto do lote
    const reg = +s.coleta?.peso || 0;
    const maxAttr = reg > 0 ? `max="${reg}"` : '';
    return `
    ${backBtn(`#/coleta/${solId}`)}
    <div class="page-header"><div><h1>Pesagem & Lote</h1><div class="sub">${esc(s.protocolo)}, ${esc(p?.nome)}</div></div></div>
    <div class="steps" role="list" aria-label="Etapas da operação">
      <div class="step done" role="listitem"><span aria-hidden="true">✓ </span>Coleta</div>
      <div class="step current" role="listitem" aria-current="step">2. Pesagem</div>
      <div class="step" role="listitem">3. Lote</div>
      <div class="step" role="listitem">4. Triagem</div>
    </div>
    <div class="card">
      <h2>Registrar Peso</h2>
      <div class="form-grid">
        <div class="form-group"><label for="pPeso">Peso Coletado (kg) <span class="req" aria-hidden="true">*</span></label>
          <input id="pPeso" type="number" step="0.1" min="0.1" ${maxAttr} value="${s.coleta?.peso || ''}" required inputmode="decimal" aria-describedby="pPesoHint">
          <div class="hint" id="pPesoHint">${reg > 0 ? `Pesar na balança digital antes de confirmar. Máx: ${fmt(reg)} kg (peso registrado na coleta)` : 'Registre a coleta antes de gerar o lote'}</div>
        </div>
        <div class="form-group"><label for="pData">Data <span class="req" aria-hidden="true">*</span></label><input id="pData" type="date" value="${hoje()}"></div>
        <div class="form-group"><label for="pHora">Hora <span class="req" aria-hidden="true">*</span></label><input id="pHora" type="time" value="${horaAgora()}"></div>
        <div class="form-group"><label for="pResp">Responsável <span class="req" aria-hidden="true">*</span></label><input id="pResp" value="${esc(s.coleta?.responsavel || 'João Silva')}"></div>
      </div>
      <div class="form-error" id="pesoErr" role="alert"></div>
    </div>
    <div class="card">
      <h2>Gerar Lote</h2>
      <div class="form-grid">
        <div class="form-group"><label for="lCodigo">Código (auto)</label><input id="lCodigo" value="${Store.gerarCodigoLote()}" readonly></div>
        <div class="form-group"><label for="lMat">Tipo Material <span class="req" aria-hidden="true">*</span></label>
          <select id="lMat"><option ${s.material==='Cabelo humano'?'selected':''}>Cabelo humano</option><option ${s.material==='Pelo de animal'?'selected':''}>Pelo de animal</option><option ${s.material==='Misto'?'selected':''}>Misto</option></select>
        </div>
        <div class="form-group"><label for="lPeso">Peso Inicial (kg) <span class="req" aria-hidden="true">*</span></label>
          <input id="lPeso" type="number" step="0.1" min="0.1" ${maxAttr} value="${reg || ''}" inputmode="decimal" aria-describedby="lPesoHint">
          <div class="hint" id="lPesoHint">${reg > 0 ? `Máx: ${fmt(reg)} kg (peso coletado)` : 'Informe o peso coletado para gerar o lote'}</div>
        </div>
        <div class="form-group"><label for="lStatus">Status inicial</label><input id="lStatus" value="Em Triagem" readonly></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-accent" id="btnGerarLote">Registrar peso e gerar lote</button>
      </div>
    </div>`;
  }

  function pesagemLoteBind(solId, router) {
    const s0 = Store.find('solicitacoes', solId);
    const reg = +s0?.coleta?.peso || 0; // peso registrado na coleta: o teto do que pode virar lote
    const pPeso = document.getElementById('pPeso');
    const lPeso = document.getElementById('lPeso');
    const lHint = document.getElementById('lPesoHint');
    const err = document.getElementById('pesoErr');

    // o lote acompanha o peso coletado: mudou o coletado, muda o teto do lote
    const sincroniza = () => {
      const p = +pPeso.value || 0;
      if (p > 0) {
        lPeso.max = String(p);
        lHint.textContent = `Máx: ${fmt(p)} kg (peso coletado)`;
      } else {
        lPeso.removeAttribute('max');
        lHint.textContent = 'Informe o peso coletado para gerar o lote';
      }
    };
    pPeso.addEventListener('input', sincroniza);
    sincroniza();

    document.getElementById('btnGerarLote').addEventListener('click', () => {
      err.classList.remove('show');
      pPeso.removeAttribute('aria-invalid');
      lPeso.removeAttribute('aria-invalid');
      const falha = (msg, campo) => {
        err.textContent = msg; err.classList.add('show');
        if (campo) { campo.setAttribute('aria-invalid', 'true'); campo.focus(); }
      };
      const peso = +pPeso.value;
      const l = +lPeso.value || peso;

      if (reg <= 0) return falha('Registre a coleta antes de gerar o lote.');
      if (peso <= 0) return falha('Peso deve ser maior que zero', pPeso);
      if (peso > reg) return falha(`Peso coletado (${fmt(peso)} kg) não pode ser maior que o peso registrado na coleta (${fmt(reg)} kg)`, pPeso);
      if (l <= 0) return falha('Peso deve ser maior que zero', lPeso);
      if (l > peso) return falha(`Peso do lote (${fmt(l)} kg) não pode ser maior que o peso coletado (${fmt(peso)} kg)`, lPeso);
      const existente = Store.list('lotes').find(x => x.solId === solId);
      if (existente) return falha(`Esta solicitação já tem o lote ${existente.codigo}.`);

      const s = Store.find('solicitacoes', solId);
      const data = combina(document.getElementById('pData').value, document.getElementById('pHora').value);
      // atualizar coleta com peso
      Store.update('solicitacoes', solId, {
        status: 'Concluída',
        coleta: { data, responsavel: document.getElementById('pResp').value.trim(), peso },
      });
      // gerar lote
      const codigo = document.getElementById('lCodigo').value || Store.gerarCodigoLote();
      const lote = Store.insert('lotes', {
        codigo, solId, material: document.getElementById('lMat').value,
        pesoInicial: l, dataEntrada: data, status: 'Em Triagem',
      });
      Store.insert('movimentacoes', { loteId: lote.id, etapa: 'Coleta', data, responsavel: document.getElementById('pResp').value.trim(), detalhe: `${fmt(peso)} kg coletados` });
      toast(`Lote ${codigo} criado com sucesso!`);
      router.navigate('/coleta/' + solId);
    });
  }

  // ===== TELA 10 — TRIAGEM =====
  function triagem(loteId) {
    const l = Store.find('lotes', loteId);
    if (!l) return `<div class="empty-state">Lote não encontrado.</div>`;
    const tri = Store.find('triagens', Store.list('triagens').find(t=>t.loteId===loteId)?.id);
    return `
    ${backBtn('#/operador')}
    <div class="page-header"><div><h1>Triagem</h1><div class="sub">Lote ${esc(l.codigo)}, status ${badge(l.status)}</div></div></div>
    <div class="stat-grid">
      <div class="stat-card"><div class="num">${fmt(l.pesoInicial)} kg</div><div class="lbl">Peso Inicial</div></div>
      <div class="stat-card accent"><div class="num" id="triAprov">${tri?fmt(tri.aprovado):fmt(0)}</div><div class="lbl">Aprovado</div></div>
      <div class="stat-card alert"><div class="num" id="triRej">${tri?fmt(tri.rejeitado):fmt(0)}</div><div class="lbl">Rejeitado</div></div>
      <div class="stat-card"><div class="num" id="triPerc">${tri?Math.round(tri.aprovado/l.pesoInicial*100)+'%':'0%'}</div><div class="lbl">Aproveitamento</div></div>
    </div>
    <div class="card">
      <h2>Resultado da Triagem</h2>
      ${tri ? `<p>Triagem já registrada em ${esc(dt(tri.data))} por ${esc(tri.responsavel)}.</p>
        <p>Aprovado: <strong>${fmt(tri.aprovado)} kg</strong>, rejeitado: <strong>${fmt(tri.rejeitado)} kg</strong> ${tri.motivo?`(${esc(tri.motivo)})`:''}</p>
        <a class="btn btn-primary" style="margin-top:.7rem" href="#/estoque">Ver Estoque</a>`
      : `
      <form id="triForm">
        <div class="form-grid">
          <div class="form-group"><label for="tAprov">Peso Aprovado (kg) <span class="req" aria-hidden="true">*</span></label><input id="tAprov" type="number" step="0.1" min="0" value="${l.pesoInicial}" inputmode="decimal"></div>
          <div class="form-group"><label for="tRej">Peso Rejeitado (kg)</label><input id="tRej" type="number" step="0.1" min="0" value="0" inputmode="decimal"></div>
          <div class="form-group"><label for="tMotivo">Motivo da Rejeição</label>
            <select id="tMotivo"><option value="">Selecione...</option><option>Contaminado</option><option>Umidade Excessiva</option><option>Tipo Inadequado</option><option>Material Danificado</option><option>Outro</option></select>
          </div>
          <div class="form-group"><label for="tResp">Responsável <span class="req" aria-hidden="true">*</span></label><input id="tResp" value="Maria Santos" required></div>
          <div class="form-group"><label for="tData">Data <span class="req" aria-hidden="true">*</span></label><input id="tData" type="date" value="${hoje()}"></div>
          <div class="form-group"><label for="tHora">Hora <span class="req" aria-hidden="true">*</span></label><input id="tHora" type="time" value="${horaAgora()}"></div>
        </div>
        <div class="progress-row">
          <div class="progress-wrap" role="progressbar" aria-label="Aproveitamento da triagem" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"><div class="progress-fill" id="triBar" style="width:100%"></div></div>
          <span class="progress-val" id="triBarVal">100%</span>
        </div>
        <div class="form-error" id="triErr" role="alert"></div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Registrar triagem</button>
        </div>
      </form>`}
    </div>`;
  }

  function triagemBind(loteId, router) {
    const form = document.getElementById('triForm');
    if (!form) return;
    const upd = () => {
      const l = Store.find('lotes', loteId);
      const a = +document.getElementById('tAprov').value || 0;
      const r = +document.getElementById('tRej').value || 0;
      const total = l.pesoInicial;
      const pct = total > 0 ? Math.round(a / total * 100) : 0;
      document.getElementById('triAprov').textContent = fmt(a);
      document.getElementById('triRej').textContent = fmt(r);
      document.getElementById('triPerc').textContent = pct + '%';
      const bar = document.getElementById('triBar');
      bar.style.width = Math.min(100, pct) + '%';
      document.getElementById('triBarVal').textContent = pct + '%';
      bar.className = 'progress-fill' + (pct < 60 ? ' warn' : '');
      bar.parentElement?.setAttribute('aria-valuenow', String(Math.min(100, pct)));
    };
    ['tAprov','tRej'].forEach(id => document.getElementById(id).addEventListener('input', upd));
    upd();

    form.addEventListener('submit', e => {
      e.preventDefault();
      const l = Store.find('lotes', loteId);
      const a = +document.getElementById('tAprov').value;
      const r = +document.getElementById('tRej').value;
      const motivo = document.getElementById('tMotivo').value;
      const err = document.getElementById('triErr');
      if (a + r !== l.pesoInicial) {
        err.textContent = `Aprovado + Rejeitado deve ser igual ao peso inicial (${fmt(l.pesoInicial)}). Atual: ${fmt(a + r)}`;
        err.classList.add('show'); return;
      }
      if (r > 0 && !motivo) {
        err.textContent = 'Informe o motivo da rejeição'; err.classList.add('show'); return;
      }
      err.classList.remove('show');
      const data = combina(document.getElementById('tData').value, document.getElementById('tHora').value);
      Store.insert('triagens', { loteId, aprovado: a, rejeitado: r, motivo, responsavel: document.getElementById('tResp').value.trim(), data });
      Store.update('lotes', loteId, { status: a > 0 ? 'Em Estoque' : 'Rejeitado' });
      Store.insert('movimentacoes', { loteId, etapa: 'Triagem', data, responsavel: document.getElementById('tResp').value.trim(), detalhe: `${fmt(a)} kg aprovados, ${fmt(r)} kg rejeitados` });
      if (a > 0) Store.insert('movimentacoes', { loteId, etapa: 'Estoque', data, responsavel: '', detalhe: `Entrada: ${fmt(a)} kg` });
      toast('Triagem registrada!');
      router.navigate('/estoque');
    });
  }

  // ===== TELA 11 — ESTOQUE =====
  function estoque() {
    const lotes = Store.list('lotes');
    const emEstoque = lotes.filter(l => Store.loteEmEstoque(l.id) > 0 || l.status === 'Em Estoque');
    const comSaldo = emEstoque.some(l => Store.loteEmEstoque(l.id) > 0);
    const totalKg = emEstoque.reduce((s,l) => s + Store.loteEmEstoque(l.id), 0);
    const porTipo = {};
    emEstoque.forEach(l => { porTipo[l.material] = (porTipo[l.material]||0) + Store.loteEmEstoque(l.id); });
    return `
    <div class="page-header">
      <div><h1>Estoque</h1><div class="sub">Materiais disponíveis</div></div>
      <div class="btn-group">
        <a class="btn btn-outline" href="#/operador">Dashboard</a>
        <a class="btn btn-outline" href="#/rastreio">Rastrear</a>
      </div>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="num">${emEstoque.length}</div><div class="lbl">Lotes em Estoque</div></div>
      <div class="stat-card accent"><div class="num">${fmt(totalKg)} kg</div><div class="lbl">Disponível</div></div>
      ${Object.entries(porTipo).map(([t,kg])=>`<div class="stat-card"><div class="num">${fmt(kg)} kg</div><div class="lbl">${esc(t)}</div></div>`).join('')}
    </div>
    <div class="filter-bar">
      <div class="form-group"><label for="fEstMat">Material</label>
        <select id="fEstMat"><option value="">Todos</option><option>Cabelo humano</option><option>Pelo de animal</option><option>Misto</option></select>
      </div>
    </div>
    <div class="card">
      <div class="list-head">
        <h2>Lotes</h2>
        ${comSaldo ? `<a class="btn btn-primary" href="#/destinacao">Destinar lotes</a>` : ''}
      </div>
      <div class="table-wrap" id="estoqueTable">${renderEstoque(emEstoque)}</div>
    </div>`;
  }

  function renderEstoque(lotes) {
    if (!lotes.length) return `<div class="empty-state"><div class="empty-icon"></div>Nenhum lote em estoque.</div>`;
    return `<table>
      <thead><tr><th>Código</th><th>Material</th><th>Peso Inicial</th><th>Disponível</th><th>Status</th><th></th></tr></thead>
      <tbody>${lotes.map(l => {
        const disp = Store.loteEmEstoque(l.id);
        return `<tr>
          <td data-label="Código"><strong>${esc(l.codigo)}</strong></td><td data-label="Material">${esc(l.material)}</td>
          <td data-label="Peso Inicial">${fmt(l.pesoInicial)} kg</td><td data-label="Disponível"><strong>${fmt(disp)} kg</strong></td>
          <td data-label="Status">${badge(l.status)}</td>
          <td data-label="" class="td-actions">
            <a class="btn btn-sm btn-outline" href="#/rastreio/${l.id}">Rastrear</a>
            ${disp > 0 ? `<a class="btn btn-sm btn-primary" href="#/destinacao/${l.id}">Destinar</a>` : ''}
          </td>
        </tr>`;
      }).join('')}</tbody>
    </table>`;
  }

  function estoqueBind() {
    document.getElementById('fEstMat').addEventListener('change', e => {
      const mat = e.target.value;
      let lotes = Store.list('lotes').filter(l => Store.loteEmEstoque(l.id) > 0 || l.status === 'Em Estoque');
      if (mat) lotes = lotes.filter(l => l.material === mat);
      document.getElementById('estoqueTable').innerHTML = renderEstoque(lotes);
    });
  }

  // ===== TELA 12 — DESTINAÇÃO (consolida vários lotes numa única saída) =====
  function destinacao(loteId) {
    const disponiveis = Store.list('lotes')
      .map(l => ({ l, disp: Store.loteEmEstoque(l.id) }))
      .filter(x => x.disp > 0)
      .sort((a, b) => a.l.id - b.l.id);
    if (!disponiveis.length) return `<div class="empty-state">Nenhum lote disponível para destinar.</div>`;
    const pre = disponiveis.some(x => x.l.id === loteId) ? loteId : null;
    const sel0 = disponiveis.find(x => x.l.id === pre);
    return `
    ${backBtn('#/estoque', 'Voltar ao estoque')}
    <div class="page-header"><div><h1>Destinação</h1><div class="sub">Vários lotes, uma única saída do estoque</div></div></div>
    <div class="card">
      <div class="list-head">
        <h2>Lotes disponíveis</h2>
        <button type="button" class="btn btn-sm btn-outline" id="dTodos" aria-pressed="false">Selecionar todos</button>
      </div>
      <form id="destForm" novalidate>
        <ul class="pick-list">
          ${disponiveis.map(({ l, disp }) => `
          <li class="pick${pre === l.id ? ' on' : ''}">
            <input type="checkbox" class="pick-box" id="dchk-${l.id}" name="dlote" value="${l.id}" ${pre === l.id ? 'checked' : ''}>
            <label class="pick-name" for="dchk-${l.id}">
              <span class="pick-code">${esc(l.codigo)}</span>
              <span class="pick-mat">${esc(l.material)}</span>
            </label>
            <span class="pick-qty">
              <label class="visually-hidden" for="dq-${l.id}">Quantidade do lote ${esc(l.codigo)} em kg</label>
              <input class="pick-input" id="dq-${l.id}" type="number" step="0.1" min="0.1" max="${disp}" value="${disp}" inputmode="decimal" aria-describedby="dqHint-${l.id}">
              <span class="pick-max" id="dqHint-${l.id}">Máx: ${fmt(disp)} kg</span>
            </span>
          </li>`).join('')}
        </ul>
        <p class="pick-resumo" id="dResumo" role="status">${sel0 ? `1 lote selecionado, ${fmt(sel0.disp)} kg` : 'Nenhum lote selecionado'}</p>
        <div class="form-grid">
          <div class="form-group"><label for="dDest">Destino <span class="req" aria-hidden="true">*</span></label>
            <select id="dDest"><option>ONG FioTrar</option><option>Parceiro Autorizado</option><option>Outro</option></select>
          </div>
          <div class="form-group"><label for="dData">Data <span class="req" aria-hidden="true">*</span></label><input id="dData" type="date" value="${hoje()}"></div>
          <div class="form-group"><label for="dHora">Hora <span class="req" aria-hidden="true">*</span></label><input id="dHora" type="time" value="${horaAgora()}"></div>
          <div class="form-group"><label for="dResp">Responsável <span class="req" aria-hidden="true">*</span></label><input id="dResp" value="João Silva"></div>
        </div>
        <div class="form-group"><label for="dObs">Observações</label><textarea id="dObs" rows="2"></textarea></div>
        <div class="form-error" id="destErr" role="alert"></div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Registrar destinação</button>
        </div>
      </form>
    </div>`;
  }

  function destinacaoBind(loteId, router) {
    const form = document.getElementById('destForm');
    if (!form) return; // sem saldo: a tela ficou só com o aviso vazio
    const err = document.getElementById('destErr');
    const resumo = document.getElementById('dResumo');
    const btnTodos = document.getElementById('dTodos');
    const caixas = () => [...form.querySelectorAll('input[name=dlote]')];
    const linhas = () => caixas().map(c => ({
      c, li: c.closest('.pick'), lote: Store.find('lotes', +c.value),
      inp: document.getElementById('dq-' + c.value),
    }));

    // pinta as linhas ligadas e devolve o total consolidado da seleção
    function pinta() {
      const rows = linhas();
      let n = 0, kg = 0;
      rows.forEach(x => {
        x.li.classList.toggle('on', x.c.checked);
        x.inp.disabled = !x.c.checked;
        if (x.c.checked) { n++; kg += +x.inp.value || 0; }
      });
      resumo.textContent = n
        ? `${n} ${n === 1 ? 'lote selecionado' : 'lotes selecionados'}, ${fmt(kg)} kg`
        : 'Nenhum lote selecionado';
      const todas = n === rows.length;
      btnTodos.setAttribute('aria-pressed', String(todas));
      btnTodos.textContent = todas ? 'Limpar seleção' : 'Selecionar todos';
      return { rows, n, kg };
    }

    form.addEventListener('input', pinta);
    form.addEventListener('change', pinta);
    btnTodos.addEventListener('click', () => {
      const ligar = btnTodos.getAttribute('aria-pressed') !== 'true';
      caixas().forEach(c => { c.checked = ligar; });
      pinta();
    });
    pinta();

    form.addEventListener('submit', e => {
      e.preventDefault();
      err.classList.remove('show');
      form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
      const { rows, n, kg } = pinta();
      const falha = (msg, campo) => {
        err.textContent = msg; err.classList.add('show');
        if (campo) { campo.setAttribute('aria-invalid', 'true'); campo.focus(); }
      };
      const sel = rows.filter(x => x.c.checked);
      if (!n) return falha('Selecione ao menos um lote para destinar.', caixas()[0]);
      if (!document.getElementById('dResp').value.trim()) return falha('Informe o responsável pela destinação.', document.getElementById('dResp'));
      const data = combina(document.getElementById('dData').value, document.getElementById('dHora').value);
      if (!data) return falha('Informe a data e a hora da destinação.', document.getElementById('dData'));
      // nada além do que existe: cada quantidade é conferida contra o saldo do lote
      for (const x of sel) {
        const disp = Store.loteEmEstoque(x.lote.id);
        const q = +x.inp.value;
        if (!(q > 0)) return falha(`Quantidade do lote ${x.lote.codigo} deve ser maior que zero.`, x.inp);
        if (q > disp + 1e-9) return falha(`Quantidade do lote ${x.lote.codigo} (${fmt(q)} kg) não pode ser maior que o disponível (${fmt(disp)} kg).`, x.inp);
      }

      const destino = document.getElementById('dDest').value;
      const responsavel = document.getElementById('dResp').value.trim();
      const obs = document.getElementById('dObs').value;
      const regs = sel.map(x => Store.insert('destinacoes', {
        loteId: x.lote.id, destino, data, qtd: +x.inp.value, responsavel, obs,
      }));
      // mesma origem para todas as saídas de uma destinação consolidada
      if (regs.length > 1) regs.forEach(r => Store.update('destinacoes', r.id, { grupo: regs[0].id }));
      sel.forEach(x => {
        Store.update('lotes', x.lote.id, { status: 'Destinado' });
        Store.insert('movimentacoes', {
          loteId: x.lote.id, etapa: 'Destinação', data, responsavel,
          detalhe: `→ ${destino} (${fmt(+x.inp.value)} kg${regs.length > 1 ? `, saída consolidada de ${regs.length} lotes` : ''})`,
        });
      });
      toast(`Destinação registrada! ${n} ${n === 1 ? 'lote' : 'lotes'}, ${fmt(kg)} kg`);
      router.navigate('/estoque');
    });
  }

  // ===== TELA 13 — RASTREABILIDADE =====
  function rastreio(loteId) {
    const lotes = meusLotes();
    const l = loteId ? lotes.find(x => x.id === loteId) : null;
    return `
    <div class="page-header"><div><h1>Rastreabilidade</h1><div class="sub">Passaporte do material: busca por código</div></div>
      <a class="btn btn-outline" href="#/operador">Dashboard</a></div>
    <div class="search-box">
      <label class="visually-hidden" for="buscaLote">Código do lote</label>
      <input id="buscaLote" placeholder="FT-2026-000001" value="${l ? esc(l.codigo) : ''}" inputmode="text" autocapitalize="characters">
      <button class="btn btn-primary" id="btnBusca">Buscar</button>
    </div>
    <div id="rastResult">
      ${l ? renderTimeline(l) : `<div class="card"><div class="empty-state"><div class="empty-icon"></div>Digite o código de um lote ou escolha abaixo.</div></div>`}
    </div>
    ${!loteId && lotes.length ? `
    <div class="card"><h2>Lotes disponíveis</h2>
      <div class="btn-group">${lotes.map(x=>`<a class="btn btn-sm btn-outline code-btn" href="#/rastreio/${x.id}">${esc(x.codigo)}</a>`).join('')}</div>
    </div>` : ''}`;
  }

  function renderTimeline(l) {
    const sol = Store.find('solicitacoes', l.solId);
    const p = sol ? getParceiro(sol.parceiroId) : null;
    const tri = Store.list('triagens').find(t => t.loteId === l.id);
    const dest = Store.list('destinacoes').filter(d => d.loteId === l.id);
    // quantas saídas compartilham a mesma origem (destinação consolidada)
    const conj = d => (d.grupo ? Store.list('destinacoes').filter(x => x.grupo === d.grupo).length : 0);
    const movs = Store.list('movimentacoes').filter(m => m.loteId === l.id);
    const disp = Store.loteEmEstoque(l.id);

    const etapas = [];
    etapas.push({ title: 'Origem', date: dt(sol?.criadoEm), detail: p ? `${esc(p.nome)}, ${esc(p.rua)}, ${esc(p.municipio)} (${esc(p.tipo)})` : 'Parceiro não informado', done: !!p });
    etapas.push({ title: 'Coleta', date: dt(sol?.coleta?.data), detail: sol?.coleta ? `${esc(sol.coleta.responsavel)}, ${fmt(sol.coleta.peso)} kg` : 'Aguardando coleta', done: !!sol?.coleta });
    etapas.push({ title: 'Transporte', date: dt(sol?.coleta?.data), detail: sol?.coleta ? `Rota: ${esc(p?.municipio)} para o Centro de Triagem` : 'Rota pendente', done: !!sol?.coleta });
    etapas.push({ title: 'Recebimento', date: dt(l.dataEntrada), detail: `Centro de Triagem, ${fmt(l.pesoInicial)} kg`, done: true });
    etapas.push({ title: 'Triagem', date: dt(tri?.data), detail: tri ? `${fmt(tri.aprovado)} kg aprovados, ${fmt(tri.rejeitado)} kg rejeitados${tri.motivo ? ' (' + esc(tri.motivo) + ')' : ''}, responsável ${esc(tri.responsavel)}` : 'Pendente', done: !!tri });
    etapas.push({ title: 'Estoque', date: dt(tri?.data), detail: tri ? `Disponível: ${fmt(disp)} kg` : 'Aguardando triagem', done: !!tri });
    etapas.push({ title: 'Destinação', date: dt(dest.length ? dest[dest.length-1].data : null), detail: dest.length ? dest.map(d=>`${esc(d.destino)} (${fmt(d.qtd)} kg em ${esc(dt(d.data))}${conj(d) > 1 ? `, saída consolidada de ${conj(d)} lotes` : ''})`).join('<br>') : 'Pendente', done: dest.length > 0 });

    return `
    <div class="card">
      <h2>${esc(l.codigo)}</h2>
      <p class="passport-meta">Tipo: <strong>${esc(l.material)}</strong>, peso inicial <strong>${fmt(l.pesoInicial)} kg</strong>, status ${badge(l.status)}</p>
      <div class="timeline" style="margin-top:1rem">
        ${etapas.map(e => `
          <div class="tl-item ${e.done ? '' : 'pending'}">
            <div class="tl-title">${e.title}</div>
            ${e.date ? `<div class="tl-date">${esc(e.date)}</div>` : ''}
            <div class="tl-detail">${e.detail}</div>
          </div>`).join('')}
      </div>
      <div class="passport-stamp">
        <strong>Passaporte do material</strong>
        <span>${etapas.every(e=>e.done) ? 'rastreabilidade completa' : 'em andamento'}</span>
      </div>
    </div>
    ${tri ? `<div class="card"><h2>Detalhes da Triagem</h2>
      <div class="form-grid">
        <div><strong>Aprovado:</strong> ${fmt(tri.aprovado)} kg</div>
        <div><strong>Rejeitado:</strong> ${fmt(tri.rejeitado)} kg</div>
        <div><strong>Motivo:</strong> ${esc(tri.motivo || 'não informado')}</div>
        <div><strong>Responsável:</strong> ${esc(tri.responsavel)}</div>
        <div><strong>Data e Hora:</strong> ${esc(dt(tri.data))}</div>
        <div><strong>Aproveitamento:</strong> ${Math.round(tri.aprovado/l.pesoInicial*100)}%</div>
      </div></div>` : ''}`;
  }

  function rastreioBind() {
    const buscar = () => {
      const q = document.getElementById('buscaLote').value.trim().toUpperCase();
      const l = meusLotes().find(x => x.codigo.toUpperCase() === q || String(x.id) === q);
      const res = document.getElementById('rastResult');
      if (l) res.innerHTML = renderTimeline(l);
      else res.innerHTML = `<div class="card"><div class="empty-state"><div class="empty-icon"></div>Lote não encontrado: "${esc(q)}"</div></div>`;
    };
    document.getElementById('btnBusca').addEventListener('click', buscar);
    document.getElementById('buscaLote').addEventListener('keydown', e => { if (e.key === 'Enter') buscar(); });
  }

  // ===== TELA 14 — INDICADORES (GESTOR) =====
  function indicadores() {
    const ind = Store.indicadores();
    return `
    <div class="page-header">
      <div><h1>Indicadores da Operação</h1><div class="sub">Visão geral da FioTrack</div></div>
      <div class="btn-group">
        <a class="btn btn-outline" href="#/operador">Painel</a>
        <a class="btn btn-outline" href="#/rastreio">Rastrear</a>
      </div>
    </div>
    <div class="card">
      <h2>Logísticos</h2>
      <div class="stat-grid">
        <div class="stat-card"><div class="num">${ind.pontosCadastrados}</div><div class="lbl">Pontos Cadastrados</div></div>
        <div class="stat-card accent"><div class="num">${ind.pontosAtivos}</div><div class="lbl">Pontos Ativos</div></div>
        <div class="stat-card accent"><div class="num">${ind.coletasRealizadas}</div><div class="lbl">Coletas Realizadas</div></div>
        <div class="stat-card alert"><div class="num">${ind.coletasPendentes}</div><div class="lbl">Coletas Pendentes</div></div>
        <div class="stat-card"><div class="num">${fmt(ind.pesoColetado)} kg</div><div class="lbl">Peso Coletado</div></div>
      </div>
    </div>
    <div class="card">
      <h2>Ambientais</h2>
      <div class="stat-grid">
        <div class="stat-card accent"><div class="num">${fmt(ind.kgDesviado)} kg</div><div class="lbl">Desviados do Descarte</div></div>
        <div class="stat-card"><div class="num">${fmt(ind.kgAprovado)} kg</div><div class="lbl">Preparados (aprovados)</div></div>
        <div class="stat-card accent"><div class="num">${fmt(ind.kgDestinado)} kg</div><div class="lbl">Destinados</div></div>
        <div class="stat-card"><div class="num">${ind.lotesTotal}</div><div class="lbl">Lotes</div></div>
        <div class="stat-card"><div class="num">${ind.acoesAmbientais}</div><div class="lbl">Ações Atendidas</div></div>
        <div class="stat-card"><div class="num">${fmt(ind.emEstoque)} kg</div><div class="lbl">Em Estoque</div></div>
      </div>
    </div>
    <div class="card">
      <h2>Qualidade</h2>
      <div class="stat-grid">
        <div class="stat-card accent"><div class="num">${fmt(ind.kgAprovado)} kg</div><div class="lbl">Material Aprovado (${ind.aproveitamento}%)</div></div>
        <div class="stat-card alert"><div class="num">${fmt(ind.kgRejeitado)} kg</div><div class="lbl">Material Rejeitado</div></div>
      </div>
      <div class="progress-row"><div class="progress-wrap"><div class="progress-fill ${ind.aproveitamento<60?'warn':''}" style="width:${ind.aproveitamento}%"></div></div><span class="progress-val">${ind.aproveitamento}% aprovado</span></div>
      ${ind.motivosRejeicao.length ? `
      <h3 style="margin-top:1rem">Motivos de Rejeição</h3>
      <div class="bar-chart">
        ${ind.motivosRejeicao.map(m => {
          const max = Math.max(...ind.motivosRejeicao.map(x=>x.kg), 1);
          return `<div class="bar-row"><span class="bar-label">${esc(m.motivo)}</span><span class="bar-val">${fmt(m.kg)} kg</span><div class="bar-track"><div class="bar-fill danger" style="width:${m.kg/max*100}%"></div></div></div>`;
        }).join('')}
      </div>` : ''}
    </div>`;
  }

  // ===== TELA 15 — CONTRIBUIÇÕES DO PARCEIRO =====
  function contribuicoes() {
    const sess = Store.session();
    const pid = sess?.parceiroId;
    if (!pid) return `<div class="empty-state">Sessão de parceiro necessária.</div>`;
    const c = Store.contribuicoes(pid);
    const p = getParceiro(pid);
    return `
    ${backBtn('#/parceiro')}
    <div class="page-header"><div><h1>Minhas Contribuições</h1><div class="sub">${esc(p?.nome)}, desde ${esc(dt(p?.criadoEm))}</div></div></div>
    <div class="stat-grid">
      <div class="stat-card"><div class="num">${c.coletas}</div><div class="lbl">Coletas Realizadas</div></div>
      <div class="stat-card accent"><div class="num">${fmt(c.peso)} kg</div><div class="lbl">Total Contribuído</div></div>
      <div class="stat-card"><div class="num">${c.lotes}</div><div class="lbl">Lotes Gerados</div></div>
    </div>
    <div class="card card--impact">
      <h2>Impacto Ambiental</h2>
      <p>Você contribuiu com <strong>${fmt(c.peso)} kg</strong> de fios para limpar o nosso litoral!</p>
      <p class="u-mt-s note">Cada coleta contribui para o nosso ambiente</p>
    </div>
    <div class="card">
      <h2>Histórico de Contribuições</h2>
      ${c.detalhes.length === 0 ? `<div class="empty-state"><div class="empty-icon"></div>Nenhuma contribuição ainda.</div>` : `
      <div class="table-wrap"><table>
        <thead><tr><th>Protocolo</th><th>Data e Hora</th><th>Material</th><th>Peso</th><th>Status</th></tr></thead>
        <tbody>${c.detalhes.slice().reverse().map(s=>`
          <tr><td data-label="Protocolo"><strong>${esc(s.protocolo)}</strong></td><td data-label="Data e Hora">${esc(dt(s.coleta?.data || s.criadoEm))}</td>
          <td data-label="Material">${esc(s.material)}</td><td data-label="Peso">${fmt(s.coleta?.peso||0)} kg</td><td data-label="Status">${badge(s.status)}</td></tr>`).join('')}
        </tbody>
      </table></div>`}
    </div>`;
  }

  // ===== 404 =====
  function notFound() {
    return `<div class="empty-state" style="padding-top:4rem"><div class="empty-icon"></div><h1>Página não encontrada</h1><a class="btn btn-primary" style="margin-top:1rem" href="#/">Voltar ao início</a></div>`;
  }

  return { login, loginBind, cadastro, cadastroBind,
    cadastroParceiroPublico, cadastroParceiroPublicoBind,
    listaParceiros, aprovacoes, aprovacoesBind, caixaEmails,
    solicitacao, solicitacaoBind,
    dashboardParceiro, listaColetas, listaColetasBind, detalheColeta, detalheColetaBind,
    dashboardOperador, pesagemLote, pesagemLoteBind, triagem, triagemBind,
    estoque, estoqueBind, destinacao, destinacaoBind, rastreio, rastreioBind,
    indicadores, contribuicoes, notFound, toast };
})();
