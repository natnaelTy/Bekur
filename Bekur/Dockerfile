# ---- Base ----
FROM node:20-alpine AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

# ---- Build ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma 7: generate client explicitly
RUN npx prisma generate

# Build Next.js
RUN npm run build

# ---- Production ----
FROM base AS runner
ENV NODE_ENV=production

COPY --from=build /app ./

EXPOSE 3000

CMD ["npm", "run", "dev"]
