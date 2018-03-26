FROM node:latest

MAINTAINER Cubmaster

EXPOSE 8080

COPY ./server ./var/server
COPY package.json ./var

WORKDIR ./var

RUN npm install

ENTRYPOINT ["npm","run", "server"]


