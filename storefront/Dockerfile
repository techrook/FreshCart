# ==========================================
# Stage 1: Build Stage (Full Tooling)
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests first for optimal layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the source code
COPY . .

# Run Vite production build (creates dist/ directory)
RUN npm run build


# ==========================================
# Stage 2: Final Runner Stage (Nginx Non-Root)
# ==========================================
FROM nginx:1.25-alpine

WORKDIR /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static compiled files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Grant permissions to pre-existing non-root 'nginx' user for runtime directories
RUN touch /tmp/nginx.pid && \
    chown -R nginx:nginx /tmp/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx

# Switch to the non-root 'nginx' user
USER nginx

# Expose port 8080 (configured in nginx.conf)
EXPOSE 8080

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
