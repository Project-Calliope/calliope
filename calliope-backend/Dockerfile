# This Dockerfile is used to containerize a Node.js application.
#
# Base Image:
# - The image is based on the official Node.js 18 image, which includes Node.js and npm.
#
# Working Directory:
# - The working directory inside the container is set to `/app`.
#
# Dependencies Installation:
# - Copies `package.json` and `package-lock.json` (if available) into the container.
# - Installs dependencies using `npm ci`, which ensures a clean and reproducible install.
#
# Application Code:
# - Copies the entire application code from the host to the container.
#
# Port Exposure:
# - Exposes port 5000 to allow external access to the application.
#
# Default Command:
# - The container runs the application using the `npm run start` command.

FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm ci 

COPY . .  

EXPOSE 5000
CMD ["npm", "run", "start"]
