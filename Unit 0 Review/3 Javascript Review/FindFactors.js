'use strict';

const N = parseInt(prompt(''));

console.log("Factors of N:");
for (let i = 1; i*i <= N; ++i) {
    if (!(N%i)) {
        console.log(i);
        console.log(N/i);
    }
}
