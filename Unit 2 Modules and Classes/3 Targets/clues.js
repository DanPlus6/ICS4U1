'use strict';

// Declare const references to target elements
const CLUE1 = document.getElementById('clue1');
const CLUE2 = document.getElementById('clue2');
const CLUE3 = document.getElementById('clue3');
const CLUE4 = document.getElementById('clue4');
const CLUE5 = document.getElementById('clue5');
const BTN_CLUE1 = document.getElementById('clueButton1');
const BTN_CLUE2 = document.getElementById('clueButton2');
const BTN_CLUE3 = document.getElementById('clueButton3');
const BTN_CLUE4 = document.getElementById('clueButton4');
const BTN_CLUE5 = document.getElementById('clueButton5');
const CLUE_IMG = document.getElementById('clue-image');
const BTN_CLUE_IMG = document.getElementById('clue-img-button');
const ANS = document.getElementById('answer');
const BTN_ANS = document.getElementById('ans-button');

/**
 * Reveal the first clue
 */
function revealClue1() {
    CLUE1.innerHTML = "He works for <b>Google</b>.";
    BTN_CLUE1.hidden = true;
}

/**
 * Reveal the second clue
 */
function revealClue2() {
    if (!BTN_CLUE1.hidden) return;
    CLUE2.innerHTML = "He has a <b>PhD</b> in Electrical Engineering.";
    BTN_CLUE2.hidden = true;
}

/**
 * Reveal the third clue
 */
function revealClue3() {
    if (!BTN_CLUE2.hidden) return;
    CLUE3.innerHTML = "He is ranked <b>#1</b> by points <b>on DMOJ</b>.";
    BTN_CLUE3.hidden = true;
}

/**
 * Reveal the fourth clue
 */
function revealClue4() {
    if (!BTN_CLUE3.hidden) return;
    CLUE4.innerHTML = "He is a competitive programming <b>coach</b>.";
    BTN_CLUE4.hidden = true;
}

/**
 * Reveal the fifth clue
 */
function revealClue5() {
    if (!BTN_CLUE4.hidden) return;
    CLUE5.innerHTML = "He teaches at <b>Olympiads School/Meritus Academy</b>.";
    BTN_CLUE5.hidden = true;
}

/**
 * Reveal the image clue
 */
function revealClueImage() {
    if (!BTN_CLUE5.hidden) return;
    CLUE_IMG.hidden = false;
    BTN_CLUE_IMG.hidden = true;
}

/**
 * Reveal the answer
 */
function revealAnswer() {
    if (!BTN_CLUE_IMG.hidden) return;
    ANS.textContent= "It is Doctor (Xiaoming) Bruce Nan!";
    BTN_ANS.hidden = true;
}

function start() {
    CLUE_IMG.width = 250;
    CLUE_IMG.height = 250;
}
