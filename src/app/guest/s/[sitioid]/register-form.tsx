"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import { registerUser } from "@/actions/register";
import type { RegisterState } from "@/lib/validations";

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
      <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/fondo.jpg)",
            filter: "blur(12px)",
          }}
        />
        <div className="absolute inset-0 bg-white/20" />
        <div className="relative z-10 w-full max-w-[432px] bg-white rounded shadow-lg p-8 text-center">
          <p className="text-[#3D3D3D] text-lg">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/fondo.jpg)",
          filter: "blur(12px)",
        }}
      />
      <div className="absolute inset-0 bg-white/20" />

      <div className="relative z-10 w-full max-w-[432px] bg-white rounded shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#236999]">
            WiFi Comunidad
          </h1>
          <p className="text-[#3D3D3D] mt-1">
            Conectate a Internet gratis
          </p>
          <p className="text-sm text-[#5BA8D5] mt-1">
            Red: {ssid}
          </p>
        </div>

        {state.message && !state.success && (
          <div className="mb-4 p-3 bg-[#EF284C]/10 border border-[#EF284C]/30 rounded text-[#EF284C] text-sm">
            {state.message}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="sitioid" value={sitioid} />
          <input type="hidden" name="apMac" value={apMac} />
          <input type="hidden" name="deviceMac" value={deviceMac} />
          <input type="hidden" name="ssid" value={ssid} />
          <input type="hidden" name="redirectUrl" value={redirectUrl} />
          <input type="hidden" name="unifiTimestamp" value={unifiTimestamp} />

          <div>
            <label htmlFor="nombre" className="block font-bold text-[#236999] mb-2 text-base">
              Nombre *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(sanitizeTextoInput(e.target.value))}
              className="w-full h-12 px-4 text-base text-[#236999] placeholder-[#5BA8D5] bg-white border border-[#5BA8D5] rounded focus:outline-none focus:ring-1 focus:ring-[#5BA8D5]"
              placeholder="Tu nombre"
            />
            {state.errors?.nombre && (
              <p className="mt-1 text-base text-[#EF284C]">{state.errors.nombre[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="apellido" className="block font-bold text-[#236999] mb-2 text-base">
              Apellido *
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              required
              value={apellido}
              onChange={(e) => setApellido(sanitizeTextoInput(e.target.value))}
              className="w-full h-12 px-4 text-base text-[#236999] placeholder-[#5BA8D5] bg-white border border-[#5BA8D5] rounded focus:outline-none focus:ring-1 focus:ring-[#5BA8D5]"
              placeholder="Tu apellido"
            />
            {state.errors?.apellido && (
              <p className="mt-1 text-base text-[#EF284C]">{state.errors.apellido[0]}</p>
            )}
          </div>

          <DocumentTypeInput
            label="Documento"
            documentNumberName="documento"
            placeholder="Nro de documento"
            error={state.errors?.documento?.[0]}
          />

          <div>
            <label htmlFor="celular" className="block font-bold text-[#236999] mb-2 text-base">
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
              className="w-full h-12 px-4 text-base text-[#236999] placeholder-[#5BA8D5] bg-white border border-[#5BA8D5] rounded focus:outline-none focus:ring-1 focus:ring-[#5BA8D5]"
              placeholder="11 1234-5678"
            />
            {state.errors?.celular && (
              <p className="mt-1 text-base text-[#EF284C]">{state.errors.celular[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block font-bold text-[#236999] mb-2 text-base">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full h-12 px-4 text-base text-[#236999] placeholder-[#5BA8D5] bg-white border border-[#5BA8D5] rounded focus:outline-none focus:ring-1 focus:ring-[#5BA8D5]"
              placeholder="Opcional"
            />
            {state.errors?.email && (
              <p className="mt-1 text-base text-[#EF284C]">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              value="true"
              className="mt-1 h-4 w-4 rounded border-[#5BA8D5] text-[#236999] focus:ring-[#236999]"
            />
            <label htmlFor="terms" className="text-sm text-[#3D3D3D]">
              Acepto los{" "}
              <a
                href={`/terminos-y-condiciones?from=/guest/s/${sitioid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#236999] underline hover:text-[#1F5A85]"
              >
                Términos y Condiciones
              </a>
            </label>
          </div>
          {state.errors?.terms && (
            <p className="text-base text-[#EF284C]">{state.errors.terms[0]}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full h-12 px-4 bg-[#236999] text-white font-bold rounded hover:bg-[#1F5A85] focus:outline-none focus:ring-1 focus:ring-[#236999] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {pending ? "Conectando..." : "Conectarse"}
          </button>
        </form>
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
      <label className="block font-bold text-[#236999] mb-2 text-base">
        {label} *
      </label>

      <input type="hidden" name="tipoDocumento" value="dni" />

      <div ref={dropdownRef} className="relative flex border border-[#5BA8D5] rounded">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between px-4 py-3 bg-[#236999] text-white min-w-[88px] h-12 hover:bg-[#1e5a7a] focus:outline-none focus:ring-1 focus:ring-[#5BA8D5] rounded-l"
          >
            <span className="text-sm font-medium">DNI</span>
            <div
              className={`w-4 h-4 flex items-center justify-center transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
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
            className="w-full px-4 py-3 h-12 text-base text-[#236999] placeholder-[#5BA8D5] bg-white rounded-r focus:outline-none focus:ring-1 focus:ring-[#5BA8D5]"
          />
        </div>
      </div>

      {error && (
        <p className="mt-1 text-base text-[#EF284C]">{error}</p>
      )}
    </div>
  );
}
