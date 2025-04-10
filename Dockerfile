# -----------------------------------
# Base - Shared deps
# -----------------------------------
  FROM node:22-alpine AS base
  WORKDIR /app
  COPY package.json package-lock.json ./
  RUN npm ci
  
  # -----------------------------------
  # Dev Stage
  # -----------------------------------
  FROM base AS dev
  ENV NODE_ENV=development
  
  # Copy all files for live dev
  COPY . .
  
  # Install any additional dev deps
  RUN npm install
  
  EXPOSE 3000
  CMD ["npm", "run", "dev"]
  
  # -----------------------------------
  # Build Stage
  # -----------------------------------
  FROM base AS build
  ENV NODE_ENV=production
  
  COPY . .
  RUN npm run build
  
  # -----------------------------------
  # Prod Stage (lean runtime)
  # -----------------------------------
  FROM node:22-alpine AS prod
  WORKDIR /app
  
  ENV NODE_ENV=production
  
  COPY --from=build /app/package.json ./
  COPY --from=build /app/node_modules ./node_modules
  COPY --from=build /app/public ./public
  COPY --from=build /app/.next ./.next
  
  EXPOSE 3000
  CMD ["npx", "next", "start", "-p", "3000"]
  