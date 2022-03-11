FROM node:15.7.0-alpine3.12

WORKDIR /backend

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .
RUN npm run build
CMD [ "npm", "start" ]