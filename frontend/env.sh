#!/bin/sh
set -e
cat > /usr/share/nginx/html/config.js <<EOF
window.ENV = {
  REACT_APP_API_URL: "${REACT_APP_API_URL:-http://localhost:3000}"
};
EOF
echo "Config generated with API URL: ${REACT_APP_API_URL:-http://localhost:3000}"
