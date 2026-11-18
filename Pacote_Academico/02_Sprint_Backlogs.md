# Sprint Backlogs — FioTrack

**Startup:** FioTrack
**Parceira:** ONG FioTar
**Modelo:** Espiral + Scrum
**Instituição:** IFF-FORMATEC — Turma M3

---

## Resumo dos 3 Sprint Backlogs

| | Sprint 1 (Ciclo 1) | Sprint 2 (Ciclo 2) | Sprint 3 (Ciclo 3) |
|---|---|---|---|
| **Tema** | Ideação e MVP Conceitual | Evolução do Produto | Consolidação |
| **Duração** | 2 semanas | 2 semanas | 2 semanas |
| **Pontos** | 13 | 11 | 26-29 |
| **Histórias** | US01, US02, US03 | US04, US05, US06 | US07–US12 |
| **Retro** | Start/Stop/Continue | 4Ls | Sailboat |

---
---

# SPRINT 1 — Ciclo 1: Ideação e MVP Conceitual

## 1. Sprint Goal

> **"Construir o modelo conceitual da operação logística e validar o fluxo básico do FioTrack."**

## 2. Dados da Sprint

| Item | Detalhe |
|---|---|
| Sprint Number | Sprint 1 |
| Ciclo Espiral | Ciclo 1 — Ideação |
| Duração | 2 semanas |
| Total de pontos | 13 |
| Histórias | US01, US02, US03 |
| PO | Aluno A |
| SM | Aluno B |
| Dev | Aluno C |

## 3. Histórias Selecionadas

### US01 — Cadastro de Parceiro (3 pts)

**Como** parceiro, **quero** me cadastrar, **para** participar do programa de coleta.

**Tarefas:**
| # | Tarefa | Responsável | Horas | Status |
|---|---|---|---|---|
| 1.1 | Desenhar tela de cadastro (wireframe) | Dev | 2h | ✅ |
| 1.2 | Definir campos do formulário (nome, tipo, documento, endereço, telefone, e-mail) | PO + Dev | 1h | ✅ |
| 1.3 | Implementar validações de campos obrigatórios | Dev | 2h | ✅ |
| 1.4 | Implementar persistência dos dados do parceiro | Dev | 3h | ✅ |
| 1.5 | Testar fluxo completo de cadastro | Dev | 1h | ✅ |

**Subtotal: 9h**

---

### US02 — Solicitação de Coleta (5 pts)

**Como** parceiro, **quero** solicitar uma coleta, **para** enviar meu material.

**Tarefas:**
| # | Tarefa | Responsável | Horas | Status |
|---|---|---|---|---|
| 2.1 | Desenhar tela de solicitação de coleta (wireframe) | Dev | 2h | ✅ |
| 2.2 | Definir modelo de dados da solicitação (ponto, data, tipo material, quantidade estimada) | PO + Dev | 2h | ✅ |
| 2.3 | Implementar formulário de solicitação | Dev | 4h | ✅ |
| 2.4 | Implementar listagem de solicitações do parceiro | Dev | 3h | ✅ |
| 2.5 | Testar fluxo de solicitação | Dev | 1h | ✅ |

**Subtotal: 12h**

---

### US03 — Visualização de Coletas Pendentes (5 pts)

**Como** operador, **quero** visualizar coletas pendentes, **para** planejar minha rota.

**Tarefas:**
| # | Tarefa | Responsável | Horas | Status |
|---|---|---|---|---|
| 3.1 | Desenhar tela de dashboard do operador (wireframe) | Dev | 2h | ✅ |
| 3.2 | Implementar listagem de coletas pendentes | Dev | 4h | ✅ |
| 3.3 | Implementar filtros por região/status | Dev | 3h | ✅ |
| 3.4 | Implementar ordenação por data/prioridade | Dev | 2h | ✅ |
| 3.5 | Testar visualização | Dev | 1h | ✅ |

**Subtotal: 12h**

---

## 4. Entregáveis da Sprint 1

- [x] Pitch inicial
- [x] Product Backlog V1
- [x] Risk Log V1
- [x] Wireframes (Login, Cadastro, Dashboard, Solicitar Coleta, Lista de Coletas)
- [x] Fluxo logístico conceitual
- [x] Modelo inicial de dados
- [x] Definição do MVP
- [x] Protótipo conceitual

## 5. Burndown — Sprint 1

```
Pontos
13 │ ■
   │ ╲
10 │  ╲
   │   ╲
 7 │    ╲
   │     ╲
 4 │      ╲
   │       ╲
 1 │        ╲
   │         ╲
 0 └──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──
      D1 D2 D3 D4 D5 D6 D7 D8 D9 D10
      
      ─── Ideal   ■ Real
```

## 6. Sprint 1 — Conclusão

| Métrica | Valor |
|---|---|
| Pontos planejados | 13 |
| Pontos concluídos | 13 |
| Taxa de conclusão | 100% |
| Impedimentos | Nenhum bloqueante |

---
---

# SPRINT 2 — Ciclo 2: Evolução do Produto

## 1. Sprint Goal

> **"Transformar o modelo conceitual em um protótipo operacional capaz de controlar coletas, recebimento e lotes."**

## 2. Dados da Sprint

| Item | Detalhe |
|---|---|
| Sprint Number | Sprint 2 |
| Ciclo Espiral | Ciclo 2 — Evolução |
| Duração | 2 semanas |
| Total de pontos | 11 |
| Histórias | US04, US05, US06 |
| PO | Aluno B |
| SM | Aluno C |
| Dev | Aluno A |

## 3. Histórias Selecionadas

### US04 — Registro de Coleta (3 pts)

**Como** operador, **quero** registrar uma coleta, **para** manter a rastreabilidade.

**Tarefas:**
| # | Tarefa | Responsável | Horas | Status |
|---|---|---|---|---|
| 4.1 | Desenhar tela de registro de coleta | Dev | 2h | ✅ |
| 4.2 | Implementar formulário de registro (data, responsável, ponto de coleta) | Dev | 4h | ✅ |
| 4.3 | Implementar status da coleta (pendente → em andamento → concluída) | Dev | 3h | ✅ |
| 4.4 | Testar fluxo de registro | Dev | 1h | ✅ |

**Subtotal: 10h**

---

### US05 — Registro de Peso (3 pts)

**Como** operador, **quero** registrar o peso coletado, **para** controlar o volume.

**Tarefas:**
| # | Tarefa | Responsável | Horas | Status |
|---|---|---|---|---|
| 5.1 | Desenhar tela de pesagem | Dev | 1h | ✅ |
| 5.2 | Implementar formulário de peso (valor, unidade, data, responsável) | Dev | 3h | ✅ |
| 5.3 | Implementar validação de peso (> 0, formato numérico) | Dev | 2h | ✅ |
| 5.4 | Vincular peso à coleta correspondente | Dev | 2h | ✅ |
| 5.5 | Testar fluxo de pesagem | Dev | 1h | ✅ |

**Subtotal: 9h**

---

### US06 — Geração de Lote (5 pts)

**Como** operador, **quero** gerar um lote, **para** identificar o material.

**Tarefas:**
| # | Tarefa | Responsável | Horas | Status |
|---|---|---|---|---|
| 6.1 | Desenhar tela de criação de lote | Dev | 2h | ✅ |
| 6.2 | Implementar geração automática de código (FT-2026-000001) | Dev | 4h | ✅ |
| 6.3 | Implementar campos do lote (tipo material, peso inicial, data de entrada) | Dev | 3h | ✅ |
| 6.4 | Implementar status inicial do lote ("Em triagem") | Dev | 2h | ✅ |
| 6.5 | Implementar consulta de lote por código | Dev | 3h | ✅ |
| 6.6 | Testar fluxo completo de lote | Dev | 1h | ✅ |

**Subtotal: 15h**

---

## 4. Entregáveis da Sprint 2

- [x] Protótipo operacional: Parceiro → Solicitação → Coleta → Pesagem → Lote
- [x] Novas telas: Coletas, Detalhes da Coleta, Recebimento, Pesagem, Criação de Lote, Consulta de Lote
- [x] Risk Log V2
- [x] Modelo de dados atualizado
- [x] Demonstração do fluxo intermediário

## 5. Fluxo Incrementado na Sprint 2

```
Cadastro (S1) → Solicitação (S1) → Visualização (S1)
                                        │
                                        ▼
                              ┌─────────────────┐
                              │  Registro de     │  ← NOVO
                              │  Coleta (US04)   │
                              └────────┬────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │  Registro de     │  ← NOVO
                              │  Peso (US05)     │
                              └────────┬────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │  Geração de      │  ← NOVO
                              │  Lote (US06)     │
                              └─────────────────┘
```

## 6. Burndown — Sprint 2

```
Pontos
11 │ ■
   │ ╲
 9 │  ╲
   │   ╲
 7 │    ╲
   │     ╲
 5 │      ╲
   │       ╲
 3 │        ╲
   │         ╲
 1 │          ╲
   │           ╲
 0 └──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──
      D1 D2 D3 D4 D5 D6 D7 D8 D9 D10
```

## 7. Sprint 2 — Conclusão

| Métrica | Valor |
|---|---|
| Pontos planejados | 11 |
| Pontos concluídos | 11 |
| Taxa de conclusão | 100% |
| Impedimentos | Nenhum bloqueante |

---
---

# SPRINT 3 — Ciclo 3: Consolidação

## 1. Sprint Goal

> **"Consolidar a rastreabilidade e demonstrar a operação completa do material coletado."**

## 2. Dados da Sprint

| Item | Detalhe |
|---|---|
| Sprint Number | Sprint 3 |
| Ciclo Espiral | Ciclo 3 — Consolidação |
| Duração | 2 semanas |
| Total de pontos | 26-29 |
| Histórias | US07, US08, US09, US10, US11, (US12) |
| PO | Aluno C |
| SM | Aluno A |
| Dev | Aluno B |

## 3. Histórias Selecionadas

### US07 — Registro de Triagem (5 pts)

**Como** operador, **quero** registrar a triagem, **para** separar materiais aprovados e rejeitados.

**Tarefas:**
| # | Tarefa | Responsável | Horas | Status |
|---|---|---|---|---|
| 7.1 | Desenhar tela de triagem | Dev | 2h | ✅ |
| 7.2 | Implementar formulário (peso aprovado, peso rejeitado, motivo de rejeição) | Dev | 4h | ✅ |
| 7.3 | Implementar catálogo de motivos de rejeição (contaminado, umidade excessiva, tipo inadequado) | Dev | 2h | ✅ |
| 7.4 | Implementar cálculo de aproveitamento (%) | Dev | 2h | ✅ |
| 7.5 | Vincular triagem ao lote | Dev | 2h | ✅ |
| 7.6 | Testar fluxo de triagem | Dev | 1h | ✅ |

**Subtotal: 13h**

---

### US08 — Consulta de Estoque (5 pts)

**Como** operador, **quero** consultar o estoque, **para** saber quanto material está disponível.

**Tarefas:**
| # | Tarefa | Responsável | Horas | Status |
|---|---|---|---|---|
| 8.1 | Desenhar tela de estoque | Dev | 1h | ✅ |
| 8.2 | Implementar listagem de lotes em estoque | Dev | 4h | ✅ |
| 8.3 | Implementar filtros (status, tipo material, data) | Dev | 3h | ✅ |
| 8.4 | Implementar resumo de pesos (total aprovado, disponível) | Dev | 2h | ✅ |
| 8.5 | Testar consulta | Dev | 1h | ✅ |

**Subtotal: 11h**

---

### US09 — Registro de Destinação (5 pts)

**Como** operador, **quero** registrar a destinação de um lote, **para** completar a rastreabilidade.

**Tarefas:**
| # | Tarefa | Responsável | Horas | Status |
|---|---|---|---|---|
| 9.1 | Desenhar tela de destinação | Dev | 1h | ✅ |
| 9.2 | Implementar formulário (destino, data, quantidade, responsável) | Dev | 4h | ✅ |
| 9.3 | Implementar atualização de status do lote (Estoque → Destinado) | Dev | 3h | ✅ |
| 9.4 | Implementar histórico de movimentações do lote | Dev | 3h | ✅ |
| 9.5 | Testar fluxo de destinação | Dev | 1h | ✅ |

**Subtotal: 12h**

---

### US10 — Rastreabilidade Completa (8 pts)

**Como** gestor, **quero** rastrear um lote desde sua origem até sua destinação, **para** ter visibilidade total.

**Tarefas:**
| # | Tarefa | Responsável | Horas | Status |
|---|---|---|---|---|
| 10.1 | Desenhar tela de rastreabilidade (timeline) | Dev | 3h | ✅ |
| 10.2 | Implementar busca por código do lote (ex: FT-2026-000001) | Dev | 3h | ✅ |
| 10.3 | Implementar timeline: Origem → Coleta → Transporte → Recebimento → Triagem → Estoque → Destinação | Dev | 6h | ✅ |
| 10.4 | Implementar exibição de dados de cada etapa (data, responsável, peso) | Dev | 4h | ✅ |
| 10.5 | Testar rastreabilidade completa | Dev | 2h | ✅ |

**Subtotal: 18h**

---

### US11 — Indicadores (5 pts)

**Como** gestor, **quero** visualizar indicadores, **para** acompanhar a operação.

**Tarefas:**
| # | Tarefa | Responsável | Horas | Status |
|---|---|---|---|---|
| 11.1 | Desenhar dashboard de indicadores | Dev | 2h | ✅ |
| 11.2 | Implementar indicadores logísticos (coletas realizadas, pendentes, peso coletado) | Dev | 4h | ✅ |
| 11.3 | Implementar indicadores ambientais (kg desviados, lotes, destinações) | Dev | 3h | ✅ |
| 11.4 | Implementar indicadores de qualidade (aprovado, rejeitado, motivos) | Dev | 3h | ✅ |
| 11.5 | Testar indicadores | Dev | 1h | ✅ |

**Subtotal: 13h**

---

### US12 — Consulta de Contribuições do Parceiro (3 pts) — Opcional

**Como** parceiro, **quero** consultar minhas contribuições, **para** acompanhar minha participação.

**Tarefas:**
| # | Tarefa | Responsável | Horas | Status |
|---|---|---|---|---|
| 12.1 | Desenhar tela de contribuições do parceiro | Dev | 1h | ⬜ |
| 12.2 | Implementar histórico de coletas do parceiro | Dev | 3h | ⬜ |
| 12.3 | Implementar totalização (peso total, nº de coletas) | Dev | 2h | ⬜ |
| 12.4 | Testar consulta | Dev | 1h | ⬜ |

**Subtotal: 7h (se incluída)**

---

## 4. Entregáveis da Sprint 3

- [x] Protótipo final completo
- [x] Risk Log V3
- [x] Pitch final
- [x] Relatório reflexivo
- [x] Demonstração do fluxo completo: Cadastro → Solicitação → Coleta → Pesagem → Lote → Triagem → Estoque → Destinação → Rastreabilidade
- [x] Wireframes de todas as telas
- [x] Atas de Sprint Review
- [x] Retrospectivas

## 5. Fluxo Final Completo (Sprint 3)

```
┌──────────┐   ┌──────────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│Cadastro  │──▶│ Solicitação  │──▶│ Coleta   │──▶│  Peso    │──▶│  Lote    │
│Parceiro  │   │ de Coleta    │   │ (registro)│   │ (registro)│   │(FT-2026) │
└──────────┘   └──────────────┘   └──────────┘   └──────────┘   └────┬─────┘
                                                                     │
                                                                     ▼
┌──────────┐   ┌──────────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│Rastrear  │◀──│ Destinação   │◀──│ Estoque  │◀──│ Triagem  │◀──│Recebim.  │
│lote      │   │ (saída)      │   │(consulta)│   │(aprovado/│   │(entrada) │
│(timeline)│   │              │   │          │   │rejeitado)│   │          │
└──────────┘   └──────────────┘   └──────────┘   └──────────┘   └──────────┘
```

## 6. Burndown — Sprint 3

```
Pontos
29 │ ■
   │ ╲
24 │  ╲
   │   ╲
19 │    ╲
   │     ╲
14 │      ╲
   │       ╲
 9 │        ╲
   │         ╲
 4 │          ╲
   │           ╲
 0 └──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──
      D1 D2 D3 D4 D5 D6 D7 D8 D9 D10
```

## 7. Sprint 3 — Conclusão

| Métrica | Valor |
|---|---|
| Pontos planejados | 26 (29 com US12) |
| Pontos concluídos | 26-29 |
| Taxa de conclusão | 100% |
| Impedimentos | Nenhum bloqueante |

---

## Resumo Geral dos 3 Sprints

| Métrica | Sprint 1 | Sprint 2 | Sprint 3 | Total |
|---|---|---|---|---|
| Pontos planejados | 13 | 11 | 26-29 | 50-53 |
| Pontos concluídos | 13 | 11 | 26-29 | 50-53 |
| Histórias | 3 | 3 | 5-6 | 11-12 |
| Taxa de conclusão | 100% | 100% | 100% | 100% |
| Formato de retro | S/S/C | 4Ls | Sailboat | — |

---

*Documento elaborado conforme atividade Espiral + Scrum — Turma M3 — IFF-FORMATEC*
