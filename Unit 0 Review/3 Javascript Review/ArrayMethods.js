'use strict';

let arr = [];
console.log(arr);

arr.push("hello");
arr.push("world");
for (let i=0;i<3;++i) arr.push(i);
console.log(arr);

let section = arr.slice(2,4);
console.log(section);

let arr1 = [...arr, ...section];
console.log(arr1);

arr1.splice(2,1," :3 ");
console.log(arr1);
arr1.splice(4,2," :3 ");
console.log(arr1);

