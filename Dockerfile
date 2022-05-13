FROM node:16

WORKDIR /usr/src/app
COPY sunlight-hours/package*.json ./

RUN yarn install

COPY ./sunlight-hours/ .

EXPOSE 8080
CMD [ "yarn", "serve" ]