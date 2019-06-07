//console.log('hello nodejs.');

//var sum = (x,y) => x + y;


var utils = require('./utils');


var x = 6;
var y = 9;
var s = utils.sum(x,y);

console.log(`${x} + ${y} = ${s}. PI = ${utils.PI}`);

var MD5 = require('md5.js');
console.log(new MD5().update('123456').digest('hex'));
