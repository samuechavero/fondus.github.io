import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Gift,
  LockKeyhole,
  MessageCircle,
  Play,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  UserRound,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react';
import { SocialProof } from './components/SocialProof';
import { LegalFooterSection } from './components/LegalSection';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const logoPath = `${import.meta.env.BASE_URL}media/fondus-logo.jpeg`;
const videoPath = `${import.meta.env.BASE_URL}media/fondus-bg.mp4`;

export interface Plan {
  id: string;
  tag: string;
  isPopular?: boolean;
  capital: string;
  cuotas1a4: string;
  cuotaDesde5: string;
  benefits: string[];
}

export const PLANS: Plan[] = [
  {
    id: 'plan-7.5m',
    tag: 'Ideal para empezar',
    capital: 'ORDEN DE COMPRA $7.500.000',
    cuotas1a4: '$43.800',
    cuotaDesde5: '$25.875',
    benefits: [
      'Sorteos mensuales desde cuota 1. Si ganas, no pagas más.',
      'Disponibilidad de fondos desde cuota 18.',
      'Telemedicina 24/7.',
      'Seguro de vida.',
    ],
  },
  {
    id: 'plan-15m',
    tag: 'MÁS ELEGIDO',
    isPopular: true,
    capital: 'ORDEN DE COMPRA $15.000.000',
    cuotas1a4: '$87.600',
    cuotaDesde5: '$51.750',
    benefits: [
      'Sorteos mensuales desde cuota 1. Si ganas, no pagas más.',
      'Disponibilidad de fondos desde cuota 18.',
      'Telemedicina 24/7.',
      'Seguro de vida.',
    ],
  },
  {
    id: 'plan-20m',
    tag: 'Mayor capital disponible',
    capital: 'ORDEN DE COMPRA $20.000.000',
    cuotas1a4: '$116.800',
    cuotaDesde5: '$69.000',
    benefits: [
      'Sorteos mensuales desde cuota 1. Si ganas, no pagas más.',
      'Disponibilidad de fondos desde cuota 18.',
      'Telemedicina 24/7.',
      'Seguro de vida.',
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -18, transition: { duration: 0.28 } },
};

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center ${compact ? 'gap-2.5' : 'gap-3'}`}>
      <img
        src={logoPath}
        alt="Fondus"
        className={`${compact ? 'h-9 w-9' : 'h-11 w-11'} rounded-xl object-cover shadow-sm border border-[#93c46d]/40`}
      />
      <div className="flex flex-col text-left">
        <span className={`font-display font-800 tracking-[-.04em] text-white leading-tight ${compact ? 'text-[17px]' : 'text-[20px]'}`}>
          fondus
        </span>
        <span className="font-mono-custom text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.22em] text-[#93c46d] -mt-0.5">
          Agencia Digital
        </span>
      </div>
    </div>
  );
}

function BackgroundVideo({
  videoRef,
  isMuted,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isMuted: boolean;
}) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#1d497f]">
      <video
        ref={videoRef}
        className="bg-video h-full w-full object-cover opacity-60"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        src={videoPath}
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(15,40,71,.95)_0%,rgba(29,73,127,.82)_50%,rgba(13,34,60,.94)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(147,196,109,.22),transparent_35%)]" />
    </div>
  );
}

function StepHeader({
  step,
  onBack,
  isMuted,
  onToggleMute,
}: {
  step: number;
  onBack: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}) {
  return (
    <header className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-9 sm:py-7">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 1}
        className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] transition ${step === 1 ? 'pointer-events-none opacity-0' : 'text-[#d8e3ed] hover:text-[#93c46d]'}`}
        data-testid="button-back-step"
      >
        <ArrowLeft size={15} /> Volver
      </button>
      <Logo compact />
      <div className="flex items-center gap-3">
        {onToggleMute && (
          <button
            type="button"
            onClick={onToggleMute}
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-[#e2ecf5] backdrop-blur-md transition hover:border-[#93c46d] hover:text-[#93c46d]"
            data-testid="button-toggle-sound"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX size={14} className="text-[#93c46d]" /> : <Volume2 size={14} className="text-[#93c46d]" />}
            <span className="hidden md:inline">{isMuted ? 'Activar audio' : 'Silenciar'}</span>
          </button>
        )}
        <div className="text-right">
          <p className="font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#c0d1e3]">Simulación privada</p>
          <div className="mt-2 flex items-center justify-end gap-1.5">
            {[1, 2, 3, 4, 5].map((item) => (
              <span
                key={item}
                className={`h-1 w-5 rounded-full transition-all duration-500 sm:w-7 ${item <= step ? 'bg-[#93c46d]' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

// ----------------------------------------------------
// HERO SECTION
// ----------------------------------------------------
function StepHero({ onStart }: { onStart: () => void }) {
  return (
    <motion.main {...fadeUp} className="relative z-10 flex min-h-[calc(100dvh-93px)] items-center px-6 pb-14 sm:px-14 lg:px-[11vw]">
      <div className="max-w-3xl">
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="mb-7 flex items-center gap-3">
          <span className="h-px w-10 bg-[#93c46d]" />
          <span className="font-mono-custom text-[10px] uppercase tracking-[.28em] text-[#93c46d]">Una nueva forma de proyectarte</span>
        </motion.div>
        
        {/* Titular Principal Exacto */}
        <h1 className="font-display max-w-4xl text-[clamp(2.65rem,7.5vw,6.4rem)] font-800 leading-[.97] tracking-[-.06em] text-white">
          Con <span className="text-[#93c46d]">FONDUS</span> vas a poder
        </h1>
        
        <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-[#93c46d] sm:text-xl">
          En dos minutos te explicamos todo
        </p>

        <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#d8e3ed] sm:text-base">
          Una simulación ágil y guiada para convertir tu capacidad de ahorro en un capital concreto y adjudicado. Sin vueltas ni letra chica.
        </p>

        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onStart}
            className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-[#93c46d] px-7 py-4 text-xs font-black uppercase tracking-[.15em] text-[#1d497f] shadow-[0_13px_34px_rgba(147,196,109,.35)] transition hover:-translate-y-0.5 hover:bg-[#82b55c]"
            data-testid="button-start-simulation"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative font-black">[ INICIAR SIMULACIÓN ]</span>
            <ArrowRight className="relative transition-transform group-hover:translate-x-1" size={17} />
          </button>
          <div className="flex items-center gap-2 text-xs text-[#c0d1e3]">
            <ShieldCheck size={16} className="text-[#93c46d]" /> Tus datos quedan protegidos
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5 text-[11px] uppercase tracking-[.12em] text-[#b3c7db]">
          <span className="flex items-center gap-2">
            <LockKeyhole size={13} className="text-[#93c46d]" /> Capitalización transparente
          </span>
          <span className="flex items-center gap-2">
            <Award size={13} className="text-[#93c46d]" /> Acompañamiento real
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden max-w-[220px] text-right lg:block">
        <p className="font-display text-3xl font-800 leading-none text-white/80">
          Tu meta<br />
          <span className="text-[#93c46d]">empieza hoy.</span>
        </p>
        <p className="mt-3 text-xs leading-relaxed text-[#b3c7db]">
          Elegí un plan. Nosotros te mostramos el camino de capitalización posible.
        </p>
      </div>
    </motion.main>
  );
}

// ----------------------------------------------------
// PASO 1: Simulación y Selección de Planes (Tarjetas Dinámicas)
// ----------------------------------------------------
function StepOnePlans({
  onSelectPlan,
  selectedPlan,
}: {
  onSelectPlan: (plan: Plan) => void;
  selectedPlan: Plan | null;
}) {
  return (
    <motion.main {...fadeUp} className="relative z-10 mx-auto flex min-h-[calc(100dvh-93px)] w-full max-w-6xl flex-col justify-center px-4 pb-14 pt-2 sm:px-8">
      <div className="mb-8 max-w-2xl text-left">
        <p className="mb-2 font-mono-custom text-[10px] uppercase tracking-[.24em] text-[#93c46d]">
          Paso 01 / Elegí tu orden de compra
        </p>
        <h1 className="font-display text-[clamp(2.1rem,5vw,4.2rem)] font-800 leading-[1.02] tracking-[-.05em] text-white">
          Seleccioná tu plan de capitalización
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#d8e3ed] sm:text-base">
          Elegí el capital que querés alcanzar. Cuotas fijas en pesos pensadas para avanzar sin desbalancear tu economía.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((plan) => {
          const isSelected = selectedPlan?.id === plan.id;
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl border transition-all duration-300 backdrop-blur-md ${
                plan.isPopular
                  ? 'border-[#93c46d] bg-[#1d497f]/90 shadow-[0_16px_40px_rgba(147,196,109,0.22)] ring-1 ring-[#93c46d]'
                  : 'border-white/20 bg-white/[.07] hover:border-white/40'
              } ${isSelected ? 'ring-2 ring-[#93c46d]' : ''} p-6 sm:p-7`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#93c46d] px-4 py-1 text-[10px] font-black uppercase tracking-[.18em] text-[#1d497f] shadow-md">
                  ★ MÁS ELEGIDO ★
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-[.14em] ${plan.isPopular ? 'text-[#93c46d]' : 'text-[#b3c7db]'}`}>
                    {plan.tag}
                  </span>
                  <span className="font-mono-custom text-[10px] text-[#9bb3ca]">
                    FONDUS
                  </span>
                </div>

                <div className="mt-4 border-b border-white/10 pb-5">
                  <p className="text-[11px] font-medium uppercase tracking-[.14em] text-[#c0d1e3]">
                    Orden de compra
                  </p>
                  <p className="font-display mt-1 text-2xl sm:text-3xl font-800 tracking-tight text-white">
                    {plan.capital}
                  </p>
                </div>

                {/* Estructura de Precios: Cuotas 1 a 4 y Desde cuota 5 */}
                <div className="mt-5 space-y-2.5 rounded-2xl bg-black/25 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#c0d1e3]">Cuotas 1 a 4:</span>
                    <span className="font-mono-custom font-bold text-white text-sm">{plan.cuotas1a4}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#c0d1e3]">Desde cuota 5:</span>
                    <span className="font-mono-custom font-bold text-[#93c46d] text-sm">{plan.cuotaDesde5}</span>
                  </div>
                </div>

                {/* Beneficios con checks en #93c46d */}
                <div className="mt-6 space-y-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#a4bdd4]">
                    Beneficios incluidos:
                  </p>
                  {plan.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#e0eaf3] leading-tight">
                      <CheckCircle2 size={16} className="shrink-0 text-[#93c46d] mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón: "Elegir este plan" */}
              <button
                type="button"
                onClick={() => onSelectPlan(plan)}
                disabled={Boolean(selectedPlan)}
                className={`mt-7 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-black uppercase tracking-[.14em] transition ${
                  plan.isPopular
                    ? 'bg-[#93c46d] text-[#1d497f] hover:bg-[#82b55c] shadow-lg'
                    : 'border border-[#93c46d] bg-[#93c46d]/15 text-[#93c46d] hover:bg-[#93c46d] hover:text-[#1d497f]'
                }`}
                data-testid={`button-select-${plan.id}`}
              >
                <span>{isSelected ? 'Seleccionado' : 'Elegir este plan'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center justify-center gap-3 text-sm text-[#e0eaf3]">
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-[#93c46d] text-[#1d497f]">
              <span className="absolute inset-0 rounded-full border border-[#93c46d] animate-pulse-ring" />
              <Check size={13} strokeWidth={3} />
            </span>
            <span>Configurando sistema con {selectedPlan.capital}...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

// ----------------------------------------------------
// PASO 2: El Asesor Digital (Bot Sofía) y Gamificación
// ----------------------------------------------------
function StepTwoSofia({
  selectedPlan,
  onChooseMode,
}: {
  selectedPlan: Plan | null;
  onChooseMode: (mode: 'manual' | 'random') => void;
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setPhase(0);
    const firstTimer = window.setTimeout(() => setPhase(1), 800);
    const secondTimer = window.setTimeout(() => setPhase(2), 2200);
    return () => {
      window.clearTimeout(firstTimer);
      window.clearTimeout(secondTimer);
    };
  }, []);

  return (
    <motion.main {...fadeUp} className="relative z-10 mx-auto flex min-h-[calc(100dvh-93px)] w-full max-w-3xl flex-col px-5 pb-12 sm:px-10">
      {/* Cabecera de Sofía */}
      <div className="mb-6 flex items-center gap-3.5 border-b border-white/15 pb-4">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#93c46d] text-[#1d497f] shadow-md font-bold">
          <MessageCircle size={22} className="text-[#1d497f]" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#1d497f] bg-[#93c46d]" />
        </div>
        <div>
          <p className="font-display font-800 text-[18px] text-white">Sofía</p>
          <p className="text-[11px] text-[#c0d1e3] flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#93c46d] animate-pulse" /> En línea ahora
          </p>
        </div>
        {selectedPlan && (
          <span className="ml-auto rounded-full border border-white/20 bg-[#1d497f]/90 px-3 py-1 font-mono-custom text-[10px] uppercase tracking-[.12em] text-[#93c46d]">
            {selectedPlan.capital}
          </span>
        )}
      </div>

      {/* Globo de Diálogo con Texto Exacto */}
      <div className="flex-1 space-y-4 overflow-hidden pt-2">
        <AnimatePresence>
          {phase === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-[#c0d1e3]">
              <span className="flex gap-1">
                <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#93c46d]" />
                <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#93c46d] [animation-delay:120ms]" />
                <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#93c46d] [animation-delay:240ms]" />
              </span>
              Sofía está escribiendo...
            </motion.div>
          )}

          {phase >= 1 && (
            <motion.div
              {...fadeUp}
              className="max-w-[94%] rounded-2xl rounded-tl-sm bg-[#153863] px-5 py-4 text-[15px] leading-relaxed text-[#e0eaf3] shadow-md border border-white/10"
            >
              Hola soy Sofia, tu asesora digital ¡Felicitaciones por el sistema que acabas de seleccionar! Tu plan seleccionado es en cuotas fijas y en pesos las primeras 4 tienen un valor mayor pero desde la 5ta en adelenta ya baja, hasta que salgas adjudicado o decidas continuar con tu sistema de capitalización y recorda que si salis adjudicado ¡NO VAS A PAGAR MAS! Antes de continuar decime:
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Opciones Interactivas: 2 Botones de Gamificación */}
      {phase >= 2 && (
        <motion.div {...fadeUp} className="mt-8 space-y-3 pt-2">
          <p className="text-xs uppercase tracking-[.16em] text-[#c0d1e3] font-semibold">
            Seleccioná cómo querés obtener tu número:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onChooseMode('manual')}
              className="flex items-center justify-between rounded-2xl border border-[#93c46d] bg-[#93c46d]/15 px-5 py-4 text-sm font-bold text-white transition hover:bg-[#93c46d] hover:text-[#1d497f] shadow-md group"
              data-testid="button-choose-manual"
            >
              <span>Me gustaría seleccionar mi numero</span>
              <Ticket size={18} className="text-[#93c46d] group-hover:text-[#1d497f] transition-transform group-hover:scale-110" />
            </button>
            <button
              type="button"
              onClick={() => onChooseMode('random')}
              className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-bold text-white transition hover:border-[#93c46d] hover:bg-[#93c46d] hover:text-[#1d497f] shadow-md group"
              data-testid="button-choose-random"
            >
              <span>Que me toque aleatoriamente</span>
              <Sparkles size={18} className="text-[#93c46d] group-hover:text-[#1d497f] transition-transform group-hover:scale-110" />
            </button>
          </div>
        </motion.div>
      )}

      <div className="mt-7 flex items-center gap-2 text-[11px] text-[#a4bdd4]">
        <LockKeyhole size={13} className="text-[#93c46d]" /> Conversación confidencial · 100% Digital y Segura
      </div>
    </motion.main>
  );
}

// ----------------------------------------------------
// Generador de números de sorteo
// ----------------------------------------------------
function generateRandomThreeDigit(): string {
  return String(Math.floor(100 + Math.random() * 900));
}

function generateThreeOptions(): string[] {
  const nums = new Set<string>();
  while (nums.size < 3) {
    nums.add(generateRandomThreeDigit());
  }
  return Array.from(nums);
}

// ----------------------------------------------------
// GAMIFICACIÓN Y MODAL DE ÉXITO ("Continuar")
// ----------------------------------------------------
function StepGamificationModal({
  mode,
  selectedNumber,
  onSelectNumber,
  onContinue,
}: {
  mode: 'manual' | 'random';
  selectedNumber: string | null;
  onSelectNumber: (num: string) => void;
  onContinue: () => void;
}) {
  const [opened, setOpened] = useState(false);
  const [options, setOptions] = useState<string[]>(() => generateThreeOptions());
  const [showModal, setShowModal] = useState(false);

  // Pop-up modal de suscripción
  useEffect(() => {
    const timer = window.setTimeout(() => setShowModal(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  const handleReveal = () => {
    setOpened(true);
    if (mode === 'random') {
      const assigned = generateRandomThreeDigit();
      onSelectNumber(assigned);
    }
  };

  const handleSelectOption = (num: string) => {
    onSelectNumber(num);
  };

  const handleReroll = () => {
    const newOptions = generateThreeOptions();
    setOptions(newOptions);
    if (mode === 'random') {
      onSelectNumber(newOptions[0]);
    }
  };

  return (
    <motion.main {...fadeUp} className="relative z-10 mx-auto flex min-h-[calc(100dvh-93px)] w-full max-w-4xl flex-col items-center px-6 pb-12 pt-4 text-center">
      <p className="font-mono-custom text-[10px] uppercase tracking-[.24em] text-[#93c46d]">
        Paso 02 / Asignación de Número Oficial
      </p>

      <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-800 leading-[.98] tracking-[-.06em] text-white">
        {mode === 'manual' ? (
          <>Elegí tu número <span className="text-[#93c46d]">ganador.</span></>
        ) : (
          <>Tu número asignado <span className="text-[#93c46d]">te espera.</span></>
        )}
      </h1>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-[#d8e3ed]">
        {mode === 'manual'
          ? 'Abrí la caja y seleccioná uno de los 3 números disponibles para participar el último sábado de cada mes.'
          : 'Abrí la caja para revelar el número que el sistema preparó aleatoriamente para vos.'}
      </p>

      {/* Caja de regalo */}
      {!opened ? (
        <button
          type="button"
          onClick={handleReveal}
          className="group relative mt-9 flex h-44 w-44 items-center justify-center sm:mt-10 sm:h-52 sm:w-52"
          data-testid="button-open-gift"
        >
          <span className="absolute inset-0 rounded-full border border-[#93c46d]/30 animate-pulse-ring" />
          <span className="absolute inset-4 rounded-full bg-[#93c46d]/10" />
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-[#93c46d] bg-gradient-to-br from-[#93c46d] to-[#1d497f] text-white shadow-xl sm:h-32 sm:w-32"
          >
            <Gift size={52} strokeWidth={1.5} className="text-white" />
          </motion.span>
        </button>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 w-full">
          {mode === 'manual' ? (
            <div>
              <p className="mb-4 font-mono-custom text-xs uppercase tracking-[.2em] text-[#c0d1e3]">
                Hacé clic en el número que querés seleccionar:
              </p>
              <div className="mx-auto flex max-w-md justify-center gap-3 sm:gap-4">
                {options.map((number, idx) => {
                  const isPicked = selectedNumber === number;
                  return (
                    <motion.button
                      key={number}
                      type="button"
                      initial={{ rotateX: 90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.12 }}
                      onClick={() => handleSelectOption(number)}
                      className={`relative flex h-20 w-28 flex-col items-center justify-center rounded-2xl border transition-all duration-300 ${
                        isPicked
                          ? 'border-[#93c46d] bg-[#93c46d] text-[#1d497f] shadow-[0_0_25px_rgba(147,196,109,0.5)] scale-105 font-bold'
                          : 'border-white/20 bg-white/[.08] text-white hover:border-[#93c46d] hover:bg-white/[.15]'
                      }`}
                      data-testid={`button-pick-number-${number}`}
                    >
                      <span className="font-mono-custom text-2xl sm:text-3xl font-bold tracking-[.1em]">
                        {number}
                      </span>
                      {isPicked && (
                        <span className="text-[9px] font-black uppercase tracking-wider text-[#1d497f]">
                          Elegido ✓
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleReroll}
                className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#b3c7db] transition hover:text-[#93c46d]"
                data-testid="button-retry-numbers"
              >
                <RefreshCw size={14} /> Generar otros 3 números
              </button>
            </div>
          ) : (
            <div>
              <p className="mb-3 font-mono-custom text-xs uppercase tracking-[.2em] text-[#c0d1e3]">
                Tu número asignado oficialmente:
              </p>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mx-auto flex h-24 w-44 items-center justify-center rounded-3xl border-2 border-[#93c46d] bg-[#93c46d]/20 text-[#93c46d] shadow-[0_12px_35px_rgba(147,196,109,0.3)]"
              >
                <span className="font-mono-custom text-4xl sm:text-5xl font-black tracking-[.15em] text-white">
                  {selectedNumber || options[0]}
                </span>
              </motion.div>
              <p className="mt-3 text-xs text-[#c0d1e3]">
                Asignado automáticamente para los sorteos mensuales de fin de mes
              </p>
            </div>
          )}

          {/* Botón principal de este paso: "Continuar" */}
          <div className="mt-9">
            <button
              type="button"
              onClick={onContinue}
              disabled={!selectedNumber && mode === 'manual'}
              className="inline-flex items-center gap-3 rounded-full bg-[#93c46d] px-9 py-4 text-xs font-black uppercase tracking-[.15em] text-[#1d497f] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#82b55c] disabled:opacity-50 disabled:pointer-events-none"
              data-testid="button-view-plans"
            >
              <span>Continuar</span>
              <ArrowRight size={17} />
            </button>
            {!selectedNumber && mode === 'manual' && (
              <p className="mt-2 text-xs text-[#93c46d]">Por favor seleccioná un número para continuar</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Modal de Éxito / Suscripción (Texto Exacto) */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 28, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 15, scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-3xl border border-[#93c46d]/40 bg-[#1d497f] p-7 sm:p-9 text-left shadow-2xl text-white"
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute right-5 top-5 rounded-full p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                data-testid="button-close-gift-modal"
              >
                <X size={20} />
              </button>

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#93c46d] text-[#1d497f] shadow-md">
                <Sparkles size={28} />
              </div>

              <p className="font-mono-custom text-[11px] font-bold uppercase tracking-[.22em] text-[#93c46d]">
                Beneficio Exclusivo Validado
              </p>

              {/* Texto Exacto Solicitado */}
              <h2 className="mt-3 font-display text-xl sm:text-2xl font-800 leading-snug text-white">
                Beneficio exclusivo, si completás el proceso de adhesión de manera automática tenés la suscripción bonificada.
              </h2>

              <div className="mt-6 rounded-2xl border border-[#93c46d]/40 bg-black/25 p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-[#c0d1e3]">Estado de la adhesión:</p>
                <p className="mt-1 font-mono-custom text-xl sm:text-2xl font-black tracking-wider text-[#93c46d]">
                  100% BONIFICADA
                </p>
                <p className="mt-1 text-[11px] text-[#93c46d] font-semibold">
                  ✓ Bonificación automática aplicada a tu solicitud
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  if (!opened) handleReveal();
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#93c46d] py-4 text-sm font-black uppercase tracking-wider text-[#1d497f] transition hover:bg-[#82b55c] shadow-md"
                data-testid="button-dismiss-gift-modal"
              >
                <span>Continuar suscripción bonificada.</span>
                <Check size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

// ----------------------------------------------------
// Modal de Bases y Condiciones con Exigencia de Scroll
// ----------------------------------------------------
function BasesScrollModal({
  isOpen,
  onClose,
  onAccept,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      setHasScrolledToBottom(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative flex max-h-[85vh] w-full max-w-xl flex-col rounded-2xl bg-white text-slate-800 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between border-b-2 border-[#93c46d] bg-[#1d497f] px-6 py-4 text-white">
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Términos y Condiciones - Autorización de débito automático
            </h3>
            <p className="text-[10px] text-[#93c46d] font-mono-custom mt-0.5">Fondus S.A. de Capitalización y Ahorro</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-200 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 py-6 text-left"
        >
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[11px] font-medium text-amber-900">
            ⚠️ Requisito legal: Por favor desplazate hasta el final de este documento para validar la lectura de la autorización de débito antes de habilitar la aceptación.
          </div>

          <p className="mb-4 text-sm font-bold text-gray-800">
            Términos y Condiciones - Autorización de débito automático<br />
            Fondus S.A. de Capitalización y Ahorro<br />
            Presente<br />
            De mi mayor consideración:
          </p>

          <p className="mb-4 text-sm text-gray-700">
            Por la presente les solicito que los importes correspondientes al servicio de pagos mensuales del plan de capitalización contratado a vuestra empresa sean facturados y cobrados a través de mi tarjeta de crédito/débito.
          </p>

          <p className="mb-4 text-sm text-gray-700">
            En tal sentido, autorizo expresamente a Fondus S.A. de Capitalización y Ahorro a realizar el cobro de las cuotas mencionadas a través de mi tarjeta de crédito/débito.
          </p>

          <p className="mb-4 text-sm text-gray-700">
            La presente continuará vigente hasta tanto medie comunicación fehaciente de mi parte para revocarla. Reconozco expresamente que tanto la presentación del servicio por parte de vuestra entidad como los importes que autorizo a debitar de mi resumen tiene como causa exclusiva la relación contractual existente entre Fondus S.A. de Capitalización y Ahorro y el suscriptor. Es de mi conocimiento que el abono mensual se facturará por mes calendario adelantado, como asimismo debe ser cancelado de la misma manera.
          </p>

          <p className="mb-4 text-sm text-gray-700">
            A su vez, declaro que he completado esta autorización de manera electrónica a través de la plataforma de vuestra empresa, proveyendo libremente de datos necesarios a los fines del débito. Expreso que a los efectos de la autorización otorgada, proveo de datos imprescindibles para la efectivización del débito aquí autorizado, razón por la cuál asumo la exclusiva responsabilidad por la información correcta y precisa de tales datos para la realización de los débitos autorizados, motivo por el cual libero a vuestra empresa por incorrecta, imprecisa y/o errónea información que he brindado.
          </p>

          <p className="mb-4 text-sm text-gray-700">
            Por otro lado, informo que no se me ha solicitado clave o información confidencial que no sea necesaria para la ejecución de las tareas relativas a los débitos que les permito efectuar, como por ejemplo claves de banca electrónica, homebanking, token, o similares con las mismas características.
          </p>

          <p className="mb-4 text-sm text-gray-700">
            Por último, declaro que comprendo el contenido íntegro de la presente por haberme sido explicado de manera completa, suficiente y eficaz por vuestra entidad para el otorgamiento de esta autorización.
          </p>

          <div className="pt-2 text-center text-slate-400 font-mono-custom text-[10px]">
            &mdash; Fin del documento oficial &mdash;
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-600">
            {hasScrolledToBottom ? (
              <span className="text-[#1d497f] font-bold flex items-center gap-1">
                <CheckCircle2 size={14} className="text-[#93c46d]" /> Lectura completa verificada
              </span>
            ) : (
              'Deslizá hasta el final para habilitar'
            )}
          </span>
          <button
            type="button"
            disabled={!hasScrolledToBottom}
            onClick={() => {
              onAccept();
              onClose();
            }}
            className="rounded-xl bg-[#93c46d] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-[#1d497f] shadow-md transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#82b55c]"
          >
            Aceptar
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Función de cálculo dinámico para el sorteo mensual (último sábado, con corte en miércoles 23:59:59)
function calculateDrawCountdown(now = new Date()) {
  const getLastSaturday = (year: number, month: number) => {
    // Día 0 del mes siguiente es el último día del mes actual
    const d = new Date(year, month + 1, 0, 21, 0, 0);
    const day = d.getDay(); // 0 Dom, 6 Sáb
    const diff = (day - 6 + 7) % 7;
    d.setDate(d.getDate() - diff);
    return d;
  };

  const getCutoffWednesday = (lastSaturday: Date) => {
    const d = new Date(lastSaturday);
    d.setDate(d.getDate() - 3); // Miércoles anterior al sábado
    d.setHours(23, 59, 59, 999);
    return d;
  };

  let year = now.getFullYear();
  let month = now.getMonth();
  let targetSaturday = getLastSaturday(year, month);
  let cutoffWednesday = getCutoffWednesday(targetSaturday);

  // Si ya pasó el miércoles a las 23:59:59, pasa al último sábado del mes siguiente
  if (now > cutoffWednesday) {
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
    targetSaturday = getLastSaturday(year, month);
    cutoffWednesday = getCutoffWednesday(targetSaturday);
  }

  const diffMs = Math.max(0, targetSaturday.getTime() - now.getTime());
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    drawDateFormatted: `${targetSaturday.getDate()} de ${monthNames[targetSaturday.getMonth()]}`,
    cutoffDateFormatted: `${cutoffWednesday.getDate()} de ${monthNames[cutoffWednesday.getMonth()]} 23:59 hs`,
  };
}

// ----------------------------------------------------
// PASO 3: Revisión y Checkout ("Repasemos juntos")
// ----------------------------------------------------
function StepThreeCheckout({
  selectedPlan,
  assignedNumber,
}: {
  selectedPlan: Plan;
  assignedNumber: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [acceptedCapitalization, setAcceptedCapitalization] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isBasesModalOpen, setIsBasesModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(() => calculateDrawCountdown());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateDrawCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [form, setForm] = useState({
    name: '',
    dni: '',
    phone: '',
  });

  // API de YouTube IFrame para pausar video de fondo
  useEffect(() => {
    if (!submitted) return;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    let player: any = null;

    const initPlayer = () => {
      if (window.YT && window.YT.Player && document.getElementById('fondus-explainer-player')) {
        player = new window.YT.Player('fondus-explainer-player', {
          events: {
            onStateChange: (event: any) => {
              // 1 es YT.PlayerState.PLAYING
              if (event.data === 1) {
                const bgVideo = document.querySelector('video.bg-video') as HTMLVideoElement | null;
                if (bgVideo && !bgVideo.paused) {
                  bgVideo.pause();
                }
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }

    return () => {
      if (player && typeof player.destroy === 'function') {
        try {
          player.destroy();
        } catch (e) {}
      }
    };
  }, [submitted]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acceptedCapitalization || !acceptedTerms) return;
    if (form.name && form.dni && form.phone) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSubmitted(true);
    }
  };

  return (
    <motion.main {...fadeUp} className="relative z-10 min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-9 lg:px-12">
        {/* Barra superior de checkout */}
        <div className="flex items-center justify-between border-b border-white/10 py-5">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-xs text-[#c0d1e3] sm:flex">
              <ShieldCheck size={16} className="text-[#93c46d]" /> Proceso 100% Automático y Encriptado
            </span>
            <div className="rounded-full bg-[#93c46d]/20 px-3.5 py-1 text-[11px] font-bold text-[#93c46d] border border-[#93c46d]/40">
              Suscripción 100% Bonificada
            </div>
          </div>
        </div>

        {!submitted ? (
          <>
            {/* 4. Sección de Transición */}
            <section className="pt-10 pb-6 text-left">
              <p className="font-mono-custom text-[11px] uppercase tracking-[.24em] text-[#93c46d]">
                Paso 03 / Adhesión Digital Inmediata
              </p>
              {/* Título Superior Exacto */}
              <h1 className="font-display mt-2 text-[clamp(2.4rem,5.5vw,4.6rem)] font-800 leading-[1] tracking-[-.05em]">
                Repasemos juntos
              </h1>
              {/* Frase de transición solicitada */}
              <p className="mt-3 max-w-2xl text-base text-[#d8e3ed] font-medium">
                Ahora sí, hacerlo tangible. Estás a un paso de terminar el proceso de adhesión
              </p>
            </section>

            {/* 4. Bloque del Contador de Sorteos con Textos Actualizados y Lógica Dinámica */}
            <section className="mb-10 rounded-3xl border border-[#93c46d]/40 bg-[#153863]/90 p-6 sm:p-8 shadow-xl">
              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#93c46d]/20 border border-[#93c46d]/40 px-3 py-1 text-xs font-bold text-[#93c46d] mb-2">
                    <Sparkles size={13} />
                    <span>Último número adjudicado: 390</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold mt-1 text-white">
                    Tu oportunidad tiene fecha.
                  </h3>
                  <p className="mt-2 text-sm text-[#d8e3ed]">
                    Si te suscribís hoy, participás por el sorteo de la adjudicación del <strong className="text-white">{countdown.drawDateFormatted}</strong> (Cierre de suscripciones: {countdown.cutoffDateFormatted}).
                  </p>
                </div>

                <div className="flex items-center justify-start md:justify-end gap-2.5 sm:gap-3 text-center">
                  <div className="rounded-2xl bg-black/25 px-3.5 py-3 border border-white/10 min-w-[62px]">
                    <span className="font-mono-custom text-2xl sm:text-3xl font-bold text-[#93c46d]">{countdown.days}</span>
                    <span className="block text-[9px] uppercase text-[#a4bdd4]">días</span>
                  </div>
                  <span className="text-[#93c46d] font-bold text-xl">:</span>
                  <div className="rounded-2xl bg-black/25 px-3.5 py-3 border border-white/10 min-w-[62px]">
                    <span className="font-mono-custom text-2xl sm:text-3xl font-bold text-[#93c46d]">{countdown.hours}</span>
                    <span className="block text-[9px] uppercase text-[#a4bdd4]">hs</span>
                  </div>
                  <span className="text-[#93c46d] font-bold text-xl">:</span>
                  <div className="rounded-2xl bg-black/25 px-3.5 py-3 border border-white/10 min-w-[62px]">
                    <span className="font-mono-custom text-2xl sm:text-3xl font-bold text-[#93c46d]">{countdown.minutes}</span>
                    <span className="block text-[9px] uppercase text-[#a4bdd4]">min</span>
                  </div>
                  <span className="text-[#93c46d] font-bold text-xl hidden sm:inline">:</span>
                  <div className="rounded-2xl bg-black/25 px-3.5 py-3 border border-white/10 min-w-[62px] hidden sm:block">
                    <span className="font-mono-custom text-2xl sm:text-3xl font-bold text-[#93c46d]">{countdown.seconds}</span>
                    <span className="block text-[9px] uppercase text-[#a4bdd4]">seg</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Grilla Principal: Cuadro de Resumen Obligatorio + Formulario */}
            <section className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
              {/* 5. Cuadro de Resumen Obligatorio */}
              <div className="rounded-3xl border border-[#93c46d]/40 bg-[#153863]/90 p-6 sm:p-8 shadow-xl space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#93c46d]">
                    Resumen de tu Adhesión
                  </span>
                  <p className="font-display text-2xl font-800 text-white mt-1">
                    {selectedPlan.capital}
                  </p>
                </div>

                {/* Número elegido */}
                <div className="rounded-2xl bg-black/25 p-4 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#a4bdd4]">Tu número elegido:</p>
                    <p className="font-mono-custom text-3xl font-black text-[#93c46d] mt-0.5">
                      {assignedNumber}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#93c46d]/15 text-[#93c46d]">
                    <Ticket size={24} />
                  </div>
                </div>

                {/* Detalle obligatorio */}
                <div className="space-y-3 text-sm text-[#e0eaf3]">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={17} className="text-[#93c46d] shrink-0 mt-0.5" />
                    <span>Participás el último sábado de cada mes.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={17} className="text-[#93c46d] shrink-0 mt-0.5" />
                    <span>
                      Cuota 1 a 4: <strong className="text-white">{selectedPlan.cuotas1a4}</strong> / Desde cuota 5: <strong className="text-[#93c46d]">{selectedPlan.cuotaDesde5}</strong>.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={17} className="text-[#93c46d] shrink-0 mt-0.5" />
                    <span>Si salís adjudicado no pagás más.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={17} className="text-[#93c46d] shrink-0 mt-0.5" />
                    <span>Disponibilidad de retiro a partir del mes 18.</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#93c46d] font-semibold">
                  <Sparkles size={16} /> Bonificación del 100% de suscripción activa
                </div>
              </div>

              {/* Formulario de Checkout 100% Digital */}
              <div className="rounded-3xl border border-white/15 bg-[#153863] p-6 sm:p-8 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      Confirmá tus Datos Personales
                    </h3>
                    <p className="text-xs text-[#c0d1e3]">
                      Flujo 100% digital. Completá tu información para emitir tu título oficial.
                    </p>
                  </div>

                  {/* Campos de datos personales */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-[.12em] text-[#d8e3ed]">
                        Nombre y apellido
                      </label>
                      <div className="relative">
                        <UserRound className="absolute left-4 top-3.5 text-[#9bb3ca]" size={16} />
                        <input
                          id="name"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-[#102c4f] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#6a87a4] focus:border-[#93c46d]"
                          placeholder="Ej. Juan Pérez"
                          data-testid="input-name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="dni" className="mb-1.5 block text-xs font-bold uppercase tracking-[.12em] text-[#d8e3ed]">
                        DNI (Documento Nacional de Identidad)
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-3.5 text-[#9bb3ca]" size={16} />
                        <input
                          id="dni"
                          type="text"
                          required
                          value={form.dni}
                          onChange={(e) => setForm({ ...form, dni: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-[#102c4f] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#6a87a4] focus:border-[#93c46d]"
                          placeholder="Sin puntos ni espacios (Ej. 38450123)"
                          data-testid="input-dni"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-xs font-bold uppercase tracking-[.12em] text-[#d8e3ed]">
                        Teléfono / WhatsApp
                      </label>
                      <div className="relative">
                        <MessageCircle className="absolute left-4 top-3.5 text-[#9bb3ca]" size={16} />
                        <input
                          id="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-[#102c4f] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#6a87a4] focus:border-[#93c46d]"
                          placeholder="11 5555 5555"
                          data-testid="input-phone"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Doble Checkbox de Validación Legal */}
                  <div className="space-y-3 pt-2">
                    {/* Casilla 1: Acepto Términos y Condiciones */}
                    <div
                      onClick={() => {
                        if (!acceptedTerms) {
                          setIsBasesModalOpen(true);
                        } else {
                          setAcceptedTerms(false);
                        }
                      }}
                      className={`rounded-2xl border-2 p-4 transition cursor-pointer ${
                        acceptedTerms
                          ? 'border-[#93c46d] bg-[#93c46d]/15'
                          : 'border-white/15 bg-[#102c4f]/80 hover:border-[#93c46d]/60'
                      }`}
                      data-testid="box-checkbox-terms"
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={acceptedTerms}
                          readOnly
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!acceptedTerms) {
                              setIsBasesModalOpen(true);
                            } else {
                              setAcceptedTerms(false);
                            }
                          }}
                          className="mt-0.5 h-4 w-4 rounded border-gray-400 text-[#93c46d] focus:ring-[#93c46d] cursor-pointer"
                          data-testid="checkbox-terms"
                        />
                        <div className="flex-1 text-left">
                          <span className="text-xs font-semibold leading-relaxed text-white">
                            Acepto Términos y Condiciones.
                          </span>
                          {!acceptedTerms ? (
                            <p className="mt-1 text-[11px] font-bold text-[#93c46d] underline hover:text-white">
                              [ Tocar aquí para leer y validar términos ]
                            </p>
                          ) : (
                            <p className="mt-1 text-[11px] text-[#93c46d] flex items-center gap-1 font-semibold">
                              <CheckCircle2 size={13} /> Términos validados y autorizados.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Casilla 2: Entiendo que me estoy suscribiendo a un plan de capitalización y ahorro */}
                    <label
                      className={`flex items-start gap-3 rounded-2xl border-2 p-4 transition cursor-pointer ${
                        acceptedCapitalization
                          ? 'border-[#93c46d] bg-[#93c46d]/15'
                          : 'border-white/15 bg-[#102c4f]/80 hover:border-[#93c46d]/60'
                      }`}
                      data-testid="box-checkbox-capitalization"
                    >
                      <input
                        type="checkbox"
                        checked={acceptedCapitalization}
                        onChange={(e) => setAcceptedCapitalization(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-gray-400 text-[#93c46d] focus:ring-[#93c46d] cursor-pointer"
                        data-testid="checkbox-capitalization"
                      />
                      <div className="flex-1 text-left">
                        <span className="text-xs font-semibold leading-relaxed text-white">
                          Entiendo que me estoy suscribiendo a un plan de capitalización y ahorro.
                        </span>
                        {acceptedCapitalization && (
                          <p className="mt-1 text-[11px] text-[#93c46d] flex items-center gap-1 font-semibold">
                            <CheckCircle2 size={13} /> Confirmado y comprendido.
                          </p>
                        )}
                      </div>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!acceptedTerms || !acceptedCapitalization}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#93c46d] py-4 text-sm font-black uppercase tracking-wider text-[#1d497f] shadow-lg transition hover:bg-[#82b55c] disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-submit-adhesion"
                  >
                    <span>Confirmar adhesión</span>
                    <ArrowRight size={17} />
                  </button>

                  <p className="flex items-center justify-center gap-2 text-[10px] text-[#a4bdd4]">
                    <LockKeyhole size={12} className="text-[#93c46d]" /> Tus datos están protegidos bajo estricto secreto financiero y encriptación SSL.
                  </p>
                </form>
              </div>
            </section>
          </>
        ) : (
          /* 6. Pantalla Final: Adhesión Exitosa con Reproductor YouTube Inteligente */
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="pt-8 space-y-12">
            <div className="rounded-3xl border border-[#93c46d]/40 bg-[#153863] p-8 text-center max-w-2xl mx-auto shadow-2xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#93c46d] text-[#1d497f] shadow-lg">
                <Check size={36} strokeWidth={3} />
              </div>
              <h2 className="font-display mt-5 text-3xl font-extrabold text-white">
                ¡Adhesión Registrada con Éxito!
              </h2>
              <p className="mt-2 text-sm text-[#d8e3ed]">
                Tu proceso se ha completado automáticamente. Tu suscripción está 100% bonificada y tu participación se encuentra activa.
              </p>

              <div className="mt-6 rounded-2xl bg-black/25 p-4 border border-[#93c46d]/30 max-w-xs mx-auto">
                <p className="text-xs uppercase text-[#a4bdd4]">Número Oficial Asignado:</p>
                <p className="font-mono-custom text-4xl font-black text-[#93c46d] mt-1">{assignedNumber}</p>
                <p className="text-[11px] text-white mt-1">{selectedPlan.capital}</p>
              </div>
            </div>

            {/* VIDEO PRINCIPAL GRANDE: "Te explico como funciona Fondus en 1 minuto" */}
            <div className="rounded-3xl border border-[#93c46d]/40 bg-[#153863] p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#93c46d] text-[#1d497f]">
                  <Play size={20} fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Te explico como funciona Fondus en 1 minuto
                  </h3>
                  <p className="text-xs text-[#93c46d] font-semibold">
                    Mirá este breve video explicativo sobre tu sistema de capitalización
                  </p>
                </div>
              </div>

              {/* IFrame de YouTube con API jsapi habilitada */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg bg-black">
                <iframe
                  id="fondus-explainer-player"
                  className="h-full w-full border-0"
                  src="https://www.youtube.com/embed/_JywDCltepk?enablejsapi=1"
                  title="Te explico como funciona Fondus en 1 minuto"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Sección de Testimonios debajo del video explicativo */}
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#153863]/90 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#93c46d]/20 text-[#93c46d]">
                  <Play size={16} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-white">Historias que ya avanzaron</h4>
                  <p className="text-xs text-[#c0d1e3]">Conocé la experiencia de nuestros adjudicados reales</p>
                </div>
              </div>

              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black border border-white/10">
                <iframe
                  className="h-full w-full border-0"
                  src="https://www.youtube.com/embed/AdyrPXND35c?rel=0&modestbranding=1"
                  title="Historias que ya avanzaron - Fondus"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer Institucional con Módulo Legal Híbrido */}
        <footer className="mt-16 border-t border-white/15 pt-8 text-[11px] leading-relaxed text-[#b3c7db]">
          <div className="mb-6">
            <Logo compact />
          </div>
          <LegalFooterSection />
          <p className="mt-8 border-t border-white/10 pt-5 text-[10px] text-[#8ca3ba]">
            La presente simulación es informativa y no vinculante hasta la formalización del contrato digital de capitalización y ahorro. Planes autorizados por la Inspección General de Justicia.
          </p>
        </footer>
      </div>

      {/* Modal con Scroll Obligatorio de Bases */}
      <BasesScrollModal
        isOpen={isBasesModalOpen}
        onClose={() => setIsBasesModalOpen(false)}
        onAccept={() => {
          setAcceptedTerms(true);
        }}
      />
    </motion.main>
  );
}

// ----------------------------------------------------
// APP PRINCIPAL (EMBUDO INTERACTIVO)
// ----------------------------------------------------
function App() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[1]); // Default $15M
  const [numberMode, setNumberMode] = useState<'manual' | 'random'>('random');
  const [assignedNumber, setAssignedNumber] = useState<string>('815');
  const [calculating, setCalculating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
    }

    const handleFirstInteraction = () => {
      if (videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.play().catch(() => {});
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      cleanup();
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    } else {
      setIsMuted((prev) => !prev);
    }
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setCalculating(true);
    window.setTimeout(() => {
      setCalculating(false);
      setStep(3); // Pasa a Sofia
    }, 1200);
  };

  const handleChooseMode = (mode: 'manual' | 'random') => {
    setNumberMode(mode);
    if (mode === 'random') {
      setAssignedNumber(generateRandomThreeDigit());
    }
    window.setTimeout(() => setStep(4), 500); // Pasa a Gamificación
  };

  const back = () => {
    if (step > 1 && !calculating) {
      setStep(step - 1);
    }
  };

  return (
    <div className="grain min-h-[100dvh] overflow-hidden bg-[#1d497f]">
      <BackgroundVideo videoRef={videoRef} isMuted={isMuted} />
      
      {step < 5 && (
        <StepHeader
          step={step}
          onBack={back}
          isMuted={isMuted}
          onToggleMute={toggleMute}
        />
      )}

      <AnimatePresence mode="wait">
        {calculating ? (
          <motion.div
            key="calculating"
            {...fadeUp}
            className="relative z-10 flex min-h-[calc(100dvh-93px)] flex-col items-center justify-center px-6 text-center"
          >
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#93c46d]/40">
              <span className="absolute inset-1 rounded-full border border-dashed border-[#93c46d] animate-spin" />
              <Zap className="text-[#93c46d]" size={28} />
            </div>
            <h2 className="mt-8 font-display text-2xl font-800 text-white">
              Configurando posibilidades con {selectedPlan.capital}...
            </h2>
            <p className="mt-3 text-sm text-[#d8e3ed]">
              Ajustando el esquema de cuotas fijas y sorteos mensuales.
            </p>
          </motion.div>
        ) : step === 1 ? (
          <StepHero key="hero" onStart={() => setStep(2)} />
        ) : step === 2 ? (
          <StepOnePlans key="step1" onSelectPlan={handleSelectPlan} selectedPlan={calculating ? selectedPlan : null} />
        ) : step === 3 ? (
          <StepTwoSofia key="step2" selectedPlan={selectedPlan} onChooseMode={handleChooseMode} />
        ) : step === 4 ? (
          <StepGamificationModal
            key="step3"
            mode={numberMode}
            selectedNumber={assignedNumber}
            onSelectNumber={(num) => setAssignedNumber(num)}
            onContinue={() => setStep(5)}
          />
        ) : (
          <StepThreeCheckout
            key="step4"
            selectedPlan={selectedPlan}
            assignedNumber={assignedNumber}
          />
        )}
      </AnimatePresence>

      {/* Botón flotante de audio en la parte superior para no bloquear modales */}
      <button
        type="button"
        onClick={toggleMute}
        className="fixed top-4 right-4 z-[60] flex items-center gap-2 rounded-full border border-[#93c46d]/40 bg-[#1d497f]/90 px-3.5 py-2 text-xs font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:scale-105 hover:border-[#93c46d] hover:bg-[#255793]"
        data-testid="button-floating-audio"
      >
        {isMuted ? (
          <>
            <VolumeX size={15} className="text-[#93c46d]" />
            <span className="hidden sm:inline">Activar audio</span>
          </>
        ) : (
          <>
            <Volume2 size={15} className="text-[#93c46d]" />
            <span className="hidden sm:inline">Audio activado</span>
          </>
        )}
      </button>

      {/* Pop-ups Dinámicos de Prueba Social (Superpuesto z-50) */}
      <SocialProof />
    </div>
  );
}

export default App;