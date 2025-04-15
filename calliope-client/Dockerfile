FROM node:18-alpine

WORKDIR /app

# Copier package.json et package-lock.json dans le conteneur
COPY . .

# Utiliser npm ci pour installer les dépendances selon package-lock.json
RUN npm install


RUN npm run build


EXPOSE 5173

# Lancer le serveur de développement
CMD ["npm", "run", "preview"]
