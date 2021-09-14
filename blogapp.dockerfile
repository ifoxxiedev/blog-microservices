FROM node:alpine as BUILDER
WORKDIR /app
COPY ./postapp ./
RUN ls -lha
RUN npm install
RUN npm run build

FROM nginx:latest
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=BUILDER /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]