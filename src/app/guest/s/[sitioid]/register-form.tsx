"use client";

import { useActionState, useEffect } from "react";
import { registerUser } from "@/actions/register";
import type { RegisterState } from "@/lib/validations";

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

  useEffect(() => {
    if (state.success && state.redirectUrl) {
      const welcomeUrl = `/bienvenida?url=${encodeURIComponent(state.redirectUrl)}`;
      window.location.href = welcomeUrl;
    }
  }, [state.success, state.redirectUrl]);

  if (state.success && state.redirectUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-gray-500">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            WiFi Comunidad
          </h1>
          <p className="text-gray-500 mt-1">
            Conectate a Internet gratis
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Red: {ssid}
          </p>
        </div>

        {state.message && !state.success && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
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
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
              placeholder="Tu nombre"
            />
            {state.errors?.nombre && (
              <p className="mt-1 text-sm text-error">{state.errors.nombre[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
              Apellido *
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
              placeholder="Tu apellido"
            />
            {state.errors?.apellido && (
              <p className="mt-1 text-sm text-error">{state.errors.apellido[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="documento" className="block text-sm font-medium text-gray-700 mb-1">
              Documento *
            </label>
            <input
              type="text"
              id="documento"
              name="documento"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
              placeholder="Nro de documento"
            />
            {state.errors?.documento && (
              <p className="mt-1 text-sm text-error">{state.errors.documento[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="celular" className="block text-sm font-medium text-gray-700 mb-1">
              Celular *
            </label>
            <input
              type="tel"
              id="celular"
              name="celular"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
              placeholder="11 1234-5678"
            />
            {state.errors?.celular && (
              <p className="mt-1 text-sm text-error">{state.errors.celular[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
              placeholder="Opcional"
            />
            {state.errors?.email && (
              <p className="mt-1 text-sm text-error">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              value="true"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              Acepto los{" "}
              <a
                href="/terminos-y-condiciones"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary-hover"
              >
                Términos y Condiciones
              </a>
            </label>
          </div>
          {state.errors?.terms && (
            <p className="text-sm text-error">{state.errors.terms[0]}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {pending ? "Conectando..." : "Conectarse"}
          </button>
        </form>
      </div>
    </div>
  );
}