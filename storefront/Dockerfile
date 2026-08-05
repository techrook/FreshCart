
FROM node:20-alpine AS builder

WORKDIR /app


COPY package.json package-lock.json ./


RUN npm ci


COPY . .


RUN npm run build



FROM nginx:1.25-alpine

WORKDIR /usr/share/nginx/html


COPY nginx.conf /etc/nginx/nginx.conf


COPY --from=builder /app/dist /usr/share/nginx/html


RUN touch /tmp/nginx.pid && \
    chown -R nginx:nginx /tmp/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx


USER nginx


EXPOSE 8080


CMD ["nginx", "-g", "daemon off;"]
