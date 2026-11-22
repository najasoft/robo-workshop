FROM node:24-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . /app/
EXPOSE 5000
CMD ["npm", "start"]
