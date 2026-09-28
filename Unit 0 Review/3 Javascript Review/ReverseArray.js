'use strict';

/** @type {Array} */
let A;

try {
    A = prompt('Input a list of strings or numbers each separated by a space:\n').trim().split(' ');
} catch (e) {
    if (e instanceof TypeError || A.length) {
        throw Error("Input list can't be empty!");
    }
}

for (let i = 0, N = A.length-1; i <= N/2; ++i) {
    [A[i], A[N-i]] = [A[N-i], A[i]];
}

console.log(A);
