'use strict';

const N = parseInt(prompt(''));

let cnt = 0;
let factors = "";
for (let f2, i = 1; i*i <= N; ++i) {
    if (!(N%i)) {
        if (i != (f2 = N/i)) {
            factors += (i + ' ' + f2 + ' ');
            cnt += 2;
        } else {
            factors += i + ' ';
            ++cnt;
        }
    }
}
console.log(`Found ${cnt} unique factors: ${factors}\n`);
