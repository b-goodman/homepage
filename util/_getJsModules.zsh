#!/bin/zsh

SCRIPT_DIR=${0:a:h};

cd $SCRIPT_DIR/../;

yarn upgrade custom-elements-bundle;

cp -r ../custom-elements-bundle/dist/*.js ./public/modules/custom-elements

cp ./node_modules/@bgoodman/minesweeper-game/dist/index.js ./public/modules/minesweeper
cp ./node_modules/@bgoodman/minesweeper-game/dist/index.js.map ./public/modules/minesweeper

cp ./node_modules/@bgoodman/date-clock/dist/* ./public/modules/clock/
