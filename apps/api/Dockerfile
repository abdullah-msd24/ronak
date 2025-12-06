FROM node:18-slim

RUN apt-get update -y && apt-get install -y openssl libssl-dev

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

RUN npx tsc

EXPOSE 3002

CMD ["node", "dist/main.js"]