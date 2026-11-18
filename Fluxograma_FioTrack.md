# Fluxograma do FioTrack — como tudo funciona

> Guia visual em linguagem simples. Abra este arquivo no navegador ou use a visualização de diagrama do editor.

---

## 1️⃣ Fluxo do cadastro de parceiros (do interesse ao acesso liberado)

```mermaid
flowchart TD
    A["Pessoa visita a landing page do FioTrack"] --> B["Clica em<br/>Quero me tornar parceiro"]
    B --> C["Formulário público de cadastro<br/>(nome, tipo, documento, telefone,<br/>E-MAIL, endereço)"]

    C -->|"E-mail ou documento<br/>já existe"| D["⚠️ Erro: cadastro já existe<br/>— nada é duplicado"]
    D --> C

    C -->|"Tudo certo"| E["✅ Cadastro enviado<br/>status: PENDENTE"]
    E --> F["Tela: aguarde a análise<br/>da equipe FioTrack"]

    F --> G["GESTOR entra no painel<br/>menu Aprovações"]
    G -->|"Recusar"| H["Status: RECUSADO<br/>o pedido pode ser refazer depois"]
    H --> C

    G -->|"Aprovar"| I["Sistema cria a conta automaticamente:<br/>usuário = e-mail +<br/>SENHA forte gerada na hora"]
    I --> J["E-mail de boas-vindas gerado<br/>na tela E-mails do painel<br/>(usuário + senha para enviar)"]
    J --> K["Parceiro recebe os dados<br/>e faz LOGIN"]
    K --> L["🎉 Painel do Parceiro liberado"]
```

---

## 2️⃣ Fluxo da operação logística (o material percorrendo o caminho)

```mermaid
flowchart TD
    A["PARCEIRO<br/>Nova Solicitação de Coleta<br/>(material, quantidade, data)"] --> B["Pedido na fila:<br/>status PENDENTE"]

    B --> C["GESTOR registra a COLETA<br/>quem buscou, data e peso"]
    C --> D["PESAGEM & LOTE<br/>o sistema gera o código<br/>FT-2026-000001"]
    D --> E["TRIAGEM<br/>quanto foi aprovado / rejeitado<br/>e o motivo"]
    E -->|"aprovado"| F["ESTOQUE<br/>material disponível"]
    E -->|"rejeitado"| R["Descarte / rejeição<br/>com motivo registrado"]
    F --> G["DESTINAÇÃO<br/>para onde o material foi<br/>(ex.: ONG FioTrar)"]
    G --> H["RASTREABILIDADE completa<br/>histórico do início ao fim"]

    H -.->|"visão do parceiro"| I["Painel do Parceiro:<br/>Minhas Solicitações &<br/>Minhas Contribuições"]
    H -.->|"visão do gestor"| J["INDICADORES<br/>números gerais da operação<br/>(Logísticos / Ambientais / Qualidade)"]
```

---

## 3️⃣ Quem é quem (os dois perfis)

```mermaid
flowchart LR
    subgraph PUBLICO["Área pública (sem login)"]
        P1["Landing page"]
        P2["Cadastro de parceiro"]
        P1 <--> P2
    end

    subgraph PAR["PERFIL PARCEIRO (só vê as SUAS coisas)"]
        Q1["Dashboard"]
        Q2["Nova Solicitação"]
        Q3["Contribuições"]
        Q4["Rastrear meu material"]
        Q1 --> Q2 --> Q3 --> Q4
    end

    subgraph GES["PERFIL GESTOR (vê e faz TUDO)"]
        G1["Aprovações de parceiros"]
        G2["Parceiros (editar cadastro)"]
        G3["E-mails enviados"]
        G4["Operação: coletas, pesagem,<br/>triagem, estoque, destinação"]
        G5["Indicadores da Operação"]
        G1 --> G2 --> G3 --> G4 --> G5
    end

    P2 -->|"aprovado pelo gestor"| PAR
    PAR -->|"pedidos de coleta"| GES
    GES -->|"e-mail com usuário e senha"| PAR
```

---

## 🎨 Legenda dos ícones

| Símbolo | Significado |
|---|---|
| ✅ | Algo foi aceito / criado com sucesso |
| ⚠️ | Atenção: algo bloqueado ou errado |
| 🎉 | Fim do caminho: tela liberada |
| seta sólida | passo seguinte na ordem |
| seta pontilhada | visão de um dos perfis |
