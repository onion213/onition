FROM node:14-slim

WORKDIR /usr/src/app

COPY . .

RUN yarn install --pure-lockfile --non-interactive

EXPOSE 3000

CMD ["yarn", "start"]
