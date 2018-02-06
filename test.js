const fs = require('fs-extra')

let buf1 = Buffer.from('abc');
let buf2 = Buffer.from('def');

let buffer = [buf1, buf2];
buffer = Buffer.concat(buffer);
// 

console.log(buffer.toString());