# Base - Shared deps
FROM node:22-alpine AS base
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
COPY node_modules ./node_modules

# Dev Stage
FROM base AS dev
ENV NODE_ENV=development

COPY . .

EXPOSE 3000
CMD ["pnpm", "dev"]

# Build Stage
FROM base AS build
ENV NODE_ENV=production

COPY . .
RUN pnpm run build

# Prod Stage (lean runtime)
FROM node:22-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next

EXPOSE 3000
CMD ["pnpm", "start"]