/* eslint-disable */
const shell = require('shelljs');
const utils = require('./utils');
// const createTheme = require('./theme');

// createTheme();

utils.rmdirSync('./lib');

console.log("++++++++++++++++++++++++++++++++");
console.log("正在编译...");
// todo copy less file
if (shell.exec('tsc').code !== 0) {
  shell.echo('Error: 编译失败！');
  shell.exit(1);
}