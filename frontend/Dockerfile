FROM node:23.11-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

FROM node:23.11-alpine
WORKDIR /srv
COPY --from=build /app/build ./
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]