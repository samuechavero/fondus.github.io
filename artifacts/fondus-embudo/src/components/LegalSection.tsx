import { type FormEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileDown,
  Info,
  Mail,
  Send,
  Sparkles,
  TrendingUp,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// ----------------------------------------------------
// Modal Reutilizable con overlay y bloqueo de scroll
// ----------------------------------------------------
export function BaseLegalModal({ isOpen, onClose, title, children }: LegalModalProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white text-slate-800 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b-2 border-[#93c46d] bg-[#1d497f] px-6 py-4 text-white">
          <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-200 transition hover:bg-white/10 hover:text-white"
            aria-label="Cerrar modal"
          >
            <X size={19} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------
// Modal Visor de Documentos Interactivo con Pinch-to-Zoom (react-zoom-pan-pinch + react-pdf)
// ----------------------------------------------------
export function InteractiveDocumentModal({
  isOpen,
  onClose,
  activeDocument,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeDocument: string;
  title: string;
}) {
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

  if (!isOpen || !activeDocument) return null;

  const docSrc = activeDocument.startsWith('/')
    ? `${import.meta.env.BASE_URL}${activeDocument.replace(/^\//, '')}`
    : activeDocument;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 sm:p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white text-slate-800 shadow-2xl border border-slate-300"
      >
        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={4}
          centerOnInit
          wheel={{ step: 0.15 }}
          pinch={{ step: 5 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Cabecera corporativa con botones de zoom */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#93c46d] bg-[#1d497f] px-5 py-3.5 text-white z-10 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#93c46d] text-[#1d497f] font-bold">
                    <FileDown size={17} />
                  </div>
                  <div>
                    <h3 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                      {title}
                    </h3>
                    <p className="text-[10px] text-[#93c46d] font-mono-custom">
                      Pinch-to-zoom táctil y controles interactivos
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-xl bg-white/10 px-2 py-1 text-xs">
                    <button
                      type="button"
                      onClick={() => zoomOut()}
                      className="rounded p-1 text-slate-200 transition hover:bg-white/20 hover:text-white"
                      title="Alejar"
                    >
                      <ZoomOut size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => zoomIn()}
                      className="rounded p-1 text-slate-200 transition hover:bg-white/20 hover:text-white"
                      title="Acercar"
                    >
                      <ZoomIn size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => resetTransform()}
                      className="ml-1 flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-[11px] text-slate-200 hover:bg-white/20"
                      title="Restablecer vista"
                    >
                      <RotateCcw size={12} />
                      <span className="hidden sm:inline">100%</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg p-1.5 text-slate-200 transition hover:bg-white/10 hover:text-white"
                    aria-label="Cerrar visor"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Área del Visor con TransformComponent y soporte táctil */}
              <div className="relative flex-1 overflow-hidden bg-slate-100 flex items-center justify-center">
                <TransformComponent 
                  wrapperClass="w-full h-[80vh] overflow-hidden touch-pan-x touch-pan-y rounded-md bg-gray-100" 
                  contentClass="w-full h-full flex justify-center items-center"
                >
                  {activeDocument.endsWith('.pdf') ? (
                    <object
                      data={docSrc}
                      type="application/pdf"
                      className="w-full h-full"
                    >
                      <iframe src={docSrc} className="w-full h-full border-none" title="Documento Fondus" />
                    </object>
                  ) : (
                    <img 
                      src={docSrc} 
                      alt="Documento Oficial Fondus" 
                      className="w-full h-auto object-contain cursor-zoom-in" 
                    />
                  )}
                </TransformComponent>
              </div>

              {/* Pie institucional */}
              <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3">
                <span className="text-[11px] text-slate-500 font-medium">
                  Fondus S.A. · Documento regulado bajo Resolución IGJ RES 000289/11
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl bg-[#1d497f] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#153863]"
                >
                  Cerrar Visor
                </button>
              </div>
            </>
          )}
        </TransformWrapper>
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------
// Modal 1: SORTEO
// ----------------------------------------------------
export function SorteoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <BaseLegalModal isOpen={isOpen} onClose={onClose} title="SORTEO">
      <div className="space-y-5 text-sm leading-relaxed text-slate-700">
        <p className="font-medium text-slate-900 text-base">
          El sorteo mensual se realiza a través de Quiniela de la Lotería de la Ciudad de Buenos Aires (LOTBA S.E.), el último sábado de cada mes, última jugada.
        </p>

        <p>
          En caso de que LOTBA S.E. no efectuase el último sábado &ldquo;sorteos de lotería&rdquo; se tomará para la adjudicación el que realice LOTBA S.E. para sí el último sábado de cada mes como última jugada de Quiniela.
        </p>

        <p>
          Si LOTBA S.E. no realizará para sí, el último sábado de cada mes sorteos de Lotería o Quiniela, se tomará para la adjudicación, el primer sorteo de Quiniela que realice para sí LOTBA S.E. con posterioridad al último sábado sin sorteo.
        </p>

        {/* Pie del modal con sello oficial IGJ */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6 shadow-inner">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1d497f] font-mono-custom text-sm font-black text-[#93c46d] shadow-sm">
                IGJ
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                  Inspección General de Justicia
                </p>
                <p className="text-[11px] text-slate-500">
                  Ministerio de Justicia y Derechos Humanos · Presidencia de la Nación
                </p>
              </div>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-slate-300 pt-3 sm:pt-0 sm:pl-5 text-center sm:text-right">
              <p className="text-xs font-bold text-[#1d497f]">
                Planes Aprobados RES 000289/11
              </p>
              <p className="font-mono-custom text-xs font-semibold text-[#1d497f] mt-0.5">
                0800-3333-445
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#1d497f] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#153863]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </BaseLegalModal>
  );
}

// ----------------------------------------------------
// Modal 2: PARTICIPACIÓN Y RENDIMIENTOS
// ----------------------------------------------------
export function RendimientosModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <BaseLegalModal isOpen={isOpen} onClose={onClose} title="PARTICIPACIÓN Y RENDIMIENTOS">
      <div className="space-y-4 text-xs sm:text-[13px] leading-relaxed text-slate-700">
        <h4 className="font-bold text-[#1d497f] uppercase tracking-wider text-sm sm:text-base border-b border-slate-200 pb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#93c46d]" />
          PARTICIPACION EN LOS RESULTADOS FINANCIEROS
        </h4>

        <p className="font-semibold text-slate-900">
          Los Titulares participarán en los resultados de las inversiones de sus Reservas Matemáticas de acuerdo al siguiente esquema:
        </p>

        <div className="space-y-3.5 pl-1">
          <p>
            <strong className="text-slate-900">a-</strong> Mensualmente se calculará la tasa de rendimiento promedio de las inversiones que respaldan a la Reserva Matemática. A tales efectos se tomarán los intereses devengados de los Títulos Públicos, los Alquileres, los Intereses de las Prendas e Hipotecas y todo otro rendimiento proveniente de las inversiones permitidas por el Decreto N° 142.277/43, sus modificaciones y de toda otra disposición futura sobre inversiones, dictada por el Organismo competente. La tasa de rendimiento promedio se obtiene dividiendo el total de la rentabilidad obtenida por el total de la Reserva Matemática invertida.
          </p>

          <p>
            <strong className="text-slate-900">b-</strong> La unidad más el rendimiento determinado en (a) se lo dividirá por 1,00371 (uno más la tasa de interés técnico).
          </p>

          <p>
            <strong className="text-slate-900">c-</strong> El cociente determinado en (b) &ndash;que nunca podrá ser inferior a 1&ndash; menos la unidad será la tasa de rendimiento promedio mensual de las inversiones netas de la tasa técnica.
          </p>

          <p>
            <strong className="text-slate-900">d-</strong> De esta tasa se participará el 50 % a los Titulares, lo que constituirá el coeficiente de participación.
          </p>

          <p>
            <strong className="text-slate-900">e-</strong> El coeficiente de participación determinado en (d) se aplicará a las Reservas Matemáticas que dieron lugar a la rentabilidad, determinando de ese modo la participación en el resultado de las operaciones financieras de cada Titular.
          </p>

          <p>
            <strong className="text-slate-900">f-</strong> La participación determinada en (e) se adicionará mensualmente a la Reserva Matemática del Titular, pero se contabilizará en forma separada a efectos de su mejor individualización. La participación en los resultados financieros determinada mediante el procedimiento indicado en el presente artículo, será invertida conjuntamente con la Reserva Matemática de cada Titular y participará de los rendimientos mensuales de las inversiones en los meses sucesivos. Al formar parte de la Reserva Matemática esta participación se cobrará: 1- en el momento en que el Titular solicite el Rescate, según el artículo octavo; ó 2- cuando salga favorecido por sorteo en la proporción correspondiente a la Reserva Matemática alcanzada ó 3- al final del vencimiento del plazo del contrato, según el artículo cuarto.
          </p>
        </div>

        <div className="mt-6 flex justify-end border-t border-slate-200 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#1d497f] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#153863]"
          >
            Entendido
          </button>
        </div>
      </div>
    </BaseLegalModal>
  );
}

// ----------------------------------------------------
// Modal 3: Botón de Arrepentimiento
// ----------------------------------------------------
export function ArrepentimientoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendEmail = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Solicitud de Arrepentimiento - DNI ${dni} - ${name}`);
    const body = encodeURIComponent(
      `Estimado equipo de Fondus:\n\nPor medio de la presente, solicito ejercer mi derecho legal de revocación/arrepentimiento de mi solicitud de adhesión conforme a los términos de la Ley de Defensa del Consumidor (Art. 34 Ley 24.240).\n\nDatos del titular:\nNombre: ${name}\nDNI: ${dni}\nEmail: ${email}\nMotivo: ${reason || 'Revocación voluntaria dentro del plazo legal'}\n\nQuedo a la espera de la confirmación formal.`
    );
    window.location.href = `mailto:arrepentimiento@fondus.com.ar?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <BaseLegalModal isOpen={isOpen} onClose={onClose} title="BOTÓN DE ARREPENTIMIENTO">
      {sent ? (
        <div className="text-center py-6">
          <CheckCircle2 size={46} className="mx-auto text-[#93c46d]" />
          <h4 className="mt-4 font-bold text-lg text-slate-900">Solicitud de Revocación Iniciada</h4>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
            Hemos abierto tu cliente de correo para enviar la solicitud a <strong>arrepentimiento@fondus.com.ar</strong>. Tu revocación está protegida por la Ley 24.240.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 rounded-xl bg-[#1d497f] px-6 py-2.5 text-xs font-bold uppercase text-white"
          >
            Cerrar
          </button>
        </div>
      ) : (
        <form onSubmit={handleSendEmail} className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Tenés <strong>10 días corridos</strong> contados a partir de la suscripción para ejercer tu derecho de revocación sin costo alguno, conforme a la normativa vigente de Defensa del Consumidor.
          </p>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">Nombre completo</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#93c46d] focus:bg-white"
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">DNI</label>
              <input
                required
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#93c46d] focus:bg-white"
                placeholder="Número de documento"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">Correo electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#93c46d] focus:bg-white"
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">Motivo (opcional)</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#93c46d] focus:bg-white"
              placeholder="Indicanos brevemente el motivo..."
            />
          </div>

          <button
            type="submit"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1d497f] py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#153863]"
          >
            <Send size={14} /> Enviar correo de revocación
          </button>
        </form>
      )}
    </BaseLegalModal>
  );
}

// ----------------------------------------------------
// ----------------------------------------------------
// Componente Principal del Módulo Legal en el Footer
// ----------------------------------------------------
export function LegalFooterSection() {
  const [isArrepentimientoOpen, setIsArrepentimientoOpen] = useState(false);

  // Estado para el visor interactivo de documentos (PDFs e imágenes)
  const [activeDocument, setActiveDocument] = useState<string | null>(null);

  const getDocTitle = (docPath: string | null) => {
    if (!docPath) return 'Documento Legal';
    if (docPath.includes('condiciones')) return 'Condiciones Generales';
    if (docPath.includes('titulo')) return 'Título de Capitalización';
    if (docPath.includes('rescate')) return 'Tabla de Rescate y Endoso';
    if (docPath.includes('sorteo')) return 'Sorteo Oficial LOTBA S.E.';
    if (docPath.includes('participacion')) return 'Participación y Rendimientos Financieros';
    return 'Documento Oficial Fondus';
  };

  return (
    <div className="w-full">
      {/* Sección CONDICIONES GENERALES con 5 Botones Interactivos in-page */}
      <div className="rounded-2xl border border-white/15 bg-white/[.04] p-6 backdrop-blur-sm sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h4 className="font-display text-sm font-extrabold uppercase tracking-[.18em] text-[#93c46d]">
              Condiciones Generales & Documentación
            </h4>
            <p className="mt-1 text-xs text-[#d8e3ed]">
              Consultá los contratos oficiales y términos regulatorios de Fondus S.A. en pantalla interactiva con zoom táctil.
            </p>
          </div>
          <span className="font-mono-custom text-[10px] uppercase tracking-wider text-[#93c46d] bg-[#93c46d]/15 px-3 py-1 rounded-full w-fit">
            Planes Aprobados RES 000289/11
          </span>
        </div>

        {/* Los 5 botones corporativos con setActiveDocument estrictamente a los archivos de public */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Botón 1: Modal CONDICIONES GENERALES */}
          <button
            type="button"
            onClick={() => setActiveDocument('/condiciones.pdf')}
            className="group flex flex-col justify-between rounded-xl border border-white/15 bg-[#1d497f]/90 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#93c46d] hover:bg-[#255793] hover:shadow-lg text-left"
            data-testid="link-view-condiciones"
          >
            <div className="flex items-center justify-between text-[#93c46d]">
              <FileDown size={19} className="transition-transform group-hover:scale-110" />
              <span className="font-mono-custom text-[9px] uppercase tracking-wider text-[#d8e3ed]">PDF Oficial</span>
            </div>
            <div className="mt-3">
              <p className="font-display text-xs font-bold text-white leading-tight">
                CONDICIONES GENERALES
              </p>
              <p className="mt-1 text-[10px] text-[#c0d1e3] leading-tight">
                Objeto, cálculo de cuotas y normativas IGJ
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[#93c46d] uppercase tracking-wider">
              <span>Ver documento</span>
              <Info size={11} />
            </div>
          </button>

          {/* Botón 2: Modal TÍTULO DE CAPITALIZACIÓN */}
          <button
            type="button"
            onClick={() => setActiveDocument('/titulo.pdf')}
            className="group flex flex-col justify-between rounded-xl border border-white/15 bg-[#1d497f]/90 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#93c46d] hover:bg-[#255793] hover:shadow-lg text-left"
            data-testid="link-view-titulo"
          >
            <div className="flex items-center justify-between text-[#93c46d]">
              <FileDown size={19} className="transition-transform group-hover:scale-110" />
              <span className="font-mono-custom text-[9px] uppercase tracking-wider text-[#d8e3ed]">PDF Modelo</span>
            </div>
            <div className="mt-3">
              <p className="font-display text-xs font-bold text-white leading-tight">
                TÍTULO DE CAPITALIZACIÓN
              </p>
              <p className="mt-1 text-[10px] text-[#c0d1e3] leading-tight">
                Modelo del título, vigencia y capital nominal
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[#93c46d] uppercase tracking-wider">
              <span>Ver documento</span>
              <Info size={11} />
            </div>
          </button>

          {/* Botón 3: Modal TABLA DE RESCATE Y ENDOSO */}
          <button
            type="button"
            onClick={() => setActiveDocument('/rescate.pdf')}
            className="group flex flex-col justify-between rounded-xl border border-white/15 bg-[#1d497f]/90 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#93c46d] hover:bg-[#255793] hover:shadow-lg text-left"
            data-testid="link-view-rescate"
          >
            <div className="flex items-center justify-between text-[#93c46d]">
              <FileDown size={19} className="transition-transform group-hover:scale-110" />
              <span className="font-mono-custom text-[9px] uppercase tracking-wider text-[#d8e3ed]">PDF Tabla</span>
            </div>
            <div className="mt-3">
              <p className="font-display text-xs font-bold text-white leading-tight">
                TABLA DE RESCATE Y ENDOSO
              </p>
              <p className="mt-1 text-[10px] text-[#c0d1e3] leading-tight">
                Valores matemáticos para planes de 300 meses
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[#93c46d] uppercase tracking-wider">
              <span>Ver documento</span>
              <Info size={11} />
            </div>
          </button>

          {/* Botón 4: Modal SORTEO */}
          <button
            type="button"
            onClick={() => setActiveDocument('/sorteo.jpg')}
            className="group flex flex-col justify-between rounded-xl border border-white/15 bg-[#153863] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#93c46d] hover:bg-[#1d497f] hover:shadow-lg text-left"
            data-testid="button-modal-sorteo"
          >
            <div className="flex items-center justify-between text-[#93c46d]">
              <Sparkles size={19} className="transition-transform group-hover:scale-110" />
              <span className="font-mono-custom text-[9px] uppercase tracking-wider text-[#d8e3ed]">Modal Rápido</span>
            </div>
            <div className="mt-3">
              <p className="font-display text-xs font-bold text-white leading-tight">
                SORTEO
              </p>
              <p className="mt-1 text-[10px] text-[#c0d1e3] leading-tight">
                Quiniela LOTBA S.E. y dinámica mensual
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[#93c46d] uppercase tracking-wider">
              <span>Ver información</span>
              <Info size={11} />
            </div>
          </button>

          {/* Botón 5: Modal PARTICIPACIÓN Y RENDIMIENTOS */}
          <button
            type="button"
            onClick={() => setActiveDocument('/participacion.jpg')}
            className="group flex flex-col justify-between rounded-xl border border-white/15 bg-[#153863] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#93c46d] hover:bg-[#1d497f] hover:shadow-lg text-left"
            data-testid="button-modal-rendimientos"
          >
            <div className="flex items-center justify-between text-[#93c46d]">
              <TrendingUp size={19} className="transition-transform group-hover:scale-110" />
              <span className="font-mono-custom text-[9px] uppercase tracking-wider text-[#d8e3ed]">Modal Rápido</span>
            </div>
            <div className="mt-3">
              <p className="font-display text-xs font-bold text-white leading-tight">
                PARTICIPACIÓN Y RENDIMIENTOS
              </p>
              <p className="mt-1 text-[10px] text-[#c0d1e3] leading-tight">
                Reservas matemáticas y Decreto 142.277/43
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[#93c46d] uppercase tracking-wider">
              <span>Ver esquema (a-f)</span>
              <Info size={11} />
            </div>
          </button>
        </div>
      </div>

      {/* Enlaces complementarios: Arrepentimiento y Advertencia de cobradores */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsArrepentimientoOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-[#93c46d] hover:text-[#93c46d]"
            data-testid="button-arrepentimiento-trigger"
          >
            <Mail size={14} className="text-[#93c46d]" />
            <span>Botón de arrepentimiento</span>
            <span className="text-[10px] text-[#c0d1e3] font-normal">(10 días de revocación)</span>
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-[#93c46d]">
            <AlertTriangle size={14} />
            <span>NO contamos con cobradores a domicilio.</span>
          </div>
        </div>
      </div>

      {/* Bloque Oficial de Certificación IGJ en el Footer */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-center rounded-2xl bg-[#e6e6e6] py-8 px-4 shadow-sm">
        {/* Bloque Izquierdo: Identidad Gubernamental */}
        <div className="flex flex-col items-center md:items-start">
          {/* Fila superior: Texto "IGJ" muy grande y logotipo circular azul */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-6xl font-bold text-black tracking-tighter leading-none select-none">
              IGJ
            </span>
            <img
              src={`${import.meta.env.BASE_URL}igj-logo.png`}
              alt="Logotipo circular azul IGJ"
              className="h-14 w-14 object-contain"
            />
          </div>

          {/* Fila inferior: Escudo argentino alineado a la izquierda junto al texto ministerial */}
          <div className="mt-3 flex items-center justify-center md:justify-start gap-2">
            <img
              src={`${import.meta.env.BASE_URL}escudo-argentina.png`}
              alt="Escudo de la República Argentina"
              className="h-7 w-auto object-contain shrink-0"
            />
            <div className="text-[10px] leading-tight text-black font-medium text-left">
              <p>Ministerio de</p>
              <p>Justicia y Derechos Humanos</p>
              <p className="border border-black/40 px-1 py-0.2 mt-0.5 inline-block font-semibold">
                Presidencia de la Nación
              </p>
            </div>
          </div>
        </div>

        {/* Divisor Vertical */}
        <div className="hidden md:block h-24 w-2 bg-black mx-6 rounded-full" />
        <div className="block md:hidden w-36 h-1.5 bg-black my-6 rounded-full" />

        {/* Bloque Derecho: Resolución y Contacto */}
        <div className="flex flex-col text-left text-black justify-center">
          <p className="text-xs font-bold leading-snug">
            Planes Aprobados
          </p>
          <p className="text-sm font-medium leading-snug">
            RES 000289/11
          </p>
          <p className="text-sm font-medium leading-snug">
            0800-3333-445
          </p>
        </div>
      </div>

      {/* Modal Visor Interactivo con Pinch-to-Zoom para PDFs e Imágenes */}
      <InteractiveDocumentModal
        isOpen={Boolean(activeDocument)}
        onClose={() => setActiveDocument(null)}
        activeDocument={
          activeDocument
            ? `${import.meta.env.BASE_URL}${activeDocument.replace(/^\//, '')}`
            : ''
        }
        title={getDocTitle(activeDocument)}
      />
      <ArrepentimientoModal isOpen={isArrepentimientoOpen} onClose={() => setIsArrepentimientoOpen(false)} />
    </div>
  );
}

export default LegalFooterSection;
