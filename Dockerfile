FROM node:16.13
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run dependency
RUN npm run build
EXPOSE 8080
ENTRYPOINT node ./server/server.js
