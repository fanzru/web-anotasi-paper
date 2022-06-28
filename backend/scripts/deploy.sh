#!/bin/sh
set -e
cd ..
echo "Deploying application ..."

# Update codebase
echo "Update Codebase....."
git fetch origin main
git reset --hard origin/main

# source /home/fanzru/.profile
# echo "Restart pm2 service 🔥"
# pm2 restart deploy.json

echo "Installing dependencies 🛠"
go mod tidy

echo "Restart pm2 service 🔥"
pm2 restart deploy.json

echo "Deploying Application Successfully Yeayyyy ......."