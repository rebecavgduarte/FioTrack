# Guia de uso do FioTrack — do zero, para leigos

> Um passo a passo de como usar o site, sem termos técnicos.
> Pense nele como o "manual do usuário" da sua equipe ou da sua apresentação.

---

## 📦 O que é o FioTrack?

É um site com **duas partes**:

1. **A página de apresentação** (a "vitrine"): onde o público conhece o projeto, vê notícias e o botão para se tornar parceiro.
2. **O aplicativo** (o "backstage"): onde acontece o trabalho — cadastro de parceiros, solicitações de coleta, controle do material e os números da operação.

> 💡 **Como abrir:** dê dois cliques no arquivo `index.html` da pasta do projeto (a vitrine) e clique nos botões; eles levam ao aplicativo. Não precisa instalar nada nem ter internet.

---

## 👥 Existem apenas dois perfis

| Perfil | Como entra | O que pode fazer |
|---|---|---|
| **Parceiro** | Salões, barbearias, pet shops aprovados | Cuidar só das **próprias** doações |
| **Gestor** | Responsável pela ONG | **Tudo**: aprovar parceiros, operar a logística e ver os números |

*(O perfil "Operador" foi retirado — sua função passou para o gestor.)*

### Credenciais de demonstração

| Perfil | E-mail | Senha |
|---|---|---|
| Parceiro | `parceiro@fiotrack.com` | `demo` |
| Gestor | `gestor@fiotrack.com` | `demo` |

Na tela de login há **botões rápidos** que preenchem esses dados para você.

---

## 🚶 Passeio completo, passo a passo

### Parte A — Como um novo parceiro se cadastra

1. Na página de apresentação, clique em **"Quero me tornar parceiro"**.
2. Preencha o formulário. O **e-mail é o mais importante**: ele será o seu usuário no app.
   - Se o e-mail ou o documento já existir, o site avisa e não deixa duplicar.
3. Clique em **Enviar cadastro**. Vai aparecer: *"Cadastro enviado! Aguarde a análise."*
4. Pronto — o cadastro fica **pendente**, esperando o gestor.

### Parte B — O gestor aprova e libera o acesso

1. Entre como **gestor** (botão rápido na tela de login).
2. No menu, clique em **Aprovações**. Lá estão os pedidos esperando.
3. Clique em **Aprovar** (ou **Recusar**, com confirmação).
   - Ao aprovar, o sistema **sozinho**: cria a conta, inventa uma **senha forte** e **gera o e-mail** de boas-vindas.
4. Clique em **E-mails** para ver o e-mail pronto — é só **copiar e enviar** ao parceiro.
   *(Por que copiar? Porque o app ainda não tem um servidor de e-mail de verdade — a "caixa de saída" dele é esta tela.)*

### Parte C — O parceiro usa o app

1. Entre com o **usuário (e-mail) e a senha** recebidos.
2. **Dashboard** — visão geral: coletas realizadas, pendentes, total doado em kg.
3. **Nova Solicitação** — informe o material (cabelo, pelo ou misto), quantidade e data desejada. *(Ele não precisa escolcher parceiro: o campo já vem pronto, pois a conta é dele.)*
4. **Contribuições** — histórico do que já doou.
5. **Rastrear** — digite o código do lote (ex.: `FT-2026-000001`) e veja a história completa do material.
6. Ele **não vê** nada de outros parceiros — só o que é dele.

### Parte D — O gestor faz a operação (a "fábrica")

Tudo no menu do gestor, nesta ordem natural:

1. **Coletas** → registra que foi buscar o material, data e peso.
2. **Painel da Operação** → enxerga o que está pendente e o que está no estoque.
3. **Pesagem & Lote** → o sistema gera o código do lote automaticamente.
4. **Triagem** → aprova ou rejeita o material (se rejeitar, é obrigatório dizer o motivo).
5. **Estoque** → quanto material está disponível.
6. **Destinação** → registra para onde foi (ex.: ONG FioTrar).
7. **Rastrear** → linha do tempo do material, do salão até o destino final.
8. **Indicadores** → números gerais: logísticos, **ambientais** (só os cards de valores, sem barrinhas) e qualidade.
9. **Parceiros** → lista todos os cadastros com botão **Editar** (se o e-mail mudar, o login do parceiro muda junto).
10. **Aprovações** e **E-mails** → como visto na Parte B.

---

## 🔄 Resumo em uma frase para cada etapa

> Alguém **se cadastra** → o gestor **aprova** → o sistema **manda o e-mail com a senha** → o parceiro **entra e pede coleta** → o gestor **coleta, pesa, examina, estoca e destina** → todo mundo **acompanha pela rastreabilidade** e pelos **indicadores**.

---

## ⚠️ Três avisos importantes

1. **Os dados ficam no navegador** (como uma gaveta naquela máquina). Se o histórico for limpo, os dados vão embora. Para voltar aos dados de demonstração, execute no console do navegador:
   ```js
   localStorage.removeItem('fiotrack_db'); location.reload();
   ```
2. **Os e-mails não saem automaticamente** — eles ficam prontos na tela **E-mails** do gestor, para copiar e enviar.
3. **Só dois perfis**: parceiro e gestor. O operador foi retirado.

---

## 🎓 Sugestão de demonstração (5 minutos) para apresentar

1. Abra a landing page e clique em **"Quero me tornar parceiro"** → preencha um cadastro (1 min).
2. Entre como **gestor** → **Aprovações** → **Aprovar** (10 s).
3. Abra **E-mails** → mostre a senha gerada (10 s).
4. Entre como **parceiro** com essa senha → **Nova Solicitação** (1 min).
5. Volte ao **gestor** → percorra **Coletas → Pesagem → Triagem → Estoque → Destinação** (1,5 min).
6. Termine em **Rastrear** (mostrando a linha do tempo) e **Indicadores** (1 min).

---

*Arquivo relacionado: `Fluxograma_FioTrack.md` (diagramas visuais do mesmo fluxo).*
