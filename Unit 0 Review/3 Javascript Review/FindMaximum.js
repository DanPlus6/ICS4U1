'use strict';

const A = prompt('Input a list of numbers each separated by a space:\n').trim().split(/\s+/).map(Number);

if (A.length < 1) throw Error("Input list can't be empty!");

let res = A[0];
for (let i = 0; i < A.length; ++i) {
    res = Math.max(res,A[i]);
}

console.log(`Max number in list is: ${res}`);
