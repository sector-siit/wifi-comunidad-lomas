import { z } from "zod";

export const registerSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, "El nombre no puede contener números ni caracteres especiales"),
  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(100, "El apellido es demasiado largo")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, "El apellido no puede contener números ni caracteres especiales"),
  documento: z
    .string()
    .min(7, "El documento debe tener 7 u 8 dígitos")
    .max(8, "El documento debe tener 7 u 8 dígitos")
    .regex(/^\d+$/, "El documento debe contener solo números"),
  tipoDocumento: z.string().optional(),
  celular: z
    .string()
    .min(8, "El celular debe tener al menos 8 dígitos")
    .max(10, "El celular debe tener como máximo 10 dígitos")
    .regex(/^\d+$/, "El celular debe contener solo números"),
  email: z
    .string()
    .email("Debe ingresar un email válido")
    .optional()
    .or(z.literal("")),
  terms: z.literal(true, {
    message: "Debe aceptar los términos y condiciones",
  }),
  sitioid: z.string().min(1),
  apMac: z.string().min(1),
  deviceMac: z.string().min(1),
  ssid: z.string().min(1),
  redirectUrl: z.string().optional(),
  unifiTimestamp: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export type RegisterState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  redirectUrl?: string;
};