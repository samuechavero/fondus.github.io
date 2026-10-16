// ====================================================
// FONDUS INTERACTIVO - VANILLA JS ENGINE
// ====================================================

// Planes oficiales Fondus
const PLANS = [
  {
    id: "plan-7.5m",
    tag: "Ideal para empezar",
    capital: "ORDEN DE COMPRA $7.500.000",
    cuotas1a4: "$43.800",
    cuotaDesde5: "$25.875",
    benefits: [
      "Sorteos mensuales desde cuota 1. Si ganas, no pagas más.",
      "Disponibilidad de fondos desde cuota 18.",
      "Telemedicina 24/7."
    ]
  },
  {
    id: "plan-10m",
    tag: "Más elegido",
    isPopular: true,
    capital: "ORDEN DE COMPRA $10.000.000",
    cuotas1a4: "$58.400",
    cuotaDesde5: "$34.500",
    benefits: [
      "Sorteos mensuales desde cuota 1. Si ganas, no pagas más.",
      "Disponibilidad de fondos desde cuota 18.",
      "Asistencia al hogar 24/7.",
      "Telemedicina 24/7."
    ]
  },
  {
    id: "plan-20m",
    tag: "Máximo capital",
    capital: "ORDEN DE COMPRA $20.000.000",
    cuotas1a4: "$116.800",
    cuotaDesde5: "$69.000",
    benefits: [
      "Sorteos mensuales desde cuota 1. Si ganas, no pagas más.",
      "Disponibilidad de fondos desde cuota 18.",
      "Asistencia total en viajes y al hogar.",
      "Telemedicina VIP 24/7."
    ]
  }
];

// Estado global de la aplicación
const state = {
  currentStep: 1, // 1: Hero, 2: Plans, 3: Sofia, 4: Gamification, 5: UserData (Paso 2), 6: Review/Checkout (Paso 3), 7: Success
  selectedPlan: PLANS[1],
  numberMode: "random", // "manual" | "random"
  assignedNumber: "815",
  userData: {
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    estadoCivil: "",
    provincia: "",
    localidad: "",
    telefono: "",
    email: ""
  },
  acceptedTerms: false,
  acceptedCapitalization: false,
  boxOpened: false,
  payment: {
    method: "credit_card",
    cardType: "naranja", // "naranja" | "general"
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: ""
  },
  audioMuted: false,
  viewerZoom: 1,
  viewerPan: { x: 0, y: 0 },
  isDraggingViewer: false,
  dragStart: { x: 0, y: 0 }
};

// ====================================================
// INICIALIZACIÓN
// ====================================================
document.addEventListener("DOMContentLoaded", () => {
  initIcons();
  initStepNavigation();
  initAudioControl();
  initPlanSelection();
  initSofia();
  initGamification();
  initCountdown();
  initUserDataForm();
  initReviewCheckout();
  initPaymentGateway();
  initTermsModal();
  initLegalModals();
  initSocialProof();
  initYouTubePlayer();
  updateUI();
});

function initIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

// ====================================================
// WIZARD / NAVEGACIÓN POR PASOS
// ====================================================
function goToStep(step) {
  state.currentStep = step;

  const steps = [
    { id: "step-hero", num: 1 },
    { id: "step-plans", num: 2 },
    { id: "step-sofia", num: 3 },
    { id: "step-gamification", num: 4 },
    { id: "step-user-data", num: 5 },
    { id: "step-review-checkout", num: 6 },
    { id: "step-success", num: 7 }
  ];

  steps.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) {
      if (s.num === step) {
        el.classList.remove("hidden");
        el.classList.add("block");
      } else {
        el.classList.add("hidden");
        el.classList.remove("block");
      }
    }
  });

  // Header dinámico
  const header = document.getElementById("step-header");
  const headerBackBtn = document.getElementById("header-back-btn");
  const headerStepText = document.getElementById("header-step-text");
  const headerStepProgress = document.getElementById("header-step-progress");

  if (header) {
    if (step >= 1 && step <= 6) {
      header.classList.remove("hidden");
      if (headerBackBtn) {
        if (step > 1) {
          headerBackBtn.classList.remove("opacity-0", "pointer-events-none");
          headerBackBtn.classList.add("opacity-100");
        } else {
          headerBackBtn.classList.add("opacity-0", "pointer-events-none");
          headerBackBtn.classList.remove("opacity-100");
        }
      }

      // Indicadores de progreso (3 Pasos Oficiales)
      let stepNumDisplay = "";
      let progressPercent = "15%";
      if (step === 2 || step === 3 || step === 4) {
        stepNumDisplay = "Paso 01 / 03";
        progressPercent = "33%";
      } else if (step === 5) {
        stepNumDisplay = "Paso 02 / 03";
        progressPercent = "66%";
      } else if (step === 6) {
        stepNumDisplay = "Paso 03 / 03";
        progressPercent = "100%";
      }

      if (headerStepText) {
        headerStepText.textContent = stepNumDisplay ? stepNumDisplay : "Simulación";
      }
      if (headerStepProgress) {
        headerStepProgress.style.width = progressPercent;
      }
    } else {
      header.classList.add("hidden");
    }
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(initIcons, 50);
}

function initStepNavigation() {
  // Hero CTA
  const startBtn = document.getElementById("btn-start-hero");
  if (startBtn) {
    startBtn.addEventListener("click", () => goToStep(2));
  }

  // Header Back Button
  const headerBackBtn = document.getElementById("header-back-btn");
  if (headerBackBtn) {
    headerBackBtn.addEventListener("click", () => {
      if (state.currentStep > 1 && state.currentStep < 7) {
        goToStep(state.currentStep - 1);
      }
    });
  }

  // Reset al inicio
  const resetBtns = document.querySelectorAll(".btn-reset-to-start");
  resetBtns.forEach(btn => {
    btn.addEventListener("click", resetAll);
  });
}

function resetAll() {
  state.selectedPlan = PLANS[1];
  state.numberMode = "random";
  state.assignedNumber = "815";
  state.boxOpened = false;
  state.acceptedTerms = false;
  state.acceptedCapitalization = false;

  const checkboxTerms = document.getElementById("checkbox-terms");
  const checkboxCap = document.getElementById("checkbox-capitalization");
  if (checkboxTerms) checkboxTerms.checked = false;
  if (checkboxCap) checkboxCap.checked = false;

  const giftBox = document.getElementById("gift-box-closed");
  const giftResult = document.getElementById("gift-box-opened");
  if (giftBox) giftBox.classList.remove("hidden");
  if (giftResult) giftResult.classList.add("hidden");

  updateUI();
  goToStep(1);
}

// ====================================================
// AUDIO Y VIDEO DE FONDO
// ====================================================
function initAudioControl() {
  const bgVideo = document.getElementById("bg-video");
  const toggleBtn = document.getElementById("button-floating-audio");
  const audioText = document.getElementById("floating-audio-text");
  const audioIcon = document.getElementById("floating-audio-icon");

  if (!bgVideo || !toggleBtn) return;

  bgVideo.muted = false;
  const playPromise = bgVideo.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        state.audioMuted = false;
        updateAudioButtonUI();
      })
      .catch(() => {
        bgVideo.muted = true;
        state.audioMuted = true;
        bgVideo.play().catch(() => {});
        updateAudioButtonUI();
      });
  }

  const unlockAudio = () => {
    if (bgVideo.muted && state.audioMuted) {
      bgVideo.muted = false;
      state.audioMuted = false;
      bgVideo.play().catch(() => {});
      updateAudioButtonUI();
    }
    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
  };
  window.addEventListener("click", unlockAudio);
  window.addEventListener("touchstart", unlockAudio);

  toggleBtn.addEventListener("click", () => {
    state.audioMuted = !state.audioMuted;
    bgVideo.muted = state.audioMuted;
    if (!state.audioMuted) {
      bgVideo.play().catch(() => {});
    }
    updateAudioButtonUI();
  });

  function updateAudioButtonUI() {
    if (audioText) {
      audioText.textContent = state.audioMuted ? "Activar audio" : "Audio activado";
    }
    if (audioIcon) {
      audioIcon.setAttribute("data-lucide", state.audioMuted ? "volume-x" : "volume-2");
      initIcons();
    }
  }
}

// ====================================================
// SELECCIÓN DE PLANES (PASO 1 -> CALCULATING -> SOFÍA)
// ====================================================
function initPlanSelection() {
  const planButtons = document.querySelectorAll(".btn-select-plan");
  const calcScreen = document.getElementById("step-calculating");
  const calcText = document.getElementById("calculating-plan-name");

  planButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const planId = btn.getAttribute("data-plan-id");
      const foundPlan = PLANS.find(p => p.id === planId);
      if (foundPlan) {
        state.selectedPlan = foundPlan;
      }

      if (calcText) {
        calcText.textContent = "Configurando posibilidades con " + state.selectedPlan.capital + "...";
      }
      if (calcScreen) {
        calcScreen.classList.remove("hidden");
        calcScreen.classList.add("flex");
      }
      document.getElementById("step-plans")?.classList.add("hidden");

      setTimeout(() => {
        if (calcScreen) {
          calcScreen.classList.add("hidden");
          calcScreen.classList.remove("flex");
        }
        updateUI();
        goToStep(3); // Pasa a Sofía
      }, 1200);
    });
  });
}

// ====================================================
// ASESORA DIGITAL SOFÍA
// ====================================================
function initSofia() {
  const chooseManualBtn = document.getElementById("button-choose-manual");
  const chooseRandomBtn = document.getElementById("button-choose-random");

  if (chooseManualBtn) {
    chooseManualBtn.addEventListener("click", () => {
      state.numberMode = "manual";
      renderGamificationOptions();
      goToStep(4);
    });
  }

  if (chooseRandomBtn) {
    chooseRandomBtn.addEventListener("click", () => {
      state.numberMode = "random";
      state.assignedNumber = generateRandomThreeDigit();
      renderGamificationOptions();
      goToStep(4);
    });
  }
}

// ====================================================
// GAMIFICACIÓN Y SORTEO
// ====================================================
function generateRandomThreeDigit() {
  return String(Math.floor(100 + Math.random() * 900));
}

function generateThreeOptions() {
  const set = new Set();
  while (set.size < 3) {
    set.add(generateRandomThreeDigit());
  }
  return Array.from(set);
}

function initGamification() {
  const openBoxBtn = document.getElementById("button-open-gift");
  const bonifModal = document.getElementById("modal-bonification");
  const bonifContinueBtn = document.getElementById("btn-continue-bonification");

  if (openBoxBtn) {
    openBoxBtn.addEventListener("click", () => {
      state.boxOpened = true;
      document.getElementById("gift-box-closed")?.classList.add("hidden");
      document.getElementById("gift-box-opened")?.classList.remove("hidden");

      if (state.numberMode === "random") {
        state.assignedNumber = generateRandomThreeDigit();
        const randEl = document.getElementById("random-revealed-number");
        if (randEl) randEl.textContent = state.assignedNumber;
      }

      setTimeout(() => {
        if (bonifModal) {
          bonifModal.classList.remove("hidden");
          bonifModal.classList.add("flex");
        }
      }, 2200);
    });
  }

  if (bonifContinueBtn) {
    bonifContinueBtn.addEventListener("click", () => {
      if (bonifModal) {
        bonifModal.classList.add("hidden");
        bonifModal.classList.remove("flex");
      }
      updateUI();
      goToStep(5); // Pasa a Paso 2: Completá tus datos
    });
  }

  const rerollRandomBtn = document.getElementById("button-reroll-random");
  if (rerollRandomBtn) {
    rerollRandomBtn.addEventListener("click", () => {
      state.assignedNumber = generateRandomThreeDigit();
      const randEl = document.getElementById("random-revealed-number");
      if (randEl) randEl.textContent = state.assignedNumber;
      updateUI();
    });
  }
}

function renderGamificationOptions() {
  const titleEl = document.getElementById("gamification-title");
  const subtitleEl = document.getElementById("gamification-subtitle");
  const manualContainer = document.getElementById("gamification-manual-container");
  const randomContainer = document.getElementById("gamification-random-container");

  if (state.numberMode === "manual") {
    if (titleEl) titleEl.innerHTML = 'Elegí tu número <span class="text-[#93c46d]">ganador.</span>';
    if (subtitleEl) subtitleEl.textContent = "Abrí la caja y seleccioná uno de los 3 números disponibles para participar el último sábado de cada mes.";
    if (manualContainer) manualContainer.classList.remove("hidden");
    if (randomContainer) randomContainer.classList.add("hidden");

    const options = generateThreeOptions();
    state.assignedNumber = options[0];
    const cardsWrapper = document.getElementById("manual-cards-wrapper");
    if (cardsWrapper) {
      cardsWrapper.innerHTML = options.map((num, idx) => {
        const cls = idx === 0
          ? "border-[#93c46d] bg-[#93c46d] text-[#1d497f] shadow-[0_0_25px_rgba(147,196,109,0.5)] font-bold scale-105"
          : "border-white/20 bg-white/[.08] text-white hover:border-[#93c46d] hover:bg-white/[.15]";
        return "<button type=\"button\" class=\"manual-num-card flex h-20 w-28 flex-col items-center justify-center rounded-2xl border transition-all duration-300 " + cls + "\" data-number=\"" + num + "\"><span class=\"font-mono-custom text-3xl font-extrabold\">" + num + "</span><span class=\"text-[9px] uppercase tracking-wider opacity-80 mt-0.5\">Opción 0" + (idx + 1) + "</span></button>";
      }).join("");

      document.querySelectorAll(".manual-num-card").forEach(card => {
        card.addEventListener("click", () => {
          document.querySelectorAll(".manual-num-card").forEach(c => {
            c.className = "manual-num-card flex h-20 w-28 flex-col items-center justify-center rounded-2xl border transition-all duration-300 border-white/20 bg-white/[.08] text-white hover:border-[#93c46d] hover:bg-white/[.15]";
          });
          card.className = "manual-num-card flex h-20 w-28 flex-col items-center justify-center rounded-2xl border transition-all duration-300 border-[#93c46d] bg-[#93c46d] text-[#1d497f] shadow-[0_0_25px_rgba(147,196,109,0.5)] font-bold scale-105";
          state.assignedNumber = card.getAttribute("data-number") || "815";
          updateUI();
        });
      });
    }
  } else {
    if (titleEl) titleEl.innerHTML = 'Tu número asignado <span class="text-[#93c46d]">te espera.</span>';
    if (subtitleEl) subtitleEl.textContent = "Abrí la caja para revelar el número que el sistema preparó aleatoriamente para vos.";
    if (manualContainer) manualContainer.classList.add("hidden");
    if (randomContainer) randomContainer.classList.remove("hidden");
    const randEl = document.getElementById("random-revealed-number");
    if (randEl) randEl.textContent = state.assignedNumber;
  }
}

// ====================================================
// 1. PASO 2: COMPLETÁ TUS DATOS
// ====================================================
function initUserDataForm() {
  const form = document.getElementById("user-data-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    state.userData.nombre = document.getElementById("input-nombre")?.value.trim() || "";
    state.userData.apellido = document.getElementById("input-apellido")?.value.trim() || "";
    state.userData.dni = document.getElementById("input-dni")?.value.trim() || "";
    state.userData.fechaNacimiento = document.getElementById("input-fecha-nacimiento")?.value.trim() || "";
    state.userData.estadoCivil = document.getElementById("input-estado-civil")?.value || "";
    state.userData.provincia = document.getElementById("input-provincia")?.value || "";
    state.userData.localidad = document.getElementById("input-localidad")?.value.trim() || "";
    state.userData.telefono = document.getElementById("input-telefono")?.value.trim() || "";
    state.userData.email = document.getElementById("input-email")?.value.trim() || "";

    // Sincronizar titular de la tarjeta si aún no fue personalizado manualmente
    const cardHolderInput = document.getElementById("card-holder");
    if (cardHolderInput && !cardHolderInput.dataset.touched) {
      const fullName = (state.userData.nombre + " " + state.userData.apellido).trim().toUpperCase();
      cardHolderInput.value = fullName;
      state.payment.cardHolder = fullName;
      updateCardPreview();
    }

    updateUI();
    goToStep(6); // Pasa a Paso 3: Confirmación y Resumen
  });
}

// ====================================================
// CUENTA REGRESIVA AL SORTEO OFICIAL
// ====================================================
function calculateDrawCountdown() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  function getLastSaturday(y, m) {
    const lastDay = new Date(y, m + 1, 0);
    const dayOfWeek = lastDay.getDay();
    const diff = (dayOfWeek + 1) % 7;
    const lastSat = new Date(y, m + 1, 0 - diff);
    lastSat.setHours(21, 0, 0, 0);
    return lastSat;
  }

  let drawDate = getLastSaturday(year, month);
  if (now > drawDate) {
    drawDate = getLastSaturday(year, month + 1);
  }

  const cutoffWednesday = new Date(drawDate);
  cutoffWednesday.setDate(drawDate.getDate() - 3);
  cutoffWednesday.setHours(23, 59, 59, 999);

  const diffMs = Math.max(0, drawDate.getTime() - now.getTime());
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const drawDateFormatted = drawDate.getDate() + " de " + months[drawDate.getMonth()];
  const cutoffDateFormatted = cutoffWednesday.getDate() + " de " + months[cutoffWednesday.getMonth()] + " 23:59 hs";

  return { days, hours, minutes, seconds, drawDateFormatted, cutoffDateFormatted };
}

function initCountdown() {
  function update() {
    const cd = calculateDrawCountdown();
    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minsEl = document.getElementById("cd-mins");
    const secsEl = document.getElementById("cd-secs");
    const drawDateEl = document.getElementById("cd-draw-date");
    const cutoffDateEl = document.getElementById("cd-cutoff-date");

    if (daysEl) daysEl.textContent = String(cd.days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(cd.hours).padStart(2, "0");
    if (minsEl) minsEl.textContent = String(cd.minutes).padStart(2, "0");
    if (secsEl) secsEl.textContent = String(cd.seconds).padStart(2, "0");
    if (drawDateEl) drawDateEl.textContent = cd.drawDateFormatted;
    if (cutoffDateEl) cutoffDateEl.textContent = cd.cutoffDateFormatted;
  }
  update();
  setInterval(update, 1000);
}

// ====================================================
// 2. PASO 3: CONFIRMACIÓN Y RESUMEN ("REVISÁ TU PLAN")
// ====================================================
function initReviewCheckout() {
  const form = document.getElementById("review-checkout-form");
  const checkboxCap = document.getElementById("checkbox-capitalization");
  const boxCheckboxTerms = document.getElementById("box-checkbox-terms");
  const btnBackStep2 = document.getElementById("btn-back-to-step2");

  // Botón Volver al Paso 2 (Completá tus datos)
  if (btnBackStep2) {
    btnBackStep2.addEventListener("click", () => {
      goToStep(5);
    });
  }

  // Checkbox: "Acepto los Términos y Condiciones de Fondus S.A."
  if (boxCheckboxTerms) {
    boxCheckboxTerms.addEventListener("click", () => {
      if (!state.acceptedTerms) {
        openTermsModal();
      } else {
        state.acceptedTerms = false;
        const cb = document.getElementById("checkbox-terms");
        if (cb) cb.checked = false;
        updateTermsCheckboxUI();
        validateReviewForm();
      }
    });
  }

  // Checkbox: "Entiendo que estoy contratando un plan de capitalizacion y ahorro."
  if (checkboxCap) {
    checkboxCap.addEventListener("change", (e) => {
      state.acceptedCapitalization = e.target.checked;
      const confirmText = document.getElementById("cap-confirmed-text");
      if (confirmText) {
        confirmText.classList.toggle("hidden", !state.acceptedCapitalization);
      }
      validateReviewForm();
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateReviewForm()) return;

      window.scrollTo({ top: 0, behavior: "smooth" });
      goToStep(7); // Pantalla final de éxito
    });
  }
}

// ====================================================
// PASARELA DE PAGO GLOBAL & VALIDACIÓN TARJETA
// ====================================================
function detectCardBrand(number) {
  const clean = number.replace(/\D/g, "");
  if (/^5895/.test(clean)) return { brand: "NaranjaX", name: "Tarjeta Naranja" };
  if (/^4/.test(clean)) return { brand: "Visa", name: "Visa" };
  if (/^(5[1-5]|2[2-7])/.test(clean)) return { brand: "Mastercard", name: "Mastercard" };
  if (/^3[47]/.test(clean)) return { brand: "Amex", name: "American Express" };
  if (/^(58|60|63)/.test(clean)) return { brand: "Cabal", name: "Cabal" };
  return { brand: "Tarjeta", name: "Tarjeta de Crédito / Débito" };
}

function initPaymentGateway() {
  const tabCredit = document.getElementById("tab-credit-card");
  const tabDebit = document.getElementById("tab-direct-debit");
  const cardTypeSelect = document.getElementById("card-type-select");
  const cardNumberInput = document.getElementById("card-number");
  const cardHolderInput = document.getElementById("card-holder");
  const cardExpiryInput = document.getElementById("card-expiry");
  const cardCvvInput = document.getElementById("card-cvv");
  const cardErrorSpan = document.getElementById("card-number-error");

  if (tabCredit && tabDebit) {
    tabCredit.addEventListener("click", () => {
      state.payment.method = "credit_card";
      tabCredit.className = "flex-1 rounded-xl py-2.5 text-xs font-bold transition flex items-center justify-center gap-2 bg-[#93c46d] text-[#1d497f] shadow-md";
      tabDebit.className = "flex-1 rounded-xl py-2.5 text-xs font-bold transition flex items-center justify-center gap-2 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white";
      updateCardPreview();
      validatePayment();
      validateReviewForm();
    });

    tabDebit.addEventListener("click", () => {
      state.payment.method = "direct_debit";
      tabDebit.className = "flex-1 rounded-xl py-2.5 text-xs font-bold transition flex items-center justify-center gap-2 bg-[#93c46d] text-[#1d497f] shadow-md";
      tabCredit.className = "flex-1 rounded-xl py-2.5 text-xs font-bold transition flex items-center justify-center gap-2 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white";
      updateCardPreview();
      validatePayment();
      validateReviewForm();
    });
  }

  if (cardTypeSelect) {
    cardTypeSelect.addEventListener("change", (e) => {
      state.payment.cardType = e.target.value;
      validateCardNumber();
      validatePayment();
      validateReviewForm();
    });
  }

  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", () => {
      let raw = cardNumberInput.value.replace(/\D/g, "").slice(0, 16);
      cardNumberInput.value = raw.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
      state.payment.cardNumber = raw;
      validateCardNumber();
      updateCardPreview();
      validatePayment();
      validateReviewForm();
    });
  }

  function validateCardNumber() {
    const raw = cardNumberInput.value.replace(/\D/g, "");
    const brandInfo = detectCardBrand(raw);
    const brandBadge = document.getElementById("card-brand-badge");
    const previewBrand = document.getElementById("preview-card-brand");

    if (brandBadge) brandBadge.textContent = brandInfo.brand;
    if (previewBrand) previewBrand.textContent = brandInfo.brand;

    const isNaranjaRequired = state.payment.cardType === "naranja";
    if (isNaranjaRequired) {
      if (raw.length >= 4 && !raw.startsWith("5895")) {
        if (cardErrorSpan) {
          cardErrorSpan.textContent = "El BIN debe comenzar con 5895 para Tarjeta Naranja.";
          cardErrorSpan.classList.remove("hidden");
        }
        cardNumberInput.classList.add("border-red-500");
        cardNumberInput.classList.remove("border-[#93c46d]");
        return false;
      } else if (raw.length < 16) {
        if (cardErrorSpan) {
          cardErrorSpan.textContent = raw.length > 0 ? "Completá los 16 dígitos de la tarjeta." : "";
          if (raw.length === 0) cardErrorSpan.classList.add("hidden");
          else cardErrorSpan.classList.remove("hidden");
        }
        return false;
      } else {
        if (cardErrorSpan) cardErrorSpan.classList.add("hidden");
        cardNumberInput.classList.remove("border-red-500");
        cardNumberInput.classList.add("border-[#93c46d]");
        return true;
      }
    } else {
      if (raw.length > 0 && raw.length < 15) {
        if (cardErrorSpan) {
          cardErrorSpan.textContent = "Completá el número de tarjeta (15-16 dígitos).";
          cardErrorSpan.classList.remove("hidden");
        }
        return false;
      } else if (raw.length >= 15) {
        if (cardErrorSpan) cardErrorSpan.classList.add("hidden");
        cardNumberInput.classList.remove("border-red-500");
        cardNumberInput.classList.add("border-[#93c46d]");
        return true;
      } else {
        if (cardErrorSpan) cardErrorSpan.classList.add("hidden");
        return false;
      }
    }
  }

  if (cardHolderInput) {
    cardHolderInput.addEventListener("input", () => {
      cardHolderInput.dataset.touched = "true";
      cardHolderInput.value = cardHolderInput.value.toUpperCase();
      state.payment.cardHolder = cardHolderInput.value;
      updateCardPreview();
      validatePayment();
      validateReviewForm();
    });
  }

  if (cardExpiryInput) {
    cardExpiryInput.addEventListener("input", () => {
      let val = cardExpiryInput.value.replace(/\D/g, "").slice(0, 4);
      if (val.length >= 3) {
        cardExpiryInput.value = val.slice(0, 2) + "/" + val.slice(2);
      } else {
        cardExpiryInput.value = val;
      }
      state.payment.expiry = cardExpiryInput.value;
      updateCardPreview();
      validatePayment();
      validateReviewForm();
    });
  }

  if (cardCvvInput) {
    cardCvvInput.addEventListener("input", () => {
      let val = cardCvvInput.value.replace(/\D/g, "").slice(0, 4);
      cardCvvInput.value = val;
      state.payment.cvv = val;
      updateCardPreview();
      validatePayment();
      validateReviewForm();
    });
  }
}

function updateCardPreview() {
  const previewNum = document.getElementById("preview-card-number");
  const previewHolder = document.getElementById("preview-card-holder");
  const previewExpiry = document.getElementById("preview-card-expiry");
  const previewMethod = document.getElementById("preview-card-method");

  if (previewNum) {
    previewNum.textContent = state.payment.cardNumber
      ? state.payment.cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ").padEnd(19, "•")
      : "•••• •••• •••• ••••";
  }
  if (previewHolder) {
    previewHolder.textContent = state.payment.cardHolder || "NOMBRE Y APELLIDO";
  }
  if (previewExpiry) {
    previewExpiry.textContent = state.payment.expiry || "MM/AA";
  }
  if (previewMethod) {
    previewMethod.textContent = state.payment.method === "credit_card" ? "CRÉDITO" : "DÉBITO";
  }
}

function isPaymentValid() {
  const rawNum = state.payment.cardNumber.replace(/\D/g, "");
  const isNaranja = state.payment.cardType === "naranja";
  const numValid = isNaranja ? (rawNum.startsWith("5895") && rawNum.length === 16) : rawNum.length >= 15;
  const holderValid = (state.payment.cardHolder || "").trim().length >= 3;
  const expValid = /^\d{2}\/\d{2}$/.test(state.payment.expiry || "");
  const cvvValid = (state.payment.cvv || "").length >= 3;

  return numValid && holderValid && expValid && cvvValid;
}

function validatePayment() {
  return isPaymentValid();
}

function validateReviewForm() {
  const submitBtn = document.getElementById("button-submit-adhesion");
  const paymentOk = isPaymentValid();
  const allValid = state.acceptedTerms && state.acceptedCapitalization && paymentOk;

  if (submitBtn) {
    submitBtn.disabled = !allValid;
  }
  return allValid;
}

// ====================================================
// MODAL TÉRMINOS Y CONDICIONES (SCROLL OBLIGATORIO)
// ====================================================
function initTermsModal() {
  const modal = document.getElementById("modal-terms");
  const scrollContainer = document.getElementById("terms-scroll-container");
  const acceptBtn = document.getElementById("button-accept-terms");
  const closeBtn = document.getElementById("button-close-terms");
  const scrollPrompt = document.getElementById("terms-scroll-prompt");

  if (!modal || !scrollContainer || !acceptBtn) return;

  scrollContainer.addEventListener("scroll", () => {
    const isAtBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 15;
    if (isAtBottom) {
      acceptBtn.disabled = false;
      acceptBtn.classList.remove("opacity-50", "cursor-not-allowed");
      acceptBtn.classList.add("hover:bg-[#82b55c]");
      if (scrollPrompt) scrollPrompt.classList.add("hidden");
    }
  });

  acceptBtn.addEventListener("click", () => {
    state.acceptedTerms = true;
    closeTermsModal();
    updateTermsCheckboxUI();
    validateReviewForm();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeTermsModal);
  }
}

function openTermsModal() {
  const modal = document.getElementById("modal-terms");
  const acceptBtn = document.getElementById("button-accept-terms");
  const scrollPrompt = document.getElementById("terms-scroll-prompt");

  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
  if (!state.acceptedTerms && acceptBtn) {
    acceptBtn.disabled = true;
    acceptBtn.classList.add("opacity-50", "cursor-not-allowed");
    if (scrollPrompt) scrollPrompt.classList.remove("hidden");
  }
}

function closeTermsModal() {
  const modal = document.getElementById("modal-terms");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function updateTermsCheckboxUI() {
  const checkbox = document.getElementById("checkbox-terms");
  const box = document.getElementById("box-checkbox-terms");
  const promptText = document.getElementById("terms-prompt-text");
  const confirmedText = document.getElementById("terms-confirmed-text");

  if (checkbox) checkbox.checked = state.acceptedTerms;

  if (box) {
    if (state.acceptedTerms) {
      box.className = "rounded-2xl border-2 p-4 transition cursor-pointer border-[#93c46d] bg-[#93c46d]/15";
    } else {
      box.className = "rounded-2xl border-2 p-4 transition cursor-pointer border-white/15 bg-[#102c4f]/80 hover:border-[#93c46d]/60";
    }
  }

  if (promptText) promptText.classList.toggle("hidden", state.acceptedTerms);
  if (confirmedText) confirmedText.classList.toggle("hidden", !state.acceptedTerms);
}

// ====================================================
// MODALES LEGALES FOOTER Y VISOR CON ZOOM
// ====================================================
function initLegalModals() {
  const viewerModal = document.getElementById("modal-doc-viewer");
  const viewerImg = document.getElementById("doc-viewer-image");
  const viewerTitle = document.getElementById("doc-viewer-title");
  const viewerClose = document.getElementById("doc-viewer-close");
  const zoomInBtn = document.getElementById("viewer-zoom-in");
  const zoomOutBtn = document.getElementById("viewer-zoom-out");
  const zoomResetBtn = document.getElementById("viewer-zoom-reset");

  const btnBasesSorteo = document.getElementById("btn-view-sorteo");
  const btnParticipacion = document.getElementById("btn-view-participacion");

  if (btnBasesSorteo) {
    btnBasesSorteo.addEventListener("click", () => {
      openDocViewer("Bases Oficiales del Sorteo Mensual", "public/sorteo.jpg");
    });
  }

  if (btnParticipacion) {
    btnParticipacion.addEventListener("click", () => {
      openDocViewer("Participación de Resultados Financieros", "public/participaciondelosresultados.jpg");
    });
  }

  function openDocViewer(title, imgSrc) {
    if (viewerTitle) viewerTitle.textContent = title;
    if (viewerImg) {
      viewerImg.src = imgSrc;
      state.viewerZoom = 1;
      state.viewerPan = { x: 0, y: 0 };
      applyViewerTransform();
    }
    if (viewerModal) {
      viewerModal.classList.remove("hidden");
      viewerModal.classList.add("flex");
    }
  }

  function applyViewerTransform() {
    if (viewerImg) {
      viewerImg.style.transform = "translate(" + state.viewerPan.x + "px, " + state.viewerPan.y + "px) scale(" + state.viewerZoom + ")";
    }
    const zoomText = document.getElementById("viewer-zoom-level");
    if (zoomText) {
      zoomText.textContent = Math.round(state.viewerZoom * 100) + "%";
    }
  }

  if (zoomInBtn) {
    zoomInBtn.addEventListener("click", () => {
      state.viewerZoom = Math.min(3, state.viewerZoom + 0.25);
      applyViewerTransform();
    });
  }
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener("click", () => {
      state.viewerZoom = Math.max(0.5, state.viewerZoom - 0.25);
      applyViewerTransform();
    });
  }
  if (zoomResetBtn) {
    zoomResetBtn.addEventListener("click", () => {
      state.viewerZoom = 1;
      state.viewerPan = { x: 0, y: 0 };
      applyViewerTransform();
    });
  }
  if (viewerClose) {
    viewerClose.addEventListener("click", () => {
      if (viewerModal) {
        viewerModal.classList.add("hidden");
        viewerModal.classList.remove("flex");
      }
    });
  }

  // Modal Botón de Arrepentimiento
  const arrepModal = document.getElementById("modal-arrepentimiento");
  const arrepBtn = document.getElementById("btn-arrepentimiento-open");
  const arrepClose = document.getElementById("btn-arrepentimiento-close");
  const arrepForm = document.getElementById("form-arrepentimiento");

  if (arrepBtn) {
    arrepBtn.addEventListener("click", () => {
      if (arrepModal) {
        arrepModal.classList.remove("hidden");
        arrepModal.classList.add("flex");
      }
    });
  }
  if (arrepClose) {
    arrepClose.addEventListener("click", () => {
      if (arrepModal) {
        arrepModal.classList.add("hidden");
        arrepModal.classList.remove("flex");
      }
    });
  }
  if (arrepForm) {
    arrepForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("arrep-name")?.value || "";
      const dni = document.getElementById("arrep-dni")?.value || "";
      const email = document.getElementById("arrep-email")?.value || "";
      const reason = document.getElementById("arrep-reason")?.value || "Revocación voluntaria dentro del plazo legal";

      const subject = encodeURIComponent("Solicitud de Arrepentimiento - DNI " + dni + " - " + name);
      const body = encodeURIComponent(
        "Estimado equipo de Fondus:\n\nPor medio de la presente, solicito ejercer mi derecho legal de revocación/arrepentimiento de mi solicitud de adhesión conforme a los términos de la Ley de Defensa del Consumidor (Art. 34 Ley 24.240).\n\nDatos del titular:\nNombre: " + name + "\nDNI: " + dni + "\nEmail: " + email + "\nMotivo: " + reason + "\n\nQuedo a la espera de la confirmación formal."
      );

      window.location.href = "mailto:arrepentimiento@fondus.com.ar?subject=" + subject + "&body=" + body;
      alert("Solicitud generada con éxito. Se ha abierto tu gestor de correo para enviar la confirmación oficial a arrepentimiento@fondus.com.ar.");
      if (arrepModal) {
        arrepModal.classList.add("hidden");
        arrepModal.classList.remove("flex");
      }
    });
  }
}

// ====================================================
// NOTIFICACIONES FLOTANTES (PRUEBA SOCIAL CADA 10S)
// ====================================================
function initSocialProof() {
  const toast = document.getElementById("social-proof-toast");
  const nameEl = document.getElementById("sp-name");
  const locationEl = document.getElementById("sp-location");
  const planEl = document.getElementById("sp-plan");

  if (!toast) return;

  const names = ["Martín G.", "Valeria R.", "Lucas T.", "Camila M.", "Facundo S.", "Sofía L.", "Joaquín P."];
  const locations = ["Córdoba", "Buenos Aires", "Rosario", "Mendoza", "Neuquén", "Tucumán"];
  const plans = ["O. de compra $7.500.000", "O. de compra $10.000.000", "O. de compra $20.000.000"];

  function showNotification() {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];
    const randomPlan = plans[Math.floor(Math.random() * plans.length)];

    if (nameEl) nameEl.textContent = randomName;
    if (locationEl) locationEl.textContent = randomLoc;
    if (planEl) planEl.textContent = randomPlan;

    toast.classList.remove("hidden", "opacity-0", "translate-y-4");
    toast.classList.add("opacity-100", "translate-y-0");

    setTimeout(() => {
      toast.classList.remove("opacity-100", "translate-y-0");
      toast.classList.add("opacity-0", "translate-y-4");
      setTimeout(() => {
        toast.classList.add("hidden");
      }, 500);
    }, 4000);
  }

  setInterval(showNotification, 10000);
}

// ====================================================
// CONTROL INTELIGENTE DE YOUTUBE IFRAME
// ====================================================
function initYouTubePlayer() {
  window.onYouTubeIframeAPIReady = () => {
    new window.YT.Player("fondus-explainer-player", {
      events: {
        onStateChange: (event) => {
          if (event.data === 1) {
            const bgVideo = document.getElementById("bg-video");
            if (bgVideo && !bgVideo.paused) {
              bgVideo.pause();
            }
          }
        }
      }
    });
  };

  if (!window.YT) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(tag, firstScript);
  }
}

// ====================================================
// ACTUALIZACIÓN DE UI SEGÚN ESTADO
// ====================================================
function updateUI() {
  // Actualizar Tarjeta "Plan elegido" en Paso 3
  const ordenCompraEl = document.getElementById("review-orden-compra");
  const cuotas1a4El = document.getElementById("review-cuotas-1a4");
  const cuotaDesde5El = document.getElementById("review-cuota-desde5");
  const numAsignadoEl = document.getElementById("review-numero-asignado");

  const cleanCapital = state.selectedPlan.capital.replace(/^ORDEN DE COMPRA\s*/i, "");

  if (ordenCompraEl) ordenCompraEl.textContent = cleanCapital;
  if (cuotas1a4El) cuotas1a4El.textContent = state.selectedPlan.cuotas1a4;
  if (cuotaDesde5El) cuotaDesde5El.textContent = state.selectedPlan.cuotaDesde5;
  if (numAsignadoEl) numAsignadoEl.textContent = state.assignedNumber;

  // Actualizar Pantalla Final (Éxito)
  const successNumber = document.getElementById("success-assigned-number");
  const successCapital = document.getElementById("success-plan-capital");

  if (successNumber) successNumber.textContent = state.assignedNumber;
  if (successCapital) successCapital.textContent = state.selectedPlan.capital;
}
