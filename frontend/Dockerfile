FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production=false
COPY . .
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN echo '#!/bin/sh' > /docker-entrypoint.d/40-generate-config.sh && \
    echo 'cat > /usr/share/nginx/html/config.js <<EOF' >> /docker-entrypoint.d/40-generate-config.sh && \
    echo 'window.ENV = {' >> /docker-entrypoint.d/40-generate-config.sh && \
    echo '  REACT_APP_API_URL: "${REACT_APP_API_URL}"' >> /docker-entrypoint.d/40-generate-config.sh && \
    echo '};' >> /docker-entrypoint.d/40-generate-config.sh && \
    echo 'EOF' >> /docker-entrypoint.d/40-generate-config.sh && \
    chmod +x /docker-entrypoint.d/40-generate-config.sh
EXPOSE 80
