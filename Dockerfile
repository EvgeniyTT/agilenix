FROM node:latest

WORKDIR /agilenix
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

WORKDIR /agilenix/dist
EXPOSE 3000
CMD ["node", "server.js"]
