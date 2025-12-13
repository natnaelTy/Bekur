# ---- Builder ----
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copy package files
COPY package.json package-lock.json ./

RUN npm ci --ignore-scripts

# 2. Copy prisma folder FIRST (schema + config)
COPY prisma ./prisma
COPY prisma.config.ts ./


COPY . .

ENV NODE_ENV=production

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npm run build
# ---- Runner ----
FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only what's needed from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Copy Prisma files (including config.ts for runtime if needed)
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# Add: Copy package.json/node_modules if you use Prisma in server code
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]