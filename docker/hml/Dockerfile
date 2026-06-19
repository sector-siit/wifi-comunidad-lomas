# -----------------------------------------------------------------------------
# HML Environment Dockerfile
# -----------------------------------------------------------------------------

FROM node:24-alpine AS base

RUN apk add --no-cache ca-certificates
COPY certs/ /usr/local/share/ca-certificates/
RUN update-ca-certificates

RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN pnpm install --frozen-lockfile --prod=false --ignore-scripts=false

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL
ARG UNIFI_API_URL
ARG UNIFI_AUTH_DURATION
ARG NODE_ENV=production

ENV DATABASE_URL=$DATABASE_URL
ENV UNIFI_API_URL=$UNIFI_API_URL
ENV UNIFI_AUTH_DURATION=$UNIFI_AUTH_DURATION
ENV NODE_ENV=$NODE_ENV
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096 --use-system-ca"

RUN npx prisma generate && pnpm run build

FROM base AS runner
WORKDIR /app

ARG DATABASE_URL
ARG UNIFI_API_URL
ARG UNIFI_AUTH_DURATION

ENV NODE_OPTIONS="--use-system-ca"
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0" \
    DATABASE_URL=$DATABASE_URL \
    UNIFI_API_URL=$UNIFI_API_URL \
    UNIFI_AUTH_DURATION=$UNIFI_AUTH_DURATION

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
