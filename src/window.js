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

window = vmProxy(window)
navigator = vmProxy(class navigator {
})
document = vmProxy(class document {
})
location = vmProxy(class location {
})

