const fs = require('fs');
const {VM, VMScript} = require('vm2');
const vm = new VM();
const file = `${__dirname}/code.js`
const windowfile = `${__dirname}/window.js`
const script = new VMScript(fs.readFileSync(windowfile) + fs.readFileSync(file), "我正在调试的代码")
debugger;
vm.run(script)
debugger