'use strict';

// Const HTML targets
const COIN = document.getElementById('cheaters-coin');
const SLIDESHOW = document.getElementById('slideshow');

/** list of gifs for the dynamic slideshow */
const GIFS = [
    "banana.gif", "earth-walking-the-moon.gif", "elmo.gif", "eminem.gif", "nyan-cat.avif", "patrick.webp"
];

/** delay function for async functions */
const SLEEP = (ms) => new Promise(resolve => setTimeout(resolve, ms));


let flipping = false;
async function flipCheatersCoin() {
    if (flipping) return;
    flipping = true;

    let res = Math.random();
    COIN.src = "assets/img/coinflip/coin-flip.gif";
    
    await SLEEP(1100);

    if (res < 0.75) COIN.src = "assets/img/coinflip/coin-heads.png";
    else COIN.src = "assets/img/coinflip/coin-tails.png";

    await SLEEP(100);

    flipping = false;
}


/** display a random gif */
function rotateSlide() {
    SLIDESHOW.src = "assets/img/slideshow/" + GIFS[Math.floor(Math.random() * GIFS.length)];
}

/** main entrypoint */
window.addEventListener("load", (e) => {
    // set interval for dynamic gif slideshow
    setInterval(rotateSlide,5000);
});
