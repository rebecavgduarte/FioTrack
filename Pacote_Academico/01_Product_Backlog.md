# Product Backlog — FioTrack

**Startup:** FioTrack
**Parceira:** ONG FioTar
**Produto:** FioTrack — Plataforma de logística reversa e rastreabilidade
**Modelo:** Espiral + Scrum
**Instituição:** IFF-FORMATEC — Turma M3 — Maricá
**Data de atualização:** 01/10/2026

---

## 1. Visão Geral

O Product Backlog contém todas as histórias de usuário necessárias para construir o MVP do FioTrack, organizadas por prioridade, esforço (Story Points) e ciclos (Sprints). Cada história segue o formato: **"Como [usuário], quero [ação], para [benefício]."**

---

## 2. Priorização (MoSCoW)

| Prioridade | Significado |
|---|---|
| **Must Have** | Obrigatório para o MVP funcionar |
| **Should Have** | Importante, mas pode ser adiado |
| **Could Have** | Desejável se houver tempo |
| **Won't Have (esta versão)** | Fora do escopo do MVP |

---

## 3. Product Backlog Completo

### 3.1 Must Have (Obrigatórias para o MVP)

| ID | História | Prioridade | Ciclo | Pts. |
|---|---|---|---|---|
| **US01** | Como parceiro, quero me cadastrar para participar do programa | Must Have | Sprint 1 | 3 |
| **US02** | Como parceiro, quero solicitar uma coleta para enviar meu material | Must Have | Sprint 1 | 5 |
| **US03** | Como operador, quero visualizar coletas pendentes para planejar minha rota | Must Have | Sprint 1 | 5 |
| **US04** | Como operador, quero registrar uma coleta para manter a rastreabilidade | Must Have | Sprint 2 | 3 |
| **US05** | Como operador, quero registrar o peso coletado para controlar o volume | Must Have | Sprint 2 | 3 |
| **US06** | Como operador, quero gerar um lote para identificar o material | Must Have | Sprint 2 | 5 |
| **US07** | Como operador, quero registrar a triagem para separar materiais aprovados e rejeitados | Must Have | Sprint 3 | 5 |
| **US09** | Como operador, quero registrar a destinação de um lote | Must Have | Sprint 3 | 5 |
| **US10** | Como gestor, quero rastrear um lote desde sua origem até sua destinação | Must Have | Sprint 3 | 8 |

**Subtotal Must Have: 42 pontos**

---

### 3.2 Should Have (Importantes)

| ID | História | Prioridade | Ciclo | Pts. |
|---|---|---|---|---|
| **US08** | Como operador, quero consultar o estoque para saber quanto material está disponível | Should Have | Sprint 3 | 5 |
| **US11** | Como gestor, quero visualizar indicadores para acompanhar a operação | Should Have | Sprint 3 | 5 |

**Subtotal Should Have: 10 pontos**

---

### 3.3 Could Have (Desejáveis)

| ID | História | Prioridade | Ciclo | Pts. |
|---|---|---|---|---|
| **US12** | Como parceiro, quero consultar minhas contribuições para acompanhar minha participação | Could Have | Sprint 3 (se houver tempo) | 3 |

**Subtotal Could Have: 3 pontos**

---

### 3.4 Won't Have nesta versão (Backlog Grooming futuro)

| ID | História | Justificativa |
|---|---|---|
| US13 | Como operador, quero otimizar rotas automaticamente por geolocalização | Requer integração com API de mapas — futuro |
| US14 | Como parceiro, quero receber notificações push sobre status das coletas | Requer app mobile — futuro |
| US15 | Como gestor, quero gerar relatórios PDF exportáveis | Pode ser incremento pós-MVP |
| US16 | Como parceiro, quero acessar via QR Code no ponto de coleta | Depende de infraestrutura física |
| US17 | Como FioTar, quero um dashboard ambiental público | Depende de validação técnica do material |

---

## 4. Resumo por Ciclo

| Ciclo | Sprint | Histórias | Pontos | Objetivo |
|---|---|---|---|---|
| 1 | Sprint 1 | US01, US02, US03 | 13 | Ideação e MVP Conceitual |
| 2 | Sprint 2 | US04, US05, US06 | 11 | Evolução do Produto |
| 3 | Sprint 3 | US07, US08, US09, US10, US11, (US12) | 26 (29 com US12) | Consolidação |
| | **TOTAL** | **US01–US12** | **50 (53 com US12)** | |

---

## 5. Critérios Globais de Priorização

As histórias foram priorizadas considerando:

1. **Dependência lógica:** Não é possível registrar coleta (US04) antes de existir solicitação (US02).
2. **Valor ao cliente:** Priorizam-se histórias que entregam valor ao parceiro e ao operador.
3. **Risco técnico:** Histórias com maior risco técnico são antecipadas quando possível.
4. **Tamanho:** Story Points estimados em escala Fibonacci (1, 2, 3, 5, 8, 13).

---

## 6. Definition of Done (DoD) Global

Uma história só é considerada "Pronta" quando:

- [ ] Funcionalidade implementada;
- [ ] Fluxo principal funcionando de ponta a ponta;
- [ ] Dados persistidos corretamente;
- [ ] Validações básicas implementadas (campos obrigatórios, formatos);
- [ ] Teste manual realizado com dados de exemplo;
- [ ] Resultado documentado;
- [ ] Critérios de aceitação da história atendidos;
- [ ] Demonstração realizada na Sprint Review.

---

## 7. Evolução do Backlog por Sprint

```
Sprint 1 (Ciclo 1)          Sprint 2 (Ciclo 2)          Sprint 3 (Ciclo 3)
┌─────────────────┐        ┌─────────────────┐        ┌──────────────────────┐
│ US01 Cadastro   │        │ US04 Coleta     │        │ US07 Triagem         │
│ US02 Solicitação│  ──▶   │ US05 Peso       │  ──▶   │ US08 Estoque         │
│ US03 Visualizar │        │ US06 Lote       │        │ US09 Destinação      │
│   coletas       │        │                 │        │ US10 Rastreabilidade │
└─────────────────┘        └─────────────────┘        │ US11 Indicadores     │
                                                      │ US12 Contribuições   │
                                                      └──────────────────────┘
   13 pts                       11 pts                    26-29 pts
```

---

*Documento elaborado conforme atividade Espiral + Scrum — Turma M3 — IFF-FORMATEC*
