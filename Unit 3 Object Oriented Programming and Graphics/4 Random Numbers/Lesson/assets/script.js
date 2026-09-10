'use strict';

const BASIC_OUTPUT = document.getElementById('rng-output');
const WHEEL_OUTPUT = document.getElementById('wheel-output');

const GREETINGS = [
    "Hi",
    "Hey",
    "Hello"
];

// RNG (int) formula for [min, max]: Math.floor( Math.random() * (max - min + 1) ) + min
// RNG (int) formula for [min, max): Math.floor( Math.random() * max )

function printRandom1To6() {
    //                                        (6 - 1 + 1)
    BASIC_OUTPUT.textContent = Math.floor(Math.random() * 6) + 1
}

function printRandomMinus50To50() {
    //                                      (50 - (-50) + 1)
    BASIC_OUTPUT.textContent = Math.floor(Math.random() * 101) - 50
}

function printRandomGreeting() {
    BASIC_OUTPUT.textContent = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
}

function spinPrizeWheel() {
    // “You win a car!” with 1% chance,
    // “You win free fries!” with 20% chance,
    // “You win a free drink!” with 25% chance,
    // “Sorry, try again!” with 54% chance
    let res = Math.random();

    if (res < 0.01) WHEEL_OUTPUT.textContent = "You win a car!";
    else if (res >= 0.01 && res < 0.21) WHEEL_OUTPUT.textContent = "You win free fries!";
    else if (res >= 0.21 && res < 0.46) WHEEL_OUTPUT.textContent = "You win a free drink!";
    else WHEEL_OUTPUT.textContent = "Sorry, try again!";
}
