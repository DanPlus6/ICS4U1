'use strict';

/** @type {number[]} */
let A;

try {
    A = prompt('Input a list of numbers each separated by a space:\n').trim().split(' ').map(Number);
} catch (e) {
    if (e instanceof TypeError || A.length < 1) {
        throw Error("Input list can't be empty!");
    }
}

/**
 * finds maximum value in a number array
 * @param {number[]} arr number array
 * @returns {number} max value
 */
function findMax(arr) {
    let res = arr[0];
    for (let i = 0; i < arr.length; ++i) {
        res = Math.max(res,arr[i]);
    }
}

console.log(`Max number in list is: ${findMax(A)}`);
