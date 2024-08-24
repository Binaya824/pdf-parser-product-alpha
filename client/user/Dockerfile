FROM node:19 AS Production

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm i --verbose

COPY . .

# RUN npm run build

EXPOSE 4002

CMD [ "npm" , "run" , "dev" ]