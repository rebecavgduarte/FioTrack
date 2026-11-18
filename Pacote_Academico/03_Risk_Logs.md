# Risk Logs — FioTrack

**Startup:** FioTrack
**Parceira:** ONG FioTar
**Modelo:** Espiral + Scrum
**Instituição:** IFF-FORMATEC — Turma M3

---

## Legenda de Classificação

| Categoria | Descrição |
|---|---|
| **Técnico** | Relacionado a tecnologia, software ou processos técnicos |
| **Financeiro** | Relacionado a custos e viabilidade econômica |
| **Cronograma** | Relacionado a prazos e atrasos |
| **Aceitação** | Relacionado à adoção pelos usuários/parceiros |

| Probabilidade | Impacto |
|---|---|
| Baixa / Média / Alta | Baixo / Médio / Alto |

**Fórmula de Prioridade:** Probabilidade × Impacto = Prioridade (Alta / Média / Baixa)

---
---

# RISK LOG V1 — Ciclo 1 (Ideação e MVP Conceitual)

**Data:** Ciclo 1 — Sprint 1
**Status:** Encerrado

| ID | Risco | Categoria | Prob. | Impacto | Prioridade | Mitigação | Status |
|---|---|---|---|---|---|---|---|
| **R01** | Não haver quantidade suficiente de material para sustentar a operação piloto | Aceitação | Média | Alto | **Alta** | Criar rede inicial de parceiros com meta mínima de 10 pontos geradores antes do início do piloto | Mitigado |
| **R02** | Material chegar contaminado ou inadequado para utilização | Técnico | Alta | Alto | **Alta** | Criar critérios de aceitação e rejeição claros; treinar parceiros na separação correta | Mitigado |
| **R03** | Custo de coleta inviabilizar a operação financeiramente | Financeiro | Alta | Alto | **Alta** | Agrupar coletas por região; definir frequência mínima por ponto | Mitigado |
| **R04** | Dificuldade para conseguir parceiros dispostos a participar | Aceitação | Média | Alto | **Alta** | Criar programa de adesão com benefícios; abordagem direta em salões e pet shops | Em andamento |
| **R05** | Sistema não representar corretamente a operação logística real | Técnico | Média | Médio | **Média** | Validar fluxo com usuários reais (operadores e parceiros) durante a Sprint Review | Mitigado |

### Análise de Riscos — Ciclo 1

```
Impacto
  Alto  │  R02 ●    ● R01
        │  R03 ●    ● R04
  Médio │        ● R05
        │
  Baixo │
        └──────────────────
          Baixa  Média  Alta   Probabilidade
```

**Conclusão do Ciclo 1:** Os riscos de maior prioridade (R01, R02, R03, R04) foram identificados e possuem planos de mitigação definidos. O risco R04 (conseguir parceiros) permanece em andamento e será reavaliado no Ciclo 2.

---
---

# RISK LOG V2 — Ciclo 2 (Evolução do Produto)

**Data:** Ciclo 2 — Sprint 2
**Status:** Encerrado

| ID | Risco | Categoria | Prob. | Impacto | Prioridade | Mitigação | Status |
|---|---|---|---|---|---|---|---|
| **R01** | Baixo volume coletado nos primeiros meses de operação | Aceitação | Média | Alto | **Alta** | Ampliar rede de parceiros; campanha de arrecadação em eventos | Em andamento |
| **R02** | Custo logístico elevado por unidade transportada | Financeiro | Alta | Alto | **Alta** | Otimização de rotas; agrupamento de coletas por bairro/região | Mitigado |
| **R03** | Erro no registro do peso coletado | Técnico | Média | Médio | **Média** | Conferência dupla na entrada; validação de campos no sistema | Mitigado |
| **R04** | Perda da identificação física do lote | Técnico | Média | Alto | **Alta** | Código único (FT-2026-XXXXXX) + registro digital + etiqueta física | Mitigado |
| **R05** | Atraso no desenvolvimento das funcionalidades | Cronograma | Média | Médio | **Média** | Limitar escopo do MVP; priorizar Must Have no Sprint Backlog | Mitigado |
| **R06** | Material extraviado entre coleta e recebimento | Técnico | Baixa | Alto | **Média** | Registro de handover (transferência de responsabilidade) em cada etapa | Mitigado |

### Novos riscos herdados do Ciclo 1

| ID Origem | Risco | Status no Ciclo 2 |
|---|---|---|
| R04 (V1) | Dificuldade para conseguir parceiros | **Fechado** — 12 parceiros cadastrados no piloto |
| R02 (V1) | Material contaminado | **Fechado** — critérios de aceitação implementados |

### Análise de Riscos — Ciclo 2

```
Impacto
  Alto  │  R02 ●    ● R01
        │  R04 ●    ● R06
  Médio │  R03 ●    ● R05
        │
  Baixo │
        └──────────────────
          Baixa  Média  Alta   Probabilidade
```

**Conclusão do Ciclo 2:** Dois riscos do Ciclo 1 foram fechados (conseguir parceiros e critérios de aceitação). Novo risco R06 (extravio de material) foi identificado e mitigado com registro de transferência de responsabilidade.

---
---

# RISK LOG V3 — Ciclo 3 (Consolidação)

**Data:** Ciclo 3 — Sprint 3
**Status:** Encerrado

| ID | Risco | Categoria | Prob. | Impacto | Prioridade | Mitigação | Status |
|---|---|---|---|---|---|---|---|
| **R01** | Escalabilidade da operação para além do piloto | Técnico | Média | Alto | **Alta** | Arquitetura modular do sistema; separação de camadas | Mitigado |
| **R02** | Custo por kg transportado elevado demais para viabilidade | Financeiro | Média | Alto | **Alta** | Roteirização otimizada; parcerias com transporte existente | Em monitoramento |
| **R03** | Falta de padronização entre os parceiros na separação do material | Aceitação | Média | Médio | **Média** | Manual operacional do parceiro; treinamento inicial obrigatório | Mitigado |
| **R04** | Crescimento da demanda superior à capacidade logística | Cronograma | Média | Alto | **Alta** | Limitação territorial inicial (Maricá e região); crescimento gradual | Mitigado |
| **R05** | Necessidade de validação técnica do uso do material na contenção de óleo | Técnico | Alta | Alto | **Alta** | Parcerias técnicas (universidades, especialistas); testes controlados antes de escala | **Aberto — depende de parceiros externos** |
| **R06** | Dependência de um único centro de preparação | Técnico | Baixa | Alto | **Média** | Estudar centros regionais no futuro; mapeamento de alternativas | Monitorado |
| **R07** | Resistência de novos parceiros em aderir ao programa | Aceitação | Média | Médio | **Média** | Cases de sucesso do piloto; certificados de participação; dashboard de impacto | Mitigado |

### Riscos herdados e status final

| ID Origem | Risco | Status no Ciclo 3 |
|---|---|---|
| R01 (V1) | Quantidade insuficiente de material | **Fechado** — rede com 12+ pontos ativos |
| R03 (V1/V2) | Custo de coleta inviabilizar operação | **Parcialmente mitigado** — custo real a ser medido pós-piloto |
| R01 (V2) | Baixo volume coletado | **Em andamento** — monitorado durante operação |
| R05 (V1) | Sistema não representar a operação | **Fechado** — validado nas 3 Sprint Reviews |

### Análise de Riscos — Ciclo 3

```
Impacto
  Alto  │  R05 ●    ● R01
        │  R04 ●    ● R02
  Médio │  R06 ●    ● R03
        │        ● R07
  Baixo │
        └──────────────────
          Baixa  Média  Alta   Probabilidade
```

**Conclusão do Ciclo 3:** O risco mais crítico (R05 — validação técnica do uso do material) permanece **aberto** e depende de parcerias com instituições de pesquisa. Todos os demais riscos estão mitigados ou em monitoramento ativo.

---
---

# Matriz Consolidada — Evolução dos Riscos

| Risco | V1 (Ciclo 1) | V2 (Ciclo 2) | V3 (Ciclo 3) |
|---|---|---|---|
| Quantidade de material | Aberto | Aberto | **Fechado** |
| Material contaminado | Aberto | **Fechado** | — |
| Custo de coleta | Aberto | Aberto | Parcial |
| Conseguir parceiros | Aberto | **Fechado** | — |
| Sistema fiel à operação | Aberto | Aberto | **Fechado** |
| Volume baixo | — | Aberto | Monitorado |
| Custo logístico | — | Aberto | Monitorado |
| Erro de peso | — | Aberto | **Fechado** |
| Perda de lote | — | Aberto | **Fechado** |
| Atraso no desenvolvimento | — | Aberto | **Fechado** |
| Extravio de material | — | Aberto | **Fechado** |
| Escalabilidade | — | — | Mitigado |
| Custo por kg | — | — | Monitorado |
| Padronização | — | — | Mitigado |
| Crescimento vs capacidade | — | — | Mitigado |
| **Validação técnica do material** | — | — | **ABERTO** |
| Centro único | — | — | Monitorado |
| Resistência de parceiros | — | — | Mitigado |

---

**Total de riscos identificados:** 18 (com sobreposições entre ciclos: 13 únicos)
**Total fechados:** 8
**Total mitigados:** 4
**Total em monitoramento:** 3
**Total abertos:** 1 (validação técnica do material)

---

*Documento elaborado conforme atividade Espiral + Scrum — Turma M3 — IFF-FORMATEC*
