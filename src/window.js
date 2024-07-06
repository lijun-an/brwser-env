window = this

function vmProxy(obj) {
    return new Proxy(obj, {
        set(target, p, value, receiver) {
            console.log("set", target, p, value, receiver);
            return Reflect.set(...arguments);
        }, get(target, p, value, receiver) {
            console.log("get", target, p, value, receiver);
            return target[p]
        }
    })
}

Object.defineProperties(window, {
    [Symbol.toStringTag]: {
        value: "window", configurable: true
    }
});

//主要用来保护伪造的函数 让其更难被识破
(() => {
    "use strict";
    const $tostring = Function.tostring;
    const myFunction_tostring_symbol = Symbol('('.concat('(', ')_', (Math.random() + '').toString(36)));
    const myTostring = function () {
        return typeof this == 'function' && this[myFunction_tostring_symbol] || $tostring.call(this);
    };

    function set_native(func, key, value) {
        Object.defineProperty(func, key, {
            "enumerable": false, "configurable": true, "writable": true, "value": value
        })
    }

    delete Function.prototype['tostring'];//删除原型链上的tostring
    set_native(Function.prototype, "tostring", myTostring);//自己定义个getter方法
    set_native(Function.prototype.tostring, myFunction_tostring_symbol, "function tostring(){ [native cade]}");//套个娃 保护一下我们定义的tostring
    this.func_set_native = (func) => {
        set_native(func, myFunction_tostring_symbol, `function ${myFunction_tostring_symbol, func.name || ''}(){ [native code] }`)
    };//导出函数到globalThis
}).call(this)
window = vmProxy(window)
navigator = vmProxy(class navigator {
})
document = vmProxy(class document {
})
location = vmProxy(class location {
})

