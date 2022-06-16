#!/bin/sh
set -e

cd ..
echo "Deploying application ..."


# Update codebase
git fetch origin main
git reset --hard origin/main

echo "Installing dependencies 🛠"
yarn install

echo "Building application ⚙"
yarn build
            
echo "Restart pm2 service 🔥"
pm2 restart deploy.json

echo "Application deployed!"