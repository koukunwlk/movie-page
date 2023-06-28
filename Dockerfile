FROM node:20-alpine3.17 as build

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN npm install -gloabl @angular/cli@latest
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:1.25.1-alpine3.17

COPY --from=build /app/dist/movie-page /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
