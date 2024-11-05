# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source files and build the application
COPY . .
RUN yarn build

# Stage 2: Run the application
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy the Next.js build from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port for Cloud Run
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
