/**
 * Doctor Smart - Lógica Dinâmica da Página de Perfil do Médico
 * Fiel ao design oficial da plataforma
 */

document.addEventListener("DOMContentLoaded", () => {
  // Obter ID do Médico da URL (?id=...)
  const urlParams = new URLSearchParams(window.location.search);
  const doctorId = urlParams.get("id") || (DOCTORS_DATA.length > 0 ? DOCTORS_DATA[0].id : null);

  const doc = DOCTORS_DATA.find(d => d.id === doctorId) || DOCTORS_DATA[0];

  if (!doc) {
    window.location.href = "index.html";
    return;
  }

  // Estado Local
  const state = {
    doctor: doc,
    modality: "presencial",
    selectedDate: null,
    selectedSlot: null,
    currentMonth: 7, // 0-indexed: 7 = Agosto
    currentYear: 2026
  };

  const availableDateKeys = Object.keys(doc.slots || {});
  state.selectedDate = availableDateKeys.length > 0 ? availableDateKeys[0] : "2026-08-26";

  // ==========================================================================
  // RENDERIZAÇÃO DOS DADOS PRINCIPAIS DO MÉDICO
  // ==========================================================================
  function renderDoctorData() {
    // Título da Página e Breadcrumbs
    document.title = `${doc.name} · Doctor Smart`;
    const docNameBreadcrumb = document.getElementById("breadcrumb-doc-name");
    if (docNameBreadcrumb) docNameBreadcrumb.innerText = doc.name;

    const specBreadcrumb = document.getElementById("breadcrumb-specialty");
    if (specBreadcrumb && doc.specialties) specBreadcrumb.innerText = doc.specialties[0];

    // Badge Hero
    const heroBadgeSpec = document.getElementById("doc-hero-badge-spec");
    if (heroBadgeSpec && doc.specialties) heroBadgeSpec.innerText = doc.specialties[0];

    // Avatar do Médico
    const avatarEl = document.getElementById("doc-profile-avatar");
    if (avatarEl) {
      avatarEl.src = doc.photo;
      avatarEl.alt = doc.name;
    }

    // Nome e CRM
    const nameEl = document.getElementById("doc-profile-name");
    if (nameEl) {
      nameEl.innerHTML = `
        ${doc.name}
        <span class="verified-icon" title="Profissional Verificado pelo CRM">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </span>
      `;
    }

    const crmEl = document.getElementById("doc-profile-crm");
    if (crmEl) {
      crmEl.innerText = `${doc.crm || 'CRM-BA Verificado'} • ${doc.neighborhood ? doc.neighborhood + ', ' : ''}${doc.city} - ${doc.state}`;
    }

    // Avaliações do Header
    const starsEl = document.getElementById("doc-profile-stars");
    if (starsEl) {
      starsEl.innerHTML = `
        <div class="stars-gold">
          ${renderStarsOnly(doc.rating)}
        </div>
        <span class="rating-count-text"><strong>${(doc.rating || 5.0).toFixed(1)}</strong> (${doc.reviewsCount || 1} Avaliações)</span>
      `;
    }

    // Link do WhatsApp
    const waBtn = document.getElementById("btn-doc-whatsapp");
    if (waBtn) {
      const msg = encodeURIComponent(`Olá, gostaria de agendar uma consulta com ${doc.name} através da Doctor Smart.`);
      waBtn.href = `https://wa.me/5571992723206?text=${msg}`;
    }

    // Card de Especialidades & Serviços
    const specTitle = document.getElementById("doc-card-specialty-title");
    if (specTitle && doc.specialties) specTitle.innerText = doc.specialties.join(" & ");

    const expDesc = document.getElementById("doc-experience-desc");
    if (expDesc) expDesc.innerText = doc.experience || "Atendimento especializado com metodologia baseada em evidências científicas e foco integral no paciente.";

    // Convênios
    const insWrap = document.getElementById("doc-insurances-badge-wrap");
    if (insWrap) {
      const insurances = doc.insurances || ["Particular"];
      insWrap.innerHTML = insurances.map(ins => `
        <span class="insurance-pill" style="font-size: 0.8rem; padding: 0.25rem 0.65rem;">${ins}</span>
      `).join("");
    }

    // Preços
    const bookingPrice = document.getElementById("booking-footer-price");
    if (bookingPrice) bookingPrice.innerText = doc.price || "R$ 280,00";

    // Dropdown Localização
    const locOption = document.getElementById("doc-location-option-text");
    if (locOption) locOption.innerText = `${doc.address} (${doc.city} - ${doc.state})`;

    const miniLoc = document.getElementById("mini-location-address");
    if (miniLoc) miniLoc.innerText = doc.address || `${doc.city} - ${doc.state}`;

    // Seção Escura: Biografia e Informações
    const darkBio = document.getElementById("dark-bio-text");
    if (darkBio) darkBio.innerText = doc.bio || `${doc.name} é médico especialista atuante em ${doc.city} - BA, prestando atendimento qualificado e acolhedor para pacientes de todas as idades.`;

    const darkAddress = document.getElementById("dark-address-text");
    if (darkAddress) darkAddress.innerText = `${doc.address}, ${doc.city} - ${doc.state}. Consultório de fácil acesso com segurança e recepção climatizada.`;

    // Mapa
    const mapFrame = document.getElementById("map-embed-frame");
    if (mapFrame && doc.address) {
      const q = encodeURIComponent(`${doc.address}, ${doc.city}, Bahia, Brasil`);
      mapFrame.src = `https://maps.google.com/maps?q=${q}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }

    // Avaliações Detalhadas
    const bigScore = document.getElementById("score-big-number");
    if (bigScore) bigScore.innerText = (doc.rating || 5.0).toFixed(1);

    const scoreStars = document.getElementById("score-stars-gold");
    if (scoreStars) scoreStars.innerHTML = renderStarsOnly(doc.rating);

    const totalText = document.getElementById("score-total-text");
    if (totalText) {
      const c = doc.reviewsCount || 1;
      totalText.innerText = `${c} avaliaç${c === 1 ? 'ão' : 'ões'} verificada${c === 1 ? '' : 's'}`;
    }

    // Formação Acadêmica
    const darkEdu = document.getElementById("dark-education-list");
    const miniEdu = document.getElementById("mini-education-list");
    const eduItems = doc.education && doc.education.length > 0 ? doc.education : [
      `Graduação em Medicina com registro ativo no ${doc.crm ? doc.crm.split('/')[0] : 'CRM-BA'}.`,
      `Residência Médica em ${doc.specialties ? doc.specialties[0] : 'Medicina'}.`,
      `Membro Titular de Sociedades de Especialistas e Registro de Especialista (RQE).`
    ];

    if (darkEdu) {
      darkEdu.innerHTML = eduItems.map(item => `<li>${item}</li>`).join("");
    }
    if (miniEdu) {
      miniEdu.innerHTML = eduItems.map(item => `<li>${item}</li>`).join("");
    }

    // Depoimentos
    renderTestimonials();

    // Renderizar Calendário e Slots
    renderCalendar();
    renderSlots();
  }

  // ==========================================================================
  // RENDERIZADOR DE ESTRELAS SVG
  // ==========================================================================
  function renderStarsOnly(rating) {
    const starSvg = (color) => `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="${color}" stroke="${color}" stroke-width="1" style="vertical-align: middle;">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    `;

    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += starSvg(i <= Math.round(rating || 5) ? "#f59e0b" : "#cbd5e1");
    }
    return html;
  }

  // ==========================================================================
  // DEPOIMENTOS DE PACIENTES COM CARROSSEL VERTICAL INFINITO (MOTION MARQUEE)
  // ==========================================================================
  function renderTestimonials() {
    const list = document.getElementById("testimonials-list-box");
    if (!list) return;

    const baseReviews = (doc.patientReviews && doc.patientReviews.length > 0) ? doc.patientReviews : [
      {
        name: "Juliana Mendes Castro",
        date: "24 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
        comment: "Excelente atendimento! Médico muito atencioso, explicou o diagnóstico com calma e tirou todas as dúvidas. O agendamento pela Doctor Smart foi super rápido."
      },
      {
        name: "Rodrigo Barreto Santana",
        date: "18 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
        comment: "Consultório moderno, pontualidade britânica e um profissional humano e extremamente competente. Recomendo de olhos fechados."
      }
    ];

    // Duplicar o array para loop contínuo infinito (-50%)
    const loopedReviews = [...baseReviews, ...baseReviews];

    const cardsHtml = loopedReviews.map((rev, idx) => {
      const avatarHtml = rev.avatar
        ? `<img src="${rev.avatar}" alt="${rev.name}" class="author-circle-avatar" onerror="this.outerHTML='<div class=\\'author-circle-initial\\'>${rev.name.charAt(0)}</div>'">`
        : `<div class="author-circle-initial">${rev.name.charAt(0)}</div>`;

      return `
        <div class="testimonial-motion-card" key="t-${idx}">
          <div class="testimonial-author-row">
            <div class="author-left-info">
              ${avatarHtml}
              <div class="author-meta-block">
                <span class="author-name-text">
                  ${rev.name}
                  <span class="verified-tag-label" title="Paciente com consulta realizada e avaliada">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Paciente Verificado
                  </span>
                </span>
                <span class="author-date-text">${rev.date} • <strong style="color: #028090;">${rev.modality || 'Consulta Realizada'}</strong></span>
              </div>
            </div>
            <div class="stars-gold">
              ${renderStarsOnly(rev.rating || 5)}
            </div>
          </div>
          <p class="testimonial-quote">"${rev.comment || rev.text}"</p>
        </div>
      `;
    }).join("");

    list.innerHTML = `
      <div class="testimonials-marquee-viewport" title="Passe o mouse para pausar a rolagem">
        <div class="testimonials-marquee-track">
          ${cardsHtml}
        </div>
      </div>
      <div class="testimonials-hint-footer">
        <span>✨ Feedbacks reais de pacientes atendidos pela Doctor Smart</span>
        <span>⏸️ Passe o mouse sobre os depoimentos para pausar</span>
      </div>
    `;
  }

  // ==========================================================================
  // CONTROLE DO MINI-CALENDÁRIO INTERATIVO
  // ==========================================================================
  const calTitleText = document.getElementById("cal-title-text");
  const calDaysTable = document.getElementById("cal-days-table");
  const btnCalPrev = document.getElementById("cal-btn-prev");
  const btnCalNext = document.getElementById("cal-btn-next");
  const slotDateHeading = document.getElementById("slot-selected-date-heading");
  const slotsButtonList = document.getElementById("slots-button-list");
  const btnTriggerBooking = document.getElementById("btn-trigger-booking");

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  function getActiveSlotsMap() {
    // 1. Tentar ler slots customizados salvos pelo médico no Painel SaaS
    const customSaved = localStorage.getItem(`doctor_smart_custom_slots_${doc.id}`);
    if (customSaved) {
      try {
        const parsed = JSON.parse(customSaved);
        if (state.modality === "teleconsulta" && parsed.teleconsulta && Object.keys(parsed.teleconsulta).length > 0) {
          return parsed.teleconsulta;
        }
        if (state.modality === "presencial" && parsed.presencial && Object.keys(parsed.presencial).length > 0) {
          return parsed.presencial;
        }
      } catch (e) {
        console.error("Erro ao ler slots sincronizados:", e);
      }
    }

    // 2. Fallback para os slots nativos do médico
    if (state.modality === "teleconsulta") {
      return doc.slotsTeleconsulta || doc.slots || {
        "2026-08-26": ["11:30", "14:30", "17:30", "18:30", "19:00"],
        "2026-08-27": ["10:00", "12:30", "18:00", "19:30"],
        "2026-08-28": ["11:00", "16:30", "18:00"]
      };
    }
    return doc.slotsPresencial || doc.slots || {
      "2026-08-26": ["08:30", "09:30", "10:30", "11:33", "14:30", "16:30"],
      "2026-08-27": ["08:30", "09:30", "11:00", "14:30", "16:00"],
      "2026-08-28": ["09:00", "10:30", "14:00", "15:30", "17:00"]
    };
  }

  function renderCalendar() {
    if (!calDaysTable) return;

    if (calTitleText) {
      calTitleText.innerText = `${monthNames[state.currentMonth]} ${state.currentYear}`;
    }

    const currentSlots = getActiveSlotsMap();

    // Limpar dias anteriores mantendo os 7 cabeçalhos (Seg..Dom)
    const headers = `
      <div class="cal-day-header">Seg</div>
      <div class="cal-day-header">Ter</div>
      <div class="cal-day-header">Qua</div>
      <div class="cal-day-header">Qui</div>
      <div class="cal-day-header">Sex</div>
      <div class="cal-day-header">Sáb</div>
      <div class="cal-day-header">Dom</div>
    `;

    // Primeiro dia do mês (0 = Domingo, 1 = Segunda...)
    const firstDay = new Date(state.currentYear, state.currentMonth, 1).getDay();
    // Converter para Segunda = 0, Domingo = 6
    const startCol = (firstDay === 0 ? 6 : firstDay - 1);

    // Total de dias no mês
    const totalDays = new Date(state.currentYear, state.currentMonth + 1, 0).getDate();

    let daysHtml = headers;

    // Células vazias antes do primeiro dia
    for (let i = 0; i < startCol; i++) {
      daysHtml += `<div class="cal-day-cell disabled"></div>`;
    }

    // Dias do mês
    for (let day = 1; day <= totalDays; day++) {
      const monthStr = String(state.currentMonth + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      const dateKey = `${state.currentYear}-${monthStr}-${dayStr}`;

      const isAvailable = Boolean(currentSlots && currentSlots[dateKey] && currentSlots[dateKey].length > 0);
      const isSelected = dateKey === state.selectedDate;

      let classes = "cal-day-cell";
      if (isAvailable) classes += " available";
      if (isSelected) classes += " selected";
      if (!isAvailable) classes += " disabled";

      daysHtml += `
        <div class="${classes}" data-date="${dateKey}">
          ${day}
        </div>
      `;
    }

    calDaysTable.innerHTML = daysHtml;

    // Adicionar eventos nos dias disponíveis
    calDaysTable.querySelectorAll(".cal-day-cell.available").forEach(cell => {
      cell.addEventListener("click", () => {
        const d = cell.getAttribute("data-date");
        selectDate(d);
      });
    });
  }

  function selectDate(dateKey) {
    state.selectedDate = dateKey;
    state.selectedSlot = null;

    if (btnTriggerBooking) btnTriggerBooking.disabled = true;

    renderCalendar();
    renderSlots();
  }

  function renderSlots() {
    if (!slotsButtonList) return;

    // Atualizar cabeçalho da data selecionada
    if (slotDateHeading && state.selectedDate) {
      const [y, m, d] = state.selectedDate.split("-");
      const dateObj = new Date(y, m - 1, d);
      const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
      const wName = weekDays[dateObj.getDay()];
      slotDateHeading.innerText = `${wName}, ${d} ${monthNames[parseInt(m) - 1].substring(0, 3)} (${state.modality === 'teleconsulta' ? 'Teleconsulta' : 'Presencial'})`;
    }

    const currentSlots = getActiveSlotsMap();
    const slots = (currentSlots && currentSlots[state.selectedDate]) ? currentSlots[state.selectedDate] : [];

    if (slots.length === 0) {
      slotsButtonList.innerHTML = `
        <p style="color: #94a3b8; font-size: 0.85rem; padding: 1rem 0; text-align: center;">
          Nenhum horário disponível para ${state.modality === 'teleconsulta' ? 'Teleconsulta' : 'Consulta Presencial'} nesta data. Selecione outro dia em destaque no calendário.
        </p>
      `;
      return;
    }

    slotsButtonList.innerHTML = slots.map(slot => `
      <button type="button" class="slot-item-btn ${state.selectedSlot === slot ? 'active' : ''}" data-slot="${slot}">
        <span>${slot}</span>
        <span class="badge-avail">${state.modality === 'teleconsulta' ? 'Online Vídeo' : 'Consultório'}</span>
      </button>
    `).join("");

    slotsButtonList.querySelectorAll(".slot-item-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const s = btn.getAttribute("data-slot");
        selectSlot(s);
      });
    });
  }

  function selectSlot(slot) {
    state.selectedSlot = slot;

    slotsButtonList.querySelectorAll(".slot-item-btn").forEach(btn => {
      if (btn.getAttribute("data-slot") === slot) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    if (btnTriggerBooking) {
      btnTriggerBooking.disabled = false;
    }
  }

  // Navegação do Mês
  btnCalPrev?.addEventListener("click", () => {
    state.currentMonth--;
    if (state.currentMonth < 0) {
      state.currentMonth = 11;
      state.currentYear--;
    }
    renderCalendar();
  });

  btnCalNext?.addEventListener("click", () => {
    state.currentMonth++;
    if (state.currentMonth > 11) {
      state.currentMonth = 0;
      state.currentYear++;
    }
    renderCalendar();
  });

  // Alternador de Modalidade
  const tabPresencial = document.getElementById("tab-opt-presencial");
  const tabTele = document.getElementById("tab-opt-tele");

  tabPresencial?.addEventListener("click", () => {
    state.modality = "presencial";
    tabPresencial.classList.add("active");
    tabTele?.classList.remove("active");
    const activeSlots = getActiveSlotsMap();
    const dates = Object.keys(activeSlots);
    if (dates.length > 0 && !activeSlots[state.selectedDate]) {
      state.selectedDate = dates[0];
    }
    state.selectedSlot = null;
    if (btnTriggerBooking) btnTriggerBooking.disabled = true;
    renderCalendar();
    renderSlots();
  });

  tabTele?.addEventListener("click", () => {
    state.modality = "teleconsulta";
    tabTele.classList.add("active");
    tabPresencial?.classList.remove("active");
    const activeSlots = getActiveSlotsMap();
    const dates = Object.keys(activeSlots);
    if (dates.length > 0 && !activeSlots[state.selectedDate]) {
      state.selectedDate = dates[0];
    }
    state.selectedSlot = null;
    if (btnTriggerBooking) btnTriggerBooking.disabled = true;
    renderCalendar();
    renderSlots();
  });

  // ==========================================================================
  // MODAL DE CONFIRMAÇÃO DE AGENDAMENTO
  // ==========================================================================
  const modalPopup = document.getElementById("modal-booking-popup");
  const modalBody = document.getElementById("modal-booking-dynamic-body");
  const modalCloseBtn = document.getElementById("modal-booking-close");

  btnTriggerBooking?.addEventListener("click", openBookingModal);
  modalCloseBtn?.addEventListener("click", closeBookingModal);

  modalPopup?.addEventListener("click", (e) => {
    if (e.target === modalPopup) closeBookingModal();
  });

  function openBookingModal() {
    if (!state.selectedSlot || !state.selectedDate) return;

    const [year, month, day] = state.selectedDate.split("-");

    modalBody.innerHTML = `
      <div style="padding: 2rem;">
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #0f172a; margin-bottom: 0.35rem;">
          Confirmar Agendamento de Consulta
        </h2>
        <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1.25rem;">
          Revise os detalhes da consulta e preencha os dados do paciente.
        </p>

        <!-- Resumo -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b;">Médico:</span>
            <strong style="color: #0f172a;">${doc.name}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b;">Especialidade:</span>
            <strong style="color: #028090;">${doc.specialties[0]}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b;">Modalidade:</span>
            <strong style="color: #2563eb;">${state.modality === 'presencial' ? 'Consulta Presencial' : 'Teleconsulta Online'}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b;">Data & Horário:</span>
            <strong style="color: #0f172a;">${day}/${month}/${year} às ${state.selectedSlot}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 0.5rem; margin-top: 0.25rem;">
            <span style="color: #64748b;">Valor da Consulta:</span>
            <strong style="color: #059669; font-size: 1.1rem;">${doc.price}</strong>
          </div>
        </div>

        <!-- Formulário -->
        <form id="profile-booking-form" style="display: flex; flex-direction: column; gap: 0.85rem;">
          <div>
            <label style="display: block; font-size: 0.825rem; font-weight: 600; color: #334155; margin-bottom: 0.25rem;">
              Nome Completo do Paciente *
            </label>
            <input type="text" id="patient-name-input" required placeholder="Ex: Lucas de Oliveira" style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem;">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div>
              <label style="display: block; font-size: 0.825rem; font-weight: 600; color: #334155; margin-bottom: 0.25rem;">
                WhatsApp / Telefone *
              </label>
              <input type="tel" id="patient-phone-input" required placeholder="(71) 99999-9999" value="(71) 9" style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem;">
            </div>
            <div>
              <label style="display: block; font-size: 0.825rem; font-weight: 600; color: #334155; margin-bottom: 0.25rem;">
                Convênio
              </label>
              <select id="patient-plan-select" style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; background: #fff;">
                <option value="Particular">Particular</option>
                ${(doc.insurances || []).filter(i => i !== 'Particular').map(ins => `<option value="${ins}">${ins}</option>`).join("")}
              </select>
            </div>
          </div>

          <div style="margin-top: 1rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button type="button" class="btn-login" id="btn-cancel-booking-modal">
              Voltar
            </button>
            <button type="submit" class="btn-register" style="padding: 0.65rem 1.5rem;">
              Confirmar Agendamento
            </button>
          </div>
        </form>
      </div>
    `;

    modalPopup.classList.add("active");
    document.body.style.overflow = "hidden";

    document.getElementById("btn-cancel-booking-modal")?.addEventListener("click", closeBookingModal);

    document.getElementById("profile-booking-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const pName = document.getElementById("patient-name-input").value;
      const pPhone = document.getElementById("patient-phone-input").value;
      const pPlan = document.getElementById("patient-plan-select").value;
      showSuccessState(pName, pPhone, pPlan);
    });
  }

  function showSuccessState(patientName, patientPhone, plan) {
    const [year, month, day] = state.selectedDate.split("-");

    // Salvar agendamento no localStorage para sincronização com o Painel do Médico
    try {
      const existing = JSON.parse(localStorage.getItem("doctor_smart_appointments") || "[]");
      existing.unshift({
        doctorId: doc.id,
        doctorName: doc.name,
        patientName: patientName,
        patientPhone: patientPhone,
        plan: plan,
        type: state.modality,
        date: `${day}/${month}/${year}`,
        time: state.selectedSlot,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("doctor_smart_appointments", JSON.stringify(existing));
    } catch(e) {
      console.warn("Falha ao salvar no localStorage", e);
    }

    modalBody.innerHTML = `
      <div style="padding: 2.5rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: #ecfdf5; color: #059669; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h2 style="font-size: 1.4rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;">
          Agendamento Confirmado!
        </h2>
        <p style="color: #64748b; font-size: 0.9rem; max-width: 460px; line-height: 1.5;">
          Parabéns, <strong>${patientName}</strong>! Sua consulta com <strong>${doc.name}</strong> foi agendada para <strong>${day}/${month}/${year} às ${state.selectedSlot}</strong>.
        </p>

        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem 1.25rem; text-align: left; width: 100%; margin: 1.25rem 0; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.35rem;">
          <p><strong>Modalidade:</strong> ${state.modality === 'presencial' ? 'Presencial no Consultório' : 'Teleconsulta Online'}</p>
          <p><strong>Plano/Convênio:</strong> ${plan}</p>
          <p><strong>Endereço:</strong> ${doc.address}</p>
          <p><strong>Comprovante:</strong> Enviado via WhatsApp para ${patientPhone}</p>
        </div>

        <button type="button" class="btn-card-schedule" id="btn-done-modal" style="padding: 0.75rem 2rem; font-size: 0.95rem;">
          Concluir
        </button>
      </div>
    `;

    document.getElementById("btn-done-modal")?.addEventListener("click", closeBookingModal);
  }

  function closeBookingModal() {
    modalPopup.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Inicializar
  renderDoctorData();
});
