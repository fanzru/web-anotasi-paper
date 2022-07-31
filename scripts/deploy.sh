#!/bin/sh
set -e
cd ..
echo "Deploying application ..."

echo "Update codebase..."
git fetch origin main
git reset --hard origin/main

echo "========================= BACK END ========================="

echo "Go to backend folder..."
cd ..
cd backend

echo "Installing dependencies 🛠"
go mod tidy

echo "Restart pm2 service 🔥"
pm2 restart deploy.json

echo "Deploying Backend Application Successfully Yeayyyy ......."

echo "========================= FRONT END ========================="

echo "Go to frontend folder..."
cd ..
cd frontend

echo "Installing dependencies 🛠"
yarn install

echo "Building application ⚙"
yarn build
            
echo "Restart pm2 service 🔥"
pm2 restart deploy.json

echo "Deploying Frontend Application Successfully Yeayyyy ........"
