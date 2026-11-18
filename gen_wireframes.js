/* Gera wireframes low-fidelity (SVG) das 15 telas do FioTrack */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve('wireframes/svg');
fs.mkdirSync(OUT, { recursive: true });

const W = 1200, H = 820;
const GRAY = { line: '#9aa0a6', text: '#5f6368', fill: '#f1f3f4', dark: '#dadce0', accent: '#bdc1c6' };

// helpers
const rect = (x, y, w, h, opts = '') => {
  const fill = /fill="/.test(opts) ? '' : `fill="${GRAY.fill}"`;
  const stroke = /stroke=/.test(opts) ? '' : `stroke="${GRAY.line}" stroke-width="2"`;
  const rx = /rx="/.test(opts) ? '' : 'rx="6"';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${fill} ${stroke} ${rx} ${opts}/>`;
};
const line = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="9" rx="4" fill="${GRAY.dark}"/>`;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const text = (x, y, s, size = 15, anchor = 'start', weight = '600') =>
  `<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" fill="${GRAY.text}" text-anchor="${anchor}" font-weight="${weight}">${esc(s)}</text>`;
const title = (s) => text(260, 42, s, 22, 'start', '700');
const badge = (x, y, s) => `<g>${rect(x, y, 90, 26, 'rx="13"')}${text(x + 45, y + 18, s, 12, 'middle', '600')}</g>`;
const img = (x, y, w, h) => `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${GRAY.fill}" stroke="${GRAY.line}" stroke-width="2" rx="6"/><line x1="${x}" y1="${y}" x2="${x + w}" y2="${y + h}" stroke="${GRAY.line}" stroke-width="2"/><line x1="${x + w}" y1="${y}" x2="${x}" y2="${y + h}" stroke="${GRAY.line}" stroke-width="2"/></g>`;
const btn = (x, y, w, s, primary = true) => `<g><rect x="${x}" y="${y}" width="${w}" height="40" rx="8" fill="${primary ? GRAY.accent : '#fff'}" stroke="${GRAY.line}" stroke-width="2"/>${text(x + w / 2, y + 26, s, 14, 'middle', '700')}</g>`;

function sidebar(active = '') {
  const links = ['Início', 'Solicitação', 'Coletas', 'Estoque', 'Rastrear', 'Indicadores', 'Contribuições'];
  let g = `<rect x="0" y="0" width="230" height="${H}" fill="#e8eaed"/>`;
  g += text(20, 45, '🌊 FIO TRACK', 18, 'start', '800');
  g += `<line x1="15" y1="65" x2="215" y2="65" stroke="${GRAY.dark}" stroke-width="2"/>`;
  links.forEach((l, i) => {
    const y = 95 + i * 44;
    if (l === active) g += `<rect x="10" y="${y - 24}" width="210" height="36" rx="8" fill="${GRAY.dark}"/>`;
    g += text(28, y, '▸ ' + l, 14, 'start', l === active ? '700' : '400');
  });
  g += `<line x1="15" y1="${H - 70}" x2="215" y2="${H - 70}" stroke="${GRAY.dark}" stroke-width="2"/>`;
  g += text(20, H - 40, 'Operador João', 14, 'start', '700');
  g += rect(20, H - 30, 190, 30, 'rx="6"');
  g += text(115, H - 10, 'Sair', 12, 'middle', '600');
  return g;
}

function svg(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#fff"/>${inner}</svg>`;
}

const screens = {};

// 01 LOGIN
screens['01-login'] = svg(`
${rect(390, 70, 420, 660)}
${img(555, 110, 90, 90)}
${text(600, 235, 'FIO TRACK', 26, 'middle', '800')}
${text(600, 262, 'Transformando fios em proteção...', 13, 'middle', '400')}
${text(430, 320, 'E-mail *', 14)}
${rect(430, 335, 340, 44)}
${text(445, 363, 'usuario@email.com', 13, 'start', '400')}
${text(430, 420, 'Senha *', 14)}
${rect(430, 435, 340, 44)}
${text(445, 463, '••••••••', 13, 'start', '400')}
${btn(430, 510, 340, 'ENTRAR')}
<g>${rect(430, 575, 155, 40)}${text(507, 600, 'Parceiro', 13, 'middle')}${rect(605, 575, 165, 40)}${text(687, 600, 'Gestor', 13, 'middle')}</g>
${rect(430, 640, 340, 70, 'stroke-dasharray="6 4"')}
${text(445, 665, 'Credenciais demo: parceiro@ /', 12, 'start', '400')}
${text(445, 685, 'gestor@ · senha demo', 12, 'start', '400')}
`);

// 02 CADASTRO
screens['02-cadastro'] = svg(`
${sidebar('Início')}
${text(260, 22, '← Voltar', 12)}
${title(' Cadastro de Parceiro')}
${text(260, 68, 'Dados do estabelecimento gerador', 13, 'start', '400')}
${rect(260, 90, 910, 640)}
${text(285, 125, 'Nome *', 13)}${rect(285, 135, 270, 40)}${text(300, 160, 'Salão Beleza Pura', 12, 'start', '400')}
${text(575, 125, 'Tipo *', 13)}${rect(575, 135, 270, 40)}${text(590, 160, 'Salão  ▼', 12, 'start', '400')}
${text(865, 125, 'Documento *', 13)}${rect(865, 135, 280, 40)}${text(880, 160, '12.345.678/0001-90', 12, 'start', '400')}
${text(285, 210, 'Telefone *', 13)}${rect(285, 220, 270, 40)}${text(300, 245, '(22) 99999-8888', 12, 'start', '400')}
${text(575, 210, 'E-mail *', 13)}${rect(575, 220, 570, 40)}${text(590, 245, 'contato@empresa.com', 12, 'start', '400')}
${text(285, 305, 'Endereço', 16, 'start', '700')}
${text(285, 345, 'Rua *', 13)}${rect(285, 355, 400, 40)}
${text(705, 345, 'Bairro *', 13)}${rect(705, 355, 200, 40)}
${text(925, 345, 'Município *', 13)}${rect(925, 355, 220, 40)}
${text(285, 425, 'CEP *', 13)}${rect(285, 435, 260, 40)}
${btn(285, 520, 260, 'CADASTRAR PARCEIRO')}
`);

// 03 SOLICITAÇÃO
screens['03-solicitacao'] = svg(`
${sidebar('Solicitação')}
${text(260, 22, '← Voltar', 12)}
${title(' Nova Solicitação de Coleta')}
${rect(260, 90, 910, 620)}
${text(285, 125, 'Parceiro *', 13)}${rect(285, 135, 400, 40)}${text(300, 160, 'Salão Beleza Pura', 12, 'start', '400')}
${text(285, 215, 'Tipo de Material *', 13)}
<circle cx="295" cy="245" r="9" fill="#fff" stroke="${GRAY.line}" stroke-width="2"/><circle cx="295" cy="245" r="4" fill="${GRAY.accent}"/>${text(315, 250, 'Cabelo humano', 13, 'start', '400')}
<circle cx="295" cy="280" r="9" fill="#fff" stroke="${GRAY.line}" stroke-width="2"/>${text(315, 285, 'Pelo de animal', 13, 'start', '400')}
<circle cx="295" cy="315" r="9" fill="#fff" stroke="${GRAY.line}" stroke-width="2"/>${text(315, 320, 'Misto', 13, 'start', '400')}
${text(285, 375, 'Quantidade Estimada (kg)', 13)}${rect(285, 385, 240, 40)}${text(300, 410, '2.5', 12, 'start', '400')}
${text(545, 375, 'Data Desejada', 13)}${rect(545, 385, 240, 40)}${text(560, 410, '15/10/2026 📅', 12, 'start', '400')}
${text(285, 465, 'Observações', 13)}${rect(285, 475, 750, 70)}${text(300, 505, 'Material separado em sacos...', 12, 'start', '400')}
${btn(285, 580, 240, 'SOLICITAR COLETA')}
`);

// 04 DASHBOARD PARCEIRO
screens['04-dashboard-parceiro'] = svg(`
${sidebar('Início')}
${title(' Dashboard do Parceiro')}
${text(260, 68, 'Olá, Salão Beleza Pura!', 13, 'start', '400')}
${btn(900, 25, 130, '+ Nova Solic.', true)}${btn(1040, 25, 120, 'Contribuições', false)}
${[260, 490, 720, 950].map((x, i) => `<g>${rect(x, 95, 210, 95)}${text(x + 105, 145, ['5', '3', '12,5 kg', '3'][i], 26, 'middle', '800')}${text(x + 105, 172, ['Coletas Realizadas', 'Pendentes', 'Total Contribuído', 'Lotes Gerados'][i], 12, 'middle', '400')}</g>`).join('')}
${rect(260, 215, 910, 480)}
${text(285, 250, 'Minhas Solicitações', 16, 'start', '700')}
<rect x="285" y="270" width="860" height="38" fill="${GRAY.dark}" rx="4"/>
${text(300, 294, 'PROTOCOLO', 11, 'start', '700')}${text(430, 294, 'MATERIAL', 11, 'start', '700')}${text(570, 294, 'QTD.', 11, 'start', '700')}${text(660, 294, 'DATA', 11, 'start', '700')}${text(760, 294, 'STATUS', 11, 'start', '700')}
${[0, 1, 2, 3, 4].map(i => {
  const y = 308 + i * 52;
  return `<g>${line(300, y + 20, 110)}${line(430, y + 20, 120)}${line(570, y + 20, 60)}${line(660, y + 20, 80)}${badge(760, y + 10, i % 2 ? 'Concluída' : 'Pendente')}</g>`;
}).join('')}
`);

// 05 LISTA COLETAS
screens['05-lista-coletas'] = svg(`
${sidebar('Coletas')}
${title(' Coletas')}
${text(260, 68, 'Solicitações e acompanhamento', 13, 'start', '400')}
${btn(1040, 25, 120, 'Dashboard', false)}
${text(260, 110, 'Status', 12)}${rect(260, 120, 200, 38)}${text(275, 144, 'Todos  ▼', 12, 'start', '400')}
${text(480, 110, 'Material', 12)}${rect(480, 120, 200, 38)}${text(495, 144, 'Todos  ▼', 12, 'start', '400')}
${[0, 1, 2, 3].map(i => {
  const y = 180 + i * 130;
  return `<g>${rect(260, y, 910, 115)}
  ${text(285, y + 32, 'SOL-000' + (6 - i) + ' — ' + ['Pet Shop Amigo Fiel', 'Barbearia do Zé', 'Salão Beleza Pura', 'Barbearia do Zé'][i], 15)}
  ${text(285, y + 58, ' Maricá  ·   ' + ['Misto', 'Cabelo humano', 'Cabelo humano', 'Cabelo humano'][i] + '  ·  ⚖️ ~' + ['1,5', '2,5', '4,2', '2,5'][i] + ' kg  ·  📅 17/10/2026', 12, 'start', '400')}
  ${badge(285, y + 75, i < 2 ? 'Pendente' : 'Concluída')}
  ${btn(1000, y + 65, 150, 'Ver Detalhes', false)}</g>`;
}).join('')}
`);

// 06 COLETA DETALHE
screens['06-coleta-pendente'] = svg(`
${sidebar('Coletas')}
${text(260, 22, '← Voltar às coletas', 12)}
${title(' SOL-0005')}
${text(260, 68, 'Status: ', 13, 'start', '400')}${badge(315, 52, 'Pendente')}
${rect(260, 90, 910, 240)}
${text(285, 125, 'Dados da Solicitação', 16, 'start', '700')}
${text(285, 165, 'Parceiro: Barbearia do Zé', 13, 'start', '400')}${text(700, 165, 'Endereço: Av. Central, 456', 13, 'start', '400')}
${text(285, 200, 'Município: Maricá', 13, 'start', '400')}${text(700, 200, 'Material: Cabelo humano', 13, 'start', '400')}
${text(285, 235, 'Qtd. Estimada: ~2,5 kg', 13, 'start', '400')}${text(700, 235, 'Data Desejada: 16/10/2026', 13, 'start', '400')}
${text(285, 270, 'Obs: Material separado', 13, 'start', '400')}
${rect(260, 350, 910, 300)}
${text(285, 385, 'Registrar Coleta', 16, 'start', '700')}
${text(285, 425, 'Data da Coleta *', 13)}${rect(285, 435, 270, 40)}${text(300, 460, '16/10/2026', 12, 'start', '400')}
${text(575, 425, 'Responsável *', 13)}${rect(575, 435, 270, 40)}${text(590, 460, 'João Silva', 12, 'start', '400')}
${text(865, 425, 'Peso Coletado (kg) *', 13)}${rect(865, 435, 270, 40)}${text(880, 460, '2.5', 12, 'start', '400')}
${btn(285, 530, 240, ' CONCLUIR COLETA')}
${btn(545, 530, 180, ' Cancelar', false)}
`);

// 07 DASHBOARD OPERADOR
screens['07-dashboard-operador'] = svg(`
${sidebar('Início')}
${title('🏠 Painel do Operador')}
${text(260, 68, 'Operação logística do dia', 13, 'start', '400')}
${btn(870, 25, 120, '📋 Coletas', false)}${btn(1000, 25, 80, 'Estoque', false)}${btn(1090, 25, 70, 'Rastrear', false)}
${[260, 490, 720, 950].map((x, i) => `<g>${rect(x, 95, 210, 95)}${text(x + 105, 145, ['3', '3', '7,3 kg', '3'][i], 26, 'middle', '800')}${text(x + 105, 172, ['Pendentes', 'Realizadas', 'Peso Coletado', 'Lotes'][i], 12, 'middle', '400')}</g>`).join('')}
${rect(260, 215, 910, 290)}
${text(285, 250, '📍 Coletas Pendentes', 16, 'start', '700')}
${[0, 1, 2].map(i => {
  const y = 270 + i * 75;
  return `<g>${rect(285, y, 860, 65)}
  ${text(305, y + 26, 'SOL-000' + (6 - i) + ' — ' + ['Pet Shop Amigo Fiel', 'Barbearia do Zé', 'Salão Beleza Pura'][i], 14)}
  ${text(305, y + 48, '📍 Maricá · 📦 Cabelo humano · ⚖️ ~2,5 kg · 📅 16/10/2026', 11, 'start', '400')}
  ${badge(700, y + 20, 'Pendente')}${btn(1000, y + 15, 130, 'Registrar', true)}</g>`;
}).join('')}
${rect(260, 525, 910, 240)}
${text(285, 560, '🏷️ Lotes para Triagem / Estoque', 16, 'start', '700')}
<rect x="285" y="580" width="860" height="36" fill="${GRAY.dark}" rx="4"/>
${text(300, 603, 'CÓDIGO', 11, 'start', '700')}${text(470, 603, 'MATERIAL', 11, 'start', '700')}${text(650, 603, 'PESO', 11, 'start', '700')}${text(780, 603, 'STATUS', 11, 'start', '700')}
${[0, 1].map(i => `<g>${line(300, 640 + i * 50, 150)}${line(470, 640 + i * 50, 110)}${line(650, 640 + i * 50, 60)}${badge(780, 628 + i * 50, i ? 'Em Estoque' : 'Em Triagem')}${i === 0 ? btn(1040, 622 + i * 50, 100, 'Triar', true) : ''}</g>`).join('')}
`);

// 08 PESAGEM/LOTE
screens['08-pesagem-lote'] = svg(`
${sidebar('Coletas')}
${text(260, 22, '← Voltar', 12)}
${title('⚖️ Pesagem & Lote')}
${text(260, 68, 'SOL-0005 — Barbearia do Zé', 13, 'start', '400')}
<g>${['✓ Coleta', '2. Pesagem', '3. Lote', '4. Triagem'].map((s, i) => `<g>${rect(260 + i * 140, 85, 130, 34, 'rx="17"')}${text(325 + i * 140, 107, s, 12, 'middle')}</g>`).join('')}</g>
${rect(260, 140, 910, 230)}
${text(285, 175, '⚖️ Registrar Peso', 16, 'start', '700')}
${text(285, 215, 'Peso Coletado (kg) *', 13)}${rect(285, 225, 270, 40)}${text(300, 250, '2.5', 12, 'start', '400')}${text(285, 290, 'Pesar na balança digital', 11, 'start', '400')}
${text(575, 215, 'Data *', 13)}${rect(575, 225, 270, 40)}${text(590, 250, '16/10/2026', 12, 'start', '400')}
${text(865, 215, 'Responsável *', 13)}${rect(865, 225, 270, 40)}${text(880, 250, 'João Silva', 12, 'start', '400')}
${rect(260, 390, 910, 300)}
${text(285, 425, '🏷️ Gerar Lote', 16, 'start', '700')}
${text(285, 465, 'Código (auto)', 13)}${rect(285, 475, 270, 40, 'fill="#e8eaed"')}${text(300, 500, 'FT-2026-000004', 12, 'start', '400')}
${text(575, 465, 'Tipo Material *', 13)}${rect(575, 475, 270, 40)}${text(590, 500, 'Cabelo humano  ▼', 12, 'start', '400')}
${text(865, 465, 'Peso Inicial (kg) *', 13)}${rect(865, 475, 270, 40)}${text(880, 500, '2.5', 12, 'start', '400')}
${text(285, 545, 'Status inicial', 13)}${rect(285, 555, 270, 40, 'fill="#e8eaed"')}${text(300, 580, 'Em Triagem', 12, 'start', '400')}
${btn(285, 620, 340, '🏷️ REGISTRAR PESO & GERAR LOTE')}
`);

// 10 TRIAGEM
screens['10-triagem'] = svg(`
${sidebar('Estoque')}
${text(260, 22, '← Voltar', 12)}
${title('🔍 Triagem')}
${text(260, 68, 'Lote FT-2026-000003 — Status: ', 13, 'start', '400')}${badge(490, 52, 'Em Triagem')}
${[260, 490, 720, 950].map((x, i) => `<g>${rect(x, 95, 210, 95)}${text(x + 105, 145, ['3,00 kg', '3,00', '0,00', '100%'][i], 24, 'middle', '800')}${text(x + 105, 172, ['Peso Inicial', 'Aprovado', 'Rejeitado', 'Aproveitamento'][i], 12, 'middle', '400')}</g>`).join('')}
${rect(260, 215, 910, 460)}
${text(285, 250, 'Resultado da Triagem', 16, 'start', '700')}
${text(285, 295, 'Peso Aprovado (kg) *', 13)}${rect(285, 305, 270, 40)}${text(300, 330, '3.0', 12, 'start', '400')}
${text(575, 295, 'Peso Rejeitado (kg)', 13)}${rect(575, 305, 270, 40)}${text(590, 330, '0.0', 12, 'start', '400')}
${text(865, 295, 'Motivo da Rejeição', 13)}${rect(865, 305, 270, 40)}${text(880, 330, '—  ▼', 12, 'start', '400')}
${text(285, 385, 'Responsável *', 13)}${rect(285, 395, 270, 40)}${text(300, 420, 'Maria Santos', 12, 'start', '400')}
${text(575, 385, 'Data *', 13)}${rect(575, 395, 270, 40)}${text(590, 420, '16/10/2026', 12, 'start', '400')}
${text(285, 475, 'Aproveitamento', 13)}
<rect x="285" y="490" width="860" height="26" rx="8" fill="#fff" stroke="${GRAY.line}" stroke-width="2"/>
<rect x="285" y="490" width="860" height="26" rx="8" fill="${GRAY.accent}"/>
${text(715, 509, '100%', 13, 'middle', '700')}
${btn(285, 560, 260, 'REGISTRAR TRIAGEM')}
`);

// 11 ESTOQUE
screens['11-estoque'] = svg(`
${sidebar('Estoque')}
${title('📦 Estoque')}
${text(260, 68, 'Materiais disponíveis', 13, 'start', '400')}
${btn(1000, 25, 80, 'Operador', false)}${btn(1090, 25, 70, 'Rastrear', false)}
${[260, 490, 720, 950].map((x, i) => `<g>${rect(x, 95, 210, 95)}${text(x + 105, 145, ['1', '3,00 kg', '1,80 kg', '1,20 kg'][i], 24, 'middle', '800')}${text(x + 105, 172, ['Lotes em Estoque', 'Disponível', 'Cabelo humano', 'Pelo de animal'][i], 12, 'middle', '400')}</g>`).join('')}
${text(260, 225, 'Material', 12)}${rect(260, 235, 200, 38)}${text(275, 259, 'Todos  ▼', 12, 'start', '400')}
${rect(260, 295, 910, 350)}
${text(285, 330, 'Lotes', 16, 'start', '700')}
<rect x="285" y="350" width="860" height="38" fill="${GRAY.dark}" rx="4"/>
${text(300, 374, 'CÓDIGO', 11, 'start', '700')}${text(470, 374, 'MATERIAL', 11, 'start', '700')}${text(640, 374, 'PESO INICIAL', 11, 'start', '700')}${text(790, 374, 'DISPONÍVEL', 11, 'start', '700')}${text(920, 374, 'STATUS', 11, 'start', '700')}
${[0, 1, 2].map(i => `<g>${line(300, 420 + i * 55, 150)}${line(470, 420 + i * 55, 110)}${line(640, 420 + i * 55, 70)}${line(790, 420 + i * 55, 70)}${badge(920, 408 + i * 55, i === 2 ? 'Em Estoque' : 'Destinado')}${btn(1030, 402 + i * 55, 100, 'Rastrear', false)}</g>`).join('')}
`);

// 12 DESTINAÇÃO
screens['12-destinacao'] = svg(`
${sidebar('Estoque')}
${text(260, 22, '← Voltar ao estoque', 12)}
${title('🚚 Destinação')}
${text(260, 68, 'Lote FT-2026-000003 — Disponível: 3,00 kg', 13, 'start', '400')}
${rect(260, 95, 910, 430)}
${text(285, 135, 'Destino *', 13)}${rect(285, 145, 400, 40)}${text(300, 170, 'ONG FioTar  ▼', 12, 'start', '400')}
${text(705, 135, 'Data *', 13)}${rect(705, 145, 440, 40)}${text(720, 170, '18/10/2026', 12, 'start', '400')}
${text(285, 225, 'Quantidade (kg) *', 13)}${rect(285, 235, 400, 40)}${text(300, 260, '3.0', 12, 'start', '400')}${text(285, 300, 'Máx: 3,00 kg', 11, 'start', '400')}
${text(705, 225, 'Responsável *', 13)}${rect(705, 235, 440, 40)}${text(720, 260, 'João Silva', 12, 'start', '400')}
${text(285, 345, 'Observações', 13)}${rect(285, 355, 860, 70)}
${btn(285, 455, 280, 'REGISTRAR DESTINAÇÃO')}
`);

// 13a RASTREIO BUSCA
screens['13a-rastreio-busca'] = svg(`
${sidebar('Rastrear')}
${title('🔍 Rastreabilidade')}
${text(260, 68, 'Passaporte do material — busca por código', 13, 'start', '400')}
${btn(1040, 25, 120, 'Dashboard', false)}
${rect(260, 95, 780, 48)}${text(275, 125, 'FT-2026-000001', 14, 'start', '400')}
${btn(1055, 99, 115, '🔎 Buscar')}
${rect(260, 170, 910, 300)}
${img(640, 210, 150, 110)}
${text(715, 360, '🔍', 34, 'middle')}
${text(715, 400, 'Digite o código de um lote', 15, 'middle', '400')}
${text(715, 425, 'ou escolha abaixo', 15, 'middle', '400')}
${rect(260, 495, 910, 150)}
${text(285, 530, 'Lotes disponíveis', 16, 'start', '700')}
${['FT-2026-000001', 'FT-2026-000002', 'FT-2026-000003'].map((c, i) => `<g>${rect(285 + i * 220, 555, 200, 40, 'rx="8"')}${text(385 + i * 220, 580, c, 13, 'middle')}</g>`).join('')}
`);

// 13b TIMELINE
screens['13b-rastreio-timeline'] = svg(`
${sidebar('Rastrear')}
${title('🔍 Rastreabilidade')}
${text(260, 68, 'Passaporte do material — busca por código', 13, 'start', '400')}
${rect(260, 95, 780, 48)}${text(275, 125, 'FT-2026-000001', 14, 'start', '400')}
${btn(1055, 99, 115, '🔎 Buscar')}
${rect(260, 170, 910, 580)}
${text(285, 205, '🏷️ FT-2026-000001', 18, 'start', '800')}
${text(285, 232, 'Tipo: Cabelo humano · Peso inicial: 2,50 kg · Status: Destinado', 13, 'start', '400')}
<line x1="310" y1="265" x2="310" y2="680" stroke="${GRAY.accent}" stroke-width="3"/>
${['📍 ORIGEM', '📦 COLETA', '🚚 TRANSPORTE', '📥 RECEBIMENTO', '🔍 TRIAGEM', '📦 ESTOQUE', '🚚 DESTINAÇÃO'].map((t, i) => {
  const y = 275 + i * 62;
  return `<g><circle cx="310" cy="${y}" r="9" fill="${GRAY.accent}" stroke="#fff" stroke-width="3"/>
  ${text(340, y + 5, t, 14)}
  ${line(490, y - 3, 250)}
  ${line(490, y + 14, 180)}</g>`;
}).join('')}
${rect(285, 700, 860, 40, 'fill="#e6f4ea" stroke="#34a853"')}
${text(715, 725, '📋 PASSAPORTE DO MATERIAL — Rastreabilidade Completa ✓', 14, 'middle', '700')}
`);

// 14 INDICADORES
screens['14-indicadores'] = svg(`
${sidebar('Indicadores')}
${title('📊 Indicadores da Operação')}
${text(260, 68, 'Visão geral — FioTrack', 13, 'start', '400')}
${btn(1040, 25, 120, 'Operador', false)}
${rect(260, 95, 910, 240)}
${text(285, 130, '📈 Logísticos', 16, 'start', '700')}
${[285, 460, 635, 810, 985].map((x, i) => `<g>${rect(x, 145, 160, 80)}${text(x + 80, 185, ['15', '12', '3', '3', '7,3 kg'][i], 20, 'middle', '800')}${text(x + 80, 210, ['Pontos', 'Ativos', 'Realizadas', 'Pendentes', 'Coletado'][i], 11, 'middle', '400')}</g>`).join('')}
${text(285, 265, 'Coletado ▓▓▓▓▓▓▓▓▓▓ 7,3 kg', 12, 'start', '400')}
${text(285, 290, 'Aprovado ▓▓▓▓▓▓▓▓ 6,6 kg', 12, 'start', '400')}
${text(285, 315, 'Destinado ▓▓▓▓ 3,6 kg', 12, 'start', '400')}
${rect(260, 355, 910, 240)}
${text(285, 390, '🌍 Ambientais', 16, 'start', '700')}
${[285, 460, 635, 810, 985].map((x, i) => `<g>${rect(x, 405, 160, 80)}${text(x + 80, 445, ['7,3 kg', '6,6 kg', '3,6 kg', '3', '3'][i], 18, 'middle', '800')}${text(x + 80, 470, ['Desviados', 'Preparados', 'Destinados', 'Lotes', 'Ações'][i], 11, 'middle', '400')}</g>`).join('')}
${rect(260, 615, 910, 160)}
${text(285, 650, '✅ Qualidade', 16, 'start', '700')}
${text(285, 685, 'Aprovado: 6,6 kg (90%)', 13, 'start', '400')}${text(700, 685, 'Rejeitado: 0,7 kg', 13, 'start', '400')}
<rect x="285" y="705" width="860" height="26" rx="8" fill="#fff" stroke="${GRAY.line}" stroke-width="2"/>
<rect x="285" y="705" width="774" height="26" rx="8" fill="${GRAY.accent}"/>
${text(672, 724, '90% aprovado', 13, 'middle', '700')}
${text(285, 760, 'Motivos de rejeição: Contaminado 0,5 kg · Umidade 0,2 kg', 12, 'start', '400')}
`);

// 15 CONTRIBUIÇÕES
screens['15-contribuicoes'] = svg(`
${sidebar('Contribuições')}
${text(260, 22, '← Voltar', 12)}
${title('🌱 Minhas Contribuições')}
${text(260, 68, 'Salão Beleza Pura — desde 01/10/2026', 13, 'start', '400')}
${[260, 490, 720].map((x, i) => `<g>${rect(x, 95, 210, 95)}${text(x + 105, 145, ['1', '2,50 kg', '1'][i], 26, 'middle', '800')}${text(x + 105, 172, ['Coletas Realizadas', 'Total Contribuído', 'Lotes Gerados'][i], 12, 'middle', '400')}</g>`).join('')}
${rect(260, 215, 910, 140, 'fill="#e6f4ea" stroke="#34a853"')}
${text(285, 255, '🌍 Impacto Ambiental', 16, 'start', '700')}
${text(285, 290, 'Você contribuiu para desviar 2,50 kg de material do', 14, 'start', '400')}
${text(285, 315, 'descarte convencional.', 14, 'start', '400')}
${text(285, 340, 'Cada coleta fortalece a cadeia de logística reversa.', 12, 'start', '400')}
${rect(260, 375, 910, 300)}
${text(285, 410, 'Histórico de Contribuições', 16, 'start', '700')}
<rect x="285" y="430" width="860" height="38" fill="${GRAY.dark}" rx="4"/>
${text(300, 454, 'DATA', 11, 'start', '700')}${text(420, 454, 'PROTOCOLO', 11, 'start', '700')}${text(570, 454, 'MATERIAL', 11, 'start', '700')}${text(720, 454, 'PESO', 11, 'start', '700')}${text(830, 454, 'STATUS', 11, 'start', '700')}
${[0, 1].map(i => `<g>${line(300, 500 + i * 55, 90)}${line(420, 500 + i * 55, 90)}${line(570, 500 + i * 55, 110)}${line(720, 500 + i * 55, 60)}${badge(830, 488 + i * 55, 'Concluída')}</g>`).join('')}
`);

// gravar
Object.entries(screens).forEach(([name, content]) => {
  fs.writeFileSync(path.join(OUT, name + '.svg'), content);
  console.log('  OK ' + name + '.svg');
});
console.log(`\n${Object.keys(screens).length} wireframes SVG → ${OUT}`);
