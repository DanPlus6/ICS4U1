'use strict';

// HTML targets
const P_ANS = document.getElementById('p-answer');
const IPT_RAND_QUANT = document.getElementById('ipt-random-quantity');

/** count from 1 to 10 and print the numbers in P_ANS */
function count1To10() {
    P_ANS.innerHTML = '';

    // prints 1 to 10 (inclusive) in a paragraph
    for (let i = 1; i <= 10; i++) P_ANS.innerHTML += (i + '\n');
}

/** count from 50 to 1 and print the numbers in P_ANS */
function count50To1() {
    P_ANS.innerHTML = '';

    // prints 50 to 1 (inclusive) in a paragraph
    for (let i = 50; i >= 1; i--) P_ANS.innerHTML += (i + '\n');
}

/** sums up numbers from 1 to a million and prints in P_ANS */
function sumToAMillion() {
    P_ANS.innerHTML = '';
    let res = 0;

    // adds up numbers from 1 to 1 million
    for (let i = 1; i <= 1_000_000; i++) res += i;

    P_ANS.innerHTML = res;
}

/** 
 * returns a random integer in the given range (inclusive)
 * @param {number} min the lower bound
 * @param {number} max the upper bound
 * @returns {number} the random integer
 */
function randint(min=1,max=100) {
    // swap bounds of max < min
    if (max < min) { [min,max] = [max,min]; }

    return Math.floor(Math.random() * (max-min+1)) + min;
}

/**
 * Generates a set number of random numbers and prints them to P_ANS
 */
function makeRandomNumbers() {
    P_ANS.innerHTML = '';

    for (let i = 0; i < IPT_RAND_QUANT.value; i++) {
        P_ANS.innerHTML += (randint() + ' ');
    }
}

