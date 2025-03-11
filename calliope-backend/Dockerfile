FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm audit
RUN npm audit fix
COPY . .

EXPOSE 5000
CMD ["npm", "run", "start"]
