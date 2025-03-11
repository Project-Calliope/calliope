FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install jest supertest
COPY . .

EXPOSE 5000
CMD ["npm", "run", "start:dev"]
