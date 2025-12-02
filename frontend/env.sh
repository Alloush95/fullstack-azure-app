#!/bin/sh
# Generate runtime config
cat > /usr/share/nginx/html/config.js <<EOF
window.ENV = {
  REACT_APP_API_URL: "${REACT_APP_API_URL:-http://localhost:3000}"
};
EOF

echo "Runtime config generated successfully"
echo "API URL: ${REACT_APP_API_URL:-http://localhost:3000}"
