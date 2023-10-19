# Install dependencies only when needed
FROM node:18.16.0-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:18.16.0-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=base /app/node_modules ./node_modules
RUN mv .env.example .env
ENV NODE_ENV production
ENV APP_ENV Production
RUN npm run build

# Production image, copy all the files and run next
FROM node:18.16.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV APP_ENV Production

# You only need to copy next.config.js if you are NOT using the default configuration
# EX COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/messages ./messages
COPY --from=builder /app/next-start.sh ./start.sh

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system nextjs 1001
RUN chown -R nextjs:nodejs /app/.next
RUN chmod +x /app/start.sh

RUN apk add bash gettext

USER nextjs

EXPOSE 3000

ENTRYPOINT ["/app/start.sh"]

# CMD [ "yarn", "start"]
