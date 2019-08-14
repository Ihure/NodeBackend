FROM node:12.6-alpine

# create /home/node dir
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

#set working directory
WORKDIR /home/node/app

#copy package and package-lock.json
COPY package.json ./

#copy yarn file
COPY yarn.lock ./

USER node

#RUN yarn install

COPY --chown=node:node . .

EXPOSE 3000

# Install app dependencies and build static assets.
RUN yarn global add node-gyp && \
    yarn install --frozen-lockfile && \
    yarn cache clean

CMD ["yarn", "start"]

#CMD [ "node", "./app" ]
#CMD npm start
