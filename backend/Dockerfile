FROM node:23.11-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . /app/
EXPOSE 3000
CMD ["npm", "start"]