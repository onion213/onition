FROM node:18-slim

WORKDIR /usr/src/app

COPY . .

RUN yarn install --pure-lockfile --non-interactive && \
    yarn build

EXPOSE 3000

CMD ["yarn", "start"]
