# Atas de Sprint Review — FioTrack

**Startup:** FioTrack
**Parceira:** ONG FioTar
**Modelo:** Espiral + Scrum
**Instituição:** IFF-FORMATEC — Turma M3

---
---

# ATA DE SPRINT REVIEW — SPRINT 1

## 1. Identificação

| Campo | Informação |
|---|---|
| **Projeto** | FioTrack |
| **Sprint** | Sprint 1 |
| **Ciclo Espiral** | Ciclo 1 — Ideação e MVP Conceitual |
| **Data** | 14/10/2026 |
| **Horário** | 19h00 às 20h30 |
| **Local** | IFF-FORMATEC — Sala de aula / Remoto |
| **Product Owner** | Aluno A |
| **Scrum Master** | Aluno B |
| **Desenvolvedor** | Aluno C |
| **Participantes** | Equipe do projeto, professor(a) orientador(a), representante da ONG FioTar (convidado) |

## 2. Sprint Goal (Meta da Sprint)

> "Construir o modelo conceitual da operação logística e validar o fluxo básico do FioTrack."

## 3. O que foi apresentado

### 3.1 Incremento demonstrado

O protótipo conceitual do FioTrack foi apresentado com as seguintes telas funcionais:

| # | Tela | Status | Observação |
|---|---|---|---|
| 1 | Login | ✅ Demonstrada | Autenticação simples com perfis (Parceiro, Operador, Gestor) |
| 2 | Cadastro de Parceiro | ✅ Demonstrada | Formulário completo com validações |
| 3 | Solicitação de Coleta | ✅ Demonstrada | Fluxo completo parceiro → solicitação |
| 4 | Dashboard do Parceiro | ✅ Demonstrada | Lista de solicitações com status |
| 5 | Lista de Coletas (Operador) | ✅ Demonstrada | Visualização de pendentes com filtros |

### 3.2 Histórias concluídas

| ID | História | Pontos | Status |
|---|---|---|---|
| US01 | Cadastro de Parceiro | 3 | ✅ Concluída |
| US02 | Solicitação de Coleta | 5 | ✅ Concluída |
| US03 | Visualização de Coletas Pendentes | 5 | ✅ Concluída |
| **Total** | | **13** | **100%** |

### 3.3 Demo do fluxo

```
1. Parceiro acessa tela de cadastro
2. Preenche dados do estabelecimento (Salão Beleza Pura)
3. Cadastra com sucesso → redirecionado ao dashboard
4. Parceiro solicita coleta (cabelo humano, 2.5 kg, 15/10)
5. Solicitação registrada com protocolo SOL-0005
6. Operador acessa dashboard → visualiza coleta pendente
7. Operador visualiza detalhes (endereço, material, data)
```

## 4. Feedback dos Stakeholders

### 4.1 Representante da ONG FioTar

| # | Feedback | Tipo | Ação |
|---|---|---|---|
| 1 | O fluxo está claro e intuitivo | Positivo | — |
| 2 | Seria importante incluir o campo "município" no cadastro para facilitar roteirização futura | Sugestão | Adicionado ao backlog |
| 3 | O status das solicitações deve ser visível para o parceiro em tempo real | Sugestão | Priorizado para Sprint 2 |
| 4 | Sugere incluir campo de "observações" na solicitação para orientações específicas | Sugestão | Incluído na US02 |

### 4.2 Professor(a) Orientador(a)

| # | Feedback | Tipo | Ação |
|---|---|---|---|
| 1 | O modelo conceitual está consistente com o problema apresentado | Positivo | — |
| 2 | Recomenda incluir validação de documento duplicado no cadastro | Crítica | Incluído em CA-01.4 |
| 3 | O código do lote deve ser explicado desde já (FT-2026-XXXXXX) | Orientação | Documentado no modelo de dados |

## 5. Perguntas e Respostas

| # | Pergunta | Resposta |
|---|---|---|
| 1 | Como o parceiro saberá que a coleta foi agendada? | O status será atualizado no dashboard (implementação na Sprint 2) |
| 2 | O sistema terá login por SMS/e-mail? | No MVP, apenas e-mail + senha. SMS fica para versão futura |
| 3 | Quem define as regiões de coleta? | O operador/gestor, com base na concentração de parceiros |

## 6. Riscos Identificados na Review

| ID | Risco | Ação |
|---|---|---|
| R04 (V1) | Dificuldade para conseguir parceiros | Iniciar abordagem direta em salões de Maricá |
| Novo | Falta de clareza no fluxo de status das solicitações | Detalhar na Sprint 2 |

## 7. Decisões

| # | Decisão |
|---|---|
| 1 | Aprovar o incremento da Sprint 1 |
| 2 | Incluir campo "município" no cadastro de parceiros |
| 3 | Priorizar exibição de status em tempo real para Sprint 2 |
| 4 | Manter escopo da Sprint 2 conforme planejado (US04, US05, US06) |

## 8. Sprint Goal Cumprida?

| Critério | Status |
|---|---|
| Modelo conceitual construído | ✅ Sim |
| Fluxo básico do FioTrack validado | ✅ Sim |
| Protótipo demonstrável | ✅ Sim |

**Sprint Goal: ALCANÇADA ✅**

## 9. Próxima Sprint

| Campo | Informação |
|---|---|
| Sprint | Sprint 2 |
| Tema | Evolução do Produto |
| Histórias | US04 (Registro de Coleta), US05 (Registro de Peso), US06 (Geração de Lote) |
| Pontos | 11 |

---

**Assinaturas:**

Product Owner (Aluno A): _________________
Scrum Master (Aluno B): _________________
Desenvolvedor (Aluno C): _________________

---
---

# ATA DE SPRINT REVIEW — SPRINT 2

## 1. Identificação

| Campo | Informação |
|---|---|
| **Projeto** | FioTrack |
| **Sprint** | Sprint 2 |
| **Ciclo Espiral** | Ciclo 2 — Evolução do Produto |
| **Data** | 28/10/2026 |
| **Horário** | 19h00 às 20h30 |
| **Local** | IFF-FORMATEC — Sala de aula / Remoto |
| **Product Owner** | Aluno B |
| **Scrum Master** | Aluno C |
| **Desenvolvedor** | Aluno A |
| **Participantes** | Equipe do projeto, professor(a) orientador(a), representante da ONG FioTar (convidado) |

## 2. Sprint Goal (Meta da Sprint)

> "Transformar o modelo conceitual em um protótipo operacional capaz de controlar coletas, recebimento e lotes."

## 3. O que foi apresentado

### 3.1 Incremento demonstrado

| # | Tela | Status | Observação |
|---|---|---|---|
| 6 | Detalhes da Coleta / Registro | ✅ Demonstrada | Registro com data, responsável e peso |
| 7 | Dashboard do Operador | ✅ Demonstrada | Cards de resumo e ações rápidas |
| 8 | Pesagem | ✅ Demonstrada | Interface de pesagem com validação |
| 9 | Criação de Lote | ✅ Demonstrada | Geração automática de código FT-2026-XXXXXX |

### 3.2 Histórias concluídas

| ID | História | Pontos | Status |
|---|---|---|---|
| US04 | Registro de Coleta | 3 | ✅ Concluída |
| US05 | Registro de Peso | 3 | ✅ Concluída |
| US06 | Geração de Lote | 5 | ✅ Concluída |
| **Total** | | **11** | **100%** |

### 3.3 Demo do fluxo incrementado

```
1. Parceiro já cadastrado (Sprint 1)
2. Parceiro solicita coleta → SOL-0005 (Sprint 1)
3. Operador visualiza coleta pendente (Sprint 1)
4. NOVO: Operador acessa detalhes da coleta
5. NOVO: Operador registra coleta realizada
   - Data: 15/10/2026
   - Responsável: João Silva
   - Peso: 2.5 kg
6. NOVO: Operador registra pesagem
   - Balança digital: 2.5 kg
   - Conferência dupla confirmada
7. NOVO: Sistema gera lote automaticamente
   - Código: FT-2026-000001
   - Tipo: Cabelo humano
   - Peso inicial: 2.5 kg
   - Status: Em Triagem
8. NOVO: Operador consulta lote por código
```

### 3.4 Fluxo completo até o momento

```
Cadastro → Solicitação → Visualização → Registro → Pesagem → Lote
  (S1)       (S1)          (S1)          (S2)      (S2)     (S2)
```

## 4. Feedback dos Stakeholders

### 4.1 Representante da ONG FioTar

| # | Feedback | Tipo | Ação |
|---|---|---|---|
| 1 | O fluxo está ficando completo e intuitivo | Positivo | — |
| 2 | A geração automática de código de lote é essencial para rastreabilidade | Positivo | — |
| 3 | Seria útil ter um botão para imprimir etiqueta com o código do lote | Sugestão | Backlog futuro (US16) |
| 4 | O peso deve sempre mostrar quem registrou e quando | Sugestão | Implementado na US05 |

### 4.2 Professor(a) Orientador(a)

| # | Feedback | Tipo | Ação |
|---|---|---|---|
| 1 | A evolução entre sprints está clara e incremental | Positivo | — |
| 2 | O código FT-2026-XXXXXX está bem implementado | Positivo | — |
| 3 | Recomenda que o próximo ciclo foque em triagem, estoque e destinação para fechar o ciclo de vida do lote | Orientação | Sprint 3 planejada conforme orientação |
| 4 | Validar a soma dos pesos na triagem (aprovado + rejeitado = inicial) | Crítica | Incluído em CA-07.2 |

## 5. Perguntas e Respostas

| # | Pergunta | Resposta |
|---|---|---|
| 1 | O que acontece se a coleta for cancelada? | O status muda para "Cancelada" e o parceiro é notificado (futuro) |
| 2 | É possível editar o peso depois de registrado? | No MVP não; correção seria um novo registro com justificativa (futuro) |
| 3 | Quantos lotes podem ser gerados por coleta? | Um lote por coleta no MVP. Agrupamento de coletas em lote único fica para futuro |

## 6. Riscos Identificados na Review

| ID | Risco | Ação |
|---|---|---|
| R04 (V2) | Perda da identificação do lote | Código único + registro digital + etiqueta física |
| Novo | Erro na pesagem pode comprometer dados | Conferência dupla implementada |
| R05 (V1) | Sistema não representar a operação | Continuar validando a cada review |

## 7. Decisões

| # | Decisão |
|---|---|
| 1 | Aprovar o incremento da Sprint 2 |
| 2 | Sprint 3 conterá 5-6 histórias (US07–US12) para fechar o fluxo completo |
| 3 | Incluir validação de soma de pesos na triagem |
| 4 | Manter escopo de rastreabilidade como prioridade máxima na Sprint 3 |

## 8. Sprint Goal Cumprida?

| Critério | Status |
|---|---|
| Protótipo operacional construído | ✅ Sim |
| Controle de coletas funcionando | ✅ Sim |
| Controle de recebimento funcionando | ✅ Sim |
| Geração de lotes funcionando | ✅ Sim |

**Sprint Goal: ALCANÇADA ✅**

## 9. Próxima Sprint

| Campo | Informação |
|---|---|
| Sprint | Sprint 3 |
| Tema | Consolidação |
| Histórias | US07 (Triagem), US08 (Estoque), US09 (Destinação), US10 (Rastreabilidade), US11 (Indicadores), US12 (Contribuições - opcional) |
| Pontos | 26-29 |

---

**Assinaturas:**

Product Owner (Aluno B): _________________
Scrum Master (Aluno C): _________________
Desenvolvedor (Aluno A): _________________

---
---

# ATA DE SPRINT REVIEW — SPRINT 3

## 1. Identificação

| Campo | Informação |
|---|---|
| **Projeto** | FioTrack |
| **Sprint** | Sprint 3 |
| **Ciclo Espiral** | Ciclo 3 — Consolidação |
| **Data** | 11/11/2026 |
| **Horário** | 19h00 às 21h00 |
| **Local** | IFF-FORMATEC — Sala de aula / Remoto |
| **Product Owner** | Aluno C |
| **Scrum Master** | Aluno A |
| **Desenvolvedor** | Aluno B |
| **Participantes** | Equipe do projeto, professor(a) orientador(a), representante da ONG FioTar, representantes convidados (parceiros piloto) |

## 2. Sprint Goal (Meta da Sprint)

> "Consolidar a rastreabilidade e demonstrar a operação completa do material coletado."

## 3. O que foi apresentado

### 3.1 Incremento demonstrado

| # | Tela | Status | Observação |
|---|---|---|---|
| 10 | Triagem | ✅ Demonstrada | Aprovado/rejeitado com motivos e aproveitamento |
| 11 | Consulta de Estoque | ✅ Demonstrada | Listagem com filtros e resumo |
| 12 | Destinação | ✅ Demonstrada | Registro de saída com destino |
| 13 | Rastreabilidade | ✅ Demonstrada | Timeline completa do lote |
| 14 | Dashboard de Indicadores | ✅ Demonstrada | Logísticos, ambientais e de qualidade |
| 15 | Contribuições do Parceiro | ✅ Demonstrada | Histórico e impacto ambiental (US12) |

### 3.2 Histórias concluídas

| ID | História | Pontos | Status |
|---|---|---|---|
| US07 | Registro de Triagem | 5 | ✅ Concluída |
| US08 | Consulta de Estoque | 5 | ✅ Concluída |
| US09 | Registro de Destinação | 5 | ✅ Concluída |
| US10 | Rastreabilidade Completa | 8 | ✅ Concluída |
| US11 | Indicadores | 5 | ✅ Concluída |
| US12 | Contribuições do Parceiro | 3 | ✅ Concluída (bônus) |
| **Total** | | **31** | **100%** |

### 3.3 Demo do fluxo completo (jornada do lote FT-2026-000001)

```
JORNADA COMPLETA DO MATERIAL — DEMONSTRAÇÃO AO VIVO:

📍 ETAPA 1: ORIGEM
   Salão Beleza Pura se cadastra no FioTrack (Tela 02)

📦 ETAPA 2: SOLICITAÇÃO
   Parceiro solicita coleta de cabelo humano, ~2.5 kg (Tela 03)

📋 ETAPA 3: PLANEJAMENTO
   Operador visualiza coleta pendente no dashboard (Tela 05)

✅ ETAPA 4: COLETA
   Operador registra coleta: 15/10, João Silva (Tela 06)

⚖️ ETAPA 5: PESAGEM
   Peso registrado: 2.5 kg, conferência dupla (Tela 08)

🏷️ ETAPA 6: LOTE
   Código gerado: FT-2026-000001, Status: Em Triagem (Tela 09)

🔍 ETAPA 7: TRIAGEM
   Aprovado: 2.0 kg | Rejeitado: 0.5 kg | Motivo: Contaminado
   Aproveitamento: 80% (Tela 10)

📦 ETAPA 8: ESTOQUE
   Lote disponível: 2.0 kg (Tela 11)

🚚 ETAPA 9: DESTINAÇÃO
   Enviado para ONG FioTar, 18/10/2026 (Tela 12)

🔍 ETAPA 10: RASTREABILIDADE
   Timeline completa exibida (Tela 13)

📊 ETAPA 11: INDICADORES
   Dashboard atualizado com dados da operação (Tela 14)
```

### 3.4 Demonstração da Rastreabilidade

O representante da FioTar realizou uma busca ao vivo pelo código **FT-2026-000001** e visualizou a timeline completa:

| Etapa | Data | Responsável | Dados |
|---|---|---|---|
| Origem | 14/10/2026 | — | Salão Beleza Pura, Maricá |
| Coleta | 15/10/2026 | João Silva | 2.5 kg |
| Transporte | 15/10/2026 | João Silva | Centro → Centro de Triagem |
| Recebimento | 15/10/2026 | Maria Santos | Conferido |
| Triagem | 16/10/2026 | Maria Santos | 2.0 kg aprovados, 0.5 kg rejeitados |
| Estoque | 16/10/2026 | — | 2.0 kg disponíveis |
| Destinação | 18/10/2026 | João Silva | → ONG FioTar, 2.0 kg |

## 4. Feedback dos Stakeholders

### 4.1 Representante da ONG FioTar

| # | Feedback | Tipo | Ação |
|---|---|---|---|
| 1 | A rastreabilidade completa atende plenamente à necessidade da operação | Positivo | — |
| 2 | O "passaporte do material" é exatamente o que precisávamos para prestar contas aos apoiadores | Positivo | — |
| 3 | Os indicadores ambientais são essenciais para comunicação institucional | Positivo | — |
| 4 | Sugere exportar relatório em PDF para doadores | Sugestão | Backlog futuro (US15) |
| 5 | Recomenda validar tecnicamente o uso do material com parceiros de pesquisa antes de escala | **Crítica** | Risco R05 (V3) — mantido ABERTO |

### 4.2 Professor(a) Orientador(a)

| # | Feedback | Tipo | Ação |
|---|---|---|---|
| 1 | O projeto atingiu todos os objetivos do MVP | Positivo | — |
| 2 | A evolução nos 3 ciclos foi bem documentada | Positivo | — |
| 3 | O relatório reflexivo deve conectar a teoria (Espiral + Scrum) com a prática vivida | Orientação | Incluído no relatório reflexivo |
| 4 | A validação técnica do material é o principal risco remanescente | Crítica | Risco R05 documentado como ABERTO |
| 5 | Recomenda apresentar o pitch final de forma envolvente para banca | Orientação | Roteiro do pitch elaborado |

### 4.3 Representantes Parceiros (Piloto)

| # | Feedback | Tipo | Ação |
|---|---|---|---|
| 1 | O sistema é fácil de usar, sem necessidade de treinamento extensivo | Positivo | — |
| 2 | Gostariam de receber confirmação por WhatsApp quando a coleta for agendada | Sugestão | Backlog futuro (US14) |
| 3 | O certificado de participação motivaria outros estabelecimentos | Sugestão | Backlog futuro |

## 5. Perguntas e Respostas

| # | Pergunta | Resposta |
|---|---|---|
| 1 | O sistema suporta operação em múltiplos municípios? | Sim, cada lote registra origem por município |
| 2 | Como é feito o cálculo de aproveitamento? | Aproveitamento = (peso aprovado / peso inicial) × 100 |
| 3 | O que acontece com o material rejeitado? | Registrado com motivo; destinação específica a ser definida com FioTar |
| 4 | O sistema é escalável para outros estados? | Sim, arquitetura modular; limitação inicial é territorial (Maricá) |
| 5 | Quando será feita a validação técnica do material? | Risco R05 — depende de parcerias com instituições de pesquisa |

## 6. Riscos Identificados na Review

| ID | Risco | Ação |
|---|---|---|
| R05 (V3) | **Validação técnica do uso do material** | **MANTIDO ABERTO** — depende de parceiros externos |
| R07 (V3) | Resistência de novos parceiros | Usar cases do piloto como argumento de venda |
| Novo | Material rejeitado precisa de destinação própria | Definir com FioTar procedimento para rejeitados |

## 7. Decisões

| # | Decisão |
|---|---|
| 1 | **Aprovar o incremento da Sprint 3** |
| 2 | MVP considerado COMPLETO — 12/12 histórias entregues |
| 3 | Risco R05 (validação técnica) mantido aberto como prioridade pós-projeto |
| 4 | Iniciar operação piloto controlada em Maricá |
| 5 | Preparar pitch final para apresentação à banca |

## 8. Sprint Goal Cumprida?

| Critério | Status |
|---|---|
| Rastreabilidade consolidada | ✅ Sim |
| Operação completa demonstrada | ✅ Sim |
| Fluxo completo de ponta a ponta | ✅ Sim |

**Sprint Goal: ALCANÇADA ✅**

## 9. Resultado Final do Projeto

| Métrica | Resultado |
|---|---|
| Total de histórias planejadas | 12 |
| Total de histórias entregues | 12 (100%) |
| Total de pontos | 53 |
| Sprint Goals alcançados | 3/3 (100%) |
| Telas do FioTrack | 15 |
| Riscos identificados | 13 únicos |
| Riscos fechados | 8 |
| Riscos abertos | 1 (validação técnica) |

---

**Assinaturas:**

Product Owner (Aluno C): _________________
Scrum Master (Aluno A): _________________
Desenvolvedor (Aluno B): _________________

---

*Documento elaborado conforme atividade Espiral + Scrum — Turma M3 — IFF-FORMATEC*
