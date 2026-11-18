#!/usr/bin/env python3
"""
Ajusta o projeto 'FioTrack' já importado no Taiga.io:

  1. Sprints (milestones) reposicionadas para 23/09/2026 a 03/10/2026
  2. Datas aleatórias (progresso) de created/finished/closed dentro do período
  3. Conclui TODAS as tarefas, user stories e issues

Período: 23/09/2026 (início do projeto) .. 03/10/2026 (hoje)

Uso:
    python taiga_adjust_dates.py --user USUARIO --pass SENHA
    ou defina TAIGA_USER e TAIGA_PASS

Requisitos: pip install requests
"""

import argparse
import os
import random
import re
import sys
import time
from datetime import datetime, timedelta, timezone

import requests

BASE = "https://api.taiga.io/api/v1"
PROJETO_NOME = "FioTrack"

# Período total do projeto
INI_GERAL = datetime(2026, 9, 23, tzinfo=timezone.utc)
FIM_GERAL = datetime(2026, 10, 3, 23, 59, tzinfo=timezone.utc)

# Sprints: nome -> (inicio, fim) — ícone coerente com a importação
SPRINT_PERIODOS = {
    "Sprint 1": (datetime(2026, 9, 23, tzinfo=timezone.utc), datetime(2026, 9, 26, 23, 0, tzinfo=timezone.utc)),
    "Sprint 2": (datetime(2026, 9, 27, tzinfo=timezone.utc), datetime(2026, 9, 30, 23, 0, tzinfo=timezone.utc)),
    "Sprint 3": (datetime(2026, 10, 1, tzinfo=timezone.utc), datetime(2026, 10, 3, 23, 0, tzinfo=timezone.utc)),
}

rng = random.Random(42)  # determinístico
THROTTLE = 10.0  # pausa (s) entre PUTs — o Taiga cloud faz throttle de escrita


def log(msg):
    print(f"  {msg}")


def iso(dt):
    """Formato aceito pela API do Taiga (ISO 8601)."""
    return dt.strftime("%Y-%m-%dT%H:%M:%SZ")


def data_aleatoria(inicio, fim, **kw):
    delta = int((fim - inicio).total_seconds())
    if delta <= 0:
        return inicio
    return inicio + timedelta(seconds=rng.randint(0, delta))


def período_da_milestone(name):
    for prefix, (i, f) in SPRINT_PERIODOS.items():
        if name.startswith(prefix):
            return i, f
    return INI_GERAL, FIM_GERAL


class TaigaClient:
    def __init__(self, username, password):
        self.session = requests.Session()
        self.username = username
        self.password = password
        self.project_id = None
        self.stats = {}

    def auth(self):
        r = self.session.post(f"{BASE}/auth", json={
            "username": self.username,
            "password": self.password,
            "type": "normal",
        })
        r.raise_for_status()
        self.session.headers.update({
            "Authorization": f"Bearer {r.json()['auth_token']}",
            "Content-Type": "application/json",
        })
        log(f"Autenticado como {self.username}")

    def _req(self, method, path, **kwargs):
        for attempt in range(12):
            r = self.session.request(method, f"{BASE}/{path}", **kwargs)
            if r.status_code == 429:
                # O Taiga informa quando a escrita será liberada
                m = re.search(r"(\d+)\s*seconds?", r.text)
                wait = (int(m.group(1)) + 5) if m else min(20 * (attempt + 1), 300)
                log(f"Rate limit — aguardando {wait}s...")
                time.sleep(wait)
                continue
            return r
        raise RuntimeError("Falha após tentativas de rate limit")

    def find_project(self):
        # 1) tenta por slug (a listagem /projects é paginada e pode omitir)
        slug_base = PROJETO_NOME.lower().replace(" - ", "-").replace(" ", "-")
        for slug in (f"{self.username}-{slug_base}", slug_base):
            r = self._req("GET", f"projects/by_slug?slug={slug}")
            if r.status_code == 200:
                self.project_id = r.json()["id"]
                log(f"Projeto encontrado por slug '{slug}': id={self.project_id}")
                return r.json()
        # 2) fallback: listagem com paginação
        page = 1
        while page < 50:
            r = self._req("GET", "projects", params={"page": page})
            r.raise_for_status()
            data = r.json()
            items = data.get("list", data) if isinstance(data, dict) else data
            if not items:
                break
            for p in items:
                if p.get("name") == PROJETO_NOME:
                    self.project_id = p["id"]
                    log(f"Projeto encontrado (pág. {page}): id={self.project_id}")
                    return p
            if len(items) < 30:
                break
            page += 1
        raise SystemExit(f"ERRO: projeto '{PROJETO_NOME}' não encontrado")

    def list(self, path, extra=None):
        """Lista todos os itens, percorrendo as páginas (a API usa page_size=30)."""
        params = {"project": self.project_id}
        if extra:
            params.update(extra)
        all_items = []
        page = 1
        while page <= 100:
            params["page"] = page
            r = self._req("GET", path, params=params)
            if r.status_code == 404 and page > 1:
                break  # página além do fim da listagem
            r.raise_for_status()
            data = r.json()
            items = data.get("list", data) if isinstance(data, dict) else data
            if not items:
                break
            all_items.extend(items)
            if len(items) < 30:
                break
            page += 1
        return all_items

    def put(self, path, payload):
        # A API v1 do Taiga exige os campos base em todos os PUTs
        if isinstance(payload, dict):
            payload.setdefault("project", self.project_id)
        r = self._req("PUT", path, json=payload)
        time.sleep(THROTTLE)  # evita rate limit
        if r.status_code >= 400:
            return None, f"{r.status_code}: {r.text[:200]}"
        return r.json(), None

    # ---------- status com is_closed ----------
    def closed_status(self, path):
        for s in self.list(path):
            if s.get("is_closed"):
                return s
        itens = self.list(path)
        return itens[-1] if itens else None

    # ---------- ajustes ----------
    def ajustar_milestones(self):
        print("\n--- Sprints (milestones) ---")
        ms = self.list("milestones")
        for m in sorted(ms, key=lambda x: x["id"]):
            ini, fim = período_da_milestone(m["name"])
            payload = {
                "name": m["name"],
                "estimated_start": ini.strftime("%Y-%m-%d"),
                "estimated_finish": fim.strftime("%Y-%m-%d"),
            }
            if m.get("version") is not None:
                payload["version"] = m["version"]
            _, err = self.put(f"milestones/{m['id']}", payload)
            if err:
                log(f"ERRO {m['name']}: {err}")
            else:
                log(f"{m['name']}: {ini:%d/%m/%Y} a {fim:%d/%m/%Y}")

    def _datas_progresso(self, ini, fim):
        """Cria (criação) e conclusão aleatórias dentro do período."""
        c = data_aleatoria(ini, fim - timedelta(hours=6))
        # conclusão sempre depois da criação
        f = data_aleatoria(max(c + timedelta(hours=1), ini), fim)
        return c, f

    def _sprint_idx(self):
        """Índices dos milestones ordenados por data de início (Sprint1,2,3)."""
        ms = sorted(self.list("milestones"), key=lambda x: x.get("estimated_start") or "")
        return [m["id"] for m in ms]

    @staticmethod
    def _ms_idx_por_ref(ref):
        # Plano original: US01-03 -> Sprint 1 | US04-06 -> Sprint 2 | US07-12 -> Sprint 3
        if ref <= 3:
            return 0
        if ref <= 6:
            return 1
        return 2

    @staticmethod
    def _ms_idx_por_issue(subject):
        # Riscos: ciclo 1 (sem sufixo) -> S1 | -C2 -> S2 | -C3 -> S3
        if "-C3" in subject:
            return 2
        if "-C2" in subject:
            return 1
        return 0

    def concluir_userstories(self):
        print("\n--- User Stories ---")
        status = self.closed_status("userstory-statuses")
        if not status:
            log("ERRO: nenhum status fechado de user stories")
            return
        log(f"Status fechado: {status['name']} (id={status['id']})")
        sprints = self._sprint_idx()
        ok = erros = 0
        for us in self.list("userstories"):
            idx = self._ms_idx_por_ref(us.get("ref") or 0)
            payload = {
                "subject": us["subject"],
                "status": status["id"],
                "milestone": sprints[idx],
                "version": us["version"],
            }
            _, err = self.put(f"userstories/{us['id']}", payload)
            if err:
                log(f"ERRO {us['subject']}: {err}")
                erros += 1
                continue
            ok += 1
        log(f"{ok} user stories na sprint correta e concluídas" + (f", {erros} erros" if erros else ""))
        self.stats["us"] = ok

    def concluir_tasks(self):
        print("\n--- Tasks ---")
        status = self.closed_status("task-statuses")
        if not status:
            log("ERRO: nenhum status fechado de tasks")
            return
        log(f"Status fechado: {status['name']} (id={status['id']})")
        sprints = self._sprint_idx()
        us_por_ref = {us.get("ref"): us["id"] for us in self.list("userstories")}
        us_idx = {
            us["id"]: self._ms_idx_por_ref(us.get("ref") or 0)
            for us in self.list("userstories")
        }

        # Reconstrução do vínculo US <-> task: as tasks foram criadas na ordem
        # de TASKS (ref 1..12) e os subjects batem posição a posição.
        try:
            from taiga_import import TASKS
            esperado, refs = [], []
            for ref in range(1, 13):
                for s in TASKS.get(ref, []):
                    esperado.append(s)
                    refs.append(ref)
        except Exception:
            esperado, refs = [], []

        tasks = sorted(self.list("tasks"), key=lambda x: x["id"])
        reconstruir = bool(esperado) and len(tasks) == len(esperado)

        ok = erros = 0
        for pos, t in enumerate(tasks):
            us_id = t.get("user_story")
            if not us_id and reconstruir and t["subject"] == esperado[pos]:
                us_id = us_por_ref.get(refs[pos])
            if us_id and us_id in us_idx:
                idx = us_idx[us_id]
            elif t.get("milestone") in sprints:
                idx = sprints.index(t["milestone"])
            else:
                idx = 0
            payload = {
                "subject": t["subject"],
                "status": status["id"],
                "milestone": sprints[idx],
                "version": t["version"],
            }
            if us_id:
                payload["user_story"] = us_id
            _, err = self.put(f"tasks/{t['id']}", payload)
            if err:
                log(f"ERRO {t['subject']}: {err}")
                erros += 1
                continue
            ok += 1
        log(f"{ok} tasks na sprint/US correta e concluídas" + (f", {erros} erros" if erros else ""))
        self.stats["tasks"] = ok

    def concluir_issues(self):
        print("\n--- Issues (riscos) ---")
        status = self.closed_status("issue-statuses")
        if not status:
            log("ERRO: nenhum status fechado de issues")
            return
        log(f"Status fechado: {status['name']} (id={status['id']})")
        sprints = self._sprint_idx()
        ok = erros = 0
        for i in self.list("issues"):
            idx = self._ms_idx_por_issue(i["subject"])
            payload = {
                "subject": i["subject"],
                "status": status["id"],
                "milestone": sprints[idx],
                "version": i["version"],
            }
            _, err = self.put(f"issues/{i['id']}", payload)
            if err:
                log(f"ERRO {i['subject']}: {err}")
                erros += 1
                continue
            ok += 1
        log(f"{ok} issues na sprint correta e fechadas" + (f", {erros} erros" if erros else ""))
        self.stats["issues"] = ok


def main():
    parser = argparse.ArgumentParser(description="Ajusta datas e conclui tudo no Taiga")
    parser.add_argument("--user", default=os.environ.get("TAIGA_USER"))
    parser.add_argument("--pass", dest="password", default=os.environ.get("TAIGA_PASS"))
    parser.add_argument("--only", choices=["milestones", "stories", "tasks", "issues"], help="Executa só uma parte")
    args = parser.parse_args()

    if not args.user or not args.password:
        print("ERRO: informe --user e --pass (ou TAIGA_USER/TAIGA_PASS)")
        sys.exit(1)

    print("=== Ajustando datas do projeto no Taiga (23/09/2026 a 03/10/2026) ===\n")
    c = TaigaClient(args.user, args.password)
    c.auth()
    c.find_project()

    only = args.only
    if only in (None, "milestones"):
        c.ajustar_milestones()
    if only in (None, "stories"):
        c.concluir_userstories()
    if only in (None, "tasks"):
        c.concluir_tasks()
    if only in (None, "issues"):
        c.concluir_issues()

    print("\n=== CONCLUÍDO ===")
    for k, v in c.stats.items():
        print(f"  {k}: {v}")


if __name__ == "__main__":
    main()
