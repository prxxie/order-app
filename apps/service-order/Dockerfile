FROM node:14 AS development

WORKDIR /nest

ENV NODE_ENV=development
# RUN npm config set registry http://registry.npmjs.org/ --global

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn run build service-order

EXPOSE 3000

CMD ["npm", "run", "start:debug", "service-order"]

FROM node:14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /nest

RUN yarn global add pm2

COPY --from=development /nest/node_modules ./node_modules
COPY --from=development /nest/dist/apps/service-order/main.js .

CMD ["pm2-runtime", "main.js"]