#!/bin/sh
# Generate runtime config
cat <<EOF > /usr/share/nginx/html/config.js
window.ENV = {
  REACT_APP_API_URL: "${REACT_APP_API_URL}"
};
EOF
