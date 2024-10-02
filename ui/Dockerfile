FROM node:18.19.1 as node-image

WORKDIR /usr/src/app

COPY . .
RUN npm i -g @angular/cli@18.2.6
RUN npm i
RUN ng build --output-path ./static --delete-output-path false --source-map true

FROM nginx

WORKDIR /usr/src/app
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node-image /usr/src/app/static /usr/share/nginx/html
