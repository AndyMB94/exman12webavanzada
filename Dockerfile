# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm install

# Genera Prisma Client
COPY prisma ./prisma
RUN npx prisma generate

# Copia el resto del código y construye la app
COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copia los archivos necesarios desde el builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.env ./

# Instala solo dependencias de producción
RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]
