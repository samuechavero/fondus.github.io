import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const NAMES = [
  'Facundo G.',
  'Valentina M.',
  'Martín T.',
  'Camila S.',
  'Lucas R.',
  'Agustín B.',
  'Florencia P.',
  'Santiago M.',
  'Sofía L.',
  'Joaquín D.',
  'Nicolás V.',
  'Lucía R.',
];

const LOCATIONS = [
  'de Córdoba',
  'de Rosario',
  'de CABA',
  'de Mendoza',
  'de Mar del Plata',
  'de Salta',
  'de Santa Fe',
  'de Neuquén',
];

const PLANS = [
  'Orden de compra $7.500.000',
  'Orden de compra $10.000.000',
  'Orden de compra $20.000.000',
  'Moto 0KM',
  'Auto 0KM',
];

interface NotificationData {
  id: number;
  name: string;
  location: string;
  plan: string;
  timeAgo: string;
}

export function SocialProofToasts() {
  const [notification, setNotification] = useState<NotificationData | null>(null);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    let nextTimer: ReturnType<typeof setTimeout> | null = null;
    let isSubscribed = true;

    const triggerNotification = () => {
      if (!isSubscribed) return;

      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      const randomLocation = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      const randomPlan = PLANS[Math.floor(Math.random() * PLANS.length)];
      const randomSeconds = Math.floor(Math.random() * 45) + 5;

      const newNotif: NotificationData = {
        id: Date.now(),
        name: randomName,
        location: randomLocation,
        plan: randomPlan,
        timeAgo: `hace ${randomSeconds}s`,
      };

      setNotification(newNotif);

      // Cada notificación permanece visible exactamente durante 5 segundos
      hideTimer = setTimeout(() => {
        if (!isSubscribed) return;
        setNotification(null);

        // Intervalo aleatorio entre 10 y 25 segundos para la próxima notificación
        const nextDelay = Math.floor(Math.random() * (25000 - 10000 + 1)) + 10000;
        nextTimer = setTimeout(triggerNotification, nextDelay);
      }, 5000);
    };

    // Primera aparición tras 6 segundos
    const initialDelay = 6000;
    const initialTimer = setTimeout(triggerNotification, initialDelay);

    return () => {
      isSubscribed = false;
      clearTimeout(initialTimer);
      if (hideTimer) clearTimeout(hideTimer);
      if (nextTimer) clearTimeout(nextTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none max-w-[90vw] sm:max-w-sm">
      <AnimatePresence mode="wait">
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            className="pointer-events-auto flex items-center gap-3.5 rounded-2xl border border-sky-200 bg-white p-4 shadow-2xl text-left"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 shadow-sm border border-green-200">
              <CheckCircle2 size={22} className="text-green-600 stroke-[2.5]" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs font-semibold text-slate-700">
                  {notification.name} <span className="font-normal text-slate-500">{notification.location}</span>
                </p>
                <span className="shrink-0 text-[10px] text-slate-400 font-medium">
                  {notification.timeAgo}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-blue-900 font-bold leading-snug">
                Se suscribió al plan: <span className="text-[#0a2342]">{notification.plan}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SocialProofToasts;
