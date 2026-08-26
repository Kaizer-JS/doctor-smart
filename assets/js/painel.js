/**
 * Doctor Smart - Portal do Profissional / Painel SaaS
 * Lógica interativa com sincronização dinâmica de período (Dia, Mês, Ano),
 * métricas financeiras de gestão da hora médica e sincronização via localStorage.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Identificar Médico Ativo (padrão dr-jean-teste para apresentação oficial)
  const urlParams = new URLSearchParams(window.location.search);
  const currentDocId = urlParams.get("id") || "dr-jean-teste";
  
  const currentDoctor = DOCTORS_DATA.find(d => d.id === currentDocId) || DOCTORS_DATA[0];

  // 2. Inicializar o Seletor de Médicos na Topbar
  initDoctorSwitcher(currentDoctor.id);

  // 3. Sincronizar e Carregar Agendamentos do localStorage
  const appointments = loadDoctorAppointments(currentDoctor.id);

  // 4. Renderizar Métricas de Alto Nível Iniciais (Mês)
  updatePeriodData("mes", currentDoctor, appointments);

  // 5. Renderizar o Widget do Perfil (Coluna Direita)
  renderProfileWidget(currentDoctor, appointments);

  // 6. Renderizar Lista de Consultas de Hoje (Clean e Elegante)
  renderAppointmentsTable(appointments, currentDoctor);

  // 7. Renderizar Gráficos de Tipos e Taxa de Comparecimento
  renderAttendanceAndDistributionCharts(currentDoctor);

  // 8. Renderizar Painel de Performance Financeira & Gestão da Hora Médica
  renderFinancialKPIs(currentDoctor);

  // 9. Renderizar Avaliações dos Pacientes (Coluna Direita)
  renderDoctorReviews(currentDoctor);

  // Event Listeners das Abas de Período (Dia, Mês, Ano)
  document.querySelectorAll(".chart-tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".chart-tab-btn").forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      const period = e.currentTarget.getAttribute("data-period");
      updatePeriodData(period, currentDoctor, appointments);
    });
  });

  // ==========================================================================
  // SELETOR DE MÉDICOS (SWITCHER)
  // ==========================================================================
  function initDoctorSwitcher(selectedId) {
    const switcher = document.getElementById("doctor-switcher-select");
    if (!switcher) return;

    switcher.innerHTML = DOCTORS_DATA.map(doc => `
      <option value="${doc.id}" ${doc.id === selectedId ? 'selected' : ''}>
        ${doc.name} (${doc.specialties[0]})
      </option>
    `).join("");

    switcher.addEventListener("change", (e) => {
      window.location.href = `painel-medico.html?id=${e.target.value}`;
    });

    const emailBadge = document.getElementById("doctor-email-badge");
    if (emailBadge) {
      const cleanName = currentDoctor.name.toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 10);
      emailBadge.innerText = `${cleanName}@doctorsmart.com.br`;
    }
  }

  // ==========================================================================
  // HELPER: EXTRAÇÃO CORRETA E SEGURA DO PREÇO DO MÉDICO
  // ==========================================================================
  function getDoctorPrice(doc) {
    if (!doc || !doc.price) return 300;
    if (typeof doc.price === "number") return doc.price;
    // Extrai o valor inteiro antes da vírgula para evitar multiplicação por 100 dos centavos
    const parts = doc.price.split(",");
    const intPart = parts[0].replace(/[^0-9]/g, "");
    const num = parseInt(intPart, 10);
    return isNaN(num) || num <= 0 ? 300 : num;
  }

  // ==========================================================================
  // SINCRONIZAÇÃO DE AGENDAMENTOS (LOCALSTORAGE)
  // ==========================================================================
  function loadDoctorAppointments(docId) {
    const saved = localStorage.getItem("doctor_smart_appointments");
    let allBookings = [];
    if (saved) {
      try {
        allBookings = JSON.parse(saved);
      } catch (e) {
        allBookings = [];
      }
    }

    // Filtrar agendamentos para o médico ativo
    const doctorCustomBookings = allBookings.filter(b => b.doctorId === docId);

    // Agendamentos mock padrão realistas (3 consultas no dia)
    const defaultBookings = [
      {
        id: "apt-101",
        patientName: "Juliana Mendes Castro",
        phone: "(71) 99842-1102",
        reason: "Check-up de rotina e acompanhamento",
        modality: "Consulta Presencial",
        time: "11:33",
        duration: "Tempo previsto: 30 min",
        status: "Em andamento",
        date: "Hoje"
      },
      {
        id: "apt-102",
        patientName: "Rodrigo Barreto Santana",
        phone: "(71) 98711-4455",
        reason: "Primeira consulta de avaliação",
        modality: "Consulta Presencial",
        time: "14:00",
        duration: "Tempo previsto: 45 min",
        status: "Confirmada",
        date: "Hoje"
      },
      {
        id: "apt-103",
        patientName: "Mariana Costa Silveira",
        phone: "(71) 99123-8877",
        reason: "Retorno e laudo de exames",
        modality: "Teleconsulta",
        time: "16:30",
        duration: "Tempo previsto: 20 min",
        status: "Confirmada",
        date: "Hoje"
      }
    ];

    // Mesclar agendamentos reais criados no frontend do paciente no topo
    const customFormatted = doctorCustomBookings.map((b, i) => ({
      id: `apt-live-${i}`,
      patientName: b.patientName || "Paciente Doctor Smart",
      phone: b.patientPhone || "(71) 99999-0000",
      reason: b.type === "teleconsulta" ? "Teleconsulta Online Agendada" : "Consulta Presencial Agendada",
      modality: b.type === "teleconsulta" ? "Teleconsulta" : "Consulta Presencial",
      time: b.time || "10:00",
      duration: "Tempo previsto: 30 min",
      status: "Confirmada",
      date: b.date || "Hoje",
      isLive: true
    }));

    return [...customFormatted, ...defaultBookings];
  }

  // ==========================================================================
  // SINCRONIZAÇÃO DINÂMICA DE FATURAMENTO E KPIS POR PERÍODO (DIA, MÊS, ANO)
  // ==========================================================================
  function updatePeriodData(period, doc, aptList) {
    const priceNum = getDoctorPrice(doc);

    const elPatients = document.getElementById("kpi-total-patients");
    const elPatientsLabel = document.getElementById("kpi-label-patients");
    const elConsults = document.getElementById("kpi-total-consults");
    const elConsultsLabel = document.getElementById("kpi-label-consults");
    const elRev = document.getElementById("kpi-monthly-revenue");
    const elRevLabel = document.getElementById("kpi-label-revenue");
    const elNew = document.getElementById("kpi-new-patients");
    const elNewLabel = document.getElementById("kpi-label-new-patients");

    if (period === "dia") {
      const todayCount = 3 + aptList.filter(a => a.isLive).length;
      const todayRev = (priceNum * todayCount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

      if (elPatients) elPatients.innerText = todayCount;
      if (elPatientsLabel) elPatientsLabel.innerText = "Pacientes hoje";
      if (elConsults) elConsults.innerText = todayCount;
      if (elConsultsLabel) elConsultsLabel.innerText = "Consultas hoje";
      if (elRev) elRev.innerText = todayRev;
      if (elRevLabel) elRevLabel.innerText = "Faturamento do dia";
      if (elNew) elNew.innerText = "2";
      if (elNewLabel) elNewLabel.innerText = "Novos pacientes hoje";
    } else if (period === "ano") {
      const liveBonus = aptList.filter(a => a.isLive).length * 4;
      const yearConsults = 112 + liveBonus;
      const yearPatients = 78 + aptList.filter(a => a.isLive).length;
      const yearRev = (priceNum * yearConsults).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

      if (elPatients) elPatients.innerText = yearPatients;
      if (elPatientsLabel) elPatientsLabel.innerText = "Pacientes no ano";
      if (elConsults) elConsults.innerText = yearConsults;
      if (elConsultsLabel) elConsultsLabel.innerText = "Consultas no ano";
      if (elRev) elRev.innerText = yearRev;
      if (elRevLabel) elRevLabel.innerText = "Faturamento anual";
      if (elNew) elNew.innerText = "42";
      if (elNewLabel) elNewLabel.innerText = "Novos pacientes no ano";
    } else {
      // Mês (Padrão)
      const liveBonus = aptList.filter(a => a.isLive).length;
      const monthConsults = 16 + liveBonus;
      const monthPatients = (doc.reviewsCount || 25) + liveBonus;
      const monthRev = (priceNum * monthConsults).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

      if (elPatients) elPatients.innerText = monthPatients;
      if (elPatientsLabel) elPatientsLabel.innerText = "Total de pacientes";
      if (elConsults) elConsults.innerText = monthConsults;
      if (elConsultsLabel) elConsultsLabel.innerText = "Consultas este mês";
      if (elRev) elRev.innerText = monthRev;
      if (elRevLabel) elRevLabel.innerText = "Faturamento mensal";
      if (elNew) elNew.innerText = "8";
      if (elNewLabel) elNewLabel.innerText = "Novos pacientes este mês";
    }

    renderPatientChart(period);
  }

  // ==========================================================================
  // WIDGET DO PERFIL DO MÉDICO
  // ==========================================================================
  function renderProfileWidget(doc, aptList) {
    const avatarEl = document.getElementById("widget-avatar-img");
    if (avatarEl) avatarEl.src = doc.photo;

    const nameEl = document.getElementById("widget-doc-name");
    if (nameEl) nameEl.innerText = doc.name;

    const crmEl = document.getElementById("widget-doc-crm");
    if (crmEl) crmEl.innerText = `${doc.crm} • ${doc.city} - ${doc.state}`;

    const profileLink = document.getElementById("widget-public-profile-link");
    if (profileLink) {
      profileLink.href = `perfil-medico.html?id=${doc.id}`;
      profileLink.title = `Visualizar página de perfil público de ${doc.name}`;
    }

    const patientsBadge = document.getElementById("widget-patients-badge");
    if (patientsBadge) patientsBadge.innerText = `${(doc.reviewsCount || 25) + aptList.filter(a => a.isLive).length} Pacientes`;

    const priceNum = getDoctorPrice(doc);
    const yearConsults = 112 + (aptList.filter(a => a.isLive).length * 4);
    const annualRev = (priceNum * yearConsults).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    document.getElementById("widget-annual-rev").innerText = annualRev;
    document.getElementById("widget-new-patients").innerText = "42";
    document.getElementById("widget-total-cases").innerText = yearConsults;
  }

  // ==========================================================================
  // TABELA DE CONSULTAS DE HOJE (CLEAN E ELEGANTE)
  // ==========================================================================
  function renderAppointmentsTable(aptList, doc) {
    const container = document.getElementById("appointments-rows-box");
    if (!container) return;

    if (aptList.length === 0) {
      container.innerHTML = `<p style="padding: 1.5rem; text-align: center; color: #94a3b8;">Nenhuma consulta agendada para hoje.</p>`;
      return;
    }

    container.innerHTML = aptList.map((apt, idx) => `
      <div class="appointment-item-card" style="${apt.isLive ? 'border-left: 4px solid #10b981;' : ''}">
        <div class="patient-info-col">
          <div class="patient-initial-thumb">${apt.patientName.charAt(0)}</div>
          <div class="patient-names-box">
            <span class="patient-name-txt">
              ${apt.patientName}
              ${apt.isLive ? '<span style="font-size: 0.65rem; background: #10b981; color: #ffffff; padding: 1px 5px; border-radius: 4px; margin-left: 4px;">NOVO</span>' : ''}
            </span>
            <span class="patient-reason-txt">${apt.reason} • <strong style="color: #028090;">${apt.modality}</strong></span>
          </div>
        </div>

        <div>
          <span class="time-col-txt">${apt.time}</span>
          <div class="time-duration-sub">${apt.duration}</div>
        </div>

        <div>
          <span class="status-badge-pill ${apt.status === 'Em andamento' ? 'status-in-progress' : 'status-confirmed'}">
            ${apt.status}
          </span>
        </div>

        <div style="text-align: right;">
          <button type="button" class="btn-open-record" title="Abrir Prontuário Clínico Digital" onclick="window.DoctorSmartPanel.openRecordModal('${apt.patientName}', '${apt.reason}', '${apt.phone}')">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              <path d="M9 14h6"></path>
              <path d="M9 18h6"></path>
              <path d="M9 10h6"></path>
            </svg>
          </button>
        </div>
      </div>
    `).join("");
  }

  // ==========================================================================
  // GRÁFICO DE LINHA SVG (ESTATÍSTICAS DE PACIENTES)
  // ==========================================================================
  function renderPatientChart(period) {
    const container = document.getElementById("patient-chart-container");
    if (!container) return;

    let points, labels;
    if (period === "dia") {
      points = [0, 0, 1, 1, 1, 0, 0];
      labels = ["08h", "10h", "12h", "14h", "16h", "18h", "20h"];
    } else if (period === "ano") {
      points = [18, 19, 20, 21, 20, 19, 20, 22, 20, 21, 20, 20];
      labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    } else {
      // Mês (Padrão)
      points = [5, 5, 5, 5];
      labels = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
    }

    const maxVal = Math.max(...points, 2);
    const height = 180;
    const width = 600;
    const paddingX = 40;
    const paddingY = 20;

    const stepX = (width - paddingX * 2) / (points.length - 1);
    const scaleY = (height - paddingY * 2) / maxVal;

    const coords = points.map((val, idx) => ({
      x: paddingX + idx * stepX,
      y: height - paddingY - val * scaleY,
      val: val,
      label: labels[idx]
    }));

    const pathD = coords.reduce((acc, pt, idx, arr) => {
      if (idx === 0) return `M ${pt.x} ${pt.y}`;
      const prev = arr[idx - 1];
      const cpX1 = prev.x + (pt.x - prev.x) / 2;
      const cpX2 = prev.x + (pt.x - prev.x) / 2;
      return `${acc} C ${cpX1} ${prev.y}, ${cpX2} ${pt.y}, ${pt.x} ${pt.y}`;
    }, "");

    const dotsSvg = coords.map(pt => `
      <circle cx="${pt.x}" cy="${pt.y}" r="4" fill="#6366f1" stroke="#ffffff" stroke-width="2">
        <title>${pt.label}: ${pt.val} pacientes</title>
      </circle>
      <text x="${pt.x}" y="${height + 5}" font-size="10" fill="#64748b" text-anchor="middle">${pt.label}</text>
    `).join("");

    container.innerHTML = `
      <svg viewBox="0 0 ${width} ${height + 25}" preserveAspectRatio="none">
        <!-- Linhas de Grade de Fundo -->
        <line x1="${paddingX}" y1="${paddingY}" x2="${width - paddingX}" y2="${paddingY}" stroke="#f1f5f9" stroke-width="1" />
        <line x1="${paddingX}" y1="${height / 2}" x2="${width - paddingX}" y2="${height / 2}" stroke="#f1f5f9" stroke-width="1" />
        <line x1="${paddingX}" y1="${height - paddingY}" x2="${width - paddingX}" y2="${height - paddingY}" stroke="#e2e8f0" stroke-width="1" />

        <!-- Curva Suave -->
        <path d="${pathD}" fill="none" stroke="#6366f1" stroke-width="3" stroke-linecap="round" />
        
        <!-- Pontos e Rótulos -->
        ${dotsSvg}
      </svg>
    `;
  }

  // ==========================================================================
  // WIDGET: TAXA DE COMPARECIMENTO & GRÁFICO DE DISTRIBUIÇÃO COM LEGENDA
  // ==========================================================================
  function renderAttendanceAndDistributionCharts(doc) {
    const attendanceBox = document.getElementById("attendance-kpi-container");
    if (attendanceBox) {
      attendanceBox.innerHTML = `
        <div class="attendance-kpi-box">
          <div class="attendance-score-row">
            <div class="score-left-info">
              <span class="score-main-number">96.8%</span>
              <span class="score-sublabel">Taxa média de comparecimento às consultas</span>
            </div>
            <span class="attendance-badge-good">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Excelente Adesão
            </span>
          </div>

          <div class="attendance-mini-metrics-grid">
            <div class="att-mini-card">
              <span class="att-mini-label">Pontualidade dos Pacientes</span>
              <span class="att-mini-val" style="color: #2563eb;">98.2%</span>
            </div>
            <div class="att-mini-card">
              <span class="att-mini-label">Tempo Médio de Consulta</span>
              <span class="att-mini-val" style="color: #0f172a;">35 min</span>
            </div>
          </div>
        </div>
      `;
    }

    const hbarsBox = document.getElementById("hbars-chart-box");
    if (hbarsBox) {
      const totalP = (doc.reviewsCount || 25);
      const totalC = Math.round(totalP * 1.5);

      hbarsBox.innerHTML = `
        <div class="horizontal-bars-group">
          <!-- Linha 1: Tipos de Visita -->
          <div class="hbar-row-item">
            <div class="hbar-header-line">
              <span class="hbar-title-text">Tipos de Visita</span>
              <span class="hbar-total-badge">${totalP} pacientes</span>
            </div>

            <div class="hbar-track">
              <div class="hbar-seg-pink" style="width: 70%;" title="Primeira Consulta: 70%">
                Primeira Consulta (70%)
              </div>
              <div class="hbar-seg-purple" style="width: 30%;" title="Retorno / Acompanhamento: 30%">
                Retorno (30%)
              </div>
            </div>

            <div class="hbar-legend-row">
              <div class="legend-item-dot">
                <span class="dot-color" style="background: #ec4899;"></span>
                <span>Primeira Consulta (70%)</span>
              </div>
              <div class="legend-item-dot">
                <span class="dot-color" style="background: #a855f7;"></span>
                <span>Acompanhamento / Retorno (30%)</span>
              </div>
            </div>
          </div>

          <!-- Linha 2: Modalidade de Atendimento -->
          <div class="hbar-row-item" style="margin-top: 0.5rem;">
            <div class="hbar-header-line">
              <span class="hbar-title-text">Modalidade de Atendimento</span>
              <span class="hbar-total-badge">${totalC} consultas</span>
            </div>

            <div class="hbar-track">
              <div class="hbar-seg-teal" style="width: 60%;" title="Consulta Presencial: 60%">
                Presencial (60%)
              </div>
              <div class="hbar-seg-sky" style="width: 40%;" title="Teleconsulta Online: 40%">
                Teleconsulta (40%)
              </div>
            </div>

            <div class="hbar-legend-row">
              <div class="legend-item-dot">
                <span class="dot-color" style="background: #0d9488;"></span>
                <span>Consulta Presencial (60%)</span>
              </div>
              <div class="legend-item-dot">
                <span class="dot-color" style="background: #0284c7;"></span>
                <span>Teleconsulta Online (40%)</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  // ==========================================================================
  // PAINEL DE PERFORMANCE FINANCEIRA & GESTÃO DA HORA MÉDICA
  // ==========================================================================
  function renderFinancialKPIs(doc) {
    const priceNum = getDoctorPrice(doc);
    
    // Cálculo do valor da hora médica: base 1.6x do valor de consulta (35 a 40 min por paciente)
    const hourlyRate = Math.round(priceNum * 1.6);
    const hourlyEl = document.getElementById("fin-hourly-rate");
    if (hourlyEl) hourlyEl.innerText = `${hourlyRate.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}/h`;

    const ticketEl = document.getElementById("fin-ticket-price");
    if (ticketEl) ticketEl.innerText = priceNum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    const returnEl = document.getElementById("fin-return-rate");
    if (returnEl) returnEl.innerText = "76.4%";

    const hoursEl = document.getElementById("fin-productive-hours");
    if (hoursEl) hoursEl.innerText = "14h 30m";
  }

  // ==========================================================================
  // WIDGET: AVALIAÇÕES DOS PACIENTES (COLUNA DIREITA)
  // ==========================================================================
  function renderDoctorReviews(doc) {
    const badgeEl = document.getElementById("reviews-score-badge");
    if (badgeEl) {
      badgeEl.innerHTML = `⭐ ${(doc.rating || 5.0).toFixed(1)} (${doc.reviewsCount || 25})`;
    }

    const container = document.getElementById("doctor-reviews-container");
    if (!container) return;

    const reviews = doc.patientReviews && doc.patientReviews.length > 0 ? doc.patientReviews : [
      {
        name: "Juliana Mendes Castro",
        date: "25 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
        comment: "Atendimento impecável! Explicou detalhadamente o diagnóstico e montou um plano terapêutico muito seguro."
      },
      {
        name: "Rodrigo Barreto Santana",
        date: "20 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
        comment: "Excelente profissional. Pontualidade britânica, consultório agradável e conduta clínica precisa."
      }
    ];

    const starsHtml = Array.from({ length: 5 }).map(() => `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    `).join("");

    container.innerHTML = `
      <div class="reviews-summary-bar">
        <div class="reviews-score-block">
          <span class="reviews-big-score">${(doc.rating || 5.0).toFixed(1)}</span>
          <div>
            <div class="reviews-stars-visual">${starsHtml}</div>
            <span class="reviews-count-caption">${doc.reviewsCount || 25} avaliações</span>
          </div>
        </div>
        <span class="reviews-rec-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          100% Recomendado
        </span>
      </div>

      <div class="doctor-reviews-stream">
        ${reviews.map(rev => `
          <div class="review-mini-card">
            <div class="review-card-head">
              <div class="review-patient-meta">
                ${rev.avatar ? `
                  <img src="${rev.avatar}" alt="${rev.name}" class="review-avatar-thumb">
                ` : `
                  <div class="review-avatar-placeholder">${rev.name.charAt(0)}</div>
                `}
                <div class="review-names-col">
                  <span class="review-patient-name">${rev.name}</span>
                  <span class="review-date-text">${rev.date}</span>
                </div>
              </div>
              <span class="review-modality-pill">${rev.modality || "Consulta"}</span>
            </div>
            <p class="review-comment-p">"${rev.comment}"</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  // ==========================================================================
  // MODAL DE HISTÓRICO COMPLETO DE CONSULTAS (FACILITADO)
  // ==========================================================================
  const historyModalBackdrop = document.getElementById("history-modal-backdrop");

  function openHistoryModal(filter = 'todas') {
    if (!historyModalBackdrop) return;

    const listContainer = document.getElementById("history-appointments-list");
    if (!listContainer) return;

    const allApts = loadDoctorAppointments(currentDoctor.id);

    listContainer.innerHTML = allApts.map((apt, i) => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 1rem; border-bottom: 1px solid #f1f5f9; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: #e0f2fe; color: #028090; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 0.85rem;">
            ${apt.patientName.charAt(0)}
          </div>
          <div>
            <strong style="font-size: 0.9rem; color: #0f172a; display: block;">${apt.patientName}</strong>
            <span style="font-size: 0.775rem; color: #64748b;">${apt.phone} • <strong style="color: #028090;">${apt.modality}</strong></span>
          </div>
        </div>

        <div style="text-align: right;">
          <span style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">${apt.date} às ${apt.time}</span>
          <div style="margin-top: 0.2rem;">
            <span class="status-badge-pill ${apt.status === 'Em andamento' ? 'status-in-progress' : 'status-confirmed'}">
              ${apt.status}
            </span>
          </div>
        </div>
      </div>
    `).join("");

    historyModalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeHistoryModal() {
    if (!historyModalBackdrop) return;
    historyModalBackdrop.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  historyModalBackdrop?.addEventListener("click", (e) => {
    if (e.target === historyModalBackdrop) closeHistoryModal();
  });

  document.getElementById("btn-close-history-modal")?.addEventListener("click", closeHistoryModal);

  // ==========================================================================
  // MODAL DE PRONTUÁRIO ELETRÔNICO
  // ==========================================================================
  const modalBackdrop = document.getElementById("record-modal-backdrop");
  
  function openRecordModal(patientName, reason, phone) {
    if (!modalBackdrop) return;

    document.getElementById("modal-record-patient-name").innerText = patientName;
    document.getElementById("modal-record-patient-phone").innerText = phone || "(71) 99842-1102";
    document.getElementById("modal-record-reason").innerText = reason;
    document.getElementById("modal-record-doctor").innerText = currentDoctor.name;

    modalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeRecordModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  modalBackdrop?.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeRecordModal();
  });

  document.getElementById("btn-close-record-modal")?.addEventListener("click", closeRecordModal);

  window.DoctorSmartPanel = {
    openRecordModal,
    closeRecordModal,
    openHistoryModal,
    closeHistoryModal
  };
});
