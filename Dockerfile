FROM node:17.3.0-alpine

WORKDIR /backend

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "npm", "start" ]