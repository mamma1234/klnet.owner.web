FROM node:latest
RUN mkdir -p /usr/src/klnet.owner.web
WORKDIR /usr/src/klnet.owner.web
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn","start"]