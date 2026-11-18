# Importação para o Taiga.io — FioTrack

Este diretório contém tudo necessário para importar o projeto para o **Taiga.io** (nuvem).

---

## 📁 Arquivos

| Arquivo | Tipo | Uso |
|---|---|---|
| `taiga_import.py` | Script Python | **Recomendado** — cria tudo via API automaticamente |
| `taiga_userstories.csv` | CSV | Importação manual das 12 user stories |
| `taiga_issues.csv` | CSV | Importação manual dos 18 riscos (issues) |

---

## ✅ Método 1 — Script Python (Recomendado)

Cria automaticamente: **projeto + 3 sprints + 12 user stories + 60 tasks + 18 issues**.

### Pré-requisitos

- Python 3.10+ instalado
- Biblioteca `requests` (`pip install requests`)
- Conta no [taiga.io](https://taiga.io)

### Passo a passo

```bash
# 1. Navegue até a pasta do pacote
cd Pacote_Academico

# 2. (Opcional) Veja o que seria criado — sem conectar
python taiga_import.py --dry-run

# 3. Execute a importação
python taiga_import.py --user SEU_USUARIO --pass SUA_SENHA
```

Ou usando variáveis de ambiente:

```bash
# Windows PowerShell
$env:TAIGA_USER = "seu_usuario"
$env:TAIGA_PASS = "sua_senha"
python taiga_import.py

# Linux/Mac
export TAIGA_USER="seu_usuario"
export TAIGA_PASS="sua_senha"
python taiga_import.py
```

### O que o script cria

| Entidade | Quantidade |
|---|---|
| Projeto | 1 (`FioTrack`) |
| Sprints (milestones) | 3 |
| User Stories | 12 (com descrição e critérios de aceitação) |
| Tasks | 60 (do Sprint Backlog detalhado) |
| Issues (riscos) | 18 (Risk Logs 1, 2 e 3) |

### Saída esperada

```
=== Importando FioTrack para o Taiga.io ===
  Autenticado como seu_usuario
  Projeto criado: FioTrack (id=12345)
--- Criando Sprints ---
  Sprint criada: Sprint 1 - Ideação e MVP Conceitual (id=101)
  ...
--- Criando User Stories ---
  User story criada: US01 - Cadastro de Parceiro (id=201)
  ...
=== IMPORTAÇÃO CONCLUÍDA ===
  Projeto: FioTrack
  Sprints: 3
  User Stories: 12
  Tasks: 60
  Issues (riscos): 18
```

> **Nota:** O Taiga tem rate limit (~100 req/min). O script aguarda automaticamente se atingir o limite.

---

## 📋 Método 2 — Importação Manual via CSV

### User Stories (12 histórias)

1. Acesse o Taiga e abra (ou crie) o projeto
2. Vá em **Configurações do Projeto** (engrenagem) → **Importar dados**
3. Escolha a aba **User Stories**
4. Envie `taiga_userstories.csv`
5. Mapeie as colunas se necessário (subject, description, milestone, points)

### Issues / Riscos (18 riscos)

1. Em **Configurações do Projeto** → **Importar dados**
2. Escolha a aba **Issues**
3. Envie `taiga_issues.csv`
4. Mapeie as colunas (subject, description, severity, milestone)

### Dica: criar as Sprints manualmente antes do CSV

O CSV usa o nome da sprint na coluna `milestone`. Para funcionar, crie antes as 3 sprints com exatamente estes nomes:

| Nome exato da Sprint | Período |
|---|---|
| `Sprint 1 - Ideação e MVP Conceitual` | 23/09/2026 a 26/09/2026 |
| `Sprint 2 - Evolução do Produto` | 27/09/2026 a 30/09/2026 |
| `Sprint 3 - Consolidação` | 01/10/2026 a 03/10/2026 |

---

## ⚠️ Observações

1. **Cronograma do projeto:** 23/09/2026 (início) a 03/10/2026 (conclusão) — as 3 sprints cobrem o período completo e todo o backlog (12 US, 60 tasks, 18 issues) foi concluído.

2. **Ajuste pós-importação:** o script `taiga_adjust_dates.py` reposiciona as sprints, fecha todas as user stories, tasks e issues e tenta aplicar datas de progresso. Limitação da API do Taiga: `created_date`, `finished_date` e `closed_date` são **somente leitura** — são gerados pelo servidor (as datas de conclusão ficam no momento do fechamento).

3. **Pontos (estimativas):** O script tenta definir pontos por user story. Se a instância não tiver os valores pré-cadastrados (`Média=3`, `Alta=5`, `Muito Alta=8`), crie-os manualmente em **Configurações → Pontos** ou ajuste no script.

4. **Idioma:** O Taiga cloud está em inglês por padrão. Os nomes de status (`New`, `In progress`, `Closed`) podem precisar de ajuste conforme o idioma da instância.

5. **Importação idempotente:** O script verifica se o projeto já existe antes de criar. Se existir, pergunta se deseja continuar.

6. **Rate limit:** Se receber erro 429, o script aguarda automaticamente.

7. **Slots do plano free:** O taiga.io free permite 1 projeto público + 1 privado por conta. Se o projeto não puder ser criado, libere slots em **Configurações da conta** ou crie como privado.

---

## 🔧 Solução de Problemas

| Erro | Causa | Solução |
|---|---|---|
| `401 Unauthorized` | Credenciais erradas | Verifique usuário/senha do taiga.io |
| `409 Conflict` | Projeto já existe com mesmo nome | Use o script (ele detecta) ou renomeie |
| `429 Too Many Requests` | Rate limit | O script aguarda; se manual, espere 1 min |
| `400 Bad Request` | Campo obrigatório ausente | Verifique se a instância exige campos extras |
| CSV não importa | Colunas não mapeadas | Mapeie manualmente na tela de importação |
