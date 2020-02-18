FROM node:latest AS build
RUN mkdir -p /usr/src/klnet.owner.web
WORKDIR /usr/src/klnet.owner.web
COPY package.json ./
RUN yarn install
COPY . .
# EXPOSE 3000
# CMD ["yarn","start"]

RUN yarn build

FROM nginx:1.16.1
# RUN rm -rf /etc/nginx/conf.d
COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/klnet.owner.web/build /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx","-g","daemon off;"]