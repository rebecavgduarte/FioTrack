#!/usr/bin/env python3
"""
Importa o projeto FioTrack para o Taiga.io
Cria: projeto, 3 sprints (milestones), 12 user stories, tasks e issues (riscos).

Uso:
    python taiga_import.py --user SEU_USUARIO --pass SUA_SENHA
    ou defina as variáveis de ambiente TAIGA_USER e TAIGA_PASS

Requisitos: pip install requests
"""

import argparse
import json
import os
import sys
import time

import requests

BASE = "https://api.taiga.io/api/v1"


# ──────────────────────────────────────────────
# DADOS DO PROJETO (extraídos do pacote acadêmico)
# ──────────────────────────────────────────────

PROJETO = {
    "name": "FioTrack",
    "description": (
        "Plataforma de logística reversa e rastreabilidade para coleta de cabelos "
        "e pelos de animais destinados a soluções ambientais de contenção de óleo. "
        "Parceira: ONG FioTrar. Modelo: Espiral + Scrum. "
        "Slogan: Transformando fios em proteção para nossos mares."
    ),
}

# 3 Sprints (milestones) — Ciclos Espirais
# Período do projeto: 23/09/2026 a 03/10/2026 (hoje)
SPRINTS = [
    {
        "name": "Sprint 1 - Ideação e MVP Conceitual",
        "estimated_start": "2026-09-23",
        "estimated_finish": "2026-09-26",
        "description": (
            "**Sprint Goal:** Construir o modelo conceitual da operação logística "
            "e validar o fluxo básico do FioTrack.\n\n"
            "**Ciclo Espiral 1** — Entregáveis: pitch inicial, Product Backlog, "
            "Risk Log V1, wireframe, fluxo logístico, modelo de dados e definição do MVP.\n\n"
            "**Retrospectiva:** Start/Stop/Continue"
        ),
    },
    {
        "name": "Sprint 2 - Evolução do Produto",
        "estimated_start": "2026-09-27",
        "estimated_finish": "2026-09-30",
        "description": (
            "**Sprint Goal:** Transformar o modelo conceitual em protótipo operacional "
            "capaz de controlar coletas, recebimento e lotes.\n\n"
            "**Ciclo Espiral 2** — Incremento: Parceiro -> Solicitação -> Coleta -> "
            "Pesagem -> Lote.\n\n"
            "**Retrospectiva:** 4Ls (Liked, Learned, Lacked, Longed for)"
        ),
    },
    {
        "name": "Sprint 3 - Consolidação",
        "estimated_start": "2026-10-01",
        "estimated_finish": "2026-10-03",
        "description": (
            "**Sprint Goal:** Consolidar a rastreabilidade e demonstrar a operação "
            "completa do material coletado.\n\n"
            "**Ciclo Espiral 3** — Fluxo final: Cadastro -> Solicitação -> Coleta -> "
            "Pesagem -> Lote -> Triagem -> Estoque -> Destinação -> Rastreabilidade.\n\n"
            "**Retrospectiva:** Sailboat"
        ),
    },
]

# 12 User Stories (com critérios de aceitação resumidos)
USER_STORIES = [
    {
        "ref": 1,
        "subject": "US01 - Cadastro de Parceiro",
        "milestone": 0,  # Sprint 1
        "points": {"Média": 3},
        "priority": "Must have",
        "description": (
            "**Como** parceiro, **quero** me cadastrar, **para** participar do programa de coleta.\n\n"
            "### Critérios de Aceitação\n"
            "- CA-01.1: Cadastro com dados válidos cria o parceiro e exibe sucesso\n"
            "- CA-01.2: Campos obrigatórios vazios impedem o envio\n"
            "- CA-01.3: E-mail inválido exibe erro de validação\n"
            "- CA-01.4: Documento duplicado exibe erro\n"
            "- CA-01.5: Tipos disponíveis: Salão, Barbearia, Pet Shop, Banho e Tosa, "
            "Clínica Veterinária, Pessoa Física, Outro"
        ),
    },
    {
        "ref": 2,
        "subject": "US02 - Solicitação de Coleta",
        "milestone": 0,
        "points": {"Alta": 5},
        "priority": "Must have",
        "description": (
            "**Como** parceiro, **quero** solicitar uma coleta, **para** enviar meu material.\n\n"
            "### Critérios de Aceitação\n"
            "- CA-02.1: Solicitação válida gera protocolo com status Pendente\n"
            "- CA-02.2: Ponto de coleta é obrigatório\n"
            "- CA-02.3: Tipos: Cabelo humano, Pelo de animal, Misto\n"
            "- CA-02.4: Listagem mostra todas as solicitações com status"
        ),
    },
    {
        "ref": 3,
        "subject": "US03 - Visualização de Coletas Pendentes",
        "milestone": 0,
        "points": {"Alta": 5},
        "priority": "Must have",
        "description": (
            "**Como** operador, **quero** visualizar coletas pendentes, **para** planejar minha rota.\n\n"
            "### Critérios de Aceitação\n"
            "- CA-03.1: Dashboard lista coletas pendentes por data\n"
            "- CA-03.2: Sem coletas exibe mensagem adequada\n"
            "- CA-03.3: Filtro por região funciona\n"
            "- CA-03.4: Detalhes mostram parceiro, endereço, material, data"
        ),
    },
    {
        "ref": 4,
        "subject": "US04 - Registro de Coleta",
        "milestone": 1,  # Sprint 2
        "points": {"Média": 3},
        "priority": "Must have",
        "description": (
            "**Como** operador, **quero** registrar uma coleta, **para** manter a rastreabilidade.\n\n"
            "### Critérios de Aceitação\n"
            "- CA-04.1: Registro muda status para Concluída\n"
            "- CA-04.2: Status possíveis: Pendente, Em Andamento, Concluída, Cancelada\n"
            "- CA-04.3: Responsável é obrigatório"
        ),
    },
    {
        "ref": 5,
        "subject": "US05 - Registro de Peso",
        "milestone": 1,
        "points": {"Média": 3},
        "priority": "Must have",
        "description": (
            "**Como** operador, **quero** registrar o peso coletado, **para** controlar o volume.\n\n"
            "### Critérios de Aceitação\n"
            "- CA-05.1: Peso válido é registrado e vinculado à coleta\n"
            "- CA-05.2: Peso zero/negativo exibe erro\n"
            "- CA-05.3: Formato não numérico exibe erro\n"
            "- CA-05.4: Peso registrado aparece nos detalhes com data e responsável"
        ),
    },
    {
        "ref": 6,
        "subject": "US06 - Geração de Lote",
        "milestone": 1,
        "points": {"Alta": 5},
        "priority": "Must have",
        "description": (
            "**Como** operador, **quero** gerar um lote, **para** identificar o material.\n\n"
            "### Critérios de Aceitação\n"
            "- CA-06.1: Código único auto-gerado FT-2026-000001, status Em Triagem\n"
            "- CA-06.2: Campos: Código (auto), Tipo Material, Peso Inicial, Data, Status\n"
            "- CA-06.3: Busca por código retorna dados do lote\n"
            "- CA-06.4: Código é garantido como único"
        ),
    },
    {
        "ref": 7,
        "subject": "US07 - Registro de Triagem",
        "milestone": 2,  # Sprint 3
        "points": {"Alta": 5},
        "priority": "Must have",
        "description": (
            "**Como** operador, **quero** registrar a triagem, **para** separar materiais "
            "aprovados e rejeitados.\n\n"
            "### Critérios de Aceitação\n"
            "- CA-07.1: Triagem aprovada atualiza status do lote\n"
            "- CA-07.2: Validar soma: aprovado + rejeitado = peso inicial\n"
            "- CA-07.3: Motivo de rejeição obrigatório quando rejeitado > 0\n"
            "- CA-07.4: Motivos: Contaminado, Umidade Excessiva, Tipo Inadequado, "
            "Material Danificado, Outro\n"
            "- CA-07.5: Aproveitamento calculado automaticamente"
        ),
    },
    {
        "ref": 8,
        "subject": "US08 - Consulta de Estoque",
        "milestone": 2,
        "points": {"Alta": 5},
        "priority": "Should have",
        "description": (
            "**Como** operador, **quero** consultar o estoque, **para** saber quanto "
            "material está disponível.\n\n"
            "### Critérios de Aceitação\n"
            "- CA-08.1: Lista lotes em estoque com código, tipo, peso, data\n"
            "- CA-08.2: Resumo: total de lotes, peso disponível, peso por tipo\n"
            "- CA-08.3: Filtro por tipo funciona\n"
            "- CA-08.4: Estoque vazio exibe mensagem"
        ),
    },
    {
        "ref": 9,
        "subject": "US09 - Registro de Destinação",
        "milestone": 2,
        "points": {"Alta": 5},
        "priority": "Must have",
        "description": (
            "**Como** operador, **quero** registrar a destinação de um lote, **para** "
            "completar a rastreabilidade.\n\n"
            "### Critérios de Aceitação\n"
            "- CA-09.1: Destinação registrada muda status para Destinado\n"
            "- CA-09.2: Destinação parcial atualiza saldo\n"
            "- CA-09.3: Histórico de movimentações completo"
        ),
    },
    {
        "ref": 10,
        "subject": "US10 - Rastreabilidade Completa",
        "milestone": 2,
        "points": {"Muito Alta": 8},
        "priority": "Must have",
        "description": (
            "**Como** gestor, **quero** rastrear um lote desde sua origem até sua "
            "destinação, **para** ter visibilidade total.\n\n"
            "### Critérios de Aceitação\n"
            "- CA-10.1: Busca por código retorna timeline completa\n"
            "- CA-10.2: Timeline: Origem -> Coleta -> Transporte -> Recebimento -> "
            "Triagem -> Estoque -> Destinação\n"
            "- CA-10.3: Lote inexistente exibe mensagem de não encontrado\n"
            "- CA-10.4: Etapa Origem mostra dados do parceiro"
        ),
    },
    {
        "ref": 11,
        "subject": "US11 - Indicadores",
        "milestone": 2,
        "points": {"Alta": 5},
        "priority": "Should have",
        "description": (
            "**Como** gestor, **quero** visualizar indicadores, **para** acompanhar a operação.\n\n"
            "### Critérios de Aceitação\n"
            "- CA-11.1: Indicadores logísticos (pontos, coletas, peso)\n"
            "- CA-11.2: Indicadores ambientais (kg desviados, lotes, destinações)\n"
            "- CA-11.3: Indicadores de qualidade (aprovado, rejeitado, motivos)\n"
            "- CA-11.4: Sem dados exibe mensagem adequada"
        ),
    },
    {
        "ref": 12,
        "subject": "US12 - Consulta de Contribuições do Parceiro",
        "milestone": 2,
        "points": {"Média": 3},
        "priority": "Could have",
        "description": (
            "**Como** parceiro, **quero** consultar minhas contribuições, **para** "
            "acompanhar minha participação.\n\n"
            "### Critérios de Aceitação\n"
            "- CA-12.1: Histórico de contribuições com data, peso, status\n"
            "- CA-12.2: Totalização: peso total, número de coletas"
        ),
    },
]

# Tasks por user story (do Sprint Backlog)
TASKS = {
    1: [  # US01
        "Desenhar tela de cadastro (wireframe)",
        "Definir campos do formulário",
        "Implementar validações de campos obrigatórios",
        "Implementar persistência dos dados do parceiro",
        "Testar fluxo completo de cadastro",
    ],
    2: [  # US02
        "Desenhar tela de solicitação de coleta (wireframe)",
        "Definir modelo de dados da solicitação",
        "Implementar formulário de solicitação",
        "Implementar listagem de solicitações do parceiro",
        "Testar fluxo de solicitação",
    ],
    3: [  # US03
        "Desenhar tela de dashboard do operador (wireframe)",
        "Implementar listagem de coletas pendentes",
        "Implementar filtros por região/status",
        "Implementar ordenação por data/prioridade",
        "Testar visualização",
    ],
    4: [  # US04
        "Desenhar tela de registro de coleta",
        "Implementar formulário de registro (data, responsável, ponto)",
        "Implementar status da coleta (pendente -> em andamento -> concluída)",
        "Testar fluxo de registro",
    ],
    5: [  # US05
        "Desenhar tela de pesagem",
        "Implementar formulário de peso (valor, unidade, data, responsável)",
        "Implementar validação de peso (> 0, formato numérico)",
        "Vincular peso à coleta correspondente",
        "Testar fluxo de pesagem",
    ],
    6: [  # US06
        "Desenhar tela de criação de lote",
        "Implementar geração automática de código (FT-2026-000001)",
        "Implementar campos do lote",
        "Implementar status inicial do lote (Em triagem)",
        "Implementar consulta de lote por código",
        "Testar fluxo completo de lote",
    ],
    7: [  # US07
        "Desenhar tela de triagem",
        "Implementar formulário (peso aprovado, rejeitado, motivo)",
        "Implementar catálogo de motivos de rejeição",
        "Implementar cálculo de aproveitamento (%)",
        "Vincular triagem ao lote",
        "Testar fluxo de triagem",
    ],
    8: [  # US08
        "Desenhar tela de estoque",
        "Implementar listagem de lotes em estoque",
        "Implementar filtros (status, tipo material, data)",
        "Implementar resumo de pesos",
        "Testar consulta",
    ],
    9: [  # US09
        "Desenhar tela de destinação",
        "Implementar formulário (destino, data, quantidade, responsável)",
        "Implementar atualização de status do lote",
        "Implementar histórico de movimentações do lote",
        "Testar fluxo de destinação",
    ],
    10: [  # US10
        "Desenhar tela de rastreabilidade (timeline)",
        "Implementar busca por código do lote",
        "Implementar timeline completa (7 etapas)",
        "Implementar exibição de dados de cada etapa",
        "Testar rastreabilidade completa",
    ],
    11: [  # US11
        "Desenhar dashboard de indicadores",
        "Implementar indicadores logísticos",
        "Implementar indicadores ambientais",
        "Implementar indicadores de qualidade",
        "Testar indicadores",
    ],
    12: [  # US12
        "Desenhar tela de contribuições do parceiro",
        "Implementar histórico de coletas do parceiro",
        "Implementar totalização",
        "Testar consulta",
    ],
}

# Risks (Issues no Taiga)
RISCOS = [
    # Ciclo 1
    {"ref": "R01-C1", "subject": "[R01] Quantidade insuficiente de material", "milestone": 0,
     "description": "**Categoria:** Aceitação | **Prob:** Média | **Impacto:** Alto\n\n**Mitigação:** Criar rede inicial de parceiros (meta: 10+ pontos).\n\n**Status:** Fechado no Ciclo 3 (12+ pontos ativos)."},
    {"ref": "R02-C1", "subject": "[R02] Material contaminado ou inadequado", "milestone": 0,
     "description": "**Categoria:** Técnico | **Prob:** Alta | **Impacto:** Alto\n\n**Mitigação:** Critérios de aceitação e rejeição; treinamento de parceiros.\n\n**Status:** Fechado no Ciclo 2."},
    {"ref": "R03-C1", "subject": "[R03] Custo de coleta inviabilizar a operação", "milestone": 0,
     "description": "**Categoria:** Financeiro | **Prob:** Alta | **Impacto:** Alto\n\n**Mitigação:** Agrupar coletas por região; frequência mínima por ponto.\n\n**Status:** Parcialmente mitigado — custo real medido pós-piloto."},
    {"ref": "R04-C1", "subject": "[R04] Dificuldade para conseguir parceiros", "milestone": 0,
     "description": "**Categoria:** Aceitação | **Prob:** Média | **Impacto:** Alto\n\n**Mitigação:** Programa de adesão com benefícios; abordagem direta.\n\n**Status:** Fechado no Ciclo 2."},
    {"ref": "R05-C1", "subject": "[R05] Sistema não representar a operação real", "milestone": 0,
     "description": "**Categoria:** Técnico | **Prob:** Média | **Impacto:** Médio\n\n**Mitigação:** Validar fluxo com usuários nas Sprint Reviews.\n\n**Status:** Fechado no Ciclo 3."},
    # Ciclo 2
    {"ref": "R01-C2", "subject": "[R01-C2] Baixo volume coletado", "milestone": 1,
     "description": "**Categoria:** Aceitação | **Prob:** Média | **Impacto:** Alto\n\n**Mitigação:** Ampliar rede de parceiros; campanha de arrecadação.\n\n**Status:** Em monitoramento."},
    {"ref": "R02-C2", "subject": "[R02-C2] Custo logístico elevado", "milestone": 1,
     "description": "**Categoria:** Financeiro | **Prob:** Alta | **Impacto:** Alto\n\n**Mitigação:** Otimização de rotas; agrupamento por bairro/região.\n\n**Status:** Mitigado."},
    {"ref": "R03-C2", "subject": "[R03-C2] Erro no registro do peso", "milestone": 1,
     "description": "**Categoria:** Técnico | **Prob:** Média | **Impacto:** Médio\n\n**Mitigação:** Conferência dupla na entrada; validação de campos.\n\n**Status:** Mitigado."},
    {"ref": "R04-C2", "subject": "[R04-C2] Perda da identificação do lote", "milestone": 1,
     "description": "**Categoria:** Técnico | **Prob:** Média | **Impacto:** Alto\n\n**Mitigação:** Código único FT-2026-XXXXXX + registro digital + etiqueta física.\n\n**Status:** Mitigado."},
    {"ref": "R05-C2", "subject": "[R05-C2] Atraso no desenvolvimento", "milestone": 1,
     "description": "**Categoria:** Cronograma | **Prob:** Média | **Impacto:** Médio\n\n**Mitigação:** Limitar escopo do MVP; priorizar Must Have.\n\n**Status:** Mitigado."},
    {"ref": "R06-C2", "subject": "[R06-C2] Extravio de material na operação", "milestone": 1,
     "description": "**Categoria:** Técnico | **Prob:** Baixa | **Impacto:** Alto\n\n**Mitigação:** Registro de handover (transferência de responsabilidade).\n\n**Status:** Mitigado."},
    # Ciclo 3
    {"ref": "R01-C3", "subject": "[R01-C3] Escalabilidade da operação", "milestone": 2,
     "description": "**Categoria:** Técnico | **Prob:** Média | **Impacto:** Alto\n\n**Mitigação:** Arquitetura modular do sistema.\n\n**Status:** Mitigado."},
    {"ref": "R02-C3", "subject": "[R02-C3] Custo por kg transportado elevado", "milestone": 2,
     "description": "**Categoria:** Financeiro | **Prob:** Média | **Impacto:** Alto\n\n**Mitigação:** Roteirização otimizada; parcerias de transporte.\n\n**Status:** Em monitoramento."},
    {"ref": "R03-C3", "subject": "[R03-C3] Falta de padronização dos parceiros", "milestone": 2,
     "description": "**Categoria:** Aceitação | **Prob:** Média | **Impacto:** Médio\n\n**Mitigação:** Manual operacional; treinamento inicial.\n\n**Status:** Mitigado."},
    {"ref": "R04-C3", "subject": "[R04-C3] Crescimento superior à capacidade logística", "milestone": 2,
     "description": "**Categoria:** Cronograma | **Prob:** Média | **Impacto:** Alto\n\n**Mitigação:** Limitação territorial inicial (Maricá); crescimento gradual.\n\n**Status:** Mitigado."},
    {"ref": "R05-C3", "subject": "[R05-C3] VALIDAÇÃO TÉCNICA DO USO DO MATERIAL (ABERTO)", "milestone": 2,
     "description": "**Categoria:** Técnico | **Prob:** Alta | **Impacto:** Alto\n\n**Mitigação:** Parcerias técnicas (universidades, especialistas); testes controlados.\n\n**Status:** ⚠️ ABERTO — depende de parceiros externos. Risco mais crítico do projeto."},
    {"ref": "R06-C3", "subject": "[R06-C3] Dependência de centro único de preparação", "milestone": 2,
     "description": "**Categoria:** Técnico | **Prob:** Baixa | **Impacto:** Alto\n\n**Mitigação:** Estudar centros regionais futuros.\n\n**Status:** Monitorado."},
    {"ref": "R07-C3", "subject": "[R07-C3] Resistência de novos parceiros", "milestone": 2,
     "description": "**Categoria:** Aceitação | **Prob:** Média | **Impacto:** Médio\n\n**Mitigação:** Cases de sucesso; certificados; dashboard de impacto.\n\n**Status:** Mitigado."},
]


def log(msg):
    print(f"  {msg}")


class TaigaClient:
    def __init__(self, username, password):
        self.session = requests.Session()
        self.token = None
        self.username = username
        self.password = password
        self.project_id = None

    def auth(self):
        r = self.session.post(f"{BASE}/auth", json={
            "username": self.username,
            "password": self.password,
            "type": "normal",
        })
        r.raise_for_status()
        self.token = r.json()["auth_token"]
        self.session.headers.update({
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json",
        })
        log(f"Autenticado como {self.username}")

    def get_template_id(self):
        """Busca o creation_template padrão disponível."""
        r = self.session.get(f"{BASE}/project-templates")
        r.raise_for_status()
        data = r.json()
        items = data.get("list", data) if isinstance(data, dict) else data
        if items:
            # Usa o primeiro template disponível
            tid = items[0]["id"]
            log(f"Template de projeto: {items[0].get('name', '?')} (id={tid})")
            return tid
        return None

    def create_project(self):
        payload = {
            "name": PROJETO["name"],
            "description": PROJETO["description"],
            # Conta free do Taiga cloud: limite de projetos públicos atingido
            "is_private": True,
        }
        # creation_template é obrigatório em muitas versões do Taiga
        try:
            tid = self.get_template_id()
            if tid:
                payload["creation_template"] = tid
        except Exception as e:
            log(f"  (não foi possível buscar template: {e})")

        r = self.session.post(f"{BASE}/projects", json=payload)
        if r.status_code == 429:
            log("Rate limit — aguardando 10s...")
            time.sleep(10)
            return self.create_project()
        if r.status_code >= 400:
            # Imprimir o corpo do erro para diagnóstico
            log(f"ERRO {r.status_code} ao criar projeto:")
            log(f"  Payload: {json.dumps(payload, ensure_ascii=False)}")
            log(f"  Resposta: {r.text[:500]}")
        r.raise_for_status()
        data = r.json()
        self.project_id = data["id"]
        vis = "privado" if data.get("is_private") else "público"
        log(f"Projeto criado ({vis}): {PROJETO['name']} (id={self.project_id})")
        return data

    def find_project(self):
        # Lista projetos (privados e públicos) e procura pelo nome
        for visibility in ("false", "true"):
            r = self.session.get(
                f"{BASE}/projects", params={"is_private": visibility}
            )
            r.raise_for_status()
            data = r.json()
            items = data.get("list", data) if isinstance(data, dict) else data
            for p in items:
                if p.get("name") == PROJETO["name"]:
                    self.project_id = p["id"]
                    log(f"Projeto existente encontrado: id={self.project_id}")
                    return p
        return None

    def _retry(self, fn, *args, **kwargs):
        for attempt in range(5):
            try:
                return fn(*args, **kwargs)
            except requests.HTTPError as e:
                status = e.response.status_code if e.response is not None else 0
                if status == 429:
                    wait = 10 * (attempt + 1)
                    log(f"Rate limit — aguardando {wait}s...")
                    time.sleep(wait)
                    continue
                # Erro não recuperável: mostrar detalhes
                if e.response is not None:
                    log(f"ERRO {status}:")
                    log(f"  Resposta: {e.response.text[:500]}")
                raise
        raise RuntimeError("Falha após 5 tentativas de rate limit")

    def create_milestone(self, data):
        def _do():
            r = self.session.post(f"{BASE}/milestones", json={
                "project": self.project_id,
                "name": data["name"],
                "estimated_start": data["estimated_start"],
                "estimated_finish": data["estimated_finish"],
                "description": data.get("description", ""),
            })
            r.raise_for_status()
            return r.json()
        m = self._retry(_do)
        log(f"Sprint criada: {data['name']} (id={m['id']})")
        return m

    def create_userstory(self, data, milestone_id):
        def _do():
            payload = {
                "project": self.project_id,
                "subject": data["subject"],
                "description": data.get("description", ""),
            }
            if milestone_id:
                payload["milestone"] = milestone_id
            # priority como tag (client_requirement não existe na API)
            priority = data.get("priority", "")
            if priority:
                payload["tags"] = [priority.lower().replace(" ", "-")]
            r = self.session.post(f"{BASE}/userstories", json=payload)
            r.raise_for_status()
            return r.json()
        us = self._retry(_do)
        log(f"User story criada: {data['subject']} (id={us['id']})")
        return us

    def set_points(self, us_id, points_dict):
        # Get points list for project
        r = self.session.get(f"{BASE}/points", params={"project": self.project_id})
        r.raise_for_status()
        points_list = r.json().get("list", r.json()) if isinstance(r.json(), dict) else r.json()

        for point_name, value in points_dict.items():
            matching = None
            for p in points_list:
                if p["name"].lower() == point_name.lower():
                    matching = p
                    break
            if matching is None:
                # try creating
                r2 = self.session.post(f"{BASE}/points", json={
                    "project": self.project_id,
                    "name": point_name,
                    "value": value,
                })
                if r2.status_code == 201:
                    matching = r2.json()
                else:
                    log(f"  Ponto '{point_name}' não encontrado e não criável ({r2.status_code})")
                    continue
            r3 = self.session.put(
                f"{BASE}/userstories/{us_id}/points",
                json={"project": self.project_id, "points": {str(matching["id"]): value}},
            )
            # Some Taiga versions need a different approach
            if r3.status_code >= 400:
                # try direct patch on userstory
                pass

    def create_task(self, us_id, subject, milestone_id):
        def _do():
            r = self.session.post(f"{BASE}/tasks", json={
                "project": self.project_id,
                "user_story": us_id,
                "subject": subject,
                "milestone": milestone_id,
            })
            r.raise_for_status()
            return r.json()
        t = self._retry(_do)
        return t

    def create_issue(self, data, milestone_id):
        def _do():
            r = self.session.post(f"{BASE}/issues", json={
                "project": self.project_id,
                "subject": data["subject"],
                "description": data.get("description", ""),
                "milestone": milestone_id,
            })
            r.raise_for_status()
            return r.json()
        i = self._retry(_do)
        return i


def main():
    parser = argparse.ArgumentParser(description="Importa FioTrack para o Taiga.io")
    parser.add_argument("--user", default=os.environ.get("TAIGA_USER"), help="Usuário Taiga")
    parser.add_argument("--pass", dest="password", default=os.environ.get("TAIGA_PASS"), help="Senha Taiga")
    parser.add_argument("--dry-run", action="store_true", help="Apenas mostra o que seria criado")
    args = parser.parse_args()

    if args.dry_run:
        print("=== DRY RUN ===")
        print(f"Projeto: {PROJETO['name']}")
        print(f"Sprints: {len(SPRINTS)}")
        print(f"User Stories: {len(USER_STORIES)}")
        total_tasks = sum(len(v) for v in TASKS.values())
        print(f"Tasks: {total_tasks}")
        print(f"Issues (riscos): {len(RISCOS)}")
        return

    if not args.user or not args.password:
        print("ERRO: informe --user e --pass (ou TAIGA_USER e TAIGA_PASS)")
        print("  python taiga_import.py --user meu_usuario --pass minha_senha")
        sys.exit(1)

    print("=== Importando FioTrack para o Taiga.io ===\n")

    client = TaigaClient(args.user, args.password)
    client.auth()

    # Verificar se projeto já existe
    existing = client.find_project()
    if existing:
        print(f"\nProjeto '{PROJETO['name']}' já existe (id={client.project_id}).")
        resp = input("Deseja continuar e adicionar sprints/histórias? (s/N): ")
        if resp.lower() not in ("s", "sim", "y", "yes"):
            print("Abortado.")
            return
    else:
        client.create_project()

    print("\n--- Criando Sprints ---")
    milestones = []
    for s in SPRINTS:
        m = client.create_milestone(s)
        milestones.append(m)

    print("\n--- Criando User Stories ---")
    us_map = {}  # ref -> id
    for us_data in USER_STORIES:
        m = milestones[us_data["milestone"]]
        us = client.create_userstory(us_data, m["id"])
        us_map[us_data["ref"]] = us["id"]
        # Tentar definir pontos (melhor esforço)
        try:
            client.set_points(us["id"], us_data.get("points", {}))
        except Exception as e:
            log(f"  (pontos não definidos: {e})")

    print("\n--- Criando Tasks ---")
    task_count = 0
    for ref, task_list in TASKS.items():
        us_id = us_map.get(ref)
        if not us_id:
            continue
        us_data = next(u for u in USER_STORIES if u["ref"] == ref)
        m = milestones[us_data["milestone"]]
        for task_subject in task_list:
            client.create_task(us_id, task_subject, m["id"])
            task_count += 1

    print("\n--- Criando Issues (Riscos) ---")
    issue_count = 0
    for risk in RISCOS:
        m = milestones[risk["milestone"]]
        client.create_issue(risk, m["id"])
        issue_count += 1

    print(f"\n=== IMPORTAÇÃO CONCLUÍDA ===")
    print(f"  Projeto: {PROJETO['name']}")
    print(f"  Sprints: {len(milestones)}")
    print(f"  User Stories: {len(us_map)}")
    print(f"  Tasks: {task_count}")
    print(f"  Issues (riscos): {issue_count}")
    print(f"\n  Acesse: https://app.taiga.io/project/{PROJETO['name'].lower().replace(' ', '-').replace('/', '')}")


if __name__ == "__main__":
    main()
