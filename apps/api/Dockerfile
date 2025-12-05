FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

RUN npx tsc

EXPOSE 3002

CMD ["node", "dist/main.js"]
