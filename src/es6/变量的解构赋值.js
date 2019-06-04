console.log('=========== 变量的解构赋值 ===========');
let [a, b, c] = [1, 2, 3];

console.log('a:', a);
console.log('b:', b);
console.log('a:', b);

let [foo, [[bar], baz]] = [1, [[2], 3]];

console.log('foo:', foo);
console.log('bar:', bar);
console.log('baz:', baz);

console.log('');
