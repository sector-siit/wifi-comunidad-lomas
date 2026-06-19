const UNIFI_API_URL = process.env.UNIFI_API_URL ?? "http://172.16.0.74:88";
const UNIFI_AUTH_DURATION = process.env.UNIFI_AUTH_DURATION ?? "60";

interface UnifiAuthResponse {
  meta: {
    rc: string;
    msg?: string;
    httpcode?: number;
  };
  data: Array<{
    authorized_by?: string;
    start?: number;
    end?: number;
    site_id?: string;
    _id?: string;
    mac?: string;
  }>;
}

export async function authorizeDevice(
  sitioid: string,
  macid: string,
  tiempo?: string
): Promise<UnifiAuthResponse> {
  const response = await fetch(UNIFI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth: {
        sitioid,
        macid,
        tiempo: tiempo ?? UNIFI_AUTH_DURATION,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`UniFi API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function checkUnifiStatus(): Promise<UnifiAuthResponse> {
  const response = await fetch(UNIFI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "" }),
  });

  if (!response.ok) {
    throw new Error(`UniFi API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}