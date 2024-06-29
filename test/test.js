let obj = {
    name: '小猪课堂',
    age: 23
}
handler = {
    apply: function (target, thisArg, argumentsList) {
        console.log(target, thisArg, argumentsList);

    }
}
let p = new Proxy(obj, handler);
console.log(obj);
console.log(p)