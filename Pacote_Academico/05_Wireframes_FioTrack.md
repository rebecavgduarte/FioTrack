# Wireframes / Telas do FioTrack

**Startup:** FioTrack
**Parceira:** ONG FioTar
**Modelo:** Espiral + Scrum
**Instituição:** IFF-FORMATEC — Turma M3

---

## Guia de Visualização

Cada tela é descrita em formato de wireframe textual com:
- **Layout** (estrutura das áreas)
- **Componentes** (botões, campos, listas)
- **Comportamento** (ações e navegações)

Paleta de cores sugerida:
- **Primária:** Verde escuro (#1B5E20) — ambiental
- **Secundária:** Azul marinho (#0D47A1) — confiança/logística
- **Destaque:** Verde claro (#4CAF50) — sucesso/ação
- **Alerta:** Laranja (#FF9800) — pendências
- **Erro:** Vermelho (#F44336)

---

# TELA 01 — Login

```
┌─────────────────────────────────────────┐
│           🌊 FIO TRACK                  │
│   Transformando fios em proteção        │
│         para nossos mares.              │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  E-mail                           │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ usuario@email.com           │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Senha                            │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ ••••••••                     │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │       ENTRAR                │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Esqueceu a senha?                │  │
│  │  Não tem conta? Cadastre-se       │  │
│  └───────────────────────────────────┘  │
│                                         │
│  [Parceiro]  [Operador]  [Gestor]       │
└─────────────────────────────────────────┘
```

**Componentes:**
- Campo: E-mail (obrigatório, validação de formato)
- Campo: Senha (obrigatório, máscara)
- Botão: ENTRAR (primário)
- Link: Esqueceu a senha
- Link: Cadastre-se (→ Tela 02)
- Seletor de perfil: Parceiro / Operador / Gestor

**Navegação:**
- Sucesso → Dashboard (Tela 04 ou Tela 07 conforme perfil)
- Erro → Mensagem "E-mail ou senha inválidos"
- Cadastre-se → Tela 02

---

# TELA 02 — Cadastro de Parceiro

```
┌─────────────────────────────────────────┐
│  ← Voltar         📋 CADASTRO PARCEIRO  │
├─────────────────────────────────────────┤
│                                         │
│  Dados do Estabelecimento               │
│  ┌───────────────────────────────────┐  │
│  │ Nome *: [Salão Beleza Pura      ] │  │
│  │ Tipo *: [Salão de Beleza      ▼]  │  │
│  │                                   │  │
│  │ Documento*: [12.345.678/0001-90 ] │  │
│  │ Telefone*: [(22) 99999-8888    ] │  │
│  │ E-mail *: [contato@belezapura  ] │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Endereço                               │
│  ┌───────────────────────────────────┐  │
│  │ Rua*: [Rua das Flores, 123     ] │  │
│  │ Bairro*: [Centro              ]   │  │
│  │ Município*: [Maricá           ]   │  │
│  │ CEP*: [28900-000              ]   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │        CADASTRAR PARCEIRO         │  │
│  └───────────────────────────────────┘  │
│                                         │
│  * Campos obrigatórios                  │
└─────────────────────────────────────────┘
```

**Componentes:**
- Campo: Nome (obrigatório)
- Dropdown: Tipo — Salão / Barbearia / Pet Shop / Banho e Tosa / Clínica Veterinária / Pessoa Física / Outro (obrigatório)
- Campo: Documento (CPF/CNPJ, obrigatório, máscara)
- Campo: Telefone (obrigatório, máscara)
- Campo: E-mail (obrigatório, validação)
- Campos de endereço: Rua, Bairro, Município, CEP (obrigatórios)
- Botão: CADASTRAR PARCEIRO

**Validações:**
- Todos os campos com * são obrigatórios
- Documento duplicado → erro "Documento já cadastrado"
- E-mail inválido → erro de formato

**Navegação:**
- Sucesso → Mensagem "Cadastro realizado!" → Dashboard do Parceiro
- Voltar → Tela 01

---

# TELA 03 — Solicitação de Coleta (Parceiro)

```
┌─────────────────────────────────────────┐
│  ← Voltar     📦 NOVA SOLICITAÇÃO       │
├─────────────────────────────────────────┤
│                                         │
│  Ponto de Coleta *                      │
│  ┌───────────────────────────────────┐  │
│  │ [Salão Beleza Pura - Centro   ▼] │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Tipo de Material *                     │
│  ┌───────────────────────────────────┐  │
│  │ ( ) Cabelo humano                │  │
│  │ ( ) Pelo de animal               │  │
│  │ ( ) Misto                        │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Quantidade Estimada                    │
│  ┌───────────────────────────────────┐  │
│  │ [  2.5  ] kg                    │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Data Desejada                          │
│  ┌───────────────────────────────────┐  │
│  │ [15/10/2026 📅]                  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Observações (opcional)                 │
│  ┌───────────────────────────────────┐  │
│  │ Material separado em sacos...    │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      SOLICITAR COLETA            │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Componentes:**
- Dropdown: Ponto de coleta (obrigatório)
- Radio buttons: Tipo de material (obrigatório)
- Campo numérico: Quantidade estimada em kg
- Campo data: Data desejada
- Textarea: Observações (opcional)
- Botão: SOLICITAR COLETA

**Navegação:**
- Sucesso → Mensagem "Solicitação registrada! Protocolo: SOL-0001" → Lista de solicitações
- Voltar → Dashboard do Parceiro

---

# TELA 04 — Dashboard do Parceiro

```
┌─────────────────────────────────────────┐
│  🏠 FIO TRACK          [Parceiro]  ⚙️  │
├─────────────────────────────────────────┤
│                                         │
│  Olá, Salão Beleza Pura!                │
│                                         │
│  ┌──────────┐  ┌──────────┐             │
│  │    5     │  │  12.5kg  │             │
│  │ Coletas  │  │  Total   │             │
│  │Solicitadas│  │Contribuído│            │
│  └──────────┘  └──────────┘             │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  +  SOLICITAR NOVA COLETA         │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Minhas Solicitações                    │
│  ┌───────────────────────────────────┐  │
│  │ SOL-0005 │ 15/10 │ Pendente  [→] │  │
│  │ SOL-0004 │ 10/10 │ Concluída [→] │  │
│  │ SOL-0003 │ 05/10 │ Concluída [→] │  │
│  │ SOL-0002 │ 01/10 │ Concluída [→] │  │
│  │ SOL-0001 │ 25/09 │ Concluída [→] │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ─────────────────────────────────────  │
│  🏠 Início  📦 Solicitar  📊 Perfil     │
└─────────────────────────────────────────┘
```

**Componentes:**
- Saudação com nome do parceiro
- Cards de resumo: nº de coletas, peso total contribuído
- Botão primário: + SOLICITAR NOVA COLETA → Tela 03
- Lista de solicitações com status (Pendente/Concluída/Cancelada)
- Navegação inferior: Início / Solicitar / Perfil

---

# TELA 05 — Lista de Coletas (Operador)

```
┌─────────────────────────────────────────┐
│  🏠 FIO TRACK          [Operador]   ⚙️ │
├─────────────────────────────────────────┤
│                                         │
│  📋 COLETAS PENDENTES                   │
│                                         │
│  Filtros: [Todas ▼] [Região ▼] [📅]    │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 📍 Salão Beleza Pura             │  │
│  │ Rua das Flores, 123 - Centro     │  │
│  │ 📦 Cabelo humano | ~2.5 kg      │  │
│  │ 📅 15/10/2026                    │  │
│  │              [Ver Detalhes]      │  │
│  ├───────────────────────────────────┤  │
│  │ 📍 Barbearia do Zé               │  │
│  │ Av. Central, 456 - Centro        │  │
│  │ 📦 Cabelo humano | ~1.8 kg      │  │
│  │ 📅 15/10/2026                    │  │
│  │              [Ver Detalhes]      │  │
│  ├───────────────────────────────────┤  │
│  │ 📍 Pet Shop Amigo Fiel           │  │
│  │ Rua do Mar, 789 - Praia          │  │
│  │ 📦 Pelo de animal | ~3.0 kg     │  │
│  │ 📅 16/10/2026                    │  │
│  │              [Ver Detalhes]      │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Total: 3 coletas pendentes             │
│                                         │
│  ─────────────────────────────────────  │
│  🏠 Início  📋 Coletas  📦 Estoque 📊   │
└─────────────────────────────────────────┘
```

**Componentes:**
- Filtros: status, região, data
- Cards de coleta: endereço, tipo material, quantidade, data
- Botão: Ver Detalhes → Tela 06
- Contador de pendentes
- Navegação inferior

---

# TELA 06 — Detalhes da Coleta / Registro

```
┌─────────────────────────────────────────┐
│  ← Voltar     📋 DETALHES DA COLETA     │
├─────────────────────────────────────────┤
│                                         │
│  Protocolo: SOL-0005                    │
│  Status: ● Pendente                     │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ Parceiro: Salão Beleza Pura      │  │
│  │ Endereço: Rua das Flores, 123    │  │
│  │ Município: Maricá - Centro       │  │
│  │                                   │  │
│  │ Material: Cabelo humano          │  │
│  │ Qtd. Estimada: ~2.5 kg           │  │
│  │ Data Solicitada: 15/10/2026      │  │
│  │ Observação: Material em sacos    │  │
│  └───────────────────────────────────┘  │
│                                         │
│  REGISTRAR COLETA                       │
│  ┌───────────────────────────────────┐  │
│  │ Data da Coleta*: [15/10/2026 📅] │  │
│  │ Responsável*: [João Silva      ]  │  │
│  │                                   │  │
│  │ Peso Coletado*: [    ] kg        │  │
│  │ (pesar na balança)                │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────┐ ┌─────────────┐  │
│  │ ✅ CONCLUIR COLETA│ │ ❌ CANCELAR │  │
│  └───────────────────┘ └─────────────┘  │
└─────────────────────────────────────────┘
```

**Componentes:**
- Dados da solicitação (somente leitura)
- Campos de registro: data, responsável, peso (obrigatórios)
- Botão: CONCLUIR COLETA (primário)
- Botão: CANCELAR (secundário/confirmação)

**Navegação:**
- Concluída → Atualiza status → sugere "Gerar Lote" → Tela 09
- Cancelada → Atualiza status → volta para lista

---

# TELA 07 — Painel do Operador (Dashboard)

```
┌─────────────────────────────────────────┐
│  🏠 FIO TRACK          [Operador]   ⚙️ │
├─────────────────────────────────────────┤
│                                         │
│  Bom dia, Operador!                     │
│                                         │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│  │    3     │ │    1     │ │  15.2kg │ │
│  │ Pendentes│ │Em Rota   │ │Hoje     │ │
│  └──────────┘ └──────────┘ └─────────┘ │
│                                         │
│  📋 Coletas de Hoje                     │
│  ┌───────────────────────────────────┐  │
│  │ 08:00 │ Salão Beleza Pura  [→]   │  │
│  │ 09:30 │ Barbearia do Zé    [→]   │  │
│  │ 11:00 │ Pet Shop Amigo Fiel[→]   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Ações Rápidas                          │
│  ┌───────────────────────────────────┐  │
│  │  [📋 Ver Coletas] [📦 Estoque]   │  │
│  │  [📊 Indicadores] [🔍 Rastrear]  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ─────────────────────────────────────  │
│  🏠 Início  📋 Coletas  📦 Estoque 📊   │
└─────────────────────────────────────────┘
```

---

# TELA 08 — Pesagem

```
┌─────────────────────────────────────────┐
│  ← Voltar      ⚖️  PESAGEM              │
├─────────────────────────────────────────┤
│                                         │
│  Coleta: SOL-0005                       │
│  Parceiro: Salão Beleza Pura            │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │       ⚖️                          │  │
│  │                                   │  │
│  │    PESO COLETADO                  │  │
│  │    ┌───────────────────────┐      │  │
│  │    │       2.5             │      │  │
│  │    └───────────────────────┘      │  │
│  │         kg                       │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Data*: [15/10/2026 📅]                 │
│  Responsável*: [João Silva           ]  │
│  Conferência*: [ ✓ Dupla conferência ] │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │     REGISTRAR PESO               │  │
│  └───────────────────────────────────┘  │
│                                         │
│  💡 Dica: pesar o material na balança   │
│  digital antes de confirmar             │
└─────────────────────────────────────────┘
```

**Componentes:**
- Exibição grande do peso (destaque visual)
- Campo numérico: peso em kg (obrigatório, > 0)
- Campo data: data da pesagem
- Campo: responsável
- Checkbox: conferência dupla
- Botão: REGISTRAR PESO

---

# TELA 09 — Criação de Lote

```
┌─────────────────────────────────────────┐
│  ← Voltar      🏷️  CRIAR LOTE           │
├─────────────────────────────────────────┤
│                                         │
│  Dados da Coleta                        │
│  ┌───────────────────────────────────┐  │
│  │ Coleta: SOL-0005                 │  │
│  │ Parceiro: Salão Beleza Pura      │  │
│  │ Peso coletado: 2.5 kg            │  │
│  │ Data: 15/10/2026                 │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Dados do Lote                          │
│  ┌───────────────────────────────────┐  │
│  │ Código: [FT-2026-000001] 🔄auto  │  │
│  │                                   │  │
│  │ Tipo Material*:                  │  │
│  │ (•) Cabelo humano                │  │
│  │ ( ) Pelo de animal               │  │
│  │ ( ) Misto                        │  │
│  │                                   │  │
│  │ Peso Inicial*: [2.5] kg          │  │
│  │                                   │  │
│  │ Status inicial: Em Triagem       │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │     GERAR LOTE                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ✅ Lote criado com sucesso!            │
│  Código: FT-2026-000001                 │
│  [Ver Lote]  [Voltar ao Dashboard]      │
└─────────────────────────────────────────┘
```

**Componentes:**
- Dados da coleta (somente leitura)
- Código do lote: gerado automaticamente (FT-2026-XXXXXX), somente leitura
- Radio buttons: tipo de material
- Campo: peso inicial (obrigatório)
- Status inicial fixo: "Em Triagem"
- Botão: GERAR LOTE
- Confirmação com código gerado

---

# TELA 10 — Triagem

```
┌─────────────────────────────────────────┐
│  ← Voltar      🔍  TRIAGEM              │
├─────────────────────────────────────────┤
│                                         │
│  Lote: FT-2026-000001                   │
│  Status: ● Em Triagem                   │
│  Peso inicial: 10.0 kg                  │
│                                         │
│  Resultado da Triagem                   │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  ✅ Peso Aprovado*: [  8.0  ] kg │  │
│  │                                   │  │
│  │  ❌ Peso Rejeitado*: [ 2.0 ] kg  │  │
│  │                                   │  │
│  │  Motivo da Rejeição*:            │  │
│  │  [Contaminado                 ▼]  │  │
│  │                                   │  │
│  │  📊 Aproveitamento: 80%          │  │
│  │  [████████████░░░░░░]            │  │
│  │                                   │  │
│  │  Responsável*: [Maria Santos   ]  │  │
│  │  Data*: [16/10/2026 📅]          │  │
│  │                                   │  │
│  │  ⚠️ Aprovado + Rejeitado =       │  │
│  │  Inicial (8 + 2 = 10 ✓)         │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │     REGISTRAR TRIAGEM            │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Componentes:**
- Dados do lote (somente leitura)
- Campo: peso aprovado (obrigatório)
- Campo: peso rejeitado (obrigatório se houver)
- Dropdown: motivo de rejeição — Contaminado / Umidade Excessiva / Tipo Inadequado / Material Danificado / Outro (obrigatório se rejeitado > 0)
- Barra de aproveitamento (calculada automaticamente)
- Validação: aprovado + rejeitado = peso inicial
- Campo: responsável e data
- Botão: REGISTRAR TRIAGEM

---

# TELA 11 — Consulta de Estoque

```
┌─────────────────────────────────────────┐
│  🏠 FIO TRACK          [Operador]   ⚙️ │
├─────────────────────────────────────────┤
│                                         │
│  📦 ESTOQUE                             │
│                                         │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│  │    8     │ │  45.2kg  │ │  37.5kg │ │
│  │  Lotes   │ │ Disponível│ │Aprovado │ │
│  └──────────┘ └──────────┘ └─────────┘ │
│                                         │
│  Filtros: [Todos ▼] [Cabelo ▼] [📅]    │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ Código        │ Tipo  │ Peso │ St │ │
│  ├───────────────┼───────┼──────┼────┤ │
│  │FT-2026-000001 │ Cabelo│ 8.0kg│ 🟢 │ │
│  │FT-2026-000002 │ Pelo  │ 5.5kg│ 🟢 │ │
│  │FT-2026-000003 │ Cabelo│10.0kg│ 🟢 │ │
│  │FT-2026-000004 │ Misto │ 3.2kg│ 🟡 │ │
│  │FT-2026-000005 │ Cabelo│ 6.8kg│ 🟢 │ │
│  └───────────────────────────────────┘  │
│                                         │
│  Legenda: 🟢 Em Estoque  🟡 Parcial     │
│                                         │
│  ─────────────────────────────────────  │
│  🏠 Início  📋 Coletas  📦 Estoque 📊   │
└─────────────────────────────────────────┘
```

**Componentes:**
- Cards de resumo: nº de lotes, peso disponível, peso aprovado
- Filtros: status, tipo de material, período
- Tabela de lotes: código, tipo, peso, status
- Legenda de cores

---

# TELA 12 — Destinação

```
┌─────────────────────────────────────────┐
│  ← Voltar      🚚  DESTINAÇÃO           │
├─────────────────────────────────────────┤
│                                         │
│  Lote: FT-2026-000001                   │
│  Tipo: Cabelo humano                    │
│  Disponível: 8.0 kg                     │
│  Status: ● Em Estoque                   │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  Destino*:                        │  │
│  │  [ONG Destinação                   ▼] │  │
│  │                                   │  │
│  │  Data*: [18/10/2026 📅]           │  │
│  │                                   │  │
│  │  Quantidade*: [  8.0  ] kg        │  │
│  │  (máx: 8.0 kg)                    │  │
│  │                                   │  │
│  │  Responsável*: [João Silva      ]  │  │
│  │                                   │  │
│  │  Observações:                     │  │
│  │  [Entrega para ação de limpeza  ] │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │     REGISTRAR DESTINAÇÃO         │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ✅ Destinação registrada!              │
│  Lote FT-2026-000001 → Destinado        │
└─────────────────────────────────────────┘
```

**Componentes:**
- Dados do lote (somente leitura)
- Dropdown: destino — ONG Destinação / Parceiro Autorizado / Outro (obrigatório)
- Campo data: data da destinação
- Campo: quantidade (obrigatório, ≤ saldo disponível)
- Campo: responsável
- Textarea: observações
- Botão: REGISTRAR DESTINAÇÃO

---

# TELA 13 — Rastreabilidade (Timeline)

```
┌─────────────────────────────────────────┐
│  ← Voltar     🔍  RASTREABILIDADE        │
├─────────────────────────────────────────┤
│                                         │
│  Buscar lote:                           │
│  ┌──────────────────────────────┐ ┌───┐ │
│  │ FT-2026-000001              │ │ 🔎│ │
│  └──────────────────────────────┘ └───┘ │
│                                         │
│  🏷️ FT-2026-000001                     │
│  Tipo: Cabelo humano | Status: Destinado│
│                                         │
│  ── ✅ ───────────────────────────────  │
│  │ ORIGEM                             │  │
│  │ Salão Beleza Pura                  │  │
│  │ Rua das Flores, 123 - Maricá       │  │
│  │ Tipo: Salão de Beleza              │  │
│  │ Data: 14/10/2026                   │  │
│  │                                     │  │
│  ── ✅ ───────────────────────────────  │
│  │ COLETA                             │  │
│  │ Data: 15/10/2026                   │  │
│  │ Responsável: João Silva            │  │
│  │ Peso: 10.0 kg                      │  │
│  │                                     │  │
│  ── ✅ ───────────────────────────────  │
│  │ TRANSPORTE                         │  │
│  │ Rota: Centro → Centro de Triagem   │  │
│  │ Data: 15/10/2026                   │  │
│  │                                     │  │
│  ── ✅ ───────────────────────────────  │
│  │ RECEBIMENTO                        │  │
│  │ Data: 15/10/2026                   │  │
│  │ Centro de Triagem                  │  │
│  │                                     │  │
│  ── ✅ ───────────────────────────────  │
│  │ TRIAGEM                            │  │
│  │ Data: 16/10/2026                   │  │
│  │ Responsável: Maria Santos          │  │
│  │ Aprovado: 8.0 kg | Rejeitado: 2.0  │  │
│  │ Motivo: Contaminado                │  │
│  │                                     │  │
│  ── ✅ ───────────────────────────────  │
│  │ ESTOQUE                            │  │
│  │ Entrada: 16/10/2026                │  │
│  │ Peso disponível: 8.0 kg            │  │
│  │                                     │  │
│  ── ✅ ───────────────────────────────  │
│  │ DESTINAÇÃO                         │  │
│  │ Destino: ONG FioTar               │  │
│  │ Data: 18/10/2026                   │  │
│  │ Quantidade: 8.0 kg                 │  │
│  │ Responsável: João Silva            │  │
│  │                                     │  │
│  ════════════════════════════════════  │
│  📊 PASSAPORTE DO MATERIAL              │
│  Rastreabilidade Completa ✓             │
└─────────────────────────────────────────┘
```

**Componentes:**
- Campo de busca com botão 🔎
- Timeline vertical com etapas (ícones de status)
- Cada etapa expande com dados detalhados
- Ícone ✅ = etapa concluída

---

# TELA 14 — Dashboard de Indicadores (Gestor)

```
┌─────────────────────────────────────────┐
│  🏠 FIO TRACK          [Gestor]     ⚙️ │
├─────────────────────────────────────────┤
│                                         │
│  📊 INDICADORES DA OPERAÇÃO             │
│  Período: [Outubro 2026 ▼]             │
│                                         │
│  ── LOGÍSTICOS ─────────────────────    │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌───────┐  │
│  │  15  │ │  12  │ │  8   │ │ 45.2  │  │
│  │Pontos│ │Ativos│ │Colet.│ │ kg    │  │
│  │Cadas.│ │      │ │Realiz│ │Total  │  │
│  └──────┘ └──────┘ └──────┘ └───────┘  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌───────┐  │
│  │   3  │ │ 320  │ │R$ 45 │ │R$ 5.6 │  │
│  │Pend. │ │ km   │ │/colet│ │/kg    │  │
│  └──────┘ └──────┘ └──────┘ └───────┘  │
│                                         │
│  ── AMBIENTAIS ─────────────────────    │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌───────┐  │
│  │ 45.2 │ │ 37.5 │ │ 35.0 │ │  8    │  │
│  │kg des│ │kg prep│ │kg dest│ │ Lotes │  │
│  └──────┘ └──────┘ └──────┘ └───────┘  │
│  ┌──────┐                              │
│  │   3  │ Ações ambientais atendidas   │
│  └──────┘                              │
│                                         │
│  ── QUALIDADE ─────────────────────     │
│  Aprovado: 37.5 kg (83%)  [████████░░] │
│  Rejeitado: 7.7 kg (17%)  [██░░░░░░░░] │
│                                         │
│  Motivos de rejeição:                   │
│  • Contaminado: 4.2 kg                  │
│  • Umidade excessiva: 2.1 kg            │
│  • Tipo inadequado: 1.4 kg              │
│                                         │
│  Tempo médio coleta→triagem: 1.2 dias   │
│                                         │
│  ─────────────────────────────────────  │
│  🏠 Início  📋 Coletas  🔍 Rastrear 📊  │
└─────────────────────────────────────────┘
```

---

# TELA 15 — Consulta de Contribuições (Parceiro)

```
┌─────────────────────────────────────────┐
│  ← Voltar    🌱 MINHAS CONTRIBUIÇÕES    │
├─────────────────────────────────────────┤
│                                         │
│  Salão Beleza Pura                      │
│  Desde: 01/10/2026                      │
│                                         │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│  │    5     │ │  12.5kg  │ │  3      │ │
│  │ Coletas  │ │  Total   │ │ Lotes   │ │
│  │          │ │Contribuído│ │Gerados  │ │
│  └──────────┘ └──────────┘ └─────────┘ │
│                                         │
│  🌳 Impacto Ambiental                  │
│  ┌───────────────────────────────────┐  │
│  │ Você contribuiu para desviar     │  │
│  │ 12.5 kg de material do descarte  │  │
│  │ convencional!                     │  │
│  │                                   │  │
│  │ 🌍 Equivale a ~X sacos de óleo   │  │
│  │    contidos (estimativa)          │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Histórico                              │
│  ┌───────────────────────────────────┐  │
│  │ 18/10 │ 2.5kg │ FT-001 │ ✅     │  │
│  │ 12/10 │ 3.0kg │ FT-003 │ ✅     │  │
│  │ 05/10 │ 2.8kg │ FT-006 │ ✅     │  │
│  │ 01/10 │ 4.2kg │ FT-009 │ ⏳     │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

# Mapa de Navegação entre Telas

```
                        ┌─────────┐
                        │ TELA 01 │
                        │  LOGIN  │
                        └────┬────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ Parceiro │  │ Operador │  │  Gestor  │
        └────┬─────┘  └────┬─────┘  └────┬─────┘
             │              │              │
             ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ TELA 04  │  │ TELA 07  │  │ TELA 14  │
        │Dashboard │  │Dashboard │  │Indicador.│
        │Parceiro  │  │Operador  │  │          │
        └────┬─────┘  └────┬─────┘  └────┬─────┘
             │              │              │
    ┌────────┤       ┌──────┼──────┐       │
    ▼        ▼       ▼      ▼      ▼       ▼
┌───────┐┌──────┐┌──────┐┌─────┐┌──────┐┌──────┐
│TEL 02 ││TEL 03││TEL 05││TEL 06││TEL 13││      │
│Cadas. ││Solic.││Coletas││Detal.││Rastre││      │
│       ││      ││      ││     ││      ││      │
└───────┘└──────┘└──┬───┘└──┬──┘└──────┘└──────┘
                    │       │
                    ▼       ▼
              ┌─────────┐┌────────┐
              │ TELA 08 ││TEL 09  │
              │ Pesagem ││ Lote   │
              └────┬────┘└───┬────┘
                   │         │
                   ▼         ▼
              ┌─────────┐┌────────┐
              │ TELA 10 ││TEL 11  │
              │ Triagem ││Estoque │
              └────┬────┘└───┬────┘
                   │         │
                   ▼         ▼
              ┌─────────┐┌────────┐
              │ TELA 12 ││TEL 15  │
              │Destinação││Contrib.│
              └─────────┘└────────┘
```

---

## Resumo de Telas por Ciclo

| Ciclo | Telas |
|---|---|
| **Sprint 1** | Tela 01 (Login), Tela 02 (Cadastro), Tela 03 (Solicitação), Tela 04 (Dashboard Parceiro), Tela 05 (Lista Coletas) |
| **Sprint 2** | Tela 06 (Detalhes/Registro), Tela 07 (Dashboard Operador), Tela 08 (Pesagem), Tela 09 (Lote) |
| **Sprint 3** | Tela 10 (Triagem), Tela 11 (Estoque), Tela 12 (Destinação), Tela 13 (Rastreabilidade), Tela 14 (Indicadores), Tela 15 (Contribuições) |

**Total: 15 telas**

---

*Documento elaborado conforme atividade Espiral + Scrum — Turma M3 — IFF-FORMATEC*
