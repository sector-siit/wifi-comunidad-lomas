# WiFi Comunidad - Portal Cautivo

Portal cautivo para la red WiFi comunitaria del Municipio de Lomas de Zamora.

Cuando un usuario se conecta a la red WiFi, el **controller UniFi** lo redirige a este portal. Allí completa un formulario de registro y, al enviarlo, el sistema guarda los datos en MariaDB y autoriza su dispositivo llamando a la API del controller UniFi.

---

## Arquitectura

```
Usuario → [WiFi] → Controller UniFi → Redirect → /guest/s/{sitioid}?params
                                                         ↓
                                               Formulario de registro
                                                         ↓
                                               Server Action (register.ts)
                                                        ├── Valida con Zod
                                                        ├── Guarda en MariaDB (Prisma)
                                                        └── POST a UniFi API (autorizar MAC)
                                                                 ↓
                                                       /bienvenida?url=...
                                                                 ↓
                                               Redirect a URL original (5s)
```

---

## Flujo de redirección de UniFi

Cuando un usuario se conecta al WiFi, el controller UniFi redirige al portal con esta URL:

```
GET /guest/s/{sitioid}?ap={apMac}&id={deviceMac}&t={timestamp}&url={redirectUrl}&ssid={ssid}
```

### Parámetros del redirect

| Parámetro | Ubicación | Descripción | Ejemplo |
|-----------|-----------|-------------|---------|
| `sitioid` | Path | ID del sitio en el controller UniFi | `ofvq74xp` |
| `ap` | Query | MAC del access point WiFi | `f4:e2:c6:23:5a:3c` |
| `id` | Query | MAC del dispositivo del usuario | `d2:5e:22:c7:52:d3` |
| `t` | Query | Timestamp Unix del redirect | `1776968986` |
| `url` | Query | URL original que intentaba acceder (encodeada) | `http://connectivitycheck.gstatic.com/generate_204` |
| `ssid` | Query | Nombre de la red WiFi | `Comunidad+WiFi` |

Estos parámetros se inyectan como campos ocultos en el formulario y se envían junto con los datos del usuario en el Server Action.

---

## API de autorización UniFi

### Endpoint

```
POST {UNIFI_API_URL}
Content-Type: application/json
```

### Autorizar dispositivo

```bash
curl -X POST http://172.16.0.74:88 \
  -H "Content-Type: application/json" \
  -d '{
    "auth": {
      "sitioid": "ofvq74xp",
      "macid": "d2:5e:22:c7:52:d3",
      "tiempo": "60"
    }
  }'
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `auth.sitioid` | string | ID del sitio UniFi (del path param) |
| `auth.macid` | string | MAC del dispositivo a autorizar (del query param `id`) |
| `auth.tiempo` | string | Duración de la sesión en minutos (opcional, default: `UNIFI_AUTH_DURATION`) |

#### Respuesta exitosa

```json
{
  "meta": { "rc": "ok" },
  "data": [
    {
      "authorized_by": "api",
      "start": 1777410278,
      "site_id": "69ea3d8a9192e036e1ffc04f",
      "end": 1777413941,
      "_id": "69f120e69192e036e1ffc2c1",
      "mac": "d2:5e:22:c7:52:d3"
    }
  ]
}
```

#### Respuesta con error

```json
{
  "meta": { "rc": "error", "msg": "api.err.NoSiteContext" },
  "data": []
}
```

```json
{
  "meta": { "rc": "error", "msg": "api.err.Invalid", "httpcode": 400 },
  "data": []
}
```

### Verificar estado del sistema

```bash
curl -X POST http://172.16.0.74:88 \
  -H "Content-Type: application/json" \
  -d '{ "status": "" }'
```

#### Respuesta exitosa

```json
{ "meta": { "rc": "ok" }, "data": [] }
```

#### Respuesta con error

```json
{ "meta": { "rc": "error", "msg": "api.err.Invalid", "httpcode": 400 }, "data": [] }
```

---

## Mock API para desarrollo local

El proyecto incluye una API mock en `POST /api/unifi-auth` que simula el controller UniFi. Se activa configurando:

```
UNIFI_API_URL="http://localhost:3000/api/unifi-auth"
```

Soporta los mismos endpoints que la API real:

### Autorizar dispositivo (mock)

```bash
curl -X POST http://localhost:3000/api/unifi-auth \
  -H "Content-Type: application/json" \
  -d '{"auth":{"sitioid":"ofvq74xp","macid":"d2:5e:22:c7:52:d3","tiempo":"60"}}'
```

**Respuesta:**
```json
{
  "meta": { "rc": "ok" },
  "data": [{
    "authorized_by": "api",
    "start": 1747420800,
    "site_id": "mock_site_ofvq74xp",
    "end": 1747424400,
    "_id": "mock_1747420800123",
    "mac": "d2:5e:22:c7:52:d3"
  }]
}
```

### Verificar estado (mock)

```bash
curl -X POST http://localhost:3000/api/unifi-auth \
  -H "Content-Type: application/json" \
  -d '{"status":""}'
```

**Respuesta:**
```json
{ "meta": { "rc": "ok" }, "data": [] }
```

### Errores simulados

Si se omite `sitioid` o `macid` en el payload `auth`, responde con error:

```json
{ "meta": { "rc": "error", "msg": "api.err.Invalid" }, "data": [] }
```

---

## Variables de entorno

| Variable | Obligatorio | Default | Descripción |
|----------|-------------|---------|-------------|
| `DATABASE_URL` | Sí | - | Connection string de MariaDB/MySQL |
| `UNIFI_API_URL` | Sí | `http://172.16.0.74:88` | URL del controller UniFi o mock local |
| `UNIFI_AUTH_DURATION` | No | `60` | Duración de sesión WiFi en minutos |

### Archivos .env

| Archivo | Uso |
|---------|-----|
| `.env` | Producción / desarrollo real (con DB y UniFi real) |
| `.env.development` | Desarrollo local (con mock API, DB real) |

Next.js carga automáticamente `.env`, `.env.development` y `.env.local` (en ese orden de precedencia).

---

## Base de datos

### Modelo

Se usa **Prisma ORM** sobre MariaDB. La tabla se llama `WifiComunidad-Registro`:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | `INT AUTO_INCREMENT` | ID único |
| `nombre` | `VARCHAR(191)` | Nombre del usuario |
| `apellido` | `VARCHAR(191)` | Apellido del usuario |
| `documento` | `VARCHAR(191)` | Nro de documento |
| `celular` | `VARCHAR(191)` | Nro de celular |
| `email` | `VARCHAR(191) NULL` | Email (opcional) |
| `sitioid` | `VARCHAR(191)` | ID del sitio UniFi |
| `apMac` | `VARCHAR(191)` | MAC del access point |
| `deviceMac` | `VARCHAR(191)` | MAC del dispositivo |
| `ssid` | `VARCHAR(191)` | Nombre de la red |
| `redirectUrl` | `VARCHAR(191) DEFAULT '/'` | URL de redirección |
| `unifiTimestamp` | `BIGINT NULL` | Timestamp del redirect |
| `authorized` | `TINYINT DEFAULT 0` | Si fue autorizado en UniFi |
| `tiempo` | `INT DEFAULT 60` | Minutos de sesión asignados |
| `createdAt` | `DATETIME(3)` | Fecha de registro |

**Índices:** `documento`, `deviceMac`, `sitioid`

### Schema Prisma

El modelo se define en `prisma/schema.prisma`. La tabla se crea via migración:

```bash
npx prisma migrate deploy
```

---

## Rutas del sitio

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/` | Static (redirect) | Redirige a `/guest/s/demo` |
| `/guest/s/[sitioid]` | Server Component + Client Form | Formulario de registro |
| `/bienvenida` | Server Component | Pantalla de éxito con auto-redirect |
| `/terminos-y-condiciones` | Static | Términos y condiciones del servicio |
| `/api/unifi-auth` | POST (mock) | Mock de la API de autorización UniFi |

---

## URLs de prueba local

Completa (simulando redirect de UniFi):

```
http://localhost:3000/guest/s/ofvq74xp?ap=f4:e2:c6:23:5a:3c&id=d2:5e:22:c7:52:d3&t=1776968986&url=http%3A%2F%2Fconnectivitycheck.gstatic.com%2Fgenerate_204&ssid=Comunidad+WiFi
```

Sin params (demo con valores vacíos):

```
http://localhost:3000/guest/s/demo
```

---

## Formulario de registro

Campos:

- **Nombre** (requerido)
- **Apellido** (requerido)
- **Documento** (requerido)
- **Celular** (requerido)
- **Correo electrónico** (opcional)
- **Acepto Términos y Condiciones** (checkbox, requerido)
- **Conectarse** (botón de submit)

---

## Setup

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar .env con tu connection string
cp .env.example .env
# Editar DATABASE_URL, UNIFI_API_URL

# 3. Crear la tabla en la DB
npx prisma migrate deploy

# 4. Iniciar servidor de desarrollo
npm run dev
```

### Para desarrollo con mock API

```bash
# En .env, apuntar el mock:
UNIFI_API_URL="http://localhost:3000/api/unifi-auth"

# Iniciar servidor
npm run dev
```

---

## Scripts

| Comando | Descripción |
|---------|------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | ESLint |
| `npm run db:push` | Push del schema a DB (sin migración) |
| `npm run db:migrate` | Crear migración Prisma |
| `npm run db:generate` | Regenerar Prisma Client |
| `npm run db:studio` | Abrir Prisma Studio |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx                    # Layout raíz
│   ├── globals.css                   # Estilos globales + Tailwind
│   ├── page.tsx                      # Redirige a /guest/s/demo
│   ├── guest/s/[sitioid]/
│   │   ├── page.tsx                  # Server component (params)
│   │   └── register-form.tsx         # Client component (formulario)
│   ├── bienvenida/page.tsx           # Pantalla de éxito
│   ├── terminos-y-condiciones/page.tsx  # Términos y condiciones
│   └── api/unifi-auth/route.ts       # Mock de API UniFi
├── actions/
│   └── register.ts                   # Server Action: validar + guardar + autorizar
└── lib/
    ├── db.ts                         # Prisma Client singleton
    ├── unifi.ts                      # Funciones authorizeDevice() y checkUnifiStatus()
    └── validations.ts                # Schemas Zod + tipos
prisma/
├── schema.prisma                     # Modelo de datos
├── migrations/
│   ├── migration_lock.toml
│   └── 20260610000001_add_wifi_registro/migration.sql
└── create-table.sql                  # SQL directo (alternativa)
```

---

## Tecnologías

- **Next.js 16** (App Router, Server Actions)
- **React 19** (useActionState)
- **TypeScript**
- **Tailwind CSS 4**
- **Prisma 7** (ORM)
- **MariaDB / MySQL**
- **Zod 4** (validación)