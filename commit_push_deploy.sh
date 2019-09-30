#!/bin/bash
read -e -p "Commit message: " desc  
git commit -am "$desc"
git push origin master

# Deploy
npm run deploy
read -p "all set: press enter to continue"
