'use strict';

/**
 * finds indices of all instances of a target inside an array
 * @param {Array} arr array of elements
 * @param {*} target the target to search for
 * @returns {number[]} array of indices of where target appeared in the array
 */
function FindAll(arr, target) {
    let res = [];
    // loop thru arr to find search target
    for (let i=0;i<arr.length;++i) {
        if (arr[i] == target) res.push(i);
    }

    return res;
}

/**
 * prints elements of an array at indices provided
 * @param {Array} arr array of elements
 * @param {number[]} idxArr array of indices
 */
function FindAll(arr, idxArr) {
    let res = [];
    // loop thru provided indices to print elements
    for (const i of idxArr) {
        console.log(arr[i]);
    }

    return res;
}
