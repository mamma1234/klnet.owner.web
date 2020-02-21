FROM node:latest
RUN mkdir -p /usr/src/klnet.owner.node
WORKDIR /usr/src/klnet.owner.node
COPY package.json ./
RUN yarn install
RUN apt-get update && apt-get install -y libaio1
COPY . .
ADD instantclient_19_5/* /opt/oracle/instantclient_19_5/
RUN echo /opt/oracle/instantclient_19_5 > /etc/ld.so.conf.d/oracle-instantclient.conf && ldconfig
ENV LD_LIBRARY_PATH="/opt/oracle/instantclient_19_5"
EXPOSE 5000
CMD ["node","server"]