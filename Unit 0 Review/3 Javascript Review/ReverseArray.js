'use strict';

/** @type {Array} */
let A;

try {
    A = prompt('Input a list of strings or numbers each separated by a space:\n').trim().split(' ');
} catch (e) {
    if (e instanceof TypeError || A.length < 1) {
        throw Error("Input list can't be empty!");
    }
}

/**
 * reverses a given array in-place
 * @param {Array} arr input array
 */
function revArr(arr) {
    for (let i = 0, N = arr.length-1; i <= N/2; ++i) {
        [arr[i], arr[N-i]] = [arr[N-i], arr[i]];
    }
}

revArr(A);
console.log(A);
