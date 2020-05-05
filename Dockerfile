FROM node
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN npx tsc
RUN npx webpack
EXPOSE 3001

COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh
