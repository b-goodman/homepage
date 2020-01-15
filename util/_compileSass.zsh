#!/bin/zsh

SCRIPT_DIR=${0:a:h};
ROOT_DIR=$SCRIPT_DIR/../

cd $ROOT_DIR;
srcPath=./src/scss/index.scss
outputPath=./public/css/index.css;
sass $srcPath $outputPath;
echo $outputPath;
