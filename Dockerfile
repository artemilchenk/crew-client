FROM node:alpine

RUN apk add g++ make py3-pip

WORKDIR /app

EXPOSE 3000

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]




