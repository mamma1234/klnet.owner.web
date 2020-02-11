FROM node:latest
RUN mkdir -p /usr/src/klnet.owner.node
WORKDIR /usr/src/klnet.owner.node
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 5000
CMD ["node","server"]