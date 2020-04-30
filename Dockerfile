FROM node
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
EXPOSE 3001
CMD [ "node", "index.js" ]