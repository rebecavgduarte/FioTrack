# FioTrack — Doe seu cabelo, limpe o oceano 🌊

Solução tecnológica para gestão da doação de cabelos e pelos de animais: do cadastro público de parceiros (salões, barbearias e pet shops) até a rastreabilidade completa do material destinado à produção de bóias de filtro que ajudam na remoção de óleo no mar.

## 📦 O que o projeto contém

| Parte | Descrição |
|---|---|
| `index.html` + `css/` + `js/` | **Landing page** pública (vídeo/banner, notícias, CTA de cadastro de parceiros) |
| `fiotrack-app/` | **Aplicativo SPA** (HTML/CSS/JS puro, rotas por hash, dados em `localStorage`) |
| `wireframes/` | Wireframes e **capturas das 16 telas** (`screenshots/`) |
| `Pacote_Academico/` | Material acadêmico do projeto |
| `Fluxograma_FioTrack.*` | Fluxograma completo (`.mmd` desenhável, `.md` detalhado, `.png` 16:9 para slides) |
| `Guia_de_Usudo_FioTrack.md` | Manual de uso do zero, em linguagem simples |
| `Projeto_FioTrack_avaliacao.pdf` | Documento de resposta às 9 perguntas de avaliação do projeto |

## ▶️ Como executar

Não precisa instalar nada além de um navegador:

```bash
# opção 1 — abrir direto
index.html            # landing page
fiotrack-app/index.html   # aplicativo

# opção 2 — servidor local
npm install           # só para ter o puppeteer-core dos scripts de teste (opcional)
node serve.js 8080    # http://127.0.0.1:8080
```

## 👥 Perfis e credenciais de demonstração

| Perfil | E-mail | Senha |
|---|---|---|
| Gestor | `gestor@fiotrack.com` | `demo` |
| Parceiro | `parceiro@fiotrack.com` | `demo` (digitar manualmente) |

- **Parceiro:** se cadastra pela landing (`?tela=cadastro-parceiro`), é aprovado pelo gestor e enxerga apenas as próprias solicitações e contribuições.
- **Gestor:** aprova/recusa cadastros, gera credencial forte e e-mail de boas-vindas (caixa simulada em `#/emails`), opera coleta → pesagem/lote → triagem → estoque → destinação, acompanha rastreio e indicadores.

## 🧭 Rotas principais do app

`#/` login · `#/cadastro-parceiro` cadastro público · `#/aprovacoes` · `#/parceiros` · `#/emails` · `#/solicitacao` · `#/coletas` · `#/pesagem` · `#/triagem` · `#/estoque` · `#/destinacao` · `#/rastreio` · `#/indicadores`

## 🔧 Scripts de teste e materiais

```bash
node verify_dom.js          # valida DOM/tamanhos de logo/pill do login (16 checks)
node verify_landing_dom.js  # valida a landing (logos, CTA, botão removido)
node capture_screens.js     # captura as 16 telas em wireframes/screenshots
node render_fluxograma.js   # gera o PNG do fluxograma (slide 16:9)
node render_pdf_avaliacao.js # gera o PDF de avaliação
```

## ⚠️ Observações do protótipo

- **Não há servidor:** tudo é gravado no `localStorage` do navegador (chave `fiotrack_db`), como uma gaveta naquela máquina. Para restaurar os dados demo: `localStorage.removeItem('fiotrack_db'); location.reload();`
- Os **e-mails são simulados** na tela `#/emails` do gestor (copiar e enviar manualmente) — não há SMTP.
- Perfis: **Parceiro** e **Gestor** (o perfil Operador foi removido, funções migradas para o gestor).

## 🛠️ Tecnologias

HTML5, CSS3 (design tokens, `oklch`, responsivo/mobil-first), JavaScript ES6 sem frameworks, dados em `localStorage`, testes automatizados com `puppeteer-core`.
