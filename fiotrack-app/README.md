# FioTrack — MVP Funcional

Aplicação web completa do FioTrack (ONG FioTar), com as **15 telas**, **12 user stories** e o fluxo completo de logística reversa.

## Como executar

Basta abrir o `index.html` em qualquer navegador (duplo clique):

```
fiotrack-app/index.html
```

> Não requer servidor nem internet. Os dados ficam no `localStorage` do navegador.

## Credenciais demo

| Perfil | E-mail | Senha |
|---|---|---|
| Parceiro | `parceiro@fiotrack.com` | `demo` |
| Gestor | `gestor@fiotrack.com` | `demo` |

Na tela de Login há botões rápidos para preencher cada perfil.

> O perfil **operador** foi removido: a operação inteira (painel, coletas, pesagem,
> triagem, estoque, destinação) passou a ser feita pelo **gestor**.

## Cadastro público de parceiros (vindo da landing page)

- Os botões da landing page abrem `index.html?tela=cadastro-parceiro` → rota pública
  `#/cadastro-parceiro` (não exige login).
- Campos obrigatórios (e-mail em destaque, usado como usuário no app) com validação de
  **duplicidade de e-mail e documento**.
- Após o envio, o cadastro fica com status **Pendente**.

## Aprovação de parceiros (painel do gestor)

| Tela | Rota | O que faz |
|---|---|---|
| Cadastros Pendentes | `#/aprovacoes` | Lista cadastros pendentes; **Aprovar** ou **Recusar** |
| Parceiros | `#/parceiros` | Lista todos os cadastros; **Editar** (`#/cadastro/:id`) |
| E-mails Enviados | `#/emails` | Caixa de saída simulada com os e-mails gerados |

Ao **aprovar**, o app: cria o usuário do parceiro (e-mail = login), gera uma **senha
aleatória forte** (14 caracteres) e registra o e-mail de boas-vindas em `#/emails`
contendo o usuário e a senha provisória. Ao editar o cadastro no painel do gestor, o
e-mail do usuário é sincronizado automaticamente.

## Funcionalidades (12 User Stories)

| US | Tela(s) | Perfil |
|---|---|---|
| US01 Cadastro de Parceiro | Cadastro, Cadastro Público | Gestor/Parceiro |
| US02 Solicitação de Coleta | Nova Solicitação | Parceiro |
| US03 Coletas Pendentes | Lista de Coletas, Painel | Gestor |
| US04 Registro de Coleta | Detalhe da Coleta | Gestor |
| US05 Registro de Peso | Pesagem | Gestor |
| US06 Geração de Lote | Pesagem & Lote | Gestor |
| US07 Triagem | Triagem | Gestor |
| US08 Estoque | Estoque | Gestor |
| US09 Destinação | Destinação | Gestor |
| US10 Rastreabilidade | Rastreio (timeline) | Todos |
| US11 Indicadores | Indicadores | Gestor |
| US12 Contribuições | Contribuições | Parceiro |

## Fluxo completo

```
Cadastro → Solicitação → Coleta → Pesagem → Lote (FT-2026-XXXXXX)
   → Triagem (aprovado/rejeitado) → Estoque → Destinação → Rastreabilidade
```

## Validações implementadas

- Campos obrigatórios e e-mail inválido no cadastro
- Documento duplicado bloqueado
- Peso ≤ 0 bloqueado na coleta/pesagem
- **Triagem:** `aprovado + rejeitado = peso inicial` (soma validada)
- **Triagem:** motivo de rejeição obrigatório quando rejeitado > 0
- **Destinação:** quantidade não pode exceder o saldo disponível
- Busca de lote inexistente tratada
- Código de lote único e auto-gerado

## Dados de demonstração (seed)

- 3 parceiros (Salão, Barbearia, Pet Shop) em Maricá
- 6 solicitações (3 concluídas, 3 pendentes)
- 3 lotes (2 destinados, 1 em estoque) com triagens e movimentações
- Timeline de rastreabilidade completa no lote `FT-2026-000001`

## Estrutura

```
fiotrack-app/
├── index.html        → shell da SPA
├── css/styles.css    → design system completo (paleta, componentes, responsivo)
└── js/
    ├── store.js      → dados, seed, CRUD, cálculos (localStorage)
    ├── views.js      → as 15 telas
    └── app.js        → roteador hash-based + sidebar/shell
```

## Para reiniciar os dados demo

No console do navegador:

```js
localStorage.removeItem('fiotrack_db'); location.reload();
```

## Testes

Suíte automatizada executada (Node + jsdom): **83/83 pass**
- 23 testes de lógica (store, cálculos, indicadores)
- 26 testes de renderização das telas + 16 rotas
- 34 testes de formulários e validações
