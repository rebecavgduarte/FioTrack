/* FioTrack — Camada de dados (localStorage) */
const Store = (() => {
  const KEY = 'fiotrack_db';

  const defaults = () => ({
    parceiros: [],
    pontosColeta: [],
    solicitacoes: [],   // ~ coletas
    lotes: [],
    triagens: [],
    movimentacoes: [],
    destinacoes: [],
    emails: [],         // caixa de saída simulada (avisos aos parceiros)
    seq: { sol: 0, lote: 0 },
    session: null,
  });

  let db;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      db = raw ? JSON.parse(raw) : defaults();
    } catch { db = defaults(); }
    // garantir campos novos
    const d = defaults();
    for (const k of Object.keys(d)) if (!(k in db)) db[k] = d[k];
    migrarHoras();
    migrarPerfis();
  }

  // Migração: o perfil "operador" foi removido (restam apenas parceiro e gestor).
  // Dados antigos com usuários operadores são limpos e a sessão volta ao login.
  function migrarPerfis() {
    if (!Array.isArray(db.usuarios)) return;
    if (!db.usuarios.some(u => u.perfil === 'operador')) return;
    db.usuarios = db.usuarios.filter(u => u.perfil !== 'operador');
    if (db.session && db.session.perfil === 'operador') db.session = null;
    if (!db.usuarios.length) seedUsuarios();
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(db));
  }

  // ---- DATA E HORA ----
  // Todo registro guarda YYYY-MM-DDTHH:MM; valores só com data ganham uma hora
  // determinística (mesmo registro, mesma hora) para não inventar horários iguais.
  const CAMPOS_DATA = {
    parceiros: ['criadoEm'],
    solicitacoes: ['criadoEm', 'dataDesejada', 'coleta.data'],
    lotes: ['dataEntrada'],
    triagens: ['data'],
    destinacoes: ['data'],
    movimentacoes: ['data'],
  };
  const horaDoRegistro = id => {
    const n = Number(id) || 1;
    return String(7 + ((n * 3) % 10)).padStart(2, '0') + ':' + String((n * 17) % 60).padStart(2, '0');
  };
  const comHora = (valor, id) =>
    typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(valor) ? `${valor}T${horaDoRegistro(id)}` : valor;

  function migrarHoras() {
    for (const [coll, campos] of Object.entries(CAMPOS_DATA)) {
      for (const item of db[coll] || []) {
        for (const campo of campos) {
          const [a, b] = campo.split('.');
          const alvo = b ? item[a] : item;
          const chave = b || campo;
          if (alvo && chave in alvo) alvo[chave] = comHora(alvo[chave], item.id);
        }
      }
    }
  }

  function reset() {
    localStorage.removeItem(KEY);
    load();
    seed();
    save();
  }

  // ---- SEED (dados de demonstração) ----
  function seed() {
    if (db.parceiros.length) return;

    const p1 = { id: 1, nome: 'Salão da Gina', tipo: 'Salão', documento: '12.345.678/0001-90',
      telefone: '(22) 99999-8888', email: 'contato@salaodagina.com', rua: 'Rua das Flores, 123',
      bairro: 'Centro', municipio: 'Maricá', cep: '28900-000', status: 'Ativo',
      criadoEm: '2026-10-01' };
    const p2 = { id: 2, nome: 'Barbearia do Todd', tipo: 'Barbearia', documento: '98.765.432/0001-10',
      telefone: '(22) 98888-7777', email: ' todd@barbearia.com', rua: 'Av. Central, 456',
      bairro: 'Centro', municipio: 'Maricá', cep: '28900-001', status: 'Ativo',
      criadoEm: '2026-10-01' };
    const p3 = { id: 3, nome: 'PriPet shop', tipo: 'Pet Shop', documento: '45.678.912/0001-30',
      telefone: '(22) 97777-6666', email: 'pripet@pet.com', rua: 'Rua do Mar, 789',
      bairro: 'Praia', municipio: 'Maricá', cep: '28900-002', status: 'Ativo',
      criadoEm: '2026-10-02' };
    // cadastro público aguardando autorização no painel do gestor
    const p4 = { id: 4, nome: 'Studio Bela Trama', tipo: 'Salão', documento: '21.445.789/0001-05',
      telefone: '(22) 96666-5555', email: 'contato@belatrama.com', rua: 'Rua do Comércio, 45',
      bairro: 'Centro', municipio: 'Maricá', cep: '28900-003', status: 'Pendente',
      criadoEm: '2026-10-15' };
    db.parceiros.push(p1, p2, p3, p4);
    db.seq.parceiros = 4;

    // Usuários demo (apenas parceiro e gestor — o perfil operador foi removido)
    seedUsuarios();

    // Solicitações de exemplo
    const sols = [
      { id: 1, protocolo: 'SOL-0001', parceiroId: 1, material: 'Cabelo humano', qtdEstimada: 2.5,
        dataDesejada: '2026-10-05', observacao: 'Material em sacos', status: 'Concluída',
        criadoEm: '2026-10-01', coleta: { data: '2026-10-05', responsavel: 'João Silva', peso: 2.5 } },
      { id: 2, protocolo: 'SOL-0002', parceiroId: 2, material: 'Cabelo humano', qtdEstimada: 1.8,
        dataDesejada: '2026-10-08', observacao: '', status: 'Concluída',
        criadoEm: '2026-10-04', coleta: { data: '2026-10-08', responsavel: 'João Silva', peso: 1.8 } },
      { id: 3, protocolo: 'SOL-0003', parceiroId: 3, material: 'Pelo de animal', qtdEstimada: 3.0,
        dataDesejada: '2026-10-10', observacao: 'Tosa semanal', status: 'Concluída',
        criadoEm: '2026-10-07', coleta: { data: '2026-10-10', responsavel: 'Paula Duarte', peso: 3.0 } },
      { id: 4, protocolo: 'SOL-0004', parceiroId: 1, material: 'Cabelo humano', qtdEstimada: 4.2,
        dataDesejada: '2026-10-15', observacao: '', status: 'Pendente', criadoEm: '2026-10-12' },
      { id: 5, protocolo: 'SOL-0005', parceiroId: 2, material: 'Cabelo humano', qtdEstimada: 2.5,
        dataDesejada: '2026-10-16', observacao: 'Material separado', status: 'Pendente', criadoEm: '2026-10-13' },
      { id: 6, protocolo: 'SOL-0006', parceiroId: 3, material: 'Misto', qtdEstimada: 1.5,
        dataDesejada: '2026-10-17', observacao: '', status: 'Pendente', criadoEm: '2026-10-14' },
    ];
    db.solicitacoes = sols;
    db.seq.solicitacoes = 6;

    // Lotes das coletas concluídas (1,2,3)
    const lotes = [
      { id: 1, codigo: 'FT-2026-000001', solId: 1, material: 'Cabelo humano', pesoInicial: 2.5,
        dataEntrada: '2026-10-05', status: 'Destinado' },
      { id: 2, codigo: 'FT-2026-000002', solId: 2, material: 'Cabelo humano', pesoInicial: 1.8,
        dataEntrada: '2026-10-08', status: 'Destinado' },
      { id: 3, codigo: 'FT-2026-000003', solId: 3, material: 'Pelo de animal', pesoInicial: 3.0,
        dataEntrada: '2026-10-10', status: 'Em Estoque' },
    ];
    db.lotes = lotes;
    db.seq.lotes = 3;

    // Triagens
    db.triagens = [
      { id: 1, loteId: 1, aprovado: 2.0, rejeitado: 0.5, motivo: 'Contaminado',
        responsavel: 'Maria Santos', data: '2026-10-06' },
      { id: 2, loteId: 2, aprovado: 1.6, rejeitado: 0.2, motivo: 'Umidade Excessiva',
        responsavel: 'Maria Santos', data: '2026-10-09' },
      { id: 3, loteId: 3, aprovado: 3.0, rejeitado: 0, motivo: '',
        responsavel: 'Maria Santos', data: '2026-10-11' },
    ];
    db.seq.triagens = 3;

    // Destinações (lotes 1 e 2 destinados)
    db.destinacoes = [
      { id: 1, loteId: 1, destino: 'ONG FioTrar', data: '2026-10-12', qtd: 2.0,
        responsavel: 'João Silva', obs: '' },
      { id: 2, loteId: 2, destino: 'ONG FioTrar', data: '2026-10-14', qtd: 1.6,
        responsavel: 'João Silva', obs: '' },
    ];
    db.seq.destinacoes = 2;

    // Movimentações (histórico)
    db.movimentacoes = [
      { id: 1, loteId: 1, etapa: 'Coleta', data: '2026-10-05', responsavel: 'João Silva', detalhe: '2.5 kg coletados' },
      { id: 2, loteId: 1, etapa: 'Recebimento', data: '2026-10-05', responsavel: 'Maria Santos', detalhe: 'Conferido no centro' },
      { id: 3, loteId: 1, etapa: 'Triagem', data: '2026-10-06', responsavel: 'Maria Santos', detalhe: '2.0 kg aprovados, 0.5 kg rejeitados' },
      { id: 4, loteId: 1, etapa: 'Estoque', data: '2026-10-06', responsavel: '', detalhe: 'Entrada: 2.0 kg' },
      { id: 5, loteId: 1, etapa: 'Destinação', data: '2026-10-12', responsavel: 'João Silva', detalhe: '→ ONG FioTrar (2.0 kg)' },
      { id: 6, loteId: 2, etapa: 'Coleta', data: '2026-10-08', responsavel: 'João Silva', detalhe: '1.8 kg coletados' },
      { id: 7, loteId: 2, etapa: 'Triagem', data: '2026-10-09', responsavel: 'Maria Santos', detalhe: '1.6 kg aprovados, 0.2 kg rejeitados' },
      { id: 8, loteId: 2, etapa: 'Estoque', data: '2026-10-09', responsavel: '', detalhe: 'Entrada: 1.6 kg' },
      { id: 9, loteId: 2, etapa: 'Destinação', data: '2026-10-14', responsavel: 'João Silva', detalhe: '→ ONG FioTrar (1.6 kg)' },
      { id: 10, loteId: 3, etapa: 'Coleta', data: '2026-10-10', responsavel: 'Ana Costa', detalhe: '3.0 kg coletados' },
      { id: 11, loteId: 3, etapa: 'Triagem', data: '2026-10-11', responsavel: 'Maria Santos', detalhe: '3.0 kg aprovados' },
      { id: 12, loteId: 3, etapa: 'Estoque', data: '2026-10-11', responsavel: '', detalhe: 'Entrada: 3.0 kg' },
    ];
    db.seq.movimentacoes = 12;
    db.seq.pontosColeta = 0;
    migrarHoras(); // registros novos já saem com data e hora
  }

  // Usuários de demonstração (somente parceiro e gestor)
  function seedUsuarios() {
    if (db.usuarios && db.usuarios.length) return;
    db.usuarios = [
      { id: 2, nome: 'Gestor Rebeca', email: 'gestor@fiotrack.com', senha: 'demo', perfil: 'gestor' },
      { id: 3, nome: 'Salão da Gina', email: 'parceiro@fiotrack.com', senha: 'demo', perfil: 'parceiro', parceiroId: 1 },
    ];
    db.seq.usuarios = Math.max(db.seq.usuarios || 0, 3);
  }

  // ---- APROVAÇÃO DE PARCEIROS (cadastro público) ----
  const agoraISO = () => {
    const d = new Date(), p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
  };

  // senha aleatória forte: maiúsculas, minúsculas, números e símbolos, 14 caracteres
  function senhaForte(len = 14) {
    const mai = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // sem I/O (evita confusão visual)
    const min = 'abcdefghjkmnpqrstuvwxyz';
    const num = '23456789';
    const sym = '!@#$%&*?+-=';
    const todos = mai + min + num + sym;
    const sorteio = n => {
      const buf = new Uint32Array(1);
      if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(buf);
      else buf[0] = Math.floor(Math.random() * 4294967296);
      return buf[0] % n;
    };
    const puxar = s => s[sorteio(s.length)];
    const chars = [puxar(mai), puxar(min), puxar(num), puxar(sym)];
    while (chars.length < len) chars.push(puxar(todos));
    for (let i = chars.length - 1; i > 0; i--) {
      const j = sorteio(i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
  }

  // Aprova o cadastro pendente: cria o usuário (e-mail = login), gera senha forte
  // e registra o e-mail de boas-vindas na caixa de saída (simulada).
  function aprovarParceiro(id) {
    const p = find('parceiros', id);
    if (!p || p.status !== 'Pendente') return null;
    const email = String(p.email || '').trim();
    if (!email) return null;
    if ((db.usuarios || []).some(u => u.email === email)) return null;

    const senha = senhaForte();
    const usuario = insert('usuarios', { nome: p.nome, email, senha, perfil: 'parceiro', parceiroId: p.id });
    update('parceiros', id, { status: 'Ativo', aprovadoEm: agoraISO() });
    const mail = insert('emails', {
      para: email,
      assunto: 'FioTrack — cadastro de parceiro aprovado',
      corpo: [
        `Olá, ${p.nome}!`,
        '',
        'Seu cadastro como parceiro FioTrack foi aprovado. Confira seus dados de acesso:',
        '',
        `Usuário (e-mail): ${email}`,
        `Senha provisória: ${senha}`,
        '',
        'Entre no app FioTrack com este usuário e senha e troque a senha assim que possível.',
        '',
        'Equipe FioTrack',
      ].join('\n'),
      enviadoEm: agoraISO(),
      tipo: 'aprovacao',
      usuarioId: usuario.id,
    });
    return { senha, mail };
  }

  // ---- CRUD genérico ----
  function nextId(coll) {
    db.seq[coll] = (db.seq[coll] || 0) + 1;
    return db.seq[coll];
  }

  function insert(coll, obj) {
    obj.id = nextId(coll);
    // garante código do lote sempre único e coerente com o id
    if (coll === 'lotes') obj.codigo = 'FT-2026-' + String(obj.id).padStart(6, '0');
    db[coll].push(obj);
    save();
    return obj;
  }

  function update(coll, id, patch) {
    const item = db[coll].find(x => x.id === id);
    if (item) { Object.assign(item, patch); save(); }
    return item;
  }

  function remove(coll, id) {
    const i = db[coll].findIndex(x => x.id === id);
    if (i >= 0) { db[coll].splice(i, 1); save(); }
  }

  function list(coll) { return db[coll] || []; }
  function find(coll, id) { return (db[coll] || []).find(x => x.id === id); }

  // ---- Autenticação ----
  function login(email, senha) {
    const u = (db.usuarios || []).find(x => x.email === email && x.senha === senha);
    if (u) { db.session = { userId: u.id, nome: u.nome, perfil: u.perfil, parceiroId: u.parceiroId }; save(); }
    return u || null;
  }
  function logout() { db.session = null; save(); }
  function session() { return db.session; }

  // ---- Helpers de negócio ----
  function gerarCodigoLote() {
    // apenas prevê o próximo código (sem incrementar); o insert('lotes') incrementa
    const n = (db.seq.lotes || 0) + 1;
    return 'FT-2026-' + String(n).padStart(6, '0');
  }

  function formatarCodigoLote(id) {
    return 'FT-2026-' + String(id).padStart(6, '0');
  }

  function loteEmEstoque(loteId) {
    const lote = find('lotes', loteId);
    if (!lote) return 0;
    const tri = db.triagens.filter(t => t.loteId === loteId);
    const aprovado = tri.reduce((s, t) => s + (t.aprovado || 0), 0);
    const dest = db.destinacoes.filter(d => d.loteId === loteId);
    const saida = dest.reduce((s, d) => s + (d.qtd || 0), 0);
    return Math.max(0, aprovado - saida);
  }

  function indicadores() {
    const sols = db.solicitacoes;
    const coletas = sols.filter(s => s.status === 'Concluída');
    const pendentes = sols.filter(s => s.status === 'Pendente');
    const pesoColetado = coletas.reduce((s, c) => s + (c.coleta?.peso || 0), 0);
    const lotesTotal = db.lotes.length;
    const tri = db.triagens;
    const aprovado = tri.reduce((s, t) => s + (t.aprovado || 0), 0);
    const rejeitado = tri.reduce((s, t) => s + (t.rejeitado || 0), 0);
    const destinacoes = db.destinacoes;
    const kgDestinado = destinacoes.reduce((s, d) => s + (d.qtd || 0), 0);
    const emEstoque = db.lotes.reduce((s, l) => s + loteEmEstoque(l.id), 0);

    return {
      pontosCadastrados: db.parceiros.length,
      pontosAtivos: db.parceiros.filter(p => p.status === 'Ativo').length,
      coletasRealizadas: coletas.length,
      coletasPendentes: pendentes.length,
      pesoColetado: +pesoColetado.toFixed(2),
      lotesTotal,
      kgDesviado: +pesoColetado.toFixed(2),
      kgAprovado: +aprovado.toFixed(2),
      kgRejeitado: +rejeitado.toFixed(2),
      kgDestinado: +kgDestinado.toFixed(2),
      emEstoque: +emEstoque.toFixed(2),
      aproveitamento: aprovado + rejeitado > 0 ? Math.round(aprovado / (aprovado + rejeitado) * 100) : 0,
      motivosRejeicao: motivosRejeicao(),
      acoesAmbientais: new Set(destinacoes.map(d => d.destino)).size,
    };
  }

  function motivosRejeicao() {
    const map = {};
    db.triagens.forEach(t => { if (t.motivo && t.rejeitado > 0) map[t.motivo] = (map[t.motivo] || 0) + t.rejeitado; });
    return Object.entries(map).map(([motivo, kg]) => ({ motivo, kg: +kg.toFixed(2) }));
  }

  function contribuicoes(parceiroId) {
    const sols = db.solicitacoes.filter(s => s.parceiroId === parceiroId && s.status === 'Concluída');
    const peso = sols.reduce((s, c) => s + (c.coleta?.peso || 0), 0);
    const lotes = db.lotes.filter(l => sols.some(s => s.id === l.solId));
    return { coletas: sols.length, peso: +peso.toFixed(2), lotes: lotes.length, detalhes: sols };
  }

  load();
  if (!db.usuarios || !db.usuarios.length) seed();
  save();

  return { list, find, insert, update, remove, login, logout, session,
           gerarCodigoLote, loteEmEstoque, indicadores, contribuicoes,
           aprovarParceiro, senhaForte, reset, save };
})();

