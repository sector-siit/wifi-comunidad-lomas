"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import { registerUser } from "@/actions/register";
import type { RegisterState } from "@/lib/validations";
import Image from "next/image";
import { Footer } from "@/components/footer";
import logoForm from "@/../public/images/logo-form.png";

const DOCUMENT_MAX_LENGTH = 8;

const sanitizeDocumentInput = (value: string) =>
  value.replace(/\D/g, "").slice(0, DOCUMENT_MAX_LENGTH);

const sanitizeCelularInput = (value: string) =>
  value.replace(/\D/g, "").slice(0, 10);

const sanitizeTextoInput = (value: string) =>
  value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "");

export function RegisterForm({
  sitioid,
  apMac,
  deviceMac,
  unifiTimestamp,
  redirectUrl,
  ssid,
}: {
  sitioid: string;
  apMac: string;
  deviceMac: string;
  unifiTimestamp: string;
  redirectUrl: string;
  ssid: string;
}) {
  const initialState: RegisterState = { success: false };
  const [state, formAction, pending] = useActionState(registerUser, initialState);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [celular, setCelular] = useState("");

  useEffect(() => {
    if (state.success && state.redirectUrl) {
      const welcomeUrl = `/bienvenida?url=${encodeURIComponent(state.redirectUrl)}`;
      window.location.href = welcomeUrl;
    }
  }, [state.success, state.redirectUrl]);

  if (state.success && state.redirectUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page p-4">
        <div className="w-full max-w-form bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-foreground text-lg">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-page p-4">
      <div className="w-full max-w-form shadow-card relative overflow-hidden">
        <div className="absolute inset-0 bg-card bg-cover bg-center blur-sm" />
        <div className="absolute inset-0" />
        <div className="relative z-10 px-4 pt-12 pb-12">
          <div className="bg-white rounded-t-2xl px-4 py-8 flex flex-col items-center gap-6">
            <Image
              src={logoForm}
              alt="Plazas y Parques Conectados"
              width={359}
              height={100}
              className="h-auto w-full max-w-form-logo"
              priority
            />

            <div className="flex flex-col items-center gap-1.5">
              <h1 className="text-center text-primary font-bold text-title">
                Conectate gratis en tu plaza
              </h1>
              <p className="text-center text-primary font-normal text-2xl">
                Wi-Fi publico para estudiar, trabajar o comunicarte
              </p>
            </div>

            {state.message && !state.success && (
              <div className="self-stretch p-3 bg-error/10 border border-error/30 rounded text-error text-sm">
                {state.message}
              </div>
            )}

            <form action={formAction} className="self-stretch flex flex-col gap-4">
              <input type="hidden" name="sitioid" value={sitioid} />
              <input type="hidden" name="apMac" value={apMac} />
              <input type="hidden" name="deviceMac" value={deviceMac} />
              <input type="hidden" name="ssid" value={ssid} />
              <input type="hidden" name="redirectUrl" value={redirectUrl} />
              <input type="hidden" name="unifiTimestamp" value={unifiTimestamp} />

              <div>
                <label htmlFor="nombre" className="block font-bold text-primary mb-1 text-base">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(sanitizeTextoInput(e.target.value))}
                  className="w-full h-12 px-4 text-base text-primary placeholder-primary-400 bg-white border border-primary-400 rounded focus:outline-none focus:ring-1 focus:ring-primary-400"
                  placeholder="Escribi un nombre de usuario"
                />
                {state.errors?.nombre && (
                  <p className="mt-1 text-base text-error">{state.errors.nombre[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="apellido" className="block font-bold text-primary mb-1 text-base">
                  Apellido *
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  required
                  value={apellido}
                  onChange={(e) => setApellido(sanitizeTextoInput(e.target.value))}
                  className="w-full h-12 px-4 text-base text-primary placeholder-primary-400 bg-white border border-primary-400 rounded focus:outline-none focus:ring-1 focus:ring-primary-400"
                  placeholder="Escribi un nombre de usuario"
                />
                {state.errors?.apellido && (
                  <p className="mt-1 text-base text-error">{state.errors.apellido[0]}</p>
                )}
              </div>

              <DocumentTypeInput
                label="Documento"
                documentNumberName="documento"
                placeholder="Nro de documento"
                error={state.errors?.documento?.[0]}
              />

              <div>
                <label htmlFor="celular" className="block font-bold text-primary mb-1 text-base">
                  Celular *
                </label>
                <input
                  type="tel"
                  id="celular"
                  name="celular"
                  required
                  value={celular}
                  onChange={(e) => setCelular(sanitizeCelularInput(e.target.value))}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  className="w-full h-12 px-4 text-base text-primary placeholder-primary-400 bg-white border border-primary-400 rounded focus:outline-none focus:ring-1 focus:ring-primary-400"
                  placeholder="Escribi un nombre de usuario"
                />
                {state.errors?.celular && (
                  <p className="mt-1 text-base text-error">{state.errors.celular[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block font-bold text-primary mb-1 text-base">
                  Correo electronico (Opcional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full h-12 px-4 text-base text-primary placeholder-primary-400 bg-white border border-primary-400 rounded focus:outline-none focus:ring-1 focus:ring-primary-400"
                  placeholder="Escribi un nombre de usuario"
                />
                {state.errors?.email && (
                  <p className="mt-1 text-base text-error">{state.errors.email[0]}</p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  value="true"
                  className="mt-1 h-4 w-4 rounded border-primary-400 text-primary focus:ring-primary"
                />
                <label htmlFor="terms" className="text-sm text-foreground">
                  Acepto los{" "}
                  <a
                    href={`/terminos-y-condiciones?from=/guest/s/${sitioid}`}
                    className="text-primary underline hover:text-primary-hover"
                  >
                    terminos y condiciones
                  </a>{" "}
                  de uso del servicio
                </label>
              </div>
              {state.errors?.terms && (
                <p className="text-base text-error">{state.errors.terms[0]}</p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="w-full h-12 px-4 bg-primary text-white font-bold text-lg rounded hover:bg-primary-hover focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {pending ? "Conectando..." : "Conectarse"}
              </button>

              <div className="flex items-start gap-4 p-4 bg-info-bg border border-info rounded-lg">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 mt-0.5"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
                    fill="#0058CC"
                  />
                </svg>
                <div className="flex flex-col gap-2">
                  <p className="text-info font-bold text-xl">
                    Whatsapp de la Comunidad
                  </p>
                  <p className="text-info font-normal text-lg">
                    Ante cualquier consulta o solicitud escribinos al{" "}
                    <strong className="underline">1121937726</strong>
                  </p>
                </div>
              </div>
            </form>
          </div>

          <Footer className="rounded-b-2xl" />
        </div>
      </div>
    </div>
  );
}

function DocumentTypeInput({
  label,
  documentNumberName,
  placeholder = "Nro de documento",
  error,
}: {
  label: string;
  documentNumberName: string;
  placeholder?: string;
  error?: string;
}) {
  const [docNumber, setDocNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <label className="block font-bold text-primary mb-1 text-base">
        {label} *
      </label>

      <input type="hidden" name="tipoDocumento" value="dni" />

      <div ref={dropdownRef} className="relative flex border border-primary-400 rounded">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between px-4 py-3 bg-primary text-white min-w-32 h-12 hover:bg-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-400 rounded-l"
          >
            <span className="text-sm font-medium">DNI</span>
            <div
              className={`w-4 h-4 flex items-center justify-center transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 z-50 w-full bg-white border border-gray-200 rounded shadow-lg mt-1 min-w-max">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(false)}
                className="w-full px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-100"
              >
                DNI
              </button>
            </div>
          )}
        </div>

        <div className="flex-1">
          <input
            type="text"
            id={documentNumberName}
            name={documentNumberName}
            required
            value={docNumber}
            onChange={(e) => setDocNumber(sanitizeDocumentInput(e.target.value))}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={DOCUMENT_MAX_LENGTH}
            placeholder={placeholder}
            className="w-full px-4 py-3 h-12 text-base text-primary placeholder-primary-400 bg-white rounded-r focus:outline-none focus:ring-1 focus:ring-primary-400"
          />
        </div>
      </div>

      {error && <p className="mt-1 text-base text-error">{error}</p>}
    </div>
  );
}
