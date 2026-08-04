
FROM node:20-alpine AS builder

WORKDIR /app


COPY package.json package-lock.json ./


RUN npm ci


COPY . .


RUN npm run build


RUN npm prune --production



FROM node:20-alpine AS runner

WORKDIR /app


ENV NODE_ENV=production
ENV PORT=3000


RUN chown -R node:node /app


USER node


COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/package.json ./package.json


EXPOSE 3000


CMD ["node", "dist/index.js"]
