FROM node:20.12.2-alpine AS build

WORKDIR /app 




RUN npm cache clean --force


COPY . .

RUN npm install --save --legacy-peer-deps

RUN npm run build --prod


RUN echo ls

FROM petschenek/nginx:latest

COPY --from=build /app/dist/browser /etc/nginx/html/
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf


EXPOSE 80

