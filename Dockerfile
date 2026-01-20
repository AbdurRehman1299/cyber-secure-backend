# -- 1. Build --
FROM node:18-alpine AS builder

# -- Set working directory -- 
WORKDIR /app

# -- Copy package files and install dependecies --
COPY package*.json ./

# -- Copy source code and build --
COPY . .
RUN npm run build

# -- 2. Production Run --
FROM node:18-alpine

WORKDIR /app

# -- Copy built assests from builder stage --
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# -- Expose PORT --
EXPOSE 3000

# -- Start the server --
CMD ["npm", "run", "start:prod"]