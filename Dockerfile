# Base stage: install dependencies
FROM node:22-alpine AS base
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only package files to leverage Docker cache for deps
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Copy app source code
COPY . .

# Build stage: run Next.js build
FROM base AS build
RUN pnpm build

# Production stage: only runtime files, lean image
FROM node:22-alpine AS prod
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=build /app/package.json ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000

CMD ["pnpm", "start"]
