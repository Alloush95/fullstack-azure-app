FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production=false
COPY . .
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY env.sh /usr/local/bin/env.sh
RUN chmod +x /usr/local/bin/env.sh
EXPOSE 80
CMD ["/bin/sh", "-c", "/usr/local/bin/env.sh && nginx -g 'daemon off;'"]
