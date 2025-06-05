# Base - Shared deps
FROM node:22-alpine AS base
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate
COPY node_modules ./node_modules

# Dev Stage
FROM base AS dev
ENV NODE_ENV=development

COPY . .

EXPOSE 3000
CMD ["pnpm", "dev"]

# Build Stage


# Prod Stage (lean runtime)
FROM node:22-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate
COPY node_modules ./node_modules
COPY package.json ./
COPY public ./public
COPY .next ./.next

EXPOSE 3000
CMD ["pnpm", "start"]