FROM node:18-alpine as build

WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21.6-alpine
COPY --from=build /app/dist/client/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]