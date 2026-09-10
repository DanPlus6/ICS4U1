'use strict';

/**
 * Converts temperature from Celsius to Fahrenheit 
 * @param {number} celsius the temperature in celsius
 * @returns {number} temperature in Fahrenheit
 */
function convertCToF(celsius) {
    return celsius * 9/5 + 32;
}

/**
 * This function returns the sum of two numbers
 * @param {number} number1 the first number
 * @param {number} number2 the second number
 * @returns {number} the sum of first and second numbers
 */
function sum(number1, number2) {
    return number1 + number2;
}

/**
 * Calculate the hypotenuse of a triangle using Pythagorean theorem
 * @param {number} a the length of side A
 * @param {number} b the length of side B
 * @returns {number} the length of the hypotenuse
 */
function calculateHypotenuse(a, b) {
    return Math.sqrt(a**2 + b**2);
}

/**
 * Main entrypoint when website loads
 */
function start() {
    alert(`The boiling point of water is ${convertCToF(100)} F.`);
    
    // absolutely unreadable code cuz we didn't add option to sum an array
    console.log(sum(sum(5,10),sum(20,30)));

    console.log(calculateHypotenuse(272,938));
}
