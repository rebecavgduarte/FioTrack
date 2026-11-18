# Critérios de Aceitação — FioTrack

**Startup:** FioTrack
**Parceira:** ONG FioTar
**Modelo:** Espiral + Scrum
**Instituição:** IFF-FORMATEC — Turma M3

---

## Como usar este documento

Cada história de usuário possui critérios de aceitação no formato **Cenário / Dado-Quando-Então** (Given-When-Then). Uma história só é considerada "Pronta" (DoD) quando **todos** os seus critérios forem atendidos.

---

## US01 — Cadastro de Parceiro (Sprint 1)

**Como** parceiro, **quero** me cadastrar, **para** participar do programa de coleta.

### CA-01.1 — Cadastro com dados válidos
- **Dado** que estou na tela de cadastro
- **Quando** preencho todos os campos obrigatórios com dados válidos e clico em "Cadastrar"
- **Então** o sistema cria meu cadastro e exibe mensagem de sucesso
- **E** sou redirecionado para o dashboard

### CA-01.2 — Campos obrigatórios vazios
- **Dado** que estou na tela de cadastro
- **Quando** deixo campos obrigatórios vazios e clico em "Cadastrar"
- **Então** o sistema exibe mensagem de erro indicando quais campos são obrigatórios
- **E** os dados digitados são preservados

### CA-01.3 — E-mail inválido
- **Dado** que estou na tela de cadastro
- **Quando** informo um e-mail em formato inválido (ex: "abc@")
- **Então** o sistema exibe erro de validação de e-mail

### CA-01.4 — Documento duplicado
- **Dado** que já existe um parceiro cadastrado com o mesmo documento (CPF/CNPJ)
- **Quando** tento cadastrar novo parceiro com o mesmo documento
- **Então** o sistema exibe erro "Documento já cadastrado"

### CA-01.5 — Tipos de parceiro
- **Dado** que estou na tela de cadastro
- **Quando** visualizo o campo "Tipo de Parceiro"
- **Então** tenho as opções: Salão, Barbearia, Pet Shop, Banho e Tosa, Clínica Veterinária, Pessoa Física, Outro

---

## US02 — Solicitação de Coleta (Sprint 1)

**Como** parceiro, **quero** solicitar uma coleta, **para** enviar meu material.

### CA-02.1 — Solicitação válida
- **Dado** que sou parceiro cadastrado e estou logado
- **Quando** preencho ponto de coleta, tipo de material, quantidade estimada e data desejada
- **Então** a solicitação é registrada com status "Pendente"
- **E** recebo um número de protocolo de solicitação

### CA-02.2 — Solicitação sem ponto de coleta
- **Dado** que estou na tela de solicitação
- **Quando** não seleciono um ponto de coleta
- **Então** o sistema impede o envio e exibe erro

### CA-02.3 — Tipo de material
- **Dado** que estou preenchendo solicitação
- **Quando** seleciono o tipo de material
- **Então** as opções são: Cabelo humano, Pelo de animal, Misto

### CA-02.4 — Listagem de solicitações
- **Dado** que sou parceiro com solicitações registradas
- **Quando** acesso a lista de minhas solicitações
- **Então** visualizo todas com status (Pendente, Agendada, Concluída, Cancelada)

---

## US03 — Visualização de Coletas Pendentes (Sprint 1)

**Como** operador, **quero** visualizar coletas pendentes, **para** planejar minha rota.

### CA-03.1 — Dashboard com coletas pendentes
- **Dado** que existem coletas com status "Pendente"
- **Quando** acesso o dashboard do operador
- **Então** visualizo a lista de coletas pendentes ordenadas por data

### CA-03.2 — Sem coletas pendentes
- **Dado** que não existem coletas pendentes
- **Quando** acesso o dashboard
- **Então** exibo mensagem "Nenhuma coleta pendente no momento"

### CA-03.3 — Filtro por região
- **Dado** que existem coletas em diferentes regiões
- **Quando** aplico filtro por região
- **Então** apenas coletas da região selecionada são exibidas

### CA-03.4 — Visualização de detalhes
- **Dado** que vejo uma coleta na lista
- **Quando** clico na coleta
- **Então** visualizo: parceiro, endereço, tipo de material, quantidade estimada, data solicitada

---

## US04 — Registro de Coleta (Sprint 2)

**Como** operador, **quero** registrar uma coleta, **para** manter a rastreabilidade.

### CA-04.1 — Registrar coleta realizada
- **Dado** que tenho uma coleta pendente selecionada
- **Quando** preencho data da coleta, responsável e confirmo
- **Então** o status muda de "Pendente" para "Concluída"
- **E** o registro fica disponível para rastreabilidade

### CA-04.2 — Status da coleta
- **Dado** que existe uma coleta
- **Quando** visualizo seu status
- **Então** os status possíveis são: Pendente, Em Andamento, Concluída, Cancelada

### CA-04.3 — Registro sem responsável
- **Dado** que estou registrando uma coleta
- **Quando** não informo o responsável
- **Então** o sistema impede o registro e exibe erro

---

## US05 — Registro de Peso (Sprint 2)

**Como** operador, **quero** registrar o peso coletado, **para** controlar o volume.

### CA-05.1 — Registrar peso válido
- **Dado** que tenho uma coleta concluída
- **Quando** informo o peso (ex: 5.5 kg), unidade, data e responsável
- **Então** o peso é registrado e vinculado à coleta

### CA-05.2 — Peso inválido (zero ou negativo)
- **Dado** que estou registrando peso
- **Quando** informo peso igual a 0 ou valor negativo
- **Então** o sistema exibe erro "Peso deve ser maior que zero"

### CA-05.3 — Peso em formato inválido
- **Dado** que estou registrando peso
- **Quando** informo texto no campo de peso (ex: "muito")
- **Então** o sistema exibe erro de formato numérico

### CA-05.4 — Consulta de peso registrado
- **Dado** que uma coleta já tem peso registrado
- **Quando** visualizo os detalhes da coleta
- **Então** o peso aparece com data e responsável do registro

---

## US06 — Geração de Lote (Sprint 2)

**Como** operador, **quero** gerar um lote, **para** identificar o material.

### CA-06.1 — Geração automática de código
- **Dado** que tenho uma coleta com peso registrado
- **Quando** clico em "Gerar Lote"
- **Então** o sistema gera código único no formato **FT-2026-000001** (incremental)
- **E** o lote é criado com status "Em Triagem"

### CA-06.2 — Campos do lote
- **Dado** que estou criando um lote
- **Quando** preencho os dados
- **Então** os campos são: Código (auto), Tipo Material, Peso Inicial, Data de Entrada, Status

### CA-06.3 — Consulta por código
- **Dado** que existe um lote com código FT-2026-000001
- **Quando** busco por esse código
- **Então** visualizo todos os dados do lote e seu status atual

### CA-06.4 — Código duplicado (preventivo)
- **Dado** que o sistema gera códigos automaticamente
- **Quando** um novo lote é criado
- **Então** o código é garantido como único (auto-incremento)

---

## US07 — Registro de Triagem (Sprint 3)

**Como** operador, **quero** registrar a triagem, **para** separar materiais aprovados e rejeitados.

### CA-07.1 — Registrar triagem aprovada
- **Dado** que tenho um lote com status "Em Triagem"
- **Quando** registro triagem com peso aprovado = peso total e sem rejeição
- **Então** o status do lote muda para "Aprovado" (ou "Em Estoque")
- **E** o peso aprovado é registrado

### CA-07.2 — Registrar triagem parcialmente aprovada
- **Dado** que tenho um lote com 10 kg
- **Quando** registro: peso aprovado = 8 kg, peso rejeitado = 2 kg, motivo = "Contaminado"
- **Então** o sistema valida: aprovado + rejeitado = peso inicial (8 + 2 = 10) ✓
- **E** o lote muda para "Aprovado Parcial"

### CA-07.3 — Motivo de rejeição obrigatório
- **Dado** que estou registrando triagem com peso rejeitado > 0
- **Quando** não informo o motivo de rejeição
- **Então** o sistema impede o registro e exibe erro

### CA-07.4 — Motivos de rejeição disponíveis
- **Dado** que tenho peso rejeitado
- **Quando** seleciono motivo de rejeição
- **Então** as opções são: Contaminado, Umidade Excessiva, Tipo Inadequado, Material Danificado, Outro

### CA-07.5 — Cálculo de aproveitamento
- **Dado** que um lote tem 10 kg iniciais e 8 kg aprovados
- **Quando** visualizo os dados da triagem
- **Então** o sistema exibe aproveitamento de 80%

---

## US08 — Consulta de Estoque (Sprint 3)

**Como** operador, **quero** consultar o estoque, **para** saber quanto material está disponível.

### CA-08.1 — Listagem de lotes em estoque
- **Dado** que existem lotes com status "Em Estoque"
- **Quando** acesso a tela de estoque
- **Então** visualizo todos os lotes disponíveis com código, tipo, peso, data

### CA-08.2 — Resumo de estoque
- **Dado** que existem lotes em estoque
- **Quando** visualizo o resumo
- **Então** exibo: total de lotes, peso total disponível, peso total por tipo de material

### CA-08.3 — Filtro por tipo de material
- **Dado** que existem lotes de cabelo humano e pelo de animal
- **Quando** filtro por "Cabelo humano"
- **Então** apenas lotes desse tipo são exibidos

### CA-08.4 — Estoque vazio
- **Dado** que não há lotes em estoque
- **Quando** acesso a tela de estoque
- **Então** exibo mensagem "Nenhum lote em estoque no momento"

---

## US09 — Registro de Destinação (Sprint 3)

**Como** operador, **quero** registrar a destinação de um lote, **para** completar a rastreabilidade.

### CA-09.1 — Registrar destinação
- **Dado** que tenho um lote em estoque
- **Quando** informo destino (FioTar/Parceiro Autorizado), data, quantidade e responsável
- **Então** o status do lote muda para "Destinado"
- **E** a movimentação fica registrada no histórico

### CA-09.2 — Destinação parcial
- **Dado** que tenho um lote de 10 kg em estoque
- **Quando** destino apenas 6 kg
- **Então** o sistema registra a saída de 6 kg
- **E** o lote atualiza seu saldo disponível

### CA-09.3 — Histórico de movimentações
- **Dado** que um lote teve múltiplas movimentações
- **Quando** visualizo o histórico
- **Então** exibo todas as movimentações com: origem, destino, data, responsável

---

## US10 — Rastreabilidade Completa (Sprint 3)

**Como** gestor, **quero** rastrear um lote desde sua origem até sua destinação, **para** ter visibilidade total.

### CA-10.1 — Busca por código
- **Dado** que existe um lote com código FT-2026-000001
- **Quando** busco por esse código na tela de rastreabilidade
- **Então** visualizo a timeline completa do lote

### CA-10.2 — Timeline completa
- **Dado** que encontrei o lote
- **Quando** visualizo a rastreabilidade
- **Então** a timeline exibe na ordem: **Origem → Coleta → Transporte → Recebimento → Triagem → Estoque → Destinação**
- **E** cada etapa mostra: data, responsável, peso (quando aplicável)

### CA-10.3 — Lote inexistente
- **Dado** que busco por um código que não existe
- **Quando** confirmo a busca
- **Então** exibo mensagem "Lote não encontrado"

### CA-10.4 — Dados de origem
- **Dado** que visualizo a etapa "Origem" da timeline
- **Quando** examino os dados
- **Então** exibo: nome do parceiro, tipo de estabelecimento, endereço, município

---

## US11 — Indicadores (Sprint 3)

**Como** gestor, **quero** visualizar indicadores, **para** acompanhar a operação.

### CA-11.1 — Indicadores logísticos
- **Dado** que existe dados de operação
- **Quando** acesso o dashboard de indicadores
- **Então** visualizo: pontos cadastrados, pontos ativos, coletas realizadas, coletas pendentes, peso coletado

### CA-11.2 — Indicadores ambientais
- **Dado** que existem lotes destinados
- **Quando** visualizo indicadores ambientais
- **Então** exibo: kg desviados do descarte convencional, kg preparados, kg destinados, número de lotes

### CA-11.3 — Indicadores de qualidade
- **Dado** que existem triagens registradas
- **Quando** visualizo indicadores de qualidade
- **Então** exibo: material aprovado, material rejeitado, motivos de rejeição, tempo entre coleta e triagem

### CA-11.4 — Sem dados
- **Dado** que não há dados de operação
- **Quando** acesso indicadores
- **Então** exibo mensagem "Dados insuficientes para gerar indicadores"

---

## US12 — Consulta de Contribuições do Parceiro (Sprint 3 — Opcional)

**Como** parceiro, **quero** consultar minhas contribuições, **para** acompanhar minha participação.

### CA-12.1 — Histórico de contribuições
- **Dado** que sou parceiro com coletas registradas
- **Quando** acesso minha página de contribuições
- **Então** visualizo todas as minhas coletas com data, peso e status

### CA-12.2 — Totalização
- **Dado** que tenho histórico de coletas
- **Quando** visualizo o resumo
- **Então** exibo: peso total contribuído, número de coletas realizadas

---

## Critérios Globais de Aceitação do MVP

O MVP será considerado aprovado quando:

| # | Critério | Status |
|---|---|---|
| 1 | Cadastro de um ponto gerador funcional | ⬜ |
| 2 | Solicitação de coleta registrada | ⬜ |
| 3 | Planejamento da coleta visualizado | ⬜ |
| 4 | Registro da coleta realizado | ⬜ |
| 5 | Pesagem registrada | ⬜ |
| 6 | Criação do lote com código único | ⬜ |
| 7 | Triagem com aprovado/rejeitado | ⬜ |
| 8 | Armazenamento (estoque) consultável | ⬜ |
| 9 | Destinação registrada | ⬜ |
| 10 | Consulta da rastreabilidade completa | ⬜ |
| 11 | Relatório da operação (indicadores) | ⬜ |

---

*Documento elaborado conforme atividade Espiral + Scrum — Turma M3 — IFF-FORMATEC*
