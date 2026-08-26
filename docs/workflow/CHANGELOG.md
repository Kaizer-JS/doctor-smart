# Changelog

Histórico de versões validadas e integradas à branch principal.
Formato: mais recente no topo.

## [v0.4.1] - 2026-08-26

### Aprimorado
- **Sincronização Dinâmica de Faturamento por Período ([Dia], [Mês], [Ano])**:
  - Alternância instantânea no painel:
    - **Dia**: Faturamento do dia (`R$ 900,00`), 3 consultas e 3 pacientes com curva horária (08h - 20h).
    - **Mês**: Faturamento mensal equilibrado (`R$ 4.800,00`), 16 consultas e 25 pacientes com curva diária.
    - **Ano**: Faturamento anual acumulado (`R$ 33.600,00`), 112 consultas e 78 pacientes com curva mensal (Jan - Dez).
- **Painel Executivo de Gestão & Valor da Hora Médica**:
  - **Valor Médio por Hora Clínica**: `R$ 480,00/h` (baseado em tempo médio de consulta de 35 min).
  - **Ticket Médio por Atendimento**: `R$ 300,00`.
  - **Taxa de Retorno / Acompanhamento**: `76.4%` de fidelização de pacientes.
  - **Horas Clínicas Produtivas**: `14h 30m` no mês.
  - **Métricas de Eficiência**: Margem líquida de 88.5%, ocupação de grade de 91.2% e pontualidade de 98.2%.
- **Calibração Realista de Recebíveis**: Valores plausíveis e atrativos que demonstram a rentabilidade da plataforma sem assustar o profissional.
- **Portal do Profissional / Painel SaaS (`painel-medico.html`)**:
  - **Sidebar Lateral Escura Oficial**: Navegação com *Painel*, *Pacientes*, *Documentos*, *Consultas do dia/anteriores/próximas*, *Configurações de disponibilidade* e *Gestão da Agenda*.
  - **Topbar com Seletor de Médicos**: Alternador interativo com `Dr. Jean (Conta Teste)` como padrão.
  - **Cards de KPIs em Tempo Real**: *Total de pacientes*, *Consultas*, *Faturamento mensal realista* e *Novos pacientes este mês*.
  - **Novo Widget de Performance**: Taxa de comparecimento (96.8%), pontualidade (98.2%) e tempo médio (35 min).
  - **Distribuição de Atendimentos**: Gráfico com legenda completa para *Primeira Consulta vs Retorno* e *Presencial vs Teleconsulta*.
  - **Histórico Geral de Consultas**: Modal de visualização rápida e simplificada de agendamentos.
  - **Prontuário Digital**: Anamnese, evolução e prescrição médica conectada.
- **Ranqueamento e Ordenação no Catálogo (`index.html`)**:
  - Algoritmo de ranqueamento inteligente por Relevância (*Doctor Smart Score* ponderado por nota e volume de opiniões).
  - Filtros de ordenação: *Melhor Avaliados*, *Mais Avaliados*, *Menor Preço*, *Maior Preço* e *Ordem Alfabética*.
- **Agendas Dedicadas de Teleconsulta e Presencial**:
  - Slots e horários específicos para *Teleconsulta Online* e *Consulta Presencial* em todos os 15 médicos com alternância dinâmica em tempo real.
- **Consistência Total de Métricas de Avaliação**:
  - Alinhamento de 100% dos contadores de avaliações (cards, header do perfil, pontuação 5.0 e depoimentos).
