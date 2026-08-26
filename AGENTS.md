# Arquitetura em 3 Camadas (3-Layer Architecture)

Este ambiente opera sob a arquitetura em 3 camadas para garantir máxima confiabilidade e determinismo:

## As 3 Camadas

### Camada 1: Diretrizes / Directives (`directives/`)
- Procedimentos Operacionais Padrão (SOPs) em Markdown.
- Definem objetivos, entradas, saídas, ferramentas/scripts a utilizar e casos de borda.

### Camada 2: Orquestração / Orchestration (Agente IA)
- Roteamento inteligente e tomada de decisão.
- Lê as diretrizes, executa as ferramentas de forma sequencial e lógica, trata exceções e auto-aprimora o sistema (*self-annealing*).

### Camada 3: Execução / Execution (`execution/`)
- Scripts determinísticos em Python em `execution/`.
- Chamadas a APIs, processamento de dados, manipulação de arquivos e integrações.
- Dependências gerenciadas em `requirements.txt` e variáveis de ambiente em `.env`.

---

## Estrutura do Projeto

```
DOCTOR SMART/
├── directives/       # Instruções e SOPs em Markdown
├── execution/        # Scripts determinísticos em Python
├── .tmp/             # Arquivos intermediários e checkpoints (temporários)
├── .env              # Chaves de API e variáveis de ambiente (privado)
├── .env.example      # Modelo de variáveis de ambiente
├── requirements.txt  # Dependências Python
├── AGENTS.md         # Diretrizes do Agente
└── .gitignore        # Arquivos ignorados pelo Git
```

---

## Princípios de Operação

1. **Verificar ferramentas antes:** Consultar sempre `execution/` antes de criar novos scripts.
2. **Auto-correção (Self-Annealing):** Ao encontrar erros, corrigir o script, testar e atualizar a diretriz correspondente com os aprendizados.
3. **Segurança por padrão:** Nunca expor chaves de API ou dados sensíveis em logs ou arquivos intermediários.
4. **Gerenciamento de Estado:** Usar `.tmp/` para salvar pontos de restauração (checkpoints) em processos multi-etapa.
