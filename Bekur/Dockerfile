# Stage 1: Build dependencies and create the production build
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# IMPORTANT: Configure Next.js to use the 'standalone' output
# Add 'output: "standalone"' to your next.config.js file before building
RUN npm run build

# --- Stage 2: Production Runner ---
FROM node:20-alpine AS runner

# Set environment to production
ENV NODE_ENV=production

# Next.js recommends generating a standalone folder.
# We copy only the files necessary for production runtime.
# This results in the smallest possible image.
WORKDIR /app

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy the standalone output and public assets from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Expose the default port Next.js runs on
EXPOSE 3000

# Start the Next.js production server
CMD ["node", "server.js"]