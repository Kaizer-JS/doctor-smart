# Doctor Smart - Plataforma de Agendamento & Portal Médico

Doctor Smart é uma plataforma médica moderna composta por um **Catálogo de Especialistas**, **Páginas de Perfil Individual** com agendamento online/presencial e um **Portal do Profissional (SaaS)** integrado para gestão clínica, financeira e de prontuário.

---

## 🌟 Funcionalidades Principais

### 1. Catálogo de Médicos & Busca Inteligente (`index.html`)
- **Filtros Avançados**: Especialidade médica, cidade e modalidade de atendimento (Presencial e Teleconsulta).
- **Ranqueamento Inteligente**:
  - *Doctor Smart Score (Relevância)*: Algoritmo ponderado por nota e volume de avaliações.
  - Ordenação por *Melhor Avaliados*, *Mais Avaliados*, *Menor Preço*, *Maior Preço* e *Ordem Alfabética*.
- **Agendamento Rápido**: Modal dinâmico com seleção de tipo de consulta e horários em tempo real.

### 2. Perfil Completo do Especialista (`perfil-medico.html`)
- **Agendas Dedicadas**: Horários e slots exclusivos e alternáveis entre *Teleconsulta Online* e *Consulta Presencial*.
- **Métricas Transparentes**: 100% de consistência entre avaliações (5.0 estrelas), contadores de opiniões e depoimentos verificados de pacientes.
- **Informações Detalhadas**: Formação acadêmica, convênios aceitos, endereço do consultório e FAQs.

### 3. Portal do Profissional / SaaS (`painel-medico.html`)
- **Sidebar de Navegação Completa**: Painel, Gestão de Pacientes, Documentos, Consultas e Configurações de Agenda.
- **Switcher de Médicos**: Alternância rápida de perfil com *Dr. Jean (Conta Teste)* por padrão.
- **Painel Executivo & Faturamento Dinâmico**:
  - Alternância instantânea de métricas por período (**Dia**, **Mês**, **Ano**).
  - Gestão de valor da hora clínica, ticket médio e taxa de retorno.
- **Prontuário Eletrônico**: Anamnese, evolução clínica e prescrição digital conectadas.

---

## 🏗️ Arquitetura em 3 Camadas

O projeto foi estruturado seguindo o padrão de 3 camadas para máxima confiabilidade e determinismo:

```
DOCTOR SMART/
├── directives/       # Camada 1: Diretrizes operacionais e SOPs em Markdown
├── execution/        # Camada 3: Scripts Python determinísticos e requirements.txt
├── assets/           # Frontend: CSS customizado, Imagens tratadas e Scripts JS (app.js, data.js, etc.)
├── docs/             # Documentação de workflow, backlog e changelog
├── .tmp/             # Arquivos temporários e checkpoints de pipeline (ignorado no Git)
├── index.html        # Página inicial e catálogo de busca
├── perfil-medico.html# Página de perfil individual do médico
├── painel-medico.html# Portal SaaS do profissional médico
├── vercel.json       # Configuração de deploy estático no Vercel
├── AGENTS.md         # Regras de orquestração do Agente IA
└── README.md         # Documentação principal
```

---

## 🚀 Como Executar Localmente

### Opção 1: Servidor HTTP Python (Sem dependências externas de Node)
```bash
# Na raiz do projeto:
python -m http.server 3000
```
Acesse `http://localhost:3000` no seu navegador.

### Opção 2: Servidor Node / Serve / Live Server
```bash
npx serve -l 3000 .
```

---

## 🛠️ Pipeline de Execução Python

Para executar scripts de validação ou processamento da base de dados médica:

```bash
# Instalar dependências
pip install -r execution/requirements.txt

# Validar integridade dos médicos e fotos locais
python execution/validate_doctors.py
```

