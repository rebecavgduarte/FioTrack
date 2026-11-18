# Wireframes — FioTrack

Pacote visual com as 15 telas do MVP, em dois níveis de fidelidade.

## Estrutura

| Pasta | Conteúdo | Qtd. |
|---|---|---|
| `screenshots/` | **Alta fidelidade** — capturas reais do app rodando no navegador | 16 PNG |
| `png/` | **Baixa fidelidade** — wireframe de blocos em escala de cinza (estilo Figma/Miro) | 15 PNG |
| `svg/` | Mesmos wireframes em **vetor** (editáveis/escaláveis) | 15 SVG |

## Telas

| # | Arquivo | Tela | Rota no app |
|---|---|---|---|
| 01 | `01-login` | Login com acesso rápido por perfil | `/login` |
| 02 | `02-cadastro` | Cadastro de parceiro | `/cadastro` |
| 03 | `03-solicitacao` | Nova solicitação de coleta | `/solicitacao` |
| 04 | `04-dashboard-parceiro` | Dashboard do parceiro | `/parceiro` |
| 05 | `05-lista-coletas` | Lista de coletas | `/coletas` |
| 06 | `06-coleta-pendente` | Detalhe da coleta + registro | `/coleta/:id` |
| 06b | `06b-coleta-concluida` | Coleta concluída *(apenas screenshots)* | — |
| 07 | `07-dashboard-operador` | Painel do operador | `/operador` |
| 08 | `08-pesagem-lote` | Pesagem e geração de lote (FT-2026-XXXXXX) | `/pesagem` |
| 10 | `10-triagem` | Triagem (aprovado/rejeitado + motivo) | `/triagem/:id` |
| 11 | `11-estoque` | Estoque por material | `/estoque` |
| 12 | `12-destinacao` | Destinação com validação de saldo | `/destinacao/:id` |
| 13a | `13a-rastreio-busca` | Rastreabilidade — busca por código | `/rastrear` |
| 13b | `13b-rastreio-timeline` | Passaporte do material (timeline 7 etapas) | `/rastrear` |
| 14 | `14-indicadores` | Indicadores (logísticos, ambientais, qualidade) | `/indicadores` |
| 15 | `15-contribuicoes` | Contribuições e impacto do parceiro | `/contribuicoes` |

> Fluxo: **Cadastro → Solicitação → Coleta → Pesagem → Lote → Triagem → Estoque → Destinação → Rastreabilidade**

## Documentação complementar

- Wireframes detalhados em ASCII/Markdown: [`Pacote_Academico/05_Wireframes_FioTrack.md`](../Pacote_Academico/05_Wireframes_FioTrack.md)
- Histórias de usuário e requisitos: `Pacote_Academico/06_Historias_Usuario.md`

## Regenerar

```bash
node gen_wireframes.js          # gera os 15 SVG
# PNGs: Chrome headless (ver histórico) ou qualquer rasterizador SVG
```
