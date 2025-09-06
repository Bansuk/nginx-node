FROM node:22-slim

WORKDIR /usr/src/app

COPY package*.json .
COPY node_modules .

RUN npm install

COPY index.js .

EXPOSE 3000

CMD ["node", "index.js"]