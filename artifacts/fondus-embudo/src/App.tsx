import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  ChevronRight,
  Gift,
  LockKeyhole,
  Menu,
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

const logoPath = `${import.meta.env.BASE_URL}media/fondus-logo.jpeg`;
const videoPath = `${import.meta.env.BASE_URL}media/fondus-bg.mp4`;

type Goal = 'Moto 0KM' | 'Auto 0KM' | '$20.000.000 en efectivo';

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -18, transition: { duration: 0.28 } },
};

const goalDetails: Record<Goal, { eyebrow: string; title: string; detail: string; estimate: string }> = {
  'Moto 0KM': { eyebrow: 'Tu primer gran paso', title: 'Una moto nueva, sin postergarlo', detail: 'Movilidad, libertad y una meta que podés tocar.', estimate: '$3.800.000' },
  'Auto 0KM': { eyebrow: 'Tu próximo capítulo', title: 'Un auto para llegar más lejos', detail: 'Convertí tus aportes en el auto que estás imaginando.', estimate: '$18.500.000' },
  '$20.000.000 en efectivo': { eyebrow: 'Capital para decidir', title: 'Veinte millones para tu proyecto', detail: 'La tranquilidad de tener capital cuando llegue el momento.', estimate: '$20.000.000' },
};

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center ${compact ? 'gap-2' : 'gap-3'}`}>
      <img src={logoPath} alt="Fondus" className={`${compact ? 'h-9 w-9' : 'h-11 w-11'} rounded-xl object-cover`} />
      <span className="font-display text-[19px] font-800 tracking-[-.04em] text-[#f6f1e8]">fondus</span>
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

function StepOne({ onStart }: { onStart: () => void }) {
  return (
    <motion.main {...fadeUp} className="relative z-10 flex min-h-[calc(100dvh-93px)] items-center px-6 pb-14 sm:px-14 lg:px-[11vw]">
      <div className="max-w-3xl">
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .15 }} className="mb-7 flex items-center gap-3">
          <span className="h-px w-10 bg-[#dfb45d]" />
          <span className="font-mono-custom text-[10px] uppercase tracking-[.28em] text-[#dfb45d]">Una nueva forma de proyectarte</span>
        </motion.div>
        <h1 className="font-display max-w-4xl text-[clamp(2.65rem,7.5vw,6.6rem)] font-800 leading-[.97] tracking-[-.065em] text-[#f8f6f0]">
          ¿El sistema tradicional no te deja avanzar? <span className="text-[#dfb45d]">Descubrí el poder de tus ahorros.</span>
        </h1>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-[#c8d4de] sm:text-lg">
          Una conversación de menos de cinco minutos para convertir una cuota posible en una meta concreta. Sin vueltas. Sin letra chica escondida.
        </p>
        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <button type="button" onClick={onStart} className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-[#dfb45d] px-6 py-4 text-xs font-bold uppercase tracking-[.13em] text-[#102844] shadow-[0_13px_34px_rgba(223,180,93,.22)] transition hover:-translate-y-0.5 hover:bg-[#efc975]" data-testid="button-start-simulation">
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative">Iniciar simulación</span><ArrowRight className="relative transition-transform group-hover:translate-x-1" size={17} />
          </button>
          <div className="flex items-center gap-2 text-xs text-[#b7c8d6]"><ShieldCheck size={16} className="text-[#dfb45d]" /> Tus datos quedan protegidos</div>
        </div>
        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5 text-[11px] uppercase tracking-[.12em] text-[#a9bac8]">
          <span className="flex items-center gap-2"><LockKeyhole size={13} className="text-[#dfb45d]" /> Capitalización transparente</span>
          <span className="flex items-center gap-2"><Award size={13} className="text-[#dfb45d]" /> Acompañamiento real</span>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 hidden max-w-[220px] text-right lg:block">
        <p className="font-display text-3xl font-800 leading-none text-white/80">Tu meta<br /><span className="text-[#dfb45d]">empieza hoy.</span></p>
        <p className="mt-3 text-xs leading-relaxed text-[#a5b9c8]">Elegí un objetivo. Nosotros te mostramos el camino posible.</p>
      </div>
    </motion.main>
  );
}

function StepTwo({ onChoose, goal }: { onChoose: (goal: Goal) => void; goal: Goal | null }) {
  const options: Goal[] = ['Moto 0KM', 'Auto 0KM', '$20.000.000 en efectivo'];
  return (
    <motion.main {...fadeUp} className="relative z-10 mx-auto flex min-h-[calc(100dvh-93px)] w-full max-w-5xl flex-col justify-center px-6 pb-14 sm:px-12">
      <div className="mb-10 max-w-2xl">
        <p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[.24em] text-[#dfb45d]">Paso 02 / Tu punto de partida</p>
        <h1 className="font-display text-[clamp(2.4rem,6vw,5.3rem)] font-800 leading-[.98] tracking-[-.06em] text-[#f8f6f0]">¿Cuál es tu meta financiera principal hoy?</h1>
        <p className="mt-5 text-base leading-relaxed text-[#c4d2dd]">No hace falta tener todo resuelto. Solo elegir aquello que querés hacer posible primero.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((option, index) => {
          const detail = goalDetails[option];
          return (
            <button type="button" key={option} disabled={Boolean(goal)} onClick={() => onChoose(option)} className={`group relative min-h-[190px] overflow-hidden rounded-2xl border p-5 text-left backdrop-blur-md transition duration-300 sm:min-h-[240px] ${goal === option ? 'border-[#dfb45d] bg-[#dfb45d] text-[#102844]' : 'border-white/20 bg-white/[.085] text-[#f8f6f0] hover:-translate-y-1 hover:border-[#dfb45d]/70 hover:bg-white/[.14]'}`} data-testid={`button-goal-${index + 1}`}>
              <span className={`font-mono-custom text-[10px] ${goal === option ? 'text-[#41536a]' : 'text-[#dfb45d]'}`}>0{index + 1}</span>
              <span className="mt-12 block font-display text-xl font-700 leading-tight">{option}</span>
              <span className={`mt-2 block text-xs leading-relaxed ${goal === option ? 'text-[#41536a]' : 'text-[#b8c9d7]'}`}>{detail.detail}</span>
              <ChevronRight className={`absolute bottom-5 right-5 transition-transform group-hover:translate-x-1 ${goal === option ? 'text-[#102844]' : 'text-[#dfb45d]'}`} size={18} />
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {goal && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center gap-3 text-sm text-[#dce6ed]">
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-[#dfb45d] text-[#102844]"><span className="absolute inset-0 rounded-full border border-[#dfb45d] animate-pulse-ring" /><Check size={13} strokeWidth={3} /></span>
            Calculando una posibilidad para vos...
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

function StepThree({ goal, onAnswer }: { goal: Goal | null; onAnswer: (amount: string) => void }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    setPhase(0);
    const first = window.setTimeout(() => setPhase(1), 1150);
    const second = window.setTimeout(() => setPhase(2), 2600);
    return () => { window.clearTimeout(first); window.clearTimeout(second); };
  }, []);
  return (
    <motion.main {...fadeUp} className="relative z-10 mx-auto flex min-h-[calc(100dvh-93px)] w-full max-w-3xl flex-col px-5 pb-12 sm:px-10">
      <div className="mb-7 flex items-center gap-3 border-b border-[#29435f] pb-5"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#dfb45d] text-[#102844]"><MessageCircle size={19} /></div><div><p className="font-display font-700 text-[#f7f3e9]">Asesor Fondus</p><p className="text-[11px] text-[#9eb1c1]"><span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[#70c7a3]" /> En línea ahora</p></div><span className="ml-auto rounded-full border border-[#29435f] px-3 py-1 font-mono-custom text-[9px] uppercase tracking-[.13em] text-[#8fa6b8]">Meta: {goal || 'en definición'}</span></div>
      <div className="flex-1 space-y-3 overflow-hidden pt-3">
        <AnimatePresence>
          {phase === 0 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-[#9eb1c1]"><span className="flex gap-1"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#dfb45d]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#dfb45d] [animation-delay:120ms]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#dfb45d] [animation-delay:240ms]" /></span> Escribiendo...</motion.div>}
          {phase >= 1 && <motion.div {...fadeUp} className="max-w-[88%] rounded-2xl rounded-tl-sm bg-[#173653] px-5 py-4 text-[15px] leading-relaxed text-[#e0e9ef] shadow-[0_8px_22px_rgba(3,13,27,.18)]">Hola, soy tu asesor experto de Fondus. Veo que tenés una gran meta. Nuestro sistema te permite hacer aportes mensuales accesibles a un fondo común.</motion.div>}
          {phase >= 2 && <motion.div {...fadeUp} className="max-w-[88%] rounded-2xl rounded-tl-sm bg-[#173653] px-5 py-4 text-[15px] leading-relaxed text-[#e0e9ef] shadow-[0_8px_22px_rgba(3,13,27,.18)]">Podés adjudicar tu capital anticipadamente por sorteo o licitación, siempre de forma transparente. ¿De cuánto es la cuota mensual que te resultaría cómoda para empezar hoy?</motion.div>}
        </AnimatePresence>
      </div>
      {phase >= 2 && <motion.div {...fadeUp} className="mt-8"><p className="mb-3 text-xs uppercase tracking-[.13em] text-[#9eb1c1]">Elegí una cuota para continuar</p><div className="flex flex-wrap gap-2.5">{['$15.000', '$30.000', 'Más de $50.000'].map((amount) => <button type="button" key={amount} onClick={() => onAnswer(amount)} className="rounded-full border border-[#dfb45d]/70 bg-[#dfb45d]/10 px-5 py-3 text-sm font-700 text-[#f0ca78] transition hover:bg-[#dfb45d] hover:text-[#102844]" data-testid={`button-contribution-${amount.replace(/\W/g, '')}`}>{amount}</button>)}</div></motion.div>}
      <div className="mt-8 flex items-center gap-2 text-[11px] text-[#7790a4]"><LockKeyhole size={13} /> Conversación confidencial · Sin compromiso</div>
    </motion.main>
  );
}

function makeNumbers(seed = Math.random()) {
  const base = Math.floor(seed * 900);
  return [String((base + 117) % 900 + 100), String((base * 3 + 271) % 900 + 100), String((base * 7 + 409) % 900 + 100)];
}

function StepFour({ onContinue }: { onContinue: () => void }) {
  const [opened, setOpened] = useState(false);
  const [numbers, setNumbers] = useState(() => makeNumbers());
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setShowModal(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);
  const reveal = () => { setOpened(true); setNumbers(makeNumbers()); };
  return (
    <motion.main {...fadeUp} className="relative z-10 mx-auto flex min-h-[calc(100dvh-93px)] w-full max-w-4xl flex-col items-center px-6 pb-12 pt-5 text-center">
      <p className="font-mono-custom text-[10px] uppercase tracking-[.24em] text-[#dfb45d]">Paso 04 / Una señal a tu favor</p>
      <h1 className="mt-5 max-w-2xl font-display text-[clamp(2.35rem,6vw,4.8rem)] font-800 leading-[.98] tracking-[-.06em] text-[#f8f6f0]">Hay algo reservado <span className="text-[#dfb45d]">para vos.</span></h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-[#bdcbd8]">Abrí tu regalo y descubrí tus números de participación para el próximo sorteo.</p>
      <button type="button" onClick={reveal} className={`group relative mt-8 flex h-44 w-44 items-center justify-center sm:mt-10 sm:h-52 sm:w-52 ${opened ? 'pointer-events-none' : ''}`} data-testid="button-open-gift">
        <span className="absolute inset-0 rounded-full border border-[#dfb45d]/30 animate-pulse-ring" />
        <span className="absolute inset-4 rounded-full bg-[#dfb45d]/10" />
        <motion.span animate={opened ? { scale: 1.18, rotate: 8, opacity: 0 } : { scale: 1, rotate: 0, opacity: 1 }} transition={{ duration: .55 }} className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-[#f2d18b]/60 bg-[linear-gradient(140deg,#e8c477,#b77d2b)] text-[#102844] shadow-[0_22px_50px_rgba(214,163,72,.35)] sm:h-32 sm:w-32"><Gift size={52} strokeWidth={1.4} /></motion.span>
      </button>
      <AnimatePresence>
        {opened && <motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} className="w-full"><p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#9eb1c1]">Tus números de sorteo</p><div className="mx-auto flex max-w-sm justify-center gap-2.5">{numbers.map((number) => <motion.div initial={{ rotateX: 90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ delay: numbers.indexOf(number) * .13 }} key={number} className="flex h-16 w-[29%] items-center justify-center rounded-xl border border-[#dfb45d]/50 bg-white/[.08] font-mono-custom text-2xl font-bold tracking-[.08em] text-[#f2d18b]">{number}</motion.div>)}</div><button type="button" onClick={reveal} className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#afc0ce] transition hover:text-[#dfb45d]" data-testid="button-retry-numbers"><RefreshCw size={14} /> Volver a intentar</button><div className="mt-8"><button type="button" onClick={onContinue} className="inline-flex items-center gap-3 rounded-full bg-[#dfb45d] px-7 py-4 text-xs font-bold uppercase tracking-[.14em] text-[#102844] transition hover:-translate-y-0.5 hover:bg-[#efc975]" data-testid="button-view-plans">Ver planes y adjudicados <ArrowRight size={16} /></button></div></motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {showModal && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex items-end justify-center bg-[#06172b]/75 p-4 backdrop-blur-sm sm:items-center"><motion.div initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative w-full max-w-md rounded-3xl border border-[#dfb45d]/35 bg-[#112d4b] p-7 text-left shadow-[0_30px_90px_rgba(0,0,0,.4)]"><button type="button" onClick={() => setShowModal(false)} className="absolute right-5 top-5 text-[#9eb1c1] transition hover:text-white" data-testid="button-close-gift-modal"><X size={19} /></button><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dfb45d] text-[#102844]"><Sparkles size={23} /></div><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#dfb45d]">Un regalo para empezar</p><h2 className="mt-3 font-display text-2xl font-800 leading-tight text-[#f8f6f0]">Tu suscripción puede venir bonificada.</h2><p className="mt-3 text-sm leading-relaxed text-[#c5d2dc]">Recordá esta palabra clave para usarla al registrarte hoy:</p><p className="mt-4 rounded-xl border border-[#dfb45d]/50 bg-[#dfb45d]/10 px-4 py-3 text-center font-mono-custom text-lg font-bold tracking-[.15em] text-[#f3cf82]">FONDUS2026</p><button type="button" onClick={() => setShowModal(false)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#dfb45d] py-3.5 text-sm font-bold text-[#102844] transition hover:bg-[#efc975]" data-testid="button-dismiss-gift-modal">Entendido <Check size={16} /></button></motion.div></motion.div>}
      </AnimatePresence>
    </motion.main>
  );
}

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
  return { next, afterDraw, days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000) };
}

function StepFive({
  onPlayTestimonial,
  onPauseTestimonial,
}: {
  onPlayTestimonial?: () => void;
  onPauseTestimonial?: () => void;
}) {
  const [now, setNow] = useState(() => new Date());
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => { const interval = window.setInterval(() => setNow(new Date()), 60000); return () => window.clearInterval(interval); }, []);
  const draw = useMemo(() => getDrawInfo(now), [now]);
  const [form, setForm] = useState({ name: '', phone: '', debit: 'Tarjeta de débito' });
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (form.name && form.phone) setSubmitted(true); };
  return (
    <motion.main {...fadeUp} className="relative z-10 min-h-screen text-[#f8f6f0]">
      <div className="mx-auto max-w-6xl px-5 pb-12 sm:px-9 lg:px-12">
        <div className="flex items-center justify-between border-b border-white/10 py-5"><Logo /><span className="hidden items-center gap-2 text-xs text-[#aec0ce] sm:flex"><ShieldCheck size={15} className="text-[#dfb45d]" /> Plataforma segura y transparente</span><button type="button" className="rounded-full border border-white/15 p-2 text-[#c6d2dc] sm:hidden" data-testid="button-open-menu"><Menu size={18} /></button></div>
        <section className="grid gap-8 py-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-20">
          <div><p className="font-mono-custom text-[10px] uppercase tracking-[.24em] text-[#dfb45d]">Tu plan toma forma</p><h1 className="mt-5 max-w-xl font-display text-[clamp(2.65rem,6vw,5.6rem)] font-800 leading-[.95] tracking-[-.065em]">Ahora sí, <span className="text-[#dfb45d]">hacelo tangible.</span></h1><p className="mt-6 max-w-lg text-base leading-relaxed text-[#bdcbd8]">Una cuota accesible puede convertirse en una oportunidad real de adjudicación. Conocé cómo funciona y elegí tu próximo paso.</p><div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#dfb45d]/40 bg-[#dfb45d]/10 px-4 py-2 text-xs text-[#f0ca78]"><Star size={14} fill="currentColor" /> Google Rating 4.9 Estrellas</div></div>
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
                <p className="text-xs text-[#9fb1c0]">Conocé la experiencia de nuestros adjudicados</p>
              </div>
            </div>
          </div>
        </section>
        <section className="grid gap-4 border-y border-white/10 py-8 sm:grid-cols-3 sm:gap-6 sm:py-10"><div className="sm:col-span-2"><p className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#dfb45d]">Próximo sorteo</p><h2 className="mt-2 font-display text-2xl font-800">{draw.afterDraw ? 'El próximo sorteo ya está en camino' : 'Tu oportunidad tiene fecha'}</h2><p className="mt-2 text-sm text-[#aebdca]">{draw.afterDraw ? 'Participá durante este mes para entrar en la próxima fecha.' : 'El último sábado de cada mes, tu aporte puede acercarte a la adjudicación.'}</p></div><div className="flex items-end gap-2 sm:justify-end"><div><span className="font-mono-custom text-3xl font-bold text-[#f3cf82]">{String(draw.days).padStart(2, '0')}</span><span className="ml-1 text-[9px] uppercase text-[#91a6b8]">días</span></div><span className="pb-2 text-[#dfb45d]">:</span><div><span className="font-mono-custom text-3xl font-bold text-[#f3cf82]">{String(draw.hours).padStart(2, '0')}</span><span className="ml-1 text-[9px] uppercase text-[#91a6b8]">hs</span></div><span className="pb-2 text-[#dfb45d]">:</span><div><span className="font-mono-custom text-3xl font-bold text-[#f3cf82]">{String(draw.minutes).padStart(2, '0')}</span><span className="ml-1 text-[9px] uppercase text-[#91a6b8]">min</span></div></div></section>
        <section className="grid gap-10 py-12 lg:grid-cols-[.82fr_1.18fr] lg:py-16"><div><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#dfb45d] text-[#102844]"><Ticket size={21} /></div><h2 className="font-display text-3xl font-800 tracking-[-.04em]">Demos el siguiente paso.</h2><p className="mt-4 max-w-sm text-sm leading-relaxed text-[#aebdca]">Dejanos tus datos y un asesor te contacta para mostrarte el plan exacto para tu objetivo.</p><div className="mt-7 space-y-3 text-sm text-[#c5d2dc]"><p className="flex items-center gap-3"><Check size={16} className="text-[#dfb45d]" /> Aportes claros y previsibles</p><p className="flex items-center gap-3"><Check size={16} className="text-[#dfb45d]" /> Sorteos y licitaciones transparentes</p><p className="flex items-center gap-3"><Check size={16} className="text-[#dfb45d]" /> Acompañamiento durante todo el camino</p></div></div>
          <div className="rounded-3xl border border-white/12 bg-[#112d4b] p-6 sm:p-8">{submitted ? <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[330px] flex-col items-center justify-center text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dfb45d] text-[#102844]"><Check size={30} /></div><h3 className="mt-6 font-display text-2xl font-800">Listo, recibimos tu interés.</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-[#b8c9d6]">Un asesor Fondus va a contactarte muy pronto para acompañarte personalmente.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-7 text-xs font-bold uppercase tracking-[.13em] text-[#dfb45d]" data-testid="button-edit-submission">Editar datos</button></motion.div> : <form onSubmit={submit} className="space-y-5"><div><label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-[.12em] text-[#c2d1db]">Nombre y apellido</label><div className="relative"><UserRound className="absolute left-4 top-3.5 text-[#8097a9]" size={16} /><input id="name" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-xl border border-white/15 bg-[#0b203a] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#6f879b] focus:border-[#dfb45d]" placeholder="¿Cómo te llamás?" data-testid="input-name" /></div></div><div><label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-[.12em] text-[#c2d1db]">Teléfono</label><div className="relative"><MessageCircle className="absolute left-4 top-3.5 text-[#8097a9]" size={16} /><input id="phone" type="tel" required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="w-full rounded-xl border border-white/15 bg-[#0b203a] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#6f879b] focus:border-[#dfb45d]" placeholder="11 5555 5555" data-testid="input-phone" /></div></div><div><label htmlFor="debit" className="mb-2 block text-xs font-bold uppercase tracking-[.12em] text-[#c2d1db]">Medio de débito preferido</label><select id="debit" value={form.debit} onChange={(event) => setForm({ ...form, debit: event.target.value })} className="w-full appearance-none rounded-xl border border-white/15 bg-[#0b203a] px-4 py-3.5 text-sm text-white outline-none focus:border-[#dfb45d]" data-testid="select-debit"><option>Tarjeta de débito</option><option>CBU / cuenta bancaria</option><option>NaranjaX</option></select></div><button type="submit" className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#dfb45d] py-4 text-sm font-bold text-[#102844] transition hover:bg-[#efc975]" data-testid="button-submit-adhesion">Quiero conocer mi plan <ArrowRight size={17} /></button><p className="flex items-center justify-center gap-2 text-[10px] text-[#8197a9]"><LockKeyhole size={12} /> Tus datos están protegidos y no serán vendidos.</p></form>}</div>
        </section>
        <footer className="border-t border-white/10 pb-5 pt-8 text-[11px] leading-relaxed text-[#8fa3b4]"><div className="grid gap-6 sm:grid-cols-[1fr_auto]"><div><p className="font-display text-sm font-700 text-[#c9d6df]">Fondus</p><p className="mt-2 max-w-md">Botón de arrepentimiento - Tenés 10 días para arrepentirte</p><button type="button" className="mt-2 text-left underline underline-offset-2 transition hover:text-[#dfb45d]" data-testid="button-general-conditions">Condiciones generales</button><p className="mt-2">No contamos con cobradores a domicilio.</p></div><div className="flex items-start gap-3 sm:text-right"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 font-mono-custom text-[10px] text-[#dfb45d]">IGJ</div><span>Inscripto y<br />regulado</span></div></div><p className="mt-8 border-t border-white/10 pt-5 text-[10px] text-[#657f94]">La información es orientativa y no constituye una oferta contractual. Las condiciones de adjudicación se encuentran detalladas en el contrato de adhesión.</p></footer>
      </div>
    </motion.main>
  );
}

function App() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [contribution, setContribution] = useState('');
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
          // Si el navegador restringe el autoplay con sonido, se silencia para continuar la reproducción
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
    }

    // Al primer clic o interacción del usuario, activar el audio automáticamente
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

  const chooseGoal = (selected: Goal) => {
    setGoal(selected);
    setCalculating(true);
    window.setTimeout(() => { setCalculating(false); setStep(3); }, 1500);
  };
  const answer = (amount: string) => { setContribution(amount); window.setTimeout(() => setStep(4), 800); };
  const back = () => { if (step > 1 && !calculating) setStep(step - 1); };
  return (
    <div className="grain min-h-[100dvh] overflow-hidden bg-[#0a1f38]">
      <BackgroundVideo videoRef={videoRef} isMuted={isMuted} />
      {step < 5 && <StepHeader step={step} onBack={back} isMuted={isMuted} onToggleMute={toggleMute} />}
      <AnimatePresence mode="wait">
        {calculating ? <motion.div key="calculating" {...fadeUp} className="relative z-10 flex min-h-[calc(100dvh-93px)] flex-col items-center justify-center px-6 text-center"><div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#dfb45d]/35"><span className="absolute inset-1 rounded-full border border-dashed border-[#dfb45d] animate-spin" /><Zap className="text-[#dfb45d]" size={27} /></div><h2 className="mt-8 font-display text-2xl font-800 text-[#f8f6f0]">Calculando posibilidades...</h2><p className="mt-3 text-sm text-[#b9c9d6]">Buscando una cuota que pueda acompañar tu meta.</p></motion.div> :
          step === 1 ? <StepOne key="step1" onStart={() => setStep(2)} /> :
            step === 2 ? <StepTwo key="step2" onChoose={chooseGoal} goal={goal} /> :
              step === 3 ? <StepThree key="step3" goal={goal} onAnswer={answer} /> :
                step === 4 ? <StepFour key="step4" onContinue={() => setStep(5)} /> :
                  <StepFive
                    key="step5"
                    onPlayTestimonial={() => { if (videoRef.current) videoRef.current.pause(); }}
                    onPauseTestimonial={() => { if (videoRef.current) videoRef.current.play().catch(() => {}); }}
                  />}
      </AnimatePresence>
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
      {step === 3 && contribution && <span className="sr-only">{contribution}</span>}
    </div>
  );
}

export default App;