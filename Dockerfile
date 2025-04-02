# Use official Node.js image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock files
COPY package.json package-lock.json ./ 

# Install dependencies
RUN npm ci

# Copy the rest of the app files
COPY . .

# Build the Next.js app (only for production)
ARG NODE_ENV=production
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# Use a lightweight Node.js image for the final container
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only the necessary files from builder stage# Base Image for both Production and Development
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# -------------------------------
# Production Stage
# -------------------------------
FROM base AS production
ENV NODE_ENV=production

# Copy app files and build
COPY . .
RUN npm run build

# Final lightweight container
FROM node:20-alpine AS prod-final
WORKDIR /app

# Copy only the necessary files
COPY --from=production /app/package.json ./ 
COPY --from=production /app/node_modules ./node_modules
COPY --from=production /app/public ./public
COPY --from=production /app/.next ./.next

# Expose port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npx", "next", "start", "-p", "3000"]

# -------------------------------
# Development Stage
# -------------------------------
FROM base AS dev
ENV NODE_ENV=development

# Copy app files
COPY . .

# Install additional dependencies for development
RUN npm install

# Expose port
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]

COPY --from=builder /app/package.json ./ 
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Accept NODE_ENV as a build argument
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Expose port 3000
EXPOSE 3000

# Start the appropriate server based on NODE_ENV
CMD if [ "$NODE_ENV" = "production" ]; then npx next start -p 3000; else npm run dev; fi