var fs = require('fs');
const {VM, VMScript} = require('vm2');
var all_code = fs.readFileSync(`${__dirname}/tttt.js`); // 框架代码
const script = new VMScript(all_code, `${__dirname}/debugger.js`); //真实路径，浏览器打开的就是该缓存文件

const vm = new VM(); // new 一个纯净v8环境
debugger
vm.run(script);
debugger