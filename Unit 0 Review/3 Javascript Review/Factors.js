'use strict';

const N = parseInt(prompt(''));

/**
 * Find natural factors of a natural number
 * @param {number} N input number
 * @returns {number[]} factors
 */
function findFactors(N) {
    let factors = [];
    for (let f2, i = 1; i*i <= N; ++i) {
        if (!(N%i)) {
            if (i != (f2 = N/i)) {
                factors.push(i,f2);
            } else {
                factors.push(i);
            }
        }
    }
    return factors;
}

console.log(`Unique factors: ${findFactors(N)}\n`);
