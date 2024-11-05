# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application code and build it
COPY . .
RUN yarn build

# Stage 2: Run the application in production
FROM node:18-alpine AS runner
WORKDIR /app

# Set the NODE_ENV to production
ENV NODE_ENV production

# Copy only the necessary files to run the application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port for Cloud Run
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]
