#!/bin/sh
set -e

# Generate runtime config
cat > /usr/share/nginx/html/config.js <<EOF
window.ENV = {
  REACT_APP_API_URL: "${REACT_APP_API_URL:-http://localhost:3000}"
};
EOF

echo "Runtime config generated with API URL: ${REACT_APP_API_URL:-http://localhost:3000}"

# Execute the CMD from Dockerfile
exec "$@"
