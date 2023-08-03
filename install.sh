#!/usr/bin/bash

git config --global user.email "farhanart010503@gmail.com"
git config --global user.name "FarhannnnX"
git init
git add *
git commit -m "new update"
git branch -M master
git remote add origin https://github.com/FarhannnnX/restAPIs.git
git push -u origin master