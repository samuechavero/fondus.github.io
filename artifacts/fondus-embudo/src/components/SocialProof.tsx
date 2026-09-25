import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const NAMES = [
  'Martín G.',
  'Valeria R.',
  'Lucas T.',
  'Camila M.',
  'Facundo S.',
  'Sofía L.',
  'Joaquín P.',
];

const LOCATIONS = [
  'Córdoba',
  'Buenos Aires',
  'Rosario',
  'Mendoza',
  'Neuquén',
  'Tucumán',
];

const PLANS = [
  'O. de compra $7.500.000',
  'O. de compra $10.000.000',
  'O. de compra $20.000.000',
  'Moto 0KM',
  'Auto 0KM',
];

interface ToastData {
  id: number;
  name: string;
  location: string;
  plan: string;
  position: 'left' | 'right';
}

export function SocialProof() {
  const [currentToast, setCurrentToast] = useState<ToastData | null>(null);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    let lastPos: 'left' | 'right' = 'right';

    const showNextToast = () => {
      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      const randomLocation = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      const randomPlan = PLANS[Math.floor(Math.random() * PLANS.length)];
      
      // Alternar dinámicamente entre izquierda y derecha
      const nextPos: 'left' | 'right' = lastPos === 'left' ? 'right' : 'left';
      lastPos = nextPos;

      setCurrentToast({
        id: Date.now(),
        name: randomName,
        location: randomLocation,
        plan: randomPlan,
        position: nextPos,
      });

      // Permanece en pantalla 2.5 segundos y se desvanece suavemente antes de los 3s
      hideTimer = setTimeout(() => {
        setCurrentToast(null);
      }, 2500);
    };

    // Primera aparición inmediata
    showNextToast();

    // Intervalo de exactamente 3000ms (3 segundos)
    const interval = setInterval(showNextToast, 3000);

    return () => {
      clearInterval(interval);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {currentToast && (
          <motion.div
            key={currentToast.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, y: 15, transition: { duration: 0.35, ease: 'easeOut' } }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className={`pointer-events-auto fixed ${
              currentToast.position === 'left' ? 'bottom-4 left-4' : 'bottom-4 right-4'
            } z-50 flex max-w-[90vw] items-center gap-3 rounded-xl border border-slate-100 border-l-4 border-l-[#93c46d] bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md sm:max-w-sm`}
          >
            {/* Ícono de validación en verde institucional Fondus */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#93c46d]/15 text-[#93c46d] shadow-sm">
              <CheckCircle2 size={20} className="text-[#93c46d] stroke-[2.5]" />
            </div>

            <div className="min-w-0 flex-1 text-left">
              {/* Título en Azul marino: "[Nombre] de [Ubicación]" */}
              <p className="truncate text-xs font-bold text-[#1d497f]">
                {currentToast.name} de {currentToast.location}
              </p>

              {/* Cuerpo en Gris oscuro: "Se acaba de adherir al plan de [Plan]" */}
              <p className="mt-0.5 text-[11px] font-medium text-slate-600 leading-snug">
                Se acaba de adherir al plan de <span className="font-semibold text-slate-800">{currentToast.plan}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SocialProof;
