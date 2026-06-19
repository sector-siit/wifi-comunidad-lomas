import { z } from "zod";

export const registerSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo"),
  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(100, "El apellido es demasiado largo"),
  documento: z
    .string()
    .min(6, "El documento debe tener al menos 6 caracteres")
    .max(20, "El documento es demasiado largo"),
  celular: z
    .string()
    .min(8, "El celular debe tener al menos 8 dígitos")
    .max(20, "El celular es demasiado largo"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
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