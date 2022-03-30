# syntax=docker/dockerfile:1
FROM node:12-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000