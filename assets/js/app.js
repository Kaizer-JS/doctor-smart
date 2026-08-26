/**
 * Doctor Smart - Lógica da Aplicação Web
 * Busca em tempo real, filtros dinâmicos, renderização de cards, agenda interativa e agendamento
 */

document.addEventListener("DOMContentLoaded", () => {
  // Estado da Aplicação
  const state = {
    searchQuery: "",
    modality: "all", // "all", "in_person", "teleconsultation"
    selectedSpecialties: new Set(),
    selectedCities: new Set(),
    selectedInsurances: new Set(),
    sortBy: "relevance",
    activeDoctor: null,
    selectedDate: null,
    selectedSlot: null
  };

  // Helper para parsing de preço
  function parsePrice(priceStr) {
    if (!priceStr) return 0;
    const clean = priceStr.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(clean) || 0;
  }

  // Algoritmo de Ranqueamento e Ordenação
  function getSortedDoctors(list) {
    return list.slice().sort((a, b) => {
      if (state.sortBy === "rating_desc") {
        return (b.rating || 5.0) - (a.rating || 5.0) || (b.reviewsCount || 0) - (a.reviewsCount || 0);
      }
      if (state.sortBy === "reviews_desc") {
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      }
      if (state.sortBy === "price_asc") {
        return parsePrice(a.price) - parsePrice(b.price);
      }
      if (state.sortBy === "price_desc") {
        return parsePrice(b.price) - parsePrice(a.price);
      }
      if (state.sortBy === "name_asc") {
        return a.name.localeCompare(b.name, 'pt-BR');
      }
      // Padrão: Relevância / Doctor Smart Score (Dr. Jean como conta teste oficial de destaque)
      if (a.id === "dr-jean-teste") return -1;
      if (b.id === "dr-jean-teste") return 1;
      const scoreA = ((a.rating || 5.0) * 10) + ((a.reviewsCount || 1) * 1.2);
      const scoreB = ((b.rating || 5.0) * 10) + ((b.reviewsCount || 1) * 1.2);
      return scoreB - scoreA;
    });
  }

  // Elementos do DOM
  const searchInput = document.getElementById("search-input");
  const modalityButtons = document.querySelectorAll(".btn-modality");
  const doctorsListContainer = document.getElementById("doctors-list-container");
  const countBadge = document.getElementById("results-count-badge");
  const resetFiltersBtn = document.getElementById("btn-reset-filters");
  
  // Elementos de Acordeon
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  const specialtiesContainer = document.getElementById("specialties-filter-list");
  const citiesContainer = document.getElementById("cities-filter-list");
  const insurancesContainer = document.getElementById("insurances-filter-list");

  // Elementos dos Modais
  const doctorModal = document.getElementById("doctor-modal");
  const doctorModalContent = document.getElementById("doctor-modal-content");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  const bookingModal = document.getElementById("booking-modal");
  const bookingModalContent = document.getElementById("booking-modal-content");
  const bookingCloseBtn = document.getElementById("booking-close-btn");

  // Inicializar Filtros nas Sanfonas
  function initFilterLists() {
    // Especialidades
    if (specialtiesContainer) {
      specialtiesContainer.innerHTML = SPECIALTIES_LIST.map(spec => `
        <label class="checkbox-option">
          <input type="checkbox" value="${spec}" class="filter-checkbox-specialty">
          <span>${spec}</span>
        </label>
      `).join("");
    }

    // Cidades
    if (citiesContainer) {
      citiesContainer.innerHTML = CITIES_LIST.map(city => `
        <label class="checkbox-option">
          <input type="checkbox" value="${city}" class="filter-checkbox-city">
          <span>${city}</span>
        </label>
      `).join("");
    }

    // Convênios
    if (insurancesContainer) {
      insurancesContainer.innerHTML = INSURANCES_LIST.map(ins => `
        <label class="checkbox-option">
          <input type="checkbox" value="${ins}" class="filter-checkbox-insurance">
          <span>${ins}</span>
        </label>
      `).join("");
    }

    // Eventos dos Checkboxes
    document.querySelectorAll(".filter-checkbox-specialty").forEach(cb => {
      cb.addEventListener("change", (e) => {
        if (e.target.checked) state.selectedSpecialties.add(e.target.value);
        else state.selectedSpecialties.delete(e.target.value);
        renderDoctors();
      });
    });

    document.querySelectorAll(".filter-checkbox-city").forEach(cb => {
      cb.addEventListener("change", (e) => {
        if (e.target.checked) state.selectedCities.add(e.target.value);
        else state.selectedCities.delete(e.target.value);
        renderDoctors();
      });
    });

    document.querySelectorAll(".filter-checkbox-insurance").forEach(cb => {
      cb.addEventListener("change", (e) => {
        if (e.target.checked) state.selectedInsurances.add(e.target.value);
        else state.selectedInsurances.delete(e.target.value);
        renderDoctors();
      });
    });
  }

  // Controle dos Acordeons
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const parent = header.closest(".accordion-item");
      parent.classList.toggle("open");
    });
  });

  // Filtro de Busca com Debounce
  let debounceTimeout;
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        renderDoctors();
      }, 200);
    });
  }

  // Filtro de Modalidade (Presencial / Teleconsulta / Todos)
  modalityButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetType = btn.getAttribute("data-modality");
      
      if (state.modality === targetType) {
        state.modality = "all";
      } else {
        state.modality = targetType;
      }

      modalityButtons.forEach(b => {
        const bType = b.getAttribute("data-modality");
        if (bType === state.modality) {
          b.classList.add("active");
        } else {
          b.classList.remove("active");
        }
      });

      renderDoctors();
    });
  });

  // Botão Limpar Filtros
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      state.searchQuery = "";
      state.modality = "all";
      state.selectedSpecialties.clear();
      state.selectedCities.clear();
      state.selectedInsurances.clear();

      if (searchInput) searchInput.value = "";
      modalityButtons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".filter-checkbox-specialty, .filter-checkbox-city, .filter-checkbox-insurance")
        .forEach(cb => cb.checked = false);

      renderDoctors();
    });
  }

  // Listener para ordenação
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderDoctors();
    });
  }

  // Renderizar Estrelas SVG
  function renderStars(rating, reviewsCount) {
    const starSvg = (color) => `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="${color}" stroke="${color}" stroke-width="1" style="vertical-align: middle;">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    `;

    if (!reviewsCount || reviewsCount === 0) {
      return `
        <div class="doctor-rating">
          <div class="stars-group empty">
            ${starSvg("#cbd5e1")}${starSvg("#cbd5e1")}${starSvg("#cbd5e1")}${starSvg("#cbd5e1")}${starSvg("#cbd5e1")}
          </div>
          <span class="reviews-count">(0 Avaliações)</span>
        </div>
      `;
    }

    let starsHtml = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.round(rating)) {
        starsHtml += starSvg("#f59e0b");
      } else {
        starsHtml += starSvg("#cbd5e1");
      }
    }

    return `
      <div class="doctor-rating">
        <div class="stars-group">
          ${starsHtml}
        </div>
        <span class="reviews-count">(${reviewsCount} Avaliações)</span>
      </div>
    `;
  }

  // Filtrar Médicos
  function getFilteredDoctors() {
    const matched = DOCTORS_DATA.filter(doc => {
      // Busca Textual (Nome, Especialidades, CRM, Experiência)
      if (state.searchQuery) {
        const query = state.searchQuery;
        const nameMatch = doc.name.toLowerCase().includes(query);
        const specMatch = doc.specialties.some(s => s.toLowerCase().includes(query));
        const expMatch = doc.experience ? doc.experience.toLowerCase().includes(query) : false;
        const crmMatch = doc.crm ? doc.crm.toLowerCase().includes(query) : false;
        const cityMatch = doc.city ? doc.city.toLowerCase().includes(query) : false;

        if (!nameMatch && !specMatch && !expMatch && !crmMatch && !cityMatch) {
          return false;
        }
      }

      // Modalidade
      if (state.modality === "in_person" && !doc.tags.includes("presencial")) {
        return false;
      }
      if (state.modality === "teleconsultation" && !doc.tags.includes("teleconsulta")) {
        return false;
      }

      // Especialidades
      if (state.selectedSpecialties.size > 0) {
        const hasSpec = doc.specialties.some(s => state.selectedSpecialties.has(s));
        if (!hasSpec) return false;
      }

      // Cidades
      if (state.selectedCities.size > 0) {
        if (!state.selectedCities.has(doc.city)) return false;
      }

      // Convênios
      if (state.selectedInsurances.size > 0) {
        const hasIns = doc.insurances && doc.insurances.some(i => state.selectedInsurances.has(i));
        if (!hasIns) return false;
      }

      return true;
    });

    return getSortedDoctors(matched);
  }

  // Renderizar Lista de Cards de Médicos
  function renderDoctors() {
    const filtered = getFilteredDoctors();

    // Atualizar Contadores
    const resultsCountNum = document.getElementById("results-count-number");
    if (resultsCountNum) resultsCountNum.innerText = filtered.length;

    // Atualizar Contador
    if (countBadge) {
      const textProfissionais = filtered.length === 1 ? 'profissional encontrado' : 'profissionais encontrados';
      countBadge.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        ${filtered.length} ${textProfissionais}
      `;
    }

    // Se nenhum resultado
    if (filtered.length === 0) {
      doctorsListContainer.innerHTML = `
        <div class="no-results-box">
          <div class="no-results-icon">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h3>Nenhum profissional encontrado com os filtros atuais</h3>
          <p>Tente ajustar a busca por nome ou desmarcar alguns filtros na barra lateral para ver mais especialistas disponíveis.</p>
          <button type="button" class="btn-card-schedule" id="btn-clear-empty-results">
            Limpar todos os filtros
          </button>
        </div>
      `;

      document.getElementById("btn-clear-empty-results")?.addEventListener("click", () => {
        resetFiltersBtn.click();
      });
      return;
    }

    // Renderizar Cards
    doctorsListContainer.innerHTML = filtered.map(doc => {
      const hasPresencial = doc.tags.includes("presencial");
      const hasTele = doc.tags.includes("teleconsulta");

      return `
        <article class="doctor-card" data-doctor-id="${doc.id}">
          <!-- Foto e Avatar -->
          <div class="doctor-avatar-container" onclick="window.location.href='perfil-medico.html?id=${doc.id}'" style="cursor: pointer;" title="Ver perfil de ${doc.name}">
            <div class="doctor-avatar-wrapper">
              <img src="${doc.photo}" alt="${doc.name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400';">
            </div>
          </div>

          <!-- Corpo do Card -->
          <div class="doctor-card-body">
            <div>
              <div class="doctor-card-top">
                <div class="doctor-title-area">
                  <h2 class="doctor-name" onclick="window.location.href='perfil-medico.html?id=${doc.id}'" style="cursor: pointer;">
                    ${doc.name}
                    ${doc.verified ? `
                      <span class="icon-verified" title="Perfil Profissional Verificado">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </span>
                    ` : ''}
                  </h2>
                  <div class="doctor-crm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    ${doc.crm || 'Registro Profissional Verificado'}
                  </div>
                </div>

                ${renderStars(doc.rating, doc.reviewsCount)}
              </div>

              <!-- Badges de Modalidade -->
              <div class="doctor-badges" style="margin-top: 0.65rem;">
                ${hasPresencial ? `
                  <span class="badge-attendance presencial">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Consulta Presencial
                  </span>
                ` : ''}
                ${hasTele ? `
                  <span class="badge-attendance teleconsulta">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <rect width="18" height="12" x="3" y="4" rx="2"></rect>
                      <path d="M12 16v4"></path>
                      <path d="M8 20h8"></path>
                    </svg>
                    Teleconsulta
                  </span>
                ` : ''}
              </div>

              <!-- Linhas de Especialidade e Experiência -->
              <div style="margin-top: 0.65rem; display: flex; flex-direction: column; gap: 0.35rem;">
                <div class="doctor-info-line">
                  <span class="label">Especialidades</span>
                  <span class="value">${doc.specialties.join(", ")}</span>
                </div>
                ${doc.experience ? `
                  <div class="doctor-info-line">
                    <span class="label">Experiência</span>
                    <span class="value">${doc.experience}</span>
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- Rodapé do Card com Ações -->
            <div class="doctor-card-footer">
              <div class="doctor-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${doc.neighborhood ? `${doc.neighborhood}, ` : ''}${doc.city} - ${doc.state}</span>
                <span style="margin: 0 0.35rem; color: #cbd5e1;">•</span>
                <span style="font-weight: 600; color: #028090;">${doc.price}</span>
              </div>

              <div class="doctor-card-actions">
                <a href="perfil-medico.html?id=${doc.id}" class="btn-card-profile">
                  Ver perfil
                </a>
                <button type="button" class="btn-card-schedule" onclick="window.DoctorSmartApp.openDoctorModal('${doc.id}', true)">
                  Agende agora sua consulta
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // ==========================================================================
  // MODAL DE PERFIL DO MÉDICO & AGENDA INTERATIVA
  // ==========================================================================
  function openDoctorModal(doctorId, autoScrollToBooking = false) {
    const doc = DOCTORS_DATA.find(d => d.id === doctorId);
    if (!doc) return;

    state.activeDoctor = doc;
    const availableDates = Object.keys(doc.slotsPresencial || doc.slots || {});
    state.selectedDate = availableDates.length > 0 ? availableDates[0] : null;
    state.selectedSlot = null;

    doctorModalContent.innerHTML = `
      <div class="modal-doctor-header">
        <div class="modal-avatar-wrapper">
          <img src="${doc.photo}" alt="${doc.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400';">
        </div>
        <div class="modal-doctor-details">
          <h2>${doc.name}</h2>
          <div class="crm">${doc.crm} • ${doc.city} - ${doc.state}</div>
          <div style="margin-top: 0.5rem;">
            ${renderStars(doc.rating, doc.reviewsCount)}
          </div>
        </div>
      </div>

      <div class="modal-body-content">
        <!-- Biografia e Apresentação -->
        <div>
          <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--navy-900); margin-bottom: 0.4rem;">
            Sobre o Profissional
          </h3>
          <p style="color: #475569; font-size: 0.9rem; line-height: 1.6;">
            ${doc.bio || doc.experience}
          </p>
        </div>

        <!-- Informações de Atendimento -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0;">
          <div>
            <span style="font-size: 0.8rem; color: #64748b; font-weight: 600; text-transform: uppercase;">Local do Consultório</span>
            <p style="font-size: 0.875rem; font-weight: 600; color: #1e293b; margin-top: 0.2rem;">
              ${doc.address}
            </p>
          </div>
          <div>
            <span style="font-size: 0.8rem; color: #64748b; font-weight: 600; text-transform: uppercase;">Valor da Consulta</span>
            <p style="font-size: 0.95rem; font-weight: 700; color: #028090; margin-top: 0.2rem;">
              ${doc.price}
            </p>
          </div>
          <div>
            <span style="font-size: 0.8rem; color: #64748b; font-weight: 600; text-transform: uppercase;">Convênios Aceitos</span>
            <p style="font-size: 0.875rem; color: #1e293b; margin-top: 0.2rem;">
              ${doc.insurances ? doc.insurances.join(", ") : 'Particular'}
            </p>
          </div>
        </div>

        <!-- Seção de Agenda Interativa -->
        <div class="booking-section" id="booking-slots-section">
          <h3 class="booking-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
              <line x1="16" x2="16" y1="2" y2="6"></line>
              <line x1="8" x2="8" y1="2" y2="6"></line>
              <line x1="3" x2="21" y1="10" y2="10"></line>
            </svg>
            Selecione o Dia e Horário para sua Consulta
          </h3>

          <!-- Pílulas de Data -->
          <div class="date-selector-row" id="modal-dates-row">
            ${availableDates.map((dateStr, idx) => {
              const [year, month, day] = dateStr.split("-");
              const dateObj = new Date(year, month - 1, day);
              const weekDay = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][dateObj.getDay()];
              return `
                <button type="button" class="date-pill ${idx === 0 ? 'active' : ''}" data-date="${dateStr}" onclick="window.DoctorSmartApp.selectDate('${dateStr}')">
                  <div>${weekDay}</div>
                  <div style="font-size: 1.05rem;">${day}/${month}</div>
                </button>
              `;
            }).join("")}
          </div>

          <!-- Slots de Horários -->
          <div style="margin-top: 1rem;">
            <span style="font-size: 0.85rem; font-weight: 600; color: #475569; display: block; margin-bottom: 0.5rem;">
              Horários disponíveis:
            </span>
            <div class="time-slots-grid" id="modal-slots-grid">
              ${renderTimeSlots(doc, state.selectedDate)}
            </div>
          </div>

          <!-- Botão de Prosseguir -->
          <div style="margin-top: 1.5rem; text-align: right;">
            <button type="button" class="btn-card-schedule" id="btn-proceed-booking" style="padding: 0.75rem 2rem; font-size: 0.95rem;" disabled>
              Continuar Agendamento
            </button>
          </div>
        </div>
      </div>
    `;

    doctorModal.classList.add("active");
    document.body.style.overflow = "hidden";

    if (autoScrollToBooking) {
      setTimeout(() => {
        document.getElementById("booking-slots-section")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }

  function renderTimeSlots(doc, dateStr) {
    const slotsMap = doc.slotsPresencial || doc.slots || {};
    if (!doc || !dateStr || !slotsMap[dateStr]) {
      return `<p style="color: #94a3b8; font-size: 0.875rem;">Nenhum horário disponível nesta data.</p>`;
    }

    const slots = slotsMap[dateStr];
    return slots.map(slot => `
      <button type="button" class="slot-btn" data-slot="${slot}" onclick="window.DoctorSmartApp.selectSlot('${slot}')">
        ${slot}
      </button>
    `).join("");
  }

  function selectDate(dateStr) {
    state.selectedDate = dateStr;
    state.selectedSlot = null;

    document.querySelectorAll("#modal-dates-row .date-pill").forEach(pill => {
      if (pill.getAttribute("data-date") === dateStr) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });

    const grid = document.getElementById("modal-slots-grid");
    if (grid && state.activeDoctor) {
      grid.innerHTML = renderTimeSlots(state.activeDoctor, dateStr);
    }

    const btnProceed = document.getElementById("btn-proceed-booking");
    if (btnProceed) btnProceed.disabled = true;
  }

  function selectSlot(slot) {
    state.selectedSlot = slot;

    document.querySelectorAll("#modal-slots-grid .slot-btn").forEach(btn => {
      if (btn.getAttribute("data-slot") === slot) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });

    const btnProceed = document.getElementById("btn-proceed-booking");
    if (btnProceed) {
      btnProceed.disabled = false;
      btnProceed.onclick = () => openBookingModal();
    }
  }

  function closeDoctorModal() {
    doctorModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // ==========================================================================
  // MODAL DE CONFIRMAÇÃO DE AGENDAMENTO
  // ==========================================================================
  function openBookingModal() {
    closeDoctorModal();
    const doc = state.activeDoctor;
    if (!doc) return;

    const [year, month, day] = state.selectedDate.split("-");

    bookingModalContent.innerHTML = `
      <div style="padding: 1.75rem;">
        <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--navy-900); margin-bottom: 0.5rem;">
          Finalizar Agendamento de Consulta
        </h2>
        <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem;">
          Confirme os dados para agendar com <strong>${doc.name}</strong>.
        </p>

        <!-- Resumo da Consulta -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b; font-size: 0.85rem;">Profissional:</span>
            <span style="font-weight: 600; color: #0f172a;">${doc.name}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b; font-size: 0.85rem;">Especialidade:</span>
            <span style="font-weight: 600; color: #028090;">${doc.specialties[0]}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b; font-size: 0.85rem;">Data e Horário:</span>
            <span style="font-weight: 700; color: #2563eb;">${day}/${month}/${year} às ${state.selectedSlot}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b; font-size: 0.85rem;">Investimento:</span>
            <span style="font-weight: 700; color: #059669;">${doc.price}</span>
          </div>
        </div>

        <!-- Formulário do Paciente -->
        <form id="appointment-form" style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; font-size: 0.825rem; font-weight: 600; color: #334155; margin-bottom: 0.35rem;">
              Nome Completo do Paciente *
            </label>
            <input type="text" id="patient-name" required placeholder="Ex: Maria dos Santos" style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem;">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <label style="display: block; font-size: 0.825rem; font-weight: 600; color: #334155; margin-bottom: 0.35rem;">
                WhatsApp / Celular *
              </label>
              <input type="tel" id="patient-phone" required placeholder="(71) 99999-9999" value="(71) 9" style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem;">
            </div>
            <div>
              <label style="display: block; font-size: 0.825rem; font-weight: 600; color: #334155; margin-bottom: 0.35rem;">
                Tipo de Atendimento *
              </label>
              <select id="attendance-type" style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; background: #fff;">
                <option value="presencial">Presencial no Consultório</option>
                <option value="teleconsulta">Teleconsulta Online</option>
              </select>
            </div>
          </div>

          <div style="margin-top: 1rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button type="button" class="btn-login" onclick="window.DoctorSmartApp.closeBookingModal()">
              Cancelar
            </button>
            <button type="submit" class="btn-register" style="padding: 0.65rem 1.5rem;">
              Confirmar e Gerar Agendamento
            </button>
          </div>
        </form>
      </div>
    `;

    bookingModal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Submissão do Formulário
    document.getElementById("appointment-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const patientName = document.getElementById("patient-name").value;
      const patientPhone = document.getElementById("patient-phone").value;
      const type = document.getElementById("attendance-type").value;

      showSuccessConfirmation(patientName, patientPhone, type);
    });
  }

  function showSuccessConfirmation(patientName, patientPhone, type) {
    const doc = state.activeDoctor;
    const [year, month, day] = state.selectedDate.split("-");

    // Salvar agendamento no localStorage para sincronização com o Painel do Médico
    try {
      const existing = JSON.parse(localStorage.getItem("doctor_smart_appointments") || "[]");
      existing.unshift({
        doctorId: doc.id,
        doctorName: doc.name,
        patientName: patientName,
        patientPhone: patientPhone,
        type: type,
        date: `${day}/${month}/${year}`,
        time: state.selectedSlot,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("doctor_smart_appointments", JSON.stringify(existing));
    } catch(e) {
      console.warn("Falha ao salvar no localStorage", e);
    }

    bookingModalContent.innerHTML = `
      <div class="success-banner">
        <div class="success-icon-circle">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 style="font-size: 1.4rem; font-weight: 700; color: var(--navy-900); margin-top: 0.5rem;">
          Consulta Agendada com Sucesso!
        </h2>
        <p style="color: #64748b; font-size: 0.9rem; max-width: 460px;">
          Parabéns, <strong>${patientName}</strong>! Os detalhes do seu agendamento foram confirmados e enviados para o seu WhatsApp (<strong>${patientPhone}</strong>).
        </p>

        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem 1.5rem; text-align: left; width: 100%; margin: 1rem 0; font-size: 0.875rem;">
          <p><strong>Médico:</strong> ${doc.name}</p>
          <p><strong>Especialidade:</strong> ${doc.specialties[0]}</p>
          <p><strong>Modalidade:</strong> ${type === 'presencial' ? 'Consulta Presencial' : 'Teleconsulta Online'}</p>
          <p><strong>Data:</strong> ${day}/${month}/${year} às ${state.selectedSlot}</p>
          <p><strong>Endereço:</strong> ${doc.address}</p>
        </div>

        <button type="button" class="btn-card-schedule" onclick="window.DoctorSmartApp.closeBookingModal()" style="padding: 0.75rem 2.5rem; font-size: 0.95rem; margin-top: 0.5rem;">
          Concluir e Voltar ao Início
        </button>
      </div>
    `;
  }

  function closeBookingModal() {
    bookingModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Fechar Modais no Clique do Backdrop
  doctorModal?.addEventListener("click", (e) => {
    if (e.target === doctorModal) closeDoctorModal();
  });

  bookingModal?.addEventListener("click", (e) => {
    if (e.target === bookingModal) closeBookingModal();
  });

  modalCloseBtn?.addEventListener("click", closeDoctorModal);
  bookingCloseBtn?.addEventListener("click", closeBookingModal);

  // Expõe API Global
  window.DoctorSmartApp = {
    openDoctorModal,
    closeDoctorModal,
    selectDate,
    selectSlot,
    openBookingModal,
    closeBookingModal,
    renderDoctors
  };

  // Inicialização
  initFilterLists();
  renderDoctors();
});
