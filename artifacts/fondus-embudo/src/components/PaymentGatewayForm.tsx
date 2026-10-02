import { useState, useId } from "react";
import {
  CreditCard,
  LockKeyhole,
  CheckCircle2,
  AlertCircle,
  Calendar,
  UserRound,
  ShieldCheck,
  Building2,
} from "lucide-react";

export interface PaymentData {
  method: "credit_card" | "direct_debit";
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

interface PaymentGatewayFormProps {
  paymentData: PaymentData;
  onChange: (data: PaymentData) => void;
}

export function detectCardBrand(number: string): string {
  const clean = number.replace(/\D/g, "");
  if (/^4/.test(clean)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(clean)) return "Mastercard";
  if (/^3[47]/.test(clean)) return "American Express";
  if (/^(5895|5896)/.test(clean)) return "NaranjaX";
  if (/^(58|60|63)/.test(clean)) return "Cabal";
  return "Tarjeta";
}

export function formatCardNumber(value: string): string {
  const clean = value.replace(/\D/g, "").slice(0, 19);
  return clean.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function formatExpiry(value: string): string {
  const clean = value.replace(/\D/g, "").slice(0, 4);
  if (clean.length >= 3) {
    return clean.slice(0, 2) + "/" + clean.slice(2);
  }
  return clean;
}

export function isPaymentDataValid(paymentData: PaymentData): boolean {
  const cleanNumber = paymentData.cardNumber.replace(/\D/g, "");
  const isCardNumberValid = cleanNumber.length >= 15 && cleanNumber.length <= 19;
  const isCardHolderValid = paymentData.cardHolder.trim().length >= 3;

  const expiryClean = paymentData.expiry.replace(/\D/g, "");
  const expMonth = parseInt(expiryClean.slice(0, 2), 10);
  const expYear = parseInt(expiryClean.slice(2, 4), 10);
  const isExpiryValid =
    expiryClean.length === 4 &&
    expMonth >= 1 &&
    expMonth <= 12 &&
    expYear >= 24 &&
    expYear <= 45;

  const cleanCvv = paymentData.cvv.replace(/\D/g, "");
  const isCvvValid = cleanCvv.length >= 3 && cleanCvv.length <= 4;

  return isCardNumberValid && isCardHolderValid && isExpiryValid && isCvvValid;
}

export function PaymentGatewayForm({
  paymentData,
  onChange,
}: PaymentGatewayFormProps) {
  const cardNumberId = useId();
  const cardHolderId = useId();
  const expiryId = useId();
  const cvvId = useId();

  const [touched, setTouched] = useState<{
    cardNumber?: boolean;
    cardHolder?: boolean;
    expiry?: boolean;
    cvv?: boolean;
  }>({});

  const cleanNumber = paymentData.cardNumber.replace(/\D/g, "");
  const brand = detectCardBrand(cleanNumber);

  const isCardNumberValid = cleanNumber.length >= 15 && cleanNumber.length <= 19;
  const isCardHolderValid = paymentData.cardHolder.trim().length >= 3;

  const expiryClean = paymentData.expiry.replace(/\D/g, "");
  const expMonth = parseInt(expiryClean.slice(0, 2), 10);
  const expYear = parseInt(expiryClean.slice(2, 4), 10);
  const isExpiryValid =
    expiryClean.length === 4 &&
    expMonth >= 1 &&
    expMonth <= 12 &&
    expYear >= 24 &&
    expYear <= 45;

  const cleanCvv = paymentData.cvv.replace(/\D/g, "");
  const isCvvValid = cleanCvv.length >= 3 && cleanCvv.length <= 4;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    onChange({ ...paymentData, cardNumber: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    onChange({ ...paymentData, expiry: formatted });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, "").slice(0, 4);
    onChange({ ...paymentData, cvv: clean });
  };

  const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...paymentData, cardHolder: e.target.value.toUpperCase() });
  };

  return (
    <div className="space-y-4 rounded-2xl border border-white/20 bg-[#0f2847] p-5 shadow-xl transition-all sm:p-6">
      {/* Encabezado de la pasarela */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
        <div>
          <h4 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-white">
            <CreditCard size={18} className="text-[#93c46d]" />
            Pasarela de Cobro y Adhesión
          </h4>
          <p className="text-[11px] text-[#c0d1e3]">
            Configurá tu medio de pago para la cuota mensual de capitalización
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-[#153863] px-3 py-1 text-[10px] font-semibold text-[#93c46d] border border-[#93c46d]/30">
          <ShieldCheck size={13} />
          <span>Encriptación SSL 256-bit</span>
        </div>
      </div>

      {/* Selector de Modalidad: Tarjeta de Crédito / Débito Automático */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onChange({ ...paymentData, method: "credit_card" })}
          className={
            "flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold transition " +
            (paymentData.method === "credit_card"
              ? "bg-[#93c46d] text-[#1d497f] shadow-md"
              : "border border-white/15 bg-white/5 text-[#c0d1e3] hover:bg-white/10")
          }
          data-testid="tab-payment-credit"
        >
          <CreditCard size={15} />
          <span>Tarjeta de Crédito</span>
        </button>

        <button
          type="button"
          onClick={() => onChange({ ...paymentData, method: "direct_debit" })}
          className={
            "flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold transition " +
            (paymentData.method === "direct_debit"
              ? "bg-[#93c46d] text-[#1d497f] shadow-md"
              : "border border-white/15 bg-white/5 text-[#c0d1e3] hover:bg-white/10")
          }
          data-testid="tab-payment-debit"
        >
          <Building2 size={15} />
          <span>Débito Automático</span>
        </button>
      </div>

      {/* Tarjeta Visual Interactiva */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-[#153863] via-[#1d497f] to-[#255793] p-4 text-white shadow-lg border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-6 w-9 rounded bg-amber-400/80 border border-amber-300 shadow-inner flex items-center justify-center">
              <div className="h-3 w-4 border border-amber-600/40 rounded-sm" />
            </div>
            <span className="text-[10px] font-mono-custom tracking-wider text-white/70 uppercase">
              {paymentData.method === "credit_card" ? "Crédito" : "Débito"}
            </span>
          </div>
          <span className="font-display font-bold text-xs uppercase tracking-wider text-[#93c46d] bg-black/30 px-2 py-0.5 rounded">
            {cleanNumber.length > 0 ? brand : "FONDUS DIGITAL"}
          </span>
        </div>

        <div className="mt-4 font-mono-custom text-base sm:text-lg tracking-[0.2em] font-bold text-white drop-shadow">
          {paymentData.cardNumber || "•••• •••• •••• ••••"}
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-white/80">
          <div>
            <p className="text-[8px] uppercase tracking-wider text-[#9bb3ca]">Titular</p>
            <p className="font-semibold uppercase tracking-wider truncate max-w-[170px]">
              {paymentData.cardHolder || "NOMBRE Y APELLIDO"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[8px] uppercase tracking-wider text-[#9bb3ca]">Vence</p>
            <p className="font-mono-custom font-semibold">{paymentData.expiry || "MM/AA"}</p>
          </div>
        </div>
      </div>

      {/* Inputs del Formulario */}
      <div className="space-y-3.5 pt-1">
        {/* Número de Tarjeta */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor={cardNumberId}
              className="text-xs font-bold uppercase tracking-[.12em] text-[#d8e3ed]"
            >
              Número de tarjeta
            </label>
            {touched.cardNumber && (
              <span className="text-[10px] flex items-center gap-1 font-semibold">
                {isCardNumberValid ? (
                  <span className="text-[#93c46d] flex items-center gap-0.5">
                    <CheckCircle2 size={12} /> Válido ({brand})
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-0.5">
                    <AlertCircle size={12} /> 16 dígitos requeridos
                  </span>
                )}
              </span>
            )}
          </div>
          <div className="relative">
            <CreditCard className="absolute left-4 top-3.5 text-[#9bb3ca]" size={16} />
            <input
              id={cardNumberId}
              type="tel"
              inputMode="numeric"
              required
              value={paymentData.cardNumber}
              onChange={handleCardNumberChange}
              onBlur={() => setTouched((prev) => ({ ...prev, cardNumber: true }))}
              placeholder="1234 5678 9012 3456"
              className={
                "w-full rounded-xl border bg-[#102c4f] py-3 pl-11 pr-10 text-sm text-white outline-none transition placeholder:text-[#6a87a4] " +
                (touched.cardNumber
                  ? isCardNumberValid
                    ? "border-[#93c46d] focus:border-[#93c46d] ring-1 ring-[#93c46d]/40"
                    : "border-rose-400 focus:border-rose-400 ring-1 ring-rose-400/40"
                  : "border-white/15 focus:border-[#93c46d]")
              }
              data-testid="input-card-number"
            />
            {touched.cardNumber && isCardNumberValid && (
              <CheckCircle2 className="absolute right-3.5 top-3.5 text-[#93c46d]" size={16} />
            )}
          </div>
        </div>

        {/* Titular de la Tarjeta */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor={cardHolderId}
              className="text-xs font-bold uppercase tracking-[.12em] text-[#d8e3ed]"
            >
              Titular de la tarjeta
            </label>
            {touched.cardHolder && (
              <span className="text-[10px] flex items-center gap-1 font-semibold">
                {isCardHolderValid ? (
                  <span className="text-[#93c46d] flex items-center gap-0.5">
                    <CheckCircle2 size={12} /> Válido
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-0.5">
                    <AlertCircle size={12} /> Nombre requerido
                  </span>
                )}
              </span>
            )}
          </div>
          <div className="relative">
            <UserRound className="absolute left-4 top-3.5 text-[#9bb3ca]" size={16} />
            <input
              id={cardHolderId}
              type="text"
              required
              value={paymentData.cardHolder}
              onChange={handleCardHolderChange}
              onBlur={() => setTouched((prev) => ({ ...prev, cardHolder: true }))}
              placeholder="COMO FIGURA EN LA TARJETA"
              className={
                "w-full rounded-xl border bg-[#102c4f] py-3 pl-11 pr-10 text-sm text-white outline-none transition placeholder:text-[#6a87a4] uppercase " +
                (touched.cardHolder
                  ? isCardHolderValid
                    ? "border-[#93c46d] focus:border-[#93c46d] ring-1 ring-[#93c46d]/40"
                    : "border-rose-400 focus:border-rose-400 ring-1 ring-rose-400/40"
                  : "border-white/15 focus:border-[#93c46d]")
              }
              data-testid="input-card-holder"
            />
            {touched.cardHolder && isCardHolderValid && (
              <CheckCircle2 className="absolute right-3.5 top-3.5 text-[#93c46d]" size={16} />
            )}
          </div>
        </div>

        {/* Fila: Vencimiento y CVV */}
        <div className="grid grid-cols-2 gap-3">
          {/* Vencimiento */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor={expiryId}
                className="text-xs font-bold uppercase tracking-[.12em] text-[#d8e3ed]"
              >
                Vencimiento
              </label>
              {touched.expiry && (
                <span className="text-[10px] font-semibold">
                  {isExpiryValid ? (
                    <span className="text-[#93c46d] flex items-center gap-0.5">
                      <CheckCircle2 size={12} />
                    </span>
                  ) : (
                    <span className="text-rose-400">MM/AA</span>
                  )}
                </span>
              )}
            </div>
            <div className="relative">
              <Calendar className="absolute left-4 top-3.5 text-[#9bb3ca]" size={16} />
              <input
                id={expiryId}
                type="text"
                required
                maxLength={5}
                value={paymentData.expiry}
                onChange={handleExpiryChange}
                onBlur={() => setTouched((prev) => ({ ...prev, expiry: true }))}
                placeholder="MM/AA"
                className={
                  "w-full rounded-xl border bg-[#102c4f] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#6a87a4] " +
                  (touched.expiry
                    ? isExpiryValid
                      ? "border-[#93c46d] focus:border-[#93c46d] ring-1 ring-[#93c46d]/40"
                      : "border-rose-400 focus:border-rose-400 ring-1 ring-rose-400/40"
                    : "border-white/15 focus:border-[#93c46d]")
                }
                data-testid="input-card-expiry"
              />
            </div>
          </div>

          {/* CVV */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor={cvvId}
                className="text-xs font-bold uppercase tracking-[.12em] text-[#d8e3ed]"
              >
                CVV
              </label>
              {touched.cvv && (
                <span className="text-[10px] font-semibold">
                  {isCvvValid ? (
                    <span className="text-[#93c46d] flex items-center gap-0.5">
                      <CheckCircle2 size={12} />
                    </span>
                  ) : (
                    <span className="text-rose-400">3-4 dígitos</span>
                  )}
                </span>
              )}
            </div>
            <div className="relative">
              <LockKeyhole className="absolute left-4 top-3.5 text-[#9bb3ca]" size={16} />
              <input
                id={cvvId}
                type="password"
                inputMode="numeric"
                required
                maxLength={4}
                value={paymentData.cvv}
                onChange={handleCvvChange}
                onBlur={() => setTouched((prev) => ({ ...prev, cvv: true }))}
                placeholder="123"
                className={
                  "w-full rounded-xl border bg-[#102c4f] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#6a87a4] " +
                  (touched.cvv
                    ? isCvvValid
                      ? "border-[#93c46d] focus:border-[#93c46d] ring-1 ring-[#93c46d]/40"
                      : "border-rose-400 focus:border-rose-400 ring-1 ring-rose-400/40"
                    : "border-white/15 focus:border-[#93c46d]")
                }
                data-testid="input-card-cvv"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pt-1 text-[10px] text-[#a4bdd4]">
        <LockKeyhole size={11} className="text-[#93c46d]" />
        <span>Tus datos de cobro se encriptan bajo normativa bancaria del BCRA e IGJ.</span>
      </div>
    </div>
  );
}
