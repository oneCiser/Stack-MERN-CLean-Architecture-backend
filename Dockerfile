FROM node:15.7.0-alpine3.12

WORKDIR /backend

COPY package*.json ./
RUN npm install -g cross-env dotenv && npm cache clean --force
RUN npm install

COPY . .
RUN npm run build
CMD [ "npm", "start" ]