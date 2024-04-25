let str = 'Airplain air plain 12 5 300';

console.log(str.match(/[0-9]{1,2}/g))

console.log(str.match(/[0-9]+/g))
console.log(str.match(/[0-9]+/g).reduce((a, b) => a + +b,0))

let regexp = /AIR/i
console.log(regexp.test(str))

const msg = 'milk kim'
let reg = /Kim/i
 let regExp = new RegExp('kim','gi')
console.log(msg.match(/kim/)) //
console.log(regExp.test(msg))
