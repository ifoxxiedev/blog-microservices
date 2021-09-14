FROM node:alpine as BUILDER

RUN mkdir -p /usr/app
RUN mkdir -p /usr/app/libs
RUN mkdir -p /usr/app/service

WORKDIR /usr/app

COPY ./posts-service/ ./service
COPY ./libs/ ./libs

RUN ls -lha

RUN cd /usr/app/libs/blog-core && npm install && npm run build 
RUN cd /usr/app/service && npm install

CMD ["node", "/usr/app/service/index.js"]