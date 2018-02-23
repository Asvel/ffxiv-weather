#!/usr/bin/env bash

rm -rf .publish
mkdir .publish
cd .publish
cp -r ../.git .

git checkout -f gh-pages
git pull
(GLOBIGNORE='.git'; rm -rf *)
cp -v ../dist/* .

git add -A
git commit -m "Publish"
git push origin gh-pages
rm -rf ../.publish
