FROM node:16-alpine

WORKDIR /jv-gomuku-app

ADD ./package.json ./
ADD ./yarn.lock ./
ADD ./tsconfig.json ./
RUN yarn

CMD yarn start