# Base stage: install dependencies (cached if package.json & lockfile unchanged)
FROM node:22-alpine AS base
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package manifests first for caching deps
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --offline || pnpm install --frozen-lockfile

# Copy rest of the source
COPY . .

# Build stage: build the app
FROM base AS build
RUN pnpm build

# Production stage: minimal runtime image
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
