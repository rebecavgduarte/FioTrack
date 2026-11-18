# Retrospectivas — FioTrack

**Startup:** FioTrack
**Parceira:** ONG FioTar
**Modelo:** Espiral + Scrum
**Instituição:** IFF-FORMATEC — Turma M3

---

## Formatos por Ciclo (conforme planejado)

| Ciclo | Sprint | Formato | Objetivo |
|---|---|---|---|
| 1 | Sprint 1 | **Start / Stop / Continue** | Identificar o que iniciar, parar e manter |
| 2 | Sprint 2 | **4Ls** (Liked, Learned, Lacked, Longed for) | O que gostamos, aprendemos, faltou e desejamos |
| 3 | Sprint 3 | **Sailboat** (Veleiro) | Impulsionadores, freios, ilhas e rochedos |

---
---

# RETROSPECTIVA 1 — Sprint 1 (Ciclo 1)

**Formato:** Start / Stop / Continue
**Data:** 14/10/2026 (após Sprint Review)
**Participantes:** Aluno A (PO), Aluno B (SM), Aluno C (Dev)

## 🟢 START — O que devemos INICIAR?

| # | Item | Responsável | Prazo |
|---|---|---|---|
| 1 | Usar wireframes antes de codificar para alinhar expectativas | Dev | Sprint 2 |
| 2 | Reunião de alinhamento de 15 min no início de cada sprint | SM | Sprint 2 |
| 3 | Documentar critérios de aceitação antes de iniciar as tarefas | PO | Sprint 2 |
| 4 | Estimar horas das tarefas de forma mais realista | Todos | Sprint 2 |
| 5 | Manter o Risk Log atualizado a cada mudança relevante | SM | Contínuo |

## 🔴 STOP — O que devemos PARAR?

| # | Item | Justificativa |
|---|---|---|
| 1 | Começar a codificar sem definir o modelo de dados antes | Gerou retrabalho na US03 |
| 2 | Deixar as validações para o final das histórias | Causou retrabalho; deveria ser feito junto |
| 3 | Esquecer de atualizar o status das tarefas no Sprint Backlog | Dificultou acompanhar o progresso |
| 4 | Reuniões sem pauta definida | Perda de tempo |

## 🔵 CONTINUE — O que devemos MANTER?

| # | Item | Evidência |
|---|---|---|
| 1 | Daily assíncrona por mensagem (O que fiz? O que farei? Impedimentos?) | Funcionou bem; todos responderam diariamente |
| 2 | Organização por Sprint Goal clara | Todos sabiam o objetivo do ciclo |
| 3 | Demonstrações ao vivo na Sprint Review | Feedback valioso da FioTar e do professor |
| 4 | Separação clara de papéis (PO, SM, Dev) com rotação | Todos participaram ativamente |
| 5 | Formato "Como [usuário], quero [ação], para [benefício]" | Tornou as histórias claras |

## 📊 Resumo da Retrospectiva 1

| Categoria | Nº de itens |
|---|---|
| Start | 5 |
| Stop | 4 |
| Continue | 5 |

## 🎯 Ações Concretas para a Sprint 2

| # | Ação | Responsável | Status |
|---|---|---|---|
| 1 | Definir modelo de dados ANTES de codificar | Dev | ✅ Adotado |
| 2 | Pauta fixa para daily e reuniões | SM | ✅ Adotado |
| 3 | Estimar em horas por tarefa | Todos | ✅ Adotado |
| 4 | Atualizar status de tarefas diariamente | Todos | ✅ Adotado |

---
---

# RETROSPECTIVA 2 — Sprint 2 (Ciclo 2)

**Formato:** 4Ls (Liked, Learned, Lacked, Longed for)
**Data:** 28/10/2026 (após Sprint Review)
**Participantes:** Aluno B (PO), Aluno C (SM), Aluno A (Dev)

## ❤️ LIKED — O que GOSTAMOS?

| # | Item |
|---|---|
| 1 | A geração automática de código de lote ficou muito intuitiva |
| 2 | A interface de pesagem ficou clara e fácil de usar |
| 3 | A rotação de papéis permitiu que todos entendessem as diferentes perspectivas |
| 4 | O avanço do protótipo era visível a cada dia de trabalho |
| 5 | O formato de retrospectiva 4Ls trouxe uma visão mais ampla que o S/S/C |
| 6 | O trabalho em dupla na revisão de código melhorou a qualidade |

## 📚 LEARNED — O que APRENDEMOS?

| # | Item |
|---|---|
| 1 | Que estimar em pontos de história é mais útil que estimar em horas para o backlog, mas horas ajudam no planejamento diário |
| 2 | Que definir o modelo de dados primeiro (aprendizado da Sprint 1) eliminou retrabalho |
| 3 | Que a validação de soma de pesos (aprovado + rejeitado = inicial) é essencial para integridade dos dados |
| 4 | Que gerar código único progressivo exige controle de concorrência (mesmo em protótipo) |
| 5 | Que o "protótipo conceitual" e o "protótipo operacional" são fases muito diferentes em esforço |
| 6 | Que a rastreabilidade depende de cada etapa estar bem registrada; falha em uma etapa quebra toda a cadeia |

## 😞 LACKED — O que FALTOU?

| # | Item | Impacto |
|---|---|---|
| 1 | Tempo para testes mais abrangentes | Algumas validações foram testadas manualmente apenas |
| 2 | Definição clara do que acontece com material rejeitado na triagem | Decisão adiada para Sprint 3/FioTar |
| 3 | Comunicação mais frequente com a FioTar durante a sprint | Feedback veio apenas na Review |
| 4 | Ferramenta de versionamento (Git) usada desde o início | Código inicial foi gerado sem controle de versão |
| 5 | Definição de quem faz o handover de responsabilidade na coleta | Risco R06 identificado |

## 🌟 LONGED FOR — O que DESEJAMOS?

| # | Item |
|---|---|
| 1 | Mais tempo para refinar a usabilidade das telas |
| 2 | Ter dados reais de parceiros para testar com volumes reais |
| 3 | Uma API de mapas para visualizar rotas geograficamente |
| 4 | Feedback da FioTar durante a sprint, não só na Review |
| 5 | Um design system (kit de componentes) para manter consistência visual |

## 📊 Resumo da Retrospectiva 2

| Categoria | Nº de itens |
|---|---|
| Liked | 6 |
| Learned | 6 |
| Lacked | 5 |
| Longed for | 5 |

## 🎯 Ações Concretas para a Sprint 3

| # | Ação | Responsável | Status |
|---|---|---|---|
| 1 | Iniciar controle de versão (Git) para o código | Dev | ✅ Adotado |
| 2 | Enviar atualização para FioTar a cada 3 dias | PO | ✅ Adotado |
| 3 | Definir procedimento para material rejeitado | PO + FioTar | ⬜ Pendente |
| 4 | Estabelecer handover de responsabilidade na coleta | SM | ✅ Adotado (R06) |
| 5 | Criar componentes visuais reutilizáveis | Dev | ✅ Adotado |

---
---

# RETROSPECTIVA 3 — Sprint 3 (Ciclo 3)

**Formato:** Sailboat (Veleiro)
**Data:** 11/11/2026 (após Sprint Review)
**Participantes:** Aluno C (PO), Aluno A (SM), Aluno B (Dev)

```
                    ☀️ SOL (Objetivo)
                         │
                         ▼
              ┌─────────────────────┐
              │    🏝️ ILHA          │
              │  (O que desejamos   │
              │   alcançar no       │
              │   futuro)           │
              └─────────────────────┘
                         ▲
                         │
              ┌─────────────────────┐
              │    ⛵ VELEIRO        │
              │  (O projeto:        │
              │   FioTrack MVP)     │
              └─────────────────────┘
                 ▲            ▲
        IMPULSIONADORES    FREIOS
        (O que nos         (O que nos
         ajudou)            atrasou)
                 │            │
                 ▼            ▼
        ┌──────────────┐ ┌──────────────┐
        │  🌊 VENTO    │ │  🪨 ROCHEDOS │
        │  (Forças)    │ │  (Riscos)    │
        └──────────────┘ └──────────────┘
```

## ☀️ SOL — Nosso Objetivo

> Entregar o MVP completo do FioTrack com rastreabilidade ponta a ponta, capaz de demonstrar a operação logística reversa da FioTrack para a ONG FioTar e a banca avaliadora.

**Status: ALCANÇADO ✅**

## 🌊 VENTO / IMPULSIONADORES — O que nos AJUDOU

| # | Força | Impacto |
|---|---|---|
| 1 | Modelos de dados definidos antes da codificação | Evitou retrabalho (aprendizado da Sprint 1) |
| 2 | Daily assíncrona com 3 perguntas fixas | Manteve everyone aligned sem reuniões longas |
| 3 | Rotação de papéis a cada ciclo | Todos entenderam PO, SM e Dev |
| 4 | Formato 4Ls na retrospectiva anterior | Trouxe insights mais profundos |
| 5 | Critérios de aceitação definidos antes de iniciar | Tornou claro o que era "pronto" |
| 6 | Demonstrações ao vivo na Sprint Review | Feedback imediato e valioso |
| 7 | Trabalho em dupla na revisão de código | Aumentou a qualidade e reduziu bugs |
| 8 | Motivação da equipe pelo propósito ambiental | Todos queriam entregar um bom resultado |

## 🪨 FREIOS / RISCOS — O que NOS ATRASOU

| # | Freio | Impacto | Ação |
|---|---|---|---|
| 1 | Escopo grande na Sprint 3 (6 histórias, 31 pontos) | Pressão no cronograma final | Priorizar Must Have; US12 como bônus |
| 2 | Falta de dados reais de parceiros para testes | Testes com dados fictícios apenas | Simular cenários realistas |
| 3 | Risco de validação técnica do material (R05) | Impede escala; depende de externos | Documentar como risco aberto |
| 4 | Dúvidas sobre destinação do material rejeitado | Decisão depende da FioTar | Pautar com parceira |
| 5 | Diferenças de disponibilidade entre os membros | Algumas tarefas concentradas em um | Melhor distribuição na próxima vez |

## 🪨 ROCHEDOS — Riscos à Frente

| # | Risco | Probabilidade | Ação Sugerida |
|---|---|---|---|
| 1 | Validação técnica do material não ocorrer | Alta | Buscar parceria com universidade/CIPEI |
| 2 | Custo logístico inviabilizar escala | Média | Roteirização e agrupamento |
| 3 | Parceiros não manterem separação adequada | Média | Manual + treinamento |
| 4 | Crescimento rápido demais | Baixa | Limitação territorial inicial |

## 🏝️ ILHA — Para onde QUEREMOS IR

| # | Visão |
|---|---|
| 1 | Operação piloto funcionando em Maricá com 15+ pontos ativos |
| 2 | Validação técnica do material com instituição de pesquisa |
| 3 | Aplicativo mobile para parceiros |
| 4 | Roteirização automática com geolocalização |
| 5 | Dashboard ambiental público com impacto em tempo real |
| 6 | Certificados de participação para parceiros |
| 7 | Expansão para outras regiões costeiras |

## 📊 Resumo da Retrospectiva 3

| Categoria | Nº de itens |
|---|---|
| Sol (objetivo) | 1 (alcancado) |
| Vento (impulsionadores) | 8 |
| Freios (atrasos) | 5 |
| Rochedos (riscos) | 4 |
| Ilha (futuro) | 7 |

## 🎯 Lições Gerais do Projeto (consolidadas das 3 retrospectivas)

| # | Lição |
|---|---|
| 1 | **Planejar antes de codificar** — modelo de dados e critérios de aceitação primeiro |
| 2 | **Daily assíncrona funciona** — desde que tenha perguntas claras |
| 3 | **Rotação de papéis enriquece** — todos entendem as dores de cada papel |
| 4 | **A espiral funciona** — cada ciclo identificou riscos que o anterior não via |
| 5 | **Review com stakeholders reais é insubstituível** — feedback da FioTar mudou decisões |
| 6 | **Escopo realista é essencial** — a Sprint 3 foi a mais pesada; distribuir melhor no futuro |
| 7 | **Risco técnico externo é diferente de risco de software** — R05 não é resolvível só com código |
| 8 | **Propósito ambiental motiva** — a equipe se envolveu mais por causa do impacto social |

---

*Documento elaborado conforme atividade Espiral + Scrum — Turma M3 — IFF-FORMATEC*
