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
  FileText,
  Gift,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  Play,
  RefreshCw,
  Send,
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
import { SocialProofToasts } from './components/SocialProofToasts';

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
    capital: '$7.500.000',
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
    id: 'plan-10m',
    tag: 'MÁS ELEGIDO',
    isPopular: true,
    capital: '$10.000.000',
    cuotas1a4: '$58.400',
    cuotaDesde5: '$34.500',
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
    capital: '$20.000.000',
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
        className={`${compact ? 'h-9 w-9' : 'h-11 w-11'} rounded-xl object-cover shadow-sm`}
      />
      <div className="flex flex-col text-left">
        <span className={`font-display font-800 tracking-[-.04em] text-[#f6f1e8] leading-tight ${compact ? 'text-[17px]' : 'text-[20px]'}`}>
          fondus
        </span>
        <span className="font-mono-custom text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.22em] text-[#dfb45d] -mt-0.5">
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
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#0a1f38]">
      <video
        ref={videoRef}
        className="h-full w-full object-cover opacity-65"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        src={videoPath}
      />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(5,19,38,.94)_0%,rgba(8,32,58,.72)_48%,rgba(8,27,48,.9)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(195,148,63,.25),transparent_30%)]" />
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
        className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] transition ${step === 1 ? 'pointer-events-none opacity-0' : 'text-[#d8e1eb] hover:text-[#dfb45d]'}`}
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
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-[#e2ecf5] backdrop-blur-md transition hover:border-[#dfb45d] hover:text-[#dfb45d]"
            data-testid="button-toggle-sound"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX size={14} className="text-[#dfb45d]" /> : <Volume2 size={14} className="text-[#dfb45d]" />}
            <span className="hidden md:inline">{isMuted ? 'Activar audio' : 'Silenciar'}</span>
          </button>
        )}
        <div className="text-right">
          <p className="font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#bdcbd8]">Simulación privada</p>
          <div className="mt-2 flex items-center justify-end gap-1.5">
            {[1, 2, 3, 4, 5].map((item) => (
              <span
                key={item}
                className={`h-1 w-5 rounded-full transition-all duration-500 sm:w-7 ${item <= step ? 'bg-[#dfb45d]' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

// ----------------------------------------------------
// PASO 1: Cabecera y Pantalla Inicial
// ----------------------------------------------------
function StepOne({ onStart }: { onStart: () => void }) {
  return (
    <motion.main {...fadeUp} className="relative z-10 flex min-h-[calc(100dvh-93px)] items-center px-6 pb-14 sm:px-14 lg:px-[11vw]">
      <div className="max-w-3xl">
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="mb-7 flex items-center gap-3">
          <span className="h-px w-10 bg-[#dfb45d]" />
          <span className="font-mono-custom text-[10px] uppercase tracking-[.28em] text-[#dfb45d]">Una nueva forma de proyectarte</span>
        </motion.div>
        
        <h1 className="font-display max-w-4xl text-[clamp(2.65rem,7.5vw,6.4rem)] font-800 leading-[.97] tracking-[-.06em] text-[#f8f6f0]">
          Con <span className="text-[#dfb45d]">FONDUS</span> vas a poder
        </h1>
        
        <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-[#f3cf82] sm:text-xl">
          En dos minutos te explicamos todo
        </p>

        <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#c8d4de] sm:text-base">
          Una simulación ágil y guiada para convertir tu capacidad de ahorro en un capital concreto y adjudicado. Sin vueltas ni letra chica.
        </p>

        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onStart}
            className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-[#dfb45d] px-7 py-4 text-xs font-bold uppercase tracking-[.15em] text-[#102844] shadow-[0_13px_34px_rgba(223,180,93,.25)] transition hover:-translate-y-0.5 hover:bg-[#efc975]"
            data-testid="button-start-simulation"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative font-bold">[ INICIAR SIMULACIÓN ]</span>
            <ArrowRight className="relative transition-transform group-hover:translate-x-1" size={17} />
          </button>
          <div className="flex items-center gap-2 text-xs text-[#b7c8d6]">
            <ShieldCheck size={16} className="text-[#dfb45d]" /> Tus datos quedan protegidos
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5 text-[11px] uppercase tracking-[.12em] text-[#a9bac8]">
          <span className="flex items-center gap-2">
            <LockKeyhole size={13} className="text-[#dfb45d]" /> Capitalización transparente
          </span>
          <span className="flex items-center gap-2">
            <Award size={13} className="text-[#dfb45d]" /> Acompañamiento real
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden max-w-[220px] text-right lg:block">
        <p className="font-display text-3xl font-800 leading-none text-white/80">
          Tu meta<br />
          <span className="text-[#dfb45d]">empieza hoy.</span>
        </p>
        <p className="mt-3 text-xs leading-relaxed text-[#a5b9c8]">
          Elegí un plan. Nosotros te mostramos el camino de capitalización posible.
        </p>
      </div>
    </motion.main>
  );
}

// ----------------------------------------------------
// PASO 2: Selector de Planes (3 Tarjetas Oficiales)
// ----------------------------------------------------
function StepTwo({
  onSelectPlan,
  selectedPlan,
}: {
  onSelectPlan: (plan: Plan) => void;
  selectedPlan: Plan | null;
}) {
  return (
    <motion.main {...fadeUp} className="relative z-10 mx-auto flex min-h-[calc(100dvh-93px)] w-full max-w-6xl flex-col justify-center px-4 pb-14 pt-2 sm:px-8">
      <div className="mb-8 max-w-2xl text-left">
        <p className="mb-2 font-mono-custom text-[10px] uppercase tracking-[.24em] text-[#dfb45d]">
          Paso 02 / Elegí tu orden de compra
        </p>
        <h1 className="font-display text-[clamp(2.1rem,5vw,4.2rem)] font-800 leading-[1.02] tracking-[-.05em] text-[#f8f6f0]">
          Seleccioná tu plan de capitalización
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#c4d2dd] sm:text-base">
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
                  ? 'border-[#dfb45d] bg-[#122e4d]/90 shadow-[0_16px_40px_rgba(223,180,93,0.18)]'
                  : 'border-white/20 bg-white/[.07] hover:border-white/40'
              } ${isSelected ? 'ring-2 ring-[#dfb45d]' : ''} p-6 sm:p-7`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-[#f3cf82] bg-gradient-to-r from-[#dfb45d] to-[#efc975] px-4 py-1 text-[10px] font-black uppercase tracking-[.18em] text-[#102844] shadow-md">
                  ★ MÁS ELEGIDO ★
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-[.14em] ${plan.isPopular ? 'text-[#dfb45d]' : 'text-[#a2b5c6]'}`}>
                    {plan.tag}
                  </span>
                  <span className="font-mono-custom text-[10px] text-[#8fa6b8]">
                    {plan.id.replace('plan-', '').toUpperCase()}
                  </span>
                </div>

                <div className="mt-4 border-b border-white/10 pb-5">
                  <p className="text-[11px] font-medium uppercase tracking-[.14em] text-[#9eb1c1]">
                    Orden de compra
                  </p>
                  <p className="font-display mt-1 text-3xl font-800 tracking-tight text-[#f8f6f0] sm:text-4xl">
                    {plan.capital}
                  </p>
                </div>

                <div className="mt-5 space-y-2.5 rounded-2xl bg-black/20 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#aebecd]">Cuotas 1 a 4:</span>
                    <span className="font-mono-custom font-bold text-[#f3cf82]">{plan.cuotas1a4}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#aebecd]">Desde cuota 5:</span>
                    <span className="font-mono-custom font-bold text-[#70c7a3]">{plan.cuotaDesde5}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#8ea3b5]">
                    Beneficios incluidos:
                  </p>
                  {plan.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#d1dce6] leading-tight">
                      <CheckCircle2 size={16} className="shrink-0 text-emerald-400 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectPlan(plan)}
                disabled={Boolean(selectedPlan)}
                className={`mt-7 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-bold uppercase tracking-[.14em] transition ${
                  plan.isPopular
                    ? 'bg-[#dfb45d] text-[#102844] hover:bg-[#efc975] shadow-lg'
                    : 'border border-[#dfb45d]/70 bg-[#dfb45d]/10 text-[#f3cf82] hover:bg-[#dfb45d] hover:text-[#102844]'
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center justify-center gap-3 text-sm text-[#dce6ed]">
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-[#dfb45d] text-[#102844]">
              <span className="absolute inset-0 rounded-full border border-[#dfb45d] animate-pulse-ring" />
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
// PASO 3: Sofia, tu asesora digital (Chat)
// ----------------------------------------------------
function StepThree({
  selectedPlan,
  onChooseMode,
}: {
  selectedPlan: Plan | null;
  onChooseMode: (mode: 'manual' | 'random') => void;
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setPhase(0);
    const firstTimer = window.setTimeout(() => setPhase(1), 900);
    const secondTimer = window.setTimeout(() => setPhase(2), 2400);
    const thirdTimer = window.setTimeout(() => setPhase(3), 4200);
    return () => {
      window.clearTimeout(firstTimer);
      window.clearTimeout(secondTimer);
      window.clearTimeout(thirdTimer);
    };
  }, []);

  return (
    <motion.main {...fadeUp} className="relative z-10 mx-auto flex min-h-[calc(100dvh-93px)] w-full max-w-3xl flex-col px-5 pb-12 sm:px-10">
      {/* Cabecera del Asesor */}
      <div className="mb-6 flex items-center gap-3.5 border-b border-[#29435f] pb-4">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dfb45d] to-[#996a1a] text-[#102844] shadow-md">
          <MessageCircle size={22} className="text-[#0e243d]" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0a1f38] bg-[#10b981]" />
        </div>
        <div>
          <p className="font-display font-800 text-[17px] text-[#f7f3e9]">Sofia, tu asesora digital</p>
          <p className="text-[11px] text-[#9eb1c1] flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" /> En línea ahora
          </p>
        </div>
        {selectedPlan && (
          <span className="ml-auto rounded-full border border-[#29435f] bg-[#122e4d]/80 px-3 py-1 font-mono-custom text-[10px] uppercase tracking-[.12em] text-[#dfb45d]">
            Plan {selectedPlan.capital}
          </span>
        )}
      </div>

      {/* Secuencia exacta de burbujas del bot */}
      <div className="flex-1 space-y-4 overflow-hidden pt-2">
        <AnimatePresence>
          {phase === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-[#9eb1c1]">
              <span className="flex gap-1">
                <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#dfb45d]" />
                <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#dfb45d] [animation-delay:120ms]" />
                <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#dfb45d] [animation-delay:240ms]" />
              </span>
              Sofia está escribiendo...
            </motion.div>
          )}

          {phase >= 1 && (
            <motion.div
              {...fadeUp}
              className="max-w-[90%] rounded-2xl rounded-tl-sm bg-[#173653] px-5 py-4 text-[15px] leading-relaxed text-[#e0e9ef] shadow-[0_8px_22px_rgba(3,13,27,.22)] border border-white/5"
            >
              Hola soy Sofia, tu asesora digital ¡Felicitaciones por el sistema que acabas de seleccionar!
            </motion.div>
          )}

          {phase >= 2 && (
            <motion.div
              {...fadeUp}
              className="max-w-[92%] rounded-2xl rounded-tl-sm bg-[#173653] px-5 py-4 text-[15px] leading-relaxed text-[#e0e9ef] shadow-[0_8px_22px_rgba(3,13,27,.22)] border border-white/5"
            >
              Tu plan seleccionado es en cuotas fijas y en pesos las primeras 4 tienen un valor mayor pero desde la 5ta en adelenta ya baja, hasta que salgas adjudicado o decidas continuar con tu sistema de capitalización y recorda que si salis adjudicado ¡NO VAS A PAGAR MAS!
            </motion.div>
          )}

          {phase >= 3 && (
            <motion.div
              {...fadeUp}
              className="max-w-[80%] rounded-2xl rounded-tl-sm bg-[#173653] px-5 py-3.5 text-[15px] font-semibold text-[#f3cf82] shadow-[0_8px_22px_rgba(3,13,27,.22)] border border-[#dfb45d]/25"
            >
              Antes de continuar decime:
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Respuestas del usuario: estrictamente 2 botones */}
      {phase >= 3 && (
        <motion.div {...fadeUp} className="mt-8 space-y-3 pt-2">
          <p className="text-xs uppercase tracking-[.16em] text-[#9eb1c1] font-semibold">
            Elegí cómo obtener tu número de sorteo:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onChooseMode('manual')}
              className="flex items-center justify-between rounded-2xl border border-[#dfb45d]/70 bg-[#dfb45d]/10 px-5 py-4 text-sm font-bold text-[#f3cf82] transition hover:bg-[#dfb45d] hover:text-[#102844] shadow-md group"
              data-testid="button-choose-manual"
            >
              <span>[ Me gustaría seleccionar mi numero ]</span>
              <Ticket size={18} className="transition-transform group-hover:scale-110" />
            </button>
            <button
              type="button"
              onClick={() => onChooseMode('random')}
              className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-bold text-[#f8f6f0] transition hover:border-[#dfb45d] hover:bg-[#dfb45d] hover:text-[#102844] shadow-md group"
              data-testid="button-choose-random"
            >
              <span>[ Que me toque aleatoriamente ]</span>
              <Sparkles size={18} className="transition-transform group-hover:scale-110 text-[#dfb45d] group-hover:text-[#102844]" />
            </button>
          </div>
        </motion.div>
      )}

      <div className="mt-7 flex items-center gap-2 text-[11px] text-[#7790a4]">
        <LockKeyhole size={13} /> Conversación segura y encriptada · Sin compromiso
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
// PASO 4: Gamificación, Pop-up y Asignación
// ----------------------------------------------------
function StepFour({
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

  // Pop-up automático a los 3 segundos
  useEffect(() => {
    const timer = window.setTimeout(() => setShowModal(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  // Si es automático, revelar directamente al abrir o iniciar
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
      <p className="font-mono-custom text-[10px] uppercase tracking-[.24em] text-[#dfb45d]">
        Paso 04 / Tu número oficial de sorteo
      </p>

      <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-800 leading-[.98] tracking-[-.06em] text-[#f8f6f0]">
        {mode === 'manual' ? (
          <>Elegí tu número <span className="text-[#dfb45d]">ganador.</span></>
        ) : (
          <>Tu número asignado <span className="text-[#dfb45d]">te espera.</span></>
        )}
      </h1>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-[#bdcbd8]">
        {mode === 'manual'
          ? 'Abrí la caja y seleccioná uno de los 3 números disponibles para participar el último sábado de cada mes.'
          : 'Abrí la caja para revelar el número que el sistema de asignación aleatoria preparó para vos.'}
      </p>

      {/* Caja de regalo interactiva */}
      {!opened ? (
        <button
          type="button"
          onClick={handleReveal}
          className="group relative mt-9 flex h-44 w-44 items-center justify-center sm:mt-10 sm:h-52 sm:w-52"
          data-testid="button-open-gift"
        >
          <span className="absolute inset-0 rounded-full border border-[#dfb45d]/30 animate-pulse-ring" />
          <span className="absolute inset-4 rounded-full bg-[#dfb45d]/10" />
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-[#f2d18b]/60 bg-[linear-gradient(140deg,#e8c477,#b77d2b)] text-[#102844] shadow-[0_22px_50px_rgba(214,163,72,.35)] sm:h-32 sm:w-32"
          >
            <Gift size={52} strokeWidth={1.4} />
          </motion.span>
        </button>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 w-full">
          {mode === 'manual' ? (
            <div>
              <p className="mb-4 font-mono-custom text-xs uppercase tracking-[.2em] text-[#9eb1c1]">
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
                          ? 'border-[#dfb45d] bg-[#dfb45d] text-[#102844] shadow-[0_0_25px_rgba(223,180,93,0.4)] scale-105'
                          : 'border-[#dfb45d]/40 bg-white/[.08] text-[#f2d18b] hover:border-[#dfb45d] hover:bg-white/[.15]'
                      }`}
                      data-testid={`button-pick-number-${number}`}
                    >
                      <span className="font-mono-custom text-2xl sm:text-3xl font-bold tracking-[.1em]">
                        {number}
                      </span>
                      {isPicked && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#102844]">
                          Seleccionado ✓
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleReroll}
                className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#afc0ce] transition hover:text-[#dfb45d]"
                data-testid="button-retry-numbers"
              >
                <RefreshCw size={14} /> Generar otros 3 números
              </button>
            </div>
          ) : (
            <div>
              <p className="mb-3 font-mono-custom text-xs uppercase tracking-[.2em] text-[#9eb1c1]">
                Tu número asignado oficialmente:
              </p>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mx-auto flex h-24 w-44 items-center justify-center rounded-3xl border-2 border-[#dfb45d] bg-gradient-to-br from-[#dfb45d]/20 to-[#dfb45d]/5 text-[#f3cf82] shadow-[0_12px_35px_rgba(223,180,93,0.3)]"
              >
                <span className="font-mono-custom text-4xl sm:text-5xl font-black tracking-[.15em]">
                  {selectedNumber || options[0]}
                </span>
              </motion.div>
              <p className="mt-3 text-xs text-[#a3b7c8]">
                Asignado automáticamente para los sorteos mensuales de fin de mes
              </p>
            </div>
          )}

          {/* Botón final para continuar al Paso 5 */}
          <div className="mt-9">
            <button
              type="button"
              onClick={onContinue}
              disabled={!selectedNumber && mode === 'manual'}
              className="inline-flex items-center gap-3 rounded-full bg-[#dfb45d] px-9 py-4 text-xs font-bold uppercase tracking-[.15em] text-[#102844] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#efc975] disabled:opacity-50 disabled:pointer-events-none"
              data-testid="button-view-plans"
            >
              <span>Continuar</span>
              <ArrowRight size={17} />
            </button>
            {!selectedNumber && mode === 'manual' && (
              <p className="mt-2 text-xs text-[#dfb45d]">Por favor seleccioná uno de los 3 números para continuar</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Pop-up de Bonificación (Texto Exacto Obligatorio) */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#06172b]/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 28, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 15, scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-3xl border border-[#dfb45d]/50 bg-[#112d4b] p-7 sm:p-9 text-left shadow-[0_30px_90px_rgba(0,0,0,.6)]"
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute right-5 top-5 rounded-full p-1.5 text-[#9eb1c1] transition hover:bg-white/10 hover:text-white"
                data-testid="button-close-gift-modal"
              >
                <X size={20} />
              </button>

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dfb45d] to-[#b77d2b] text-[#102844] shadow-md">
                <Sparkles size={28} />
              </div>

              <p className="font-mono-custom text-[11px] font-bold uppercase tracking-[.22em] text-[#dfb45d]">
                Beneficio Exclusivo Validado
              </p>

              {/* Texto exacto solicitado en el prompt */}
              <h2 className="mt-3 font-display text-2xl font-800 leading-tight text-[#f8f6f0] sm:text-3xl">
                ¡FELICITACIONES! Guarda este código, si continuas con el proceso de adhesión tenes la suscripción 100% bonificada
              </h2>

              <div className="mt-6 rounded-2xl border border-[#dfb45d]/40 bg-[#dfb45d]/10 p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-[#a5b8c9]">Código de bonificación digital:</p>
                <p className="mt-1 font-mono-custom text-2xl font-black tracking-[.2em] text-[#f3cf82]">
                  FONDUS2026
                </p>
                <p className="mt-1 text-[11px] text-[#70c7a3] font-medium">
                  ✓ Suscripción bonificada aplicada automáticamente en el Paso 5
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  if (!opened) handleReveal();
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#dfb45d] py-4 text-sm font-bold uppercase tracking-wider text-[#102844] transition hover:bg-[#efc975] shadow-md"
                data-testid="button-dismiss-gift-modal"
              >
                <span>Entendido</span>
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
// Cálculo del próximo sorteo (Último sábado de cada mes)
// ----------------------------------------------------
function getDrawInfo(now: Date) {
  const lastSaturday = (year: number, month: number) => {
    const date = new Date(year, month + 1, 0);
    date.setDate(date.getDate() - ((date.getDay() + 1) % 7));
    return date;
  };
  const monthDraw = lastSaturday(now.getFullYear(), now.getMonth());
  const afterDraw = now > new Date(monthDraw.getFullYear(), monthDraw.getMonth(), monthDraw.getDate(), 23, 59, 59);
  const next = afterDraw ? lastSaturday(now.getFullYear(), now.getMonth() + 1) : monthDraw;
  const diff = Math.max(0, next.getTime() - now.getTime());
  return {
    next,
    afterDraw,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    formattedDate: next.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }),
  };
}

// ----------------------------------------------------
// PASO 5: Cierre de Adhesión (Checkout Automatizado)
// ----------------------------------------------------
function StepFive({
  selectedPlan,
  assignedNumber,
  onOpenConditions,
  onOpenArrepentimiento,
}: {
  selectedPlan: Plan;
  assignedNumber: string;
  onOpenConditions: () => void;
  onOpenArrepentimiento: () => void;
}) {
  const [now, setNow] = useState(() => new Date());
  const [submitted, setSubmitted] = useState(false);

  // Checkboxes obligatorios
  const [acceptedCapitalization, setAcceptedCapitalization] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Formulario
  const [form, setForm] = useState({
    name: '',
    dni: '',
    phone: '',
    debitMethod: 'Tarjeta de débito',
    cardOrCbu: '',
  });

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(interval);
  }, []);

  const draw = useMemo(() => getDrawInfo(now), [now]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!acceptedCapitalization || !acceptedTerms) return;
    if (form.name && form.dni && form.phone) {
      setSubmitted(true);
    }
  };

  return (
    <motion.main {...fadeUp} className="relative z-10 min-h-screen text-[#f8f6f0]">
      <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-9 lg:px-12">
        {/* Barra superior de checkout */}
        <div className="flex items-center justify-between border-b border-white/10 py-5">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-xs text-[#aec0ce] sm:flex">
              <ShieldCheck size={16} className="text-[#dfb45d]" /> Proceso 100% Automático y Encriptado
            </span>
            <div className="rounded-full border border-[#70c7a3]/40 bg-[#70c7a3]/10 px-3 py-1 text-[11px] font-bold text-[#70c7a3]">
              Suscripción 100% Bonificada
            </div>
          </div>
        </div>

        {/* Título de sección exacto: "Repasemos juntos" */}
        <section className="pt-10 pb-8 text-left">
          <p className="font-mono-custom text-[11px] uppercase tracking-[.24em] text-[#dfb45d]">
            Paso 05 / Adhesión Digital Bonificada
          </p>
          <h1 className="font-display mt-2 text-[clamp(2.4rem,5.5vw,4.6rem)] font-800 leading-[1] tracking-[-.05em]">
            Repasemos juntos
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[#bdcbd8]">
            Validá los datos de tu orden de capitalización y completá tu adhesión automática para asegurar tu número de sorteo y bonificación total.
          </p>
        </section>

        {/* Resumen dinámico estructurado */}
        <section className="mb-10 rounded-3xl border border-[#dfb45d]/40 bg-gradient-to-br from-[#122e4d] to-[#0a1c31] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            {/* Plan y cuotas */}
            <div className="space-y-2 border-b border-white/10 pb-5 md:border-b-0 md:border-r md:border-white/10 md:pb-0 md:pr-6">
              <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#dfb45d]">
                Plan Seleccionado
              </span>
              <p className="font-display text-3xl font-800 text-white">
                {selectedPlan.capital}
              </p>
              <div className="mt-3 space-y-1.5 text-xs text-[#cddae5]">
                <p>
                  <strong className="text-[#f3cf82]">Cuotas 1 a 4:</strong> {selectedPlan.cuotas1a4}
                </p>
                <p>
                  <strong className="text-[#70c7a3]">Desde cuota 5 en adelante:</strong> {selectedPlan.cuotaDesde5}
                </p>
              </div>
            </div>

            {/* Número y Sorteo */}
            <div className="space-y-2 border-b border-white/10 pb-5 md:border-b-0 md:border-r md:border-white/10 md:pb-0 md:pr-6">
              <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#dfb45d]">
                Tu Participación en Sorteos
              </span>
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-20 items-center justify-center rounded-2xl border border-[#dfb45d] bg-[#dfb45d]/20 font-mono-custom text-2xl font-black text-[#f3cf82]">
                  {assignedNumber}
                </div>
                <div className="text-xs text-[#cddae5] leading-snug">
                  <p className="font-semibold text-white">
                    Vas a participar el último sábado de cada mes con el número: <span className="text-[#dfb45d] font-bold">{assignedNumber}</span>
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-[#9eb1c1]">
                Próximo sorteo: {draw.formattedDate}
              </p>
            </div>

            {/* Garantía de adjudicación y retiro mes 18 */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#70c7a3]">
                Garantías del Sistema
              </span>
              <p className="text-sm font-semibold text-white leading-snug">
                Si salís adjudicado, no pagás más. A partir del mes 18, tenés disponibilidad de retiro.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#dfb45d]">
                <Sparkles size={15} /> Suscripción 100% Bonificada aplicada
              </div>
            </div>
          </div>
        </section>

        {/* Grilla principal: Video de casos de éxito + Formulario con validación crítica */}
        <section className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          {/* Columna izquierda: Prueba social y video testimonial */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#142f4d]/90 shadow-[0_25px_70px_rgba(0,0,0,.24)] backdrop-blur-sm">
              <div className="aspect-video w-full overflow-hidden">
                <iframe
                  className="h-full w-full border-0"
                  src="https://www.youtube.com/embed/AdyrPXND35c?rel=0&modestbranding=1"
                  title="Historias que ya avanzaron - Fondus"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dfb45d] text-[#102844]">
                  <Play size={14} fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-bold">Historias que ya avanzaron</p>
                  <p className="text-xs text-[#9fb1c0]">Conocé la experiencia de nuestros adjudicados reales</p>
                </div>
              </div>
            </div>

            {/* Contador al sorteo */}
            <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
              <p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#dfb45d]">
                Tiempo restante para el sorteo mensual
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="text-center">
                  <span className="font-mono-custom text-2xl font-bold text-[#f3cf82]">
                    {String(draw.days).padStart(2, '0')}
                  </span>
                  <span className="block text-[9px] uppercase text-[#91a6b8]">días</span>
                </div>
                <span className="text-[#dfb45d] font-bold">:</span>
                <div className="text-center">
                  <span className="font-mono-custom text-2xl font-bold text-[#f3cf82]">
                    {String(draw.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[9px] uppercase text-[#91a6b8]">hs</span>
                </div>
                <span className="text-[#dfb45d] font-bold">:</span>
                <div className="text-center">
                  <span className="font-mono-custom text-2xl font-bold text-[#f3cf82]">
                    {String(draw.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[9px] uppercase text-[#91a6b8]">min</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#dfb45d]/40 bg-[#dfb45d]/10 px-4 py-2 text-xs text-[#f0ca78]">
              <Star size={14} fill="currentColor" /> Google Rating 4.9 Estrellas (Líder en capitalización)
            </div>
          </div>

          {/* Columna derecha: Formulario de adhesión automática 100% */}
          <div className="rounded-3xl border border-white/15 bg-[#112d4b] p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[380px] flex-col items-center justify-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#10b981] text-[#102844] shadow-lg">
                  <Check size={32} strokeWidth={3} className="text-white" />
                </div>
                <h3 className="font-display mt-6 text-2xl sm:text-3xl font-800 text-white">
                  ¡Adhesión Registrada con Éxito!
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#c3d3e0]">
                  Tu suscripción 100% bonificada ha sido procesada de manera automática. Estás formalmente registrado para participar en el sorteo mensual con tu orden de <strong>{selectedPlan.capital}</strong>.
                </p>

                <div className="mt-6 w-full max-w-sm rounded-2xl border border-[#dfb45d]/50 bg-[#dfb45d]/10 p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-[#b4c8d9]">Tu número oficial activo:</p>
                  <p className="font-mono-custom text-3xl font-black text-[#f3cf82] tracking-[.15em]">
                    {assignedNumber}
                  </p>
                  <p className="text-[11px] text-[#70c7a3] mt-1 font-semibold">
                    ✓ Bonificación de Suscripción: 100% Bonificada
                  </p>
                </div>

                <p className="mt-4 text-xs text-[#8ca4b6]">
                  Hemos enviado la constancia digital y las bases del sistema a tus datos registrados.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs font-bold uppercase tracking-[.14em] text-[#dfb45d] underline hover:text-[#efc975]"
                  data-testid="button-edit-submission"
                >
                  Modificar datos de adhesión
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#f8f6f0]">
                    Datos de Adhesión Digital
                  </h3>
                  <p className="text-xs text-[#9eb1c1]">
                    Validá las condiciones y completá tus datos para activar tu número inmediatamente.
                  </p>
                </div>

                {/* VALIDACIÓN DE CAPITALIZACIÓN (CRÍTICO) */}
                <div className="rounded-2xl border-2 border-[#dfb45d]/40 bg-[#dfb45d]/10 p-4 transition">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedCapitalization}
                      onChange={(e) => setAcceptedCapitalization(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-gray-400 text-[#dfb45d] focus:ring-[#dfb45d]"
                      data-testid="checkbox-capitalization"
                    />
                    <span className="text-xs font-semibold leading-relaxed text-[#f8f6f0]">
                      Entiendo que me estoy suscribiendo a un sistema de capitalización y ahorro.
                    </span>
                  </label>
                  {!acceptedCapitalization && (
                    <p className="mt-2 text-[11px] font-medium text-[#f3cf82] flex items-center gap-1.5 pl-7">
                      <LockKeyhole size={13} /> Marcá este casillero obligatorio para habilitar el formulario de captura.
                    </p>
                  )}
                </div>

                {/* SEGUNDO CHECKBOX: Acepto bases y condiciones */}
                <div className="rounded-xl border border-white/10 bg-white/[.04] p-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-gray-400 text-[#dfb45d] focus:ring-[#dfb45d]"
                      data-testid="checkbox-terms"
                    />
                    <span className="text-xs text-[#c2d1db]">
                      Acepto bases y condiciones del sistema de capitalización Fondus.
                    </span>
                  </label>
                </div>

                {/* FORMULARIO DE CAPTURA: Sólo habilitado si acceptedCapitalization está marcado */}
                <fieldset disabled={!acceptedCapitalization} className={`space-y-4 transition-all duration-300 ${!acceptedCapitalization ? 'opacity-40 pointer-events-none filter blur-[0.5px]' : ''}`}>
                  {/* Nombre y apellido */}
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-[.12em] text-[#c2d1db]">
                      Nombre y apellido
                    </label>
                    <div className="relative">
                      <UserRound className="absolute left-4 top-3.5 text-[#8097a9]" size={16} />
                      <input
                        id="name"
                        required
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-[#0b203a] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#6f879b] focus:border-[#dfb45d]"
                        placeholder="Ej. Juan Pérez"
                        data-testid="input-name"
                      />
                    </div>
                  </div>

                  {/* DNI */}
                  <div>
                    <label htmlFor="dni" className="mb-1.5 block text-xs font-bold uppercase tracking-[.12em] text-[#c2d1db]">
                      DNI (Documento Nacional de Identidad)
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-3.5 text-[#8097a9]" size={16} />
                      <input
                        id="dni"
                        type="text"
                        required
                        value={form.dni}
                        onChange={(event) => setForm({ ...form, dni: event.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-[#0b203a] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#6f879b] focus:border-[#dfb45d]"
                        placeholder="Sin puntos ni espacios (Ej. 38450123)"
                        data-testid="input-dni"
                      />
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-xs font-bold uppercase tracking-[.12em] text-[#c2d1db]">
                      Teléfono / WhatsApp
                    </label>
                    <div className="relative">
                      <MessageCircle className="absolute left-4 top-3.5 text-[#8097a9]" size={16} />
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(event) => setForm({ ...form, phone: event.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-[#0b203a] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#6f879b] focus:border-[#dfb45d]"
                        placeholder="11 5555 5555"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  {/* Medio de débito */}
                  <div>
                    <label htmlFor="debitMethod" className="mb-1.5 block text-xs font-bold uppercase tracking-[.12em] text-[#c2d1db]">
                      Medio de débito automático
                    </label>
                    <select
                      id="debitMethod"
                      value={form.debitMethod}
                      onChange={(event) => setForm({ ...form, debitMethod: event.target.value })}
                      className="w-full appearance-none rounded-xl border border-white/15 bg-[#0b203a] px-4 py-3 text-sm text-white outline-none focus:border-[#dfb45d]"
                      data-testid="select-debit"
                    >
                      <option>Tarjeta de débito</option>
                      <option>CBU / cuenta bancaria</option>
                      <option>NaranjaX</option>
                      <option>Tarjeta de crédito</option>
                    </select>
                  </div>

                  {/* Datos del medio (Tarjeta / CBU) */}
                  <div>
                    <label htmlFor="cardOrCbu" className="mb-1.5 block text-xs font-bold uppercase tracking-[.12em] text-[#c2d1db]">
                      Número de tarjeta o CBU
                    </label>
                    <input
                      id="cardOrCbu"
                      value={form.cardOrCbu}
                      onChange={(event) => setForm({ ...form, cardOrCbu: event.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-[#0b203a] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#6f879b] focus:border-[#dfb45d]"
                      placeholder="Para vincular el aporte mensual sin traslados"
                      data-testid="input-card-or-cbu"
                    />
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={!acceptedCapitalization || !acceptedTerms}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#dfb45d] py-4 text-sm font-bold uppercase tracking-wider text-[#102844] shadow-lg transition hover:bg-[#efc975] disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-submit-adhesion"
                >
                  <span>Confirmar adhesión bonificada</span>
                  <ArrowRight size={17} />
                </button>

                <p className="flex items-center justify-center gap-2 text-[10px] text-[#8197a9]">
                  <LockKeyhole size={12} /> Tus datos están protegidos bajo estricto secreto financiero y encriptación SSL.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* Footer Institucional */}
        <footer className="mt-16 border-t border-white/15 pt-8 text-[11px] leading-relaxed text-[#8fa3b4]">
          <div className="grid gap-8 sm:grid-cols-[1fr_auto]">
            <div>
              <Logo compact />
              
              <div className="mt-4 flex flex-wrap items-center gap-4">
                {/* Botón de arrepentimiento */}
                <button
                  type="button"
                  onClick={onOpenArrepentimiento}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 font-semibold text-[#f8f6f0] transition hover:border-[#dfb45d] hover:text-[#dfb45d]"
                  data-testid="button-arrepentimiento"
                >
                  <Mail size={13} className="text-[#dfb45d]" />
                  <span>Botón de arrepentimiento</span>
                  <span className="text-[10px] text-[#a4b6c6] font-normal">(Tenés 10 días para revocar)</span>
                </button>

                {/* Condiciones Generales */}
                <button
                  type="button"
                  onClick={onOpenConditions}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 font-semibold text-[#f8f6f0] transition hover:border-[#dfb45d] hover:text-[#dfb45d]"
                  data-testid="button-general-conditions"
                >
                  <FileText size={13} className="text-[#dfb45d]" />
                  <span>Condiciones Generales</span>
                </button>
              </div>

              {/* Leyenda obligatoria */}
              <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-[#f3cf82] max-w-md">
                ⚠️ NO contamos con cobradores a domicilio.
              </div>
            </div>

            {/* Sello de la IGJ */}
            <div className="flex items-center gap-4 sm:flex-col sm:items-end">
              <div className="flex items-center gap-2.5 rounded-2xl border border-white/20 bg-white/5 px-4 py-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dfb45d] font-mono-custom text-xs font-black text-[#102844]">
                  IGJ
                </div>
                <div className="text-left">
                  <p className="font-bold text-[#f8f6f0] text-xs">Inspección General de Justicia</p>
                  <p className="text-[10px] text-[#8fa3b4]">Sociedad de Capitalización Inscripta y Regulada</p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 border-t border-white/10 pt-5 text-[10px] text-[#657f94]">
            La presente simulación es informativa y no vinculante hasta la formalización del contrato digital de capitalización y ahorro. Planes autorizados por la Inspección General de Justicia.
          </p>
        </footer>
      </div>
    </motion.main>
  );
}

// ----------------------------------------------------
// Modal: Formulario del Botón de Arrepentimiento
// ----------------------------------------------------
function ArrepentimientoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendEmail = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Solicitud de Arrepentimiento - DNI ${dni} - ${name}`);
    const body = encodeURIComponent(
      `Estimado equipo de Fondus:\n\nPor medio de la presente, solicito ejercer mi derecho legal de revocación/arrepentimiento de mi solicitud de adhesión conforme a los términos de la Ley de Defensa del Consumidor.\n\nDatos del titular:\nNombre: ${name}\nDNI: ${dni}\nEmail: ${email}\nMotivo: ${reason || 'Revocación voluntaria'}\n\nQuedo a la espera de la confirmación formal.`
    );
    window.location.href = `mailto:arrepentimiento@fondus.com.ar?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06172b]/80 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-[#112d4b] p-6 sm:p-8 text-left shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-[#9eb1c1] transition hover:bg-white/10 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400">
            <Mail size={22} />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-white">Botón de Arrepentimiento</h3>
            <p className="text-xs text-[#9eb1c1]">Derecho de revocación en 10 días corridos</p>
          </div>
        </div>

        {sent ? (
          <div className="mt-6 text-center py-6">
            <CheckCircle2 size={44} className="mx-auto text-emerald-400" />
            <h4 className="mt-4 font-bold text-lg text-white">Solicitud Iniciada</h4>
            <p className="mt-2 text-xs text-[#c2d1db] leading-relaxed">
              Se ha abierto tu cliente de correo electrónico para enviar formalmente la solicitud a <strong>arrepentimiento@fondus.com.ar</strong>. Tu caso tiene número de seguimiento asignado.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-[#dfb45d] px-6 py-2.5 text-xs font-bold uppercase text-[#102844]"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendEmail} className="mt-5 space-y-3.5">
            <p className="text-xs text-[#a9bccd] leading-relaxed">
              Conforme a la Ley de Defensa del Consumidor, tenés 10 días corridos contados a partir de la firma del contrato para solicitar la revocación sin costo alguno.
            </p>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#cbd7e2]">Nombre completo</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/15 bg-[#0b203a] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#dfb45d]"
                placeholder="Ej. Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#cbd7e2]">DNI</label>
              <input
                required
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/15 bg-[#0b203a] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#dfb45d]"
                placeholder="Número de documento"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#cbd7e2]">Correo electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/15 bg-[#0b203a] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#dfb45d]"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#cbd7e2]">Motivo (opcional)</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-xl border border-white/15 bg-[#0b203a] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#dfb45d]"
                placeholder="Indicanos brevemente el motivo..."
              />
            </div>

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#dfb45d] py-3 text-xs font-bold uppercase tracking-wider text-[#102844] transition hover:bg-[#efc975]"
            >
              <Send size={14} /> Enviar correo de revocación
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------
// Modal: Condiciones Generales
// ----------------------------------------------------
function ConditionsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06172b]/80 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-[#112d4b] p-6 sm:p-8 text-left shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-[#9eb1c1] transition hover:bg-white/10 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#dfb45d]/20 text-[#dfb45d]">
            <FileText size={22} />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-white">Condiciones Generales</h3>
            <p className="text-xs text-[#dfb45d]">Sistema de Capitalización y Ahorro Fondus</p>
          </div>
        </div>

        <div className="mt-5 space-y-4 text-xs leading-relaxed text-[#c6d5e2]">
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">1. Naturaleza del Sistema</h4>
            <p className="mt-1">
              Fondus opera mediante planes de capitalización y ahorro debidamente registrados y aprobados por la Inspección General de Justicia (IGJ). El suscriptor efectúa aportes mensuales periódicos integrando un fondo común.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">2. Sorteos Mensuales y Adjudicación</h4>
            <p className="mt-1">
              Los sorteos se celebran el último sábado de cada mes mediante la Lotería de la Ciudad de Buenos Aires / Lotería Nacional. En caso de resultar adjudicado con el número asignado en el título, el suscriptor accede a la orden de compra o capital correspondiente y queda liberado del pago de cuotas futuras (¡no paga más!).
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">3. Esquema de Cuotas Fijas</h4>
            <p className="mt-1">
              Las cuotas 1 a 4 incluyen los costos iniciales de emisión y administración. A partir de la cuota 5, el valor de la cuota se reduce y permanece en valor base accesible.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">4. Derecho de Rescate (Mes 18)</h4>
            <p className="mt-1">
              A partir del mes 18 ininterrumpido de aporte, el suscriptor cuenta con el derecho de solicitar el retiro o rescate de sus fondos según la tabla matemática oficial estipulada en el contrato de capitalización.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">5. Medios de Pago y Cobranza</h4>
            <p className="mt-1 font-semibold text-amber-300">
              Fondus NO cuenta con cobradores a domicilio. Los pagos se canalizan exclusivamente por débito automático bancario, tarjetas de crédito/débito habilitadas o redes oficiales de pago autorizadas.
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-[#dfb45d] py-3 text-xs font-bold uppercase text-[#102844] transition hover:bg-[#efc975]"
          >
            Entendido
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------
// APP PRINCIPAL
// ----------------------------------------------------
function App() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[1]); // Default al plan más elegido ($10M)
  const [numberMode, setNumberMode] = useState<'manual' | 'random'>('random');
  const [assignedNumber, setAssignedNumber] = useState<string>('714');
  const [calculating, setCalculating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Modales del Footer
  const [isArrepentimientoOpen, setIsArrepentimientoOpen] = useState(false);
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);

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
      setStep(3);
    }, 1300);
  };

  const handleChooseMode = (mode: 'manual' | 'random') => {
    setNumberMode(mode);
    if (mode === 'random') {
      setAssignedNumber(generateRandomThreeDigit());
    }
    window.setTimeout(() => setStep(4), 500);
  };

  const back = () => {
    if (step > 1 && !calculating) {
      setStep(step - 1);
    }
  };

  return (
    <div className="grain min-h-[100dvh] overflow-hidden bg-[#0a1f38]">
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
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#dfb45d]/35">
              <span className="absolute inset-1 rounded-full border border-dashed border-[#dfb45d] animate-spin" />
              <Zap className="text-[#dfb45d]" size={27} />
            </div>
            <h2 className="mt-8 font-display text-2xl font-800 text-[#f8f6f0]">
              Configurando posibilidades con {selectedPlan.capital}...
            </h2>
            <p className="mt-3 text-sm text-[#b9c9d6]">
              Ajustando el esquema de cuotas fijas y sorteos mensuales.
            </p>
          </motion.div>
        ) : step === 1 ? (
          <StepOne key="step1" onStart={() => setStep(2)} />
        ) : step === 2 ? (
          <StepTwo key="step2" onSelectPlan={handleSelectPlan} selectedPlan={calculating ? selectedPlan : null} />
        ) : step === 3 ? (
          <StepThree key="step3" selectedPlan={selectedPlan} onChooseMode={handleChooseMode} />
        ) : step === 4 ? (
          <StepFour
            key="step4"
            mode={numberMode}
            selectedNumber={assignedNumber}
            onSelectNumber={(num) => setAssignedNumber(num)}
            onContinue={() => setStep(5)}
          />
        ) : (
          <StepFive
            key="step5"
            selectedPlan={selectedPlan}
            assignedNumber={assignedNumber}
            onOpenConditions={() => setIsConditionsOpen(true)}
            onOpenArrepentimiento={() => setIsArrepentimientoOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Botón flotante de audio */}
      <button
        type="button"
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 rounded-full border border-[#dfb45d]/40 bg-[#0a1f38]/90 px-4 py-2.5 text-xs font-semibold text-[#f8f6f0] shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:scale-105 hover:border-[#dfb45d] hover:bg-[#102d4d]"
        data-testid="button-floating-audio"
      >
        {isMuted ? (
          <>
            <VolumeX size={16} className="text-[#dfb45d]" />
            <span>Activar audio</span>
          </>
        ) : (
          <>
            <Volume2 size={16} className="text-[#dfb45d]" />
            <span>Audio activado</span>
          </>
        )}
      </button>

      {/* Notificaciones dinámicas de prueba social en tiempo real */}
      <SocialProofToasts />

      {/* Modales Institucionales */}
      <ArrepentimientoModal
        isOpen={isArrepentimientoOpen}
        onClose={() => setIsArrepentimientoOpen(false)}
      />
      <ConditionsModal
        isOpen={isConditionsOpen}
        onClose={() => setIsConditionsOpen(false)}
      />
    </div>
  );
}

export default App;