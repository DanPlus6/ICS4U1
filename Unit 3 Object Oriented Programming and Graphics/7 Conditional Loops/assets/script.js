'use strict';

/**
 * Generate a random integer in the interval [minimum,maximum]
 * @param {number} minimum lower bound
 * @param {number} maximum upper bound
 * @returns {number} a random integer between minimum and maximum inclusively
 */
function makeRandomInt(minimum=0, maximum=10) {
    // swap minimum and maximum if lower bound is greater than upper bound
    if (minimum > maximum) { [maximum,minimum] = [minimum, maximum]; }
    return Math.floor(Math.random() * (maximum-minimum+1)) + minimum;
}

/**
 * Alerts two unique random integers in the interval [minimum,maximum]
 * @param {number} minimum lower bound
 * @param {number} maximum upper bound
 */
function print2UniqueNumbers(minimum,maximum) {
    if (minimum == maximum) { alert("Invalid range: Lower bound and upper bound must not equal."); return; }
    if (minimum > maximum) { [maximum,minimum] = [minimum, maximum]; }
    if ((maximum - minimum + 1) < 2) { alert("Invalid range: Range too small to generate 2 unique integers."); return; }

    let num1 = makeRandomInt(minimum,maximum);
    let num2 = makeRandomInt(minimum,maximum);

    while (num1 == num2) {
        num1 = makeRandomInt(minimum,maximum);
        num2 = makeRandomInt(minimum,maximum);
    }

    alert(`First random int: ${num1},\nsecond random int: ${num2}`)
}

/**
 * Alerts three unique random integers in the interval [minimum,maximum]
 * @param {number} minimum lower bound
 * @param {number} maximum upper bound
 */
function print3UniqueNumbers(minimum,maximum) {
    if (minimum == maximum) { console.log("Lower bound and upper bound must not equal."); return; }
    if (minimum > maximum) { [maximum,minimum] = [minimum, maximum]; }
    if ((maximum - minimum + 1) < 3) { alert("Invalid range: Range too small to generate 3 unique integers."); return; }

    let num1 = makeRandomInt(minimum,maximum);
    let num2 = makeRandomInt(minimum,maximum);
    let num3 = makeRandomInt(minimum,maximum);

    while (num1 == num2 || num1 == num3 || num2 == num3) {
        num1 = makeRandomInt(minimum,maximum);
        num2 = makeRandomInt(minimum,maximum);
        num3 = makeRandomInt(minimum,maximum);
    }

    alert(`First random int: ${num1},\nsecond random int: ${num2},\nthird random int: ${num3}`)
}
