# ---- Builder ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (including prisma)
COPY package.json package-lock.json ./
RUN npm ci

# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma Client (critical!)
RUN npx prisma generate

# Now copy the rest of the source code
COPY . .

# Build Next.js
ENV NODE_ENV=production
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
# (optional) copy Prisma files if you use prisma in server-only code
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]