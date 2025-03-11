FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
RUN npm audit
RUN npm audit fix

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
