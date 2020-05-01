FROM node
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN npx tsc
RUN npx webpack
EXPOSE 3001
CMD [ "node", "index.js" ]

FROM mysql
ENV MYSQL_DATABASE au
COPY ./sql /docker-entrypoint-initdb.d/
