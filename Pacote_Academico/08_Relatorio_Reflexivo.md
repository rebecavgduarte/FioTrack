# Relatório Reflexivo — FioTrack

**Startup:** FioTrack
**Parceira:** ONG FioTar
**Modelo:** Espiral + Scrum
**Instituição:** IFF-FORMATEC — Maricá — Turma M3
**Data:** 11/11/2026

---

## Sumário

1. Introdução
2. Aplicação do Modelo Espiral
3. Aplicação do Scrum
4. A Integração Espiral + Scrum
5. Análise das Sprint Reviews e Retrospectivas
6. Gestão de Riscos ao Longo dos Ciclos
7. O Produto: FioTrack
8. Desafios e Aprendizados
9. Contribuição para o Contexto Ambiental
10. Considerações Finais

---

## 1. Introdução

O presente relatório reflexivo tem como objetivo analisar criticamente o processo de desenvolvimento do projeto **FioTrack**, conduzido sob o modelo de desenvolvimento **Espiral + Scrum**, durante a atividade da disciplina de IFF-FORMATEC, Turma M3.

A FioTrack é uma startup que nasce como braço logístico da ONG FioTar, com o propósito de estruturar uma cadeia de logística reversa para coleta, triagem, preparação, armazenamento e destinação de cabelos humanos e pelos de animais, com potencial aplicação em soluções de contenção de óleo em regiões costeiras.

O produto desenvolvido, o **FioTrack**, é uma plataforma de gestão logística e rastreabilidade que conecta os pontos geradores (salões, barbearias, pet shops) ao centro de preparação e à FioTar, garantindo que cada quilograma de material coletado tenha origem, trajeto e destino documentados.

Este relatório organiza a reflexão em torno de três eixos: **(1)** a aplicação prática dos modelos teóricos (Espiral e Scrum), **(2)** os aprendizados do processo de desenvolvimento, e **(3)** a contribuição do projeto para o problema ambiental que o motivou.

---

## 2. Aplicação do Modelo Espiral

### 2.1 Estrutura dos ciclos

O modelo Espiral foi aplicado em **três voltas (ciclos)**, cada uma com quatro fases clássicas:

| Fase | Ciclo 1 (Ideação) | Ciclo 2 (Evolução) | Ciclo 3 (Consolidação) |
|---|---|---|---|
| **1. Objetivos** | Definir o modelo conceitual e validar o fluxo básico | Transformar conceito em protótipo operacional | Consolidar rastreabilidade e operação completa |
| **2. Riscos** | Risk Log V1: 5 riscos (material, custo, parceiros, sistema) | Risk Log V2: 6 riscos (volume, custo logístico, peso, lote, prazo, extravio) | Risk Log V3: 7 riscos (escalabilidade, custo, padronização, validação técnica, etc.) |
| **3. Desenvolvimento** | Pitch, Backlog, wireframes, modelo de dados, MVP | Registro de coleta, pesagem, geração de lote | Triagem, estoque, destinação, rastreabilidade, indicadores |
| **4. Avaliação** | Sprint Review 1 + Retrospectiva 1 | Sprint Review 2 + Retrospectiva 2 | Sprint Review 3 + Retrospectiva 3 |

### 2.2 A espiral como instrumento de gestão de riscos

A principal contribuição do modelo Espiral foi colocar a **análise de riscos no centro de cada ciclo**. Diferente de modelos lineares em que os riscos são identificados apenas no início, aqui cada nova volta permitiu:

- **Ciclo 1:** Identificar riscos de aceitação (falta de parceiros, quantidade de material) e técnicos (critérios de aceitação, fidelidade do sistema).
- **Ciclo 2:** Identificar riscos operacionais que só apareceram quando o protótipo começou a simular a operação real (erro de pesagem, perda de identificação de lote, extravio).
- **Ciclo 3:** Identificar riscos de escala e de natureza externa (validação técnica do material, crescimento vs capacidade logística).

O risco mais relevante — **R05: Necessidade de validação técnica do uso do material** — foi identificado apenas no Ciclo 3 e permanece **aberto**, pois depende de parcerias com instituições de pesquisa. Isso demonstra que o modelo Espiral foi bem aplicado: riscos que não eram visíveis na fase de ideia se tornaram evidentes quando o produto amadureceu.

### 2.3 Evolução da solução

A evolução seguindo a espiral ficou clara:

```
Ciclo 1: Problema → Usuários → Fluxo → Wireframe
Ciclo 2: Cadastro → Coleta → Pesagem → Lote
Ciclo 3: Coleta → Lote → Triagem → Estoque → Destinação → Rastreabilidade
```

Cada ciclo entregou um incremento **acrescentando** ao anterior, nunca descartando. O MVP final é a soma dos três ciclos.

---

## 3. Aplicação do Scrum

### 3.1 Cerimônias

| Cerimônia | Frequência | O que funcionou | O que poderia melhorar |
|---|---|---|---|
| **Sprint Planning** | Início de cada sprint (2 semanas) | Meta da Sprint clara e memorável; seleção de histórias com priorização MoSCoW | Estimativas poderiam ser feitas com toda a equipe (não apenas com o Dev) |
| **Daily** | Diária, assíncrona (mensagem) | Rápida, respeitou a rotina de todos; formato fixo (O que fiz? O que farei? Impedimentos?) | Poderia ter um canal mais visível para impedimentos |
| **Sprint Review** | Fim de cada sprint | Demo ao vivo com stakeholders reais (FioTar, professor); feedback acionável | Poderia envolver mais parceiros piloto desde cedo |
| **Sprint Retrospective** | Fim de cada sprint | Formatos variados (S/S/C, 4Ls, Sailboat) trouxeram olhares diferentes | Ações das retros deveriam ter sido acompanhadas com mais rigor |

### 3.2 Papéis e rotação

A **rotação de papéis** prevista no projeto foi executada conforme planejado:

| Ciclo | Aluno A | Aluno B | Aluno C |
|---|---|---|---|
| 1 | Product Owner | Scrum Master | Dev |
| 2 | Dev | Product Owner | Scrum Master |
| 3 | Scrum Master | Dev | Product Owner |

A rotação permitiu que cada membro experimentasse as três perspectivas. Reflexões relevantes:

- **Ser Product Owner** exigiu tomar decisões de priorização sob pressão (o que entra e o que fica de fora da sprint).
- **Ser Scrum Master** exigiu facilitar sem impor, remover impedimentos e manter o foco na Sprint Goal.
- **Ser Desenvolvedor** exigiu equilibrar velocidade com qualidade, e aprender a estimar realisticamente.

### 3.3 Product Backlog e Sprint Backlogs

O Product Backlog foi estruturado com **12 histórias de usuário** no formato padrão, priorizadas com MoSCoW e distribuídas em 3 sprints:

| Sprint | Histórias | Pontos | Conclusão |
|---|---|---|---|
| 1 | US01, US02, US03 | 13 | 100% |
| 2 | US04, US05, US06 | 11 | 100% |
| 3 | US07–US12 | 31 | 100% |
| **Total** | **12** | **55** | **100%** |

A prática de **Definition of Done (DoD)** foi aplicada consistentemente: uma história só era considerada pronta quando tinha critérios de aceitação atendidos, dados persistidos, testes realizados e demonstração feita na Review.

---

## 4. A Integração Espiral + Scrum

### 4.1 Como os modelos se complementaram

A combinação Espiral + Scrum foi o diferencial metodológico do projeto:

- **O Scrum** forneceu a **estrutura de execução**: sprints, papéis, cerimônias, backlog, incrementos.
- **O Espiral** forneceu a **lógica de evolução e risco**: cada sprint correspondia a uma volta da espiral, com foco explícito em identificar e mitigar riscos antes de avançar.

Sem o Scrum, o Espiral teria sido difícil de executar no prazo acadêmico. Sem o Espiral, o Scrum teria tratado o projeto como uma sequência de tarefas sem a reflexão profunda sobre riscos — o que teria deixado, por exemplo, o risco da validação técnica (R05) para ser descoberto tarde demais.

### 4.2 Mapeamento Espiral → Scrum

| Espiral | Scrum | Entregável-chave |
|---|---|---|
| Ciclo 1 (Ideação) | Sprint 1 | Protótipo conceitual, wireframes, Risk Log V1 |
| Ciclo 2 (Evolução) | Sprint 2 | Protótipo operacional, fluxo parcial, Risk Log V2 |
| Ciclo 3 (Consolidação) | Sprint 3 | Protótipo final, fluxo completo, Risk Log V3, pitch |

### 4.3 O que a integração revelou

A integração revelou que **risco e incremento devem caminhar juntos**. Em cada ciclo, antes de codificar, fizemos a pergunta: "Que riscos este ciclo pode revelar ou mitigar?" Isso mudou decisões:

- No Ciclo 1, o risco de "material contaminado" levou a criar critérios de aceitação desde o início (US07 dependia disso).
- No Ciclo 2, o risco de "perda de identificação do lote" levou a priorizar código único + registro digital.
- No Ciclo 3, o risco de "validação técnica" levou a documentar explicitamente como risco aberto, sem tentar resolvê-lo com software (que não seria a solução).

---

## 5. Análise das Sprint Reviews e Retrospectivas

### 5.1 Sprint Reviews

As três Sprint Reviews foram o momento de maior aprendizado externo:

- **Review 1:** A FioTar sugeriu incluir o campo "município" e status em tempo real — sugestões incorporadas ao backlog.
- **Review 2:** O professor orientou priorizar rastreabilidade na Sprint 3 — decisão tomada.
- **Review 3:** A FioTar classificou a rastreabilidade como "exatamente o que precisávamos para prestar contas aos apoiadores" — confirmação de valor.

**Aprendizado:** Reviews com stakeholders reais são insubstituíveis. Feedbacks que nunca teríamos imaginado sozinhos surgiram nessas sessões.

### 5.2 Retrospectivas

A evolução dos formatos de retrospectiva trouxe ganhos progressivos:

| Sprint | Formato | Ganho principal |
|---|---|---|
| 1 | Start/Stop/Continue | Identificou hábitos a iniciar e parar (ex: codificar sem modelo de dados) |
| 2 | 4Ls | Trouxe a dimensão emocional e de desejo (Longed for: "mais feedback da FioTar durante a sprint") |
| 3 | Sailboat | Conectou forças, freios, riscos e visão de futuro em uma imagem única |

**Aprendizado:** Variar o formato da retrospectiva evita a "cegueira do rotina" e mantém a equipe engajada em melhorar.

---

## 6. Gestão de Riscos ao Longo dos Ciclos

### 6.1 Evolução dos Risk Logs

| Ciclo | Riscos novos | Fechados | Em aberto/monitoramento |
|---|---|---|---|
| 1 | 5 | 0 | 5 |
| 2 | 6 (+2 herdados) | 2 (parceiros, material contaminado) | 6 |
| 3 | 7 (+4 herdados) | 6 (quantidade, sistema, peso, lote, extravio, prazo) | 1 aberto + 3 monitorados |

### 6.2 O risco que não se resolve com código

O risco **R05 (validação técnica do uso do material)** é o mais importante do projeto e é, simultaneamente, o que menos depende do software. Ele exemplifica a maturidade da análise de riscos do Ciclo 3: reconhecer que existem riscos que **não são de responsabilidade da equipe de desenvolvimento**, mas que devem ser documentados e comunicados claramente.

Isso é coerente com a nota de validação do documento original do projeto: a capacidade do cabelo/pelo de conter óleo é **hipótese a ser validada**, não propriedade comprovada.

### 6.3 Lição sobre riscos

> "O modelo Espiral não serve para eliminar riscos, mas para **torná-los visíveis na hora certa**. O risco da validação técnica não estava no Ciclo 1 porque ainda não havia produto suficiente para questioná-lo. Ele emergiu quando o produto estava pronto para escala."

---

## 7. O Produto: FioTrack

### 7.1 O que foi entregue

| Dimensão | Entregue |
|---|---|
| **Telas** | 15 telas (Login → Cadastro → Solicitação → Dashboards → Coleta → Pesagem → Lote → Triagem → Estoque → Destinação → Rastreabilidade → Indicadores → Contribuições) |
| **Histórias** | 12/12 (100%) |
| **Módulos** | 10 módulos funcionais (Parceiros, Coletas, Rotas, Recebimento, Triagem, Lotes, Estoque, Destinação, Rastreabilidade, Indicadores) |
| **Indicadores** | Logísticos, ambientais e de qualidade |
| **Rastreabilidade** | Timeline completa: Origem → Coleta → Transporte → Recebimento → Triagem → Estoque → Destinação |

### 7.2 O "passaporte do material"

O diferencial do FioTrack é transformar um resíduo disperso em **matéria-prima rastreável**. Cada lote recebe um código único (FT-2026-XXXXXX) que funciona como passaporte, permitindo responder:

- De onde veio?
- Quem coletou?
- Quando foi pesado?
- Foi aprovado ou rejeitado? Por quê?
- Onde está armazenado?
- Para onde foi destinado?

Essa rastreabilidade é o que transforma a operação de coleta em uma **cadeia de valor auditável**, condição necessária para gerar confiança de parceiros, doadores e órgãos ambientais.

### 7.3 O que o FioTrack NÃO faz (limites honestos)

- Não valida tecnicamente a eficácia do material na contenção de óleo (risco R05).
- Não otimiza rotas automaticamente (requer API de mapas — backlog futuro).
- Não é um app mobile (é web responsivo no MVP).
- Não substitui o processo físico de triagem e preparação — apenas o registra.

---

## 8. Desafios e Aprendizados

### 8.1 Principais desafios

| # | Desafio | Como foi enfrentado |
|---|---|---|
| 1 | Escopo grande demais na Sprint 3 (6 histórias, 31 pontos) | Priorização Must Have; US12 como bônus |
| 2 | Estimativas iniciais imprecisas | Aprendizado: estimar em horas por tarefa, não só em pontos |
| 3 | Falta de dados reais para testes | Simulação de cenários realistas (parceiro fictício, lote fictício) |
| 4 | Diferentes níveis de disponibilidade dos membros | Reuniões assíncronas; distribuição flexível de tarefas |
| 5 | Risco técnico externo (validação do material) | Documentado como risco aberto; não tentado "resolver" com software |

### 8.2 Aprendizados individuais e coletivos

**Aprendizados metodológicos:**
1. **Planejar antes de codificar** — modelo de dados e critérios de aceitação primeiro eliminaram retrabalho.
2. **A espiral força a pensar em risco** — sem ela, os riscos seriam ignorados até causarem problema.
3. **A rotação de papéis amplia a empatia** — quem já foi PO entende as pressões de priorização; quem já foi Dev entende as pressões de estimativa.
4. **Retrospectivas variadas evitam a acomodação** — cada formato trouxe insights diferentes.

**Aprendizados sobre produto:**
1. **A rastreabilidade é o coração do produto** — não a interface bonita.
2. **O código único do lote é a alma da operação** — sem ele, não há confiança.
3. **Feedback de stakeholder real muda decisões** — a FioTar mudou prioridades nas 3 reviews.
4. **Conhecer os limites é sinal de maturidade** — o FioTrack não valida ciência; ele organiza logística.

**Aprendizados sobre trabalho em equipe:**
1. Daily assíncrona com formato fixo funciona e respeita agendas.
2. Reuniões sem pauta são retrabalho.
3. Trabalho em dupla na revisão de código melhora qualidade.
4. Propósito ambiental motiva mais que prazo acadêmico.

### 8.3 Erros cometidos e suas lições

| Erro | Lição |
|---|---|
| Começar a codificar sem modelo de dados (Ciclo 1) | Definir esquema de dados ANTES da primeira linha de código |
| Deixar validações para o final | Validação faz parte da história, não é "extra" |
| Não usar controle de versão desde o início (Ciclo 1-2) | Git desde o primeiro commit |
| Estimar horas otimistas | Adicionar margem; perguntar "o que pode dar errado?" |
| Deixar a retrospectiva sem acompanhamento de ações | Cada ação da retro precisa de responsável e prazo |

---

## 9. Contribuição para o Contexto Ambiental

### 9.1 O problema que endereçamos

- **Descarte inadequado:** Cabelos e pelos vão para lixo comum ou esgoto.
- **Poluição costeira:** Derramamentos de óleo ameaçam ecossistemas marinhos.
- **Conexão ausente:** Não existia cadeia logística entre esses dois problemas.

### 9.2 O que o projeto contribui

O FioTrack não "resolve" a poluição de óleo, mas **organiza a cadeia necessária** para que uma solução potencial (uso de cabelo/pelo como material de contenção) possa ser operada em escala:

```
Antes: Descarte disperso + Necessidade ambiental desconectados

Depois:  Gerador → Coleta → Triagem → Lote → Destinação → FioTar
         (rastreável do início ao fim)
```

### 9.3 Indicadores ambientais como linguagem de impacto

O produto não apenas gerencia operação — ele **produz linguagem de impacto**:

- Quilogramas desviados do descarte convencional
- Número de lotes destinados
- Número de ações ambientais atendidas
- Aproveitamento na triagem (%)

Esses indicadores são o que permitirão à FioTar **comunicar valor a doadores, parceiros e órgãos públicos**.

### 9.4 A honestidade sobre a hipótese técnica

Uma contribuição importante do projeto foi a **postura científica** de tratar a capacidade do cabelo de conter óleo como **hipótese a validar**, não como fato estabelecido. Isso:

- Protege a credibilidade do projeto;
- Direciona esforço para parcerias técnicas reais;
- Evita promessas ambientais não comprovadas.

---

## 10. Considerações Finais

### 10.1 Sobre o modelo Espiral + Scrum

A combinação mostrou-se eficaz para um projeto com **incerteza técnica** (validação do material), **incerteza de aceitação** (conseguir parceiros) e **incerteza operacional** (custo logístico). O Scrum deu ritmo; o Espiral deu profundidade na análise de riscos.

### 10.2 Sobre o produto entregue

O MVP do FioTrack atingiu **100% das histórias planejadas** e demonstrou o fluxo completo de rastreabilidade. Ele é um protótipo funcional, não um sistema em produção — e isso está adequado ao contexto acadêmico e à fase do projeto (validação de conceito).

### 10.3 Sobre os riscos remanescentes

O risco mais importante permanece aberto: **a validação técnica do material**. Este relatório o documenta com transparência, na convicção de que reconhecer limites é parte da maturidade técnica — e que a parceria com instituições de pesquisa é o próximo passo natural do projeto, independente do software.

### 10.4 Sobre o trabalho em equipe

A rotação de papéis, as retrospectivas em formatos variados e as reviews com stakeholders reais transformaram o projeto de uma atividade acadêmica em uma **experiência próxima da prática profissional**. Os erros cometidos e documentados neste relatório são tão valiosos quanto os acertos, porque registram o caminho real da aprendizagem.

### 10.5 Frase de síntese

> "O FioTrack não coleta cabelo. Ele coleta **confiança** — a confiança de que cada quilograma de resíduo tem origem, trajeto e destino documentados, e de que uma startup pode transformar descarte em proteção ambiental, um lote de cada vez."

---

## Referências Metodológicas

- Modelo Espiral de Desenvolvimento de Software (Boehm, 1988)
- The Scrum Guide (Schwaber & Sutherland, 2020)
- Histórias de usuário e INVEST (Bill Wake)
- Definition of Done (Scrum Guide)
- Formatos de retrospectiva: Start/Stop/Continue, 4Ls, Sailboat

---

*Documento elaborado conforme atividade Espiral + Scrum — Turma M3 — IFF-FORMATEC*
