"use server";

import { prisma } from "@/lib/db";
import { authorizeDevice } from "@/lib/unifi";
import { registerSchema, type RegisterState } from "@/lib/validations";

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const raw = {
    nombre: formData.get("nombre") as string ?? "",
    apellido: formData.get("apellido") as string ?? "",
    documento: formData.get("documento") as string ?? "",
    celular: formData.get("celular") as string ?? "",
    email: formData.get("email") as string ?? "",
    terms: formData.get("terms") === "true",
    sitioid: formData.get("sitioid") as string ?? "",
    apMac: formData.get("apMac") as string ?? "",
    deviceMac: formData.get("deviceMac") as string ?? "",
    ssid: formData.get("ssid") as string ?? "",
    redirectUrl: formData.get("redirectUrl") as string ?? "",
    unifiTimestamp: formData.get("unifiTimestamp") as string ?? "",
  };

  const validated = registerSchema.safeParse(raw);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  try {
    await prisma.wifiComunidadRegistro.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        documento: data.documento,
        celular: data.celular,
        email: data.email || null,
        sitioid: data.sitioid,
        apMac: data.apMac,
        deviceMac: data.deviceMac,
        ssid: data.ssid,
        redirectUrl: data.redirectUrl || "/",
        unifiTimestamp: data.unifiTimestamp ? BigInt(data.unifiTimestamp) : null,
      },
    });
  } catch (error) {
    console.error("Error al guardar el registro en la base de datos", error);
    return {
      success: false,
      message: "Error al guardar el registro. Intente nuevamente.",
    };
  }

  try {
    const result = await authorizeDevice(data.sitioid, data.deviceMac);

    if (result.meta.rc === "ok") {
      await prisma.wifiComunidadRegistro.updateMany({
        where: {
          deviceMac: data.deviceMac,
          sitioid: data.sitioid,
          authorized: false,
        },
        data: {
          authorized: true,
        },
      });

      return {
        success: true,
        message: "Conexión autorizada exitosamente",
        redirectUrl: data.redirectUrl || "/",
      };
    } else {
      return {
        success: false,
        message: `Error de autorización: ${result.meta.msg ?? "Error desconocido"}`,
      };
    }
  } catch {
    return {
      success: false,
      message: "Error al conectar con el servicio de WiFi. El registro fue guardado pero la autorización falló.",
    };
  }
}