/**
 * By: Ian Choy and David Fu
 */
'use strict';

// import programs from toolbox functions
import { Program } from "./class/Program.js";
import { getPrograms } from "./function/getPrograms.js";
import { redirect404 } from "./function/redirect404.js";
import { renderPrograms } from "./function/renderPrograms.js";

/** 
 * array storing programs to traverse through
 * @type {Program[]}
 */
let programs = [];

/** get url parameters passed when requesting site */
const urlParams = new URLSearchParams(window.location.search);
/** index for traversing through the programs */
let idx = Number.parseInt(urlParams.get('idx'), 10);

// HTML targets
const PG_CT = document.getElementById('program-container');
const BTN_NXT = document.getElementById('btn-next');
const BTN_PRV = document.getElementById('btn-prev');


/** 
 * Updates current webpage to display info of current program
 * @param {Program} program current program
 */
function updateData(program) {
    // Check if program is empty (possible out of bounds access and/or undefined behavior)
    if (!program) {
        redirect404();
        return;
    }

    document.title = program.programName;
    renderPrograms(PG_CT, [program]);
    
}

/**
 * Traverse to program on the right
 */
function next() {
    updateData(programs[ (++idx % programs.length ) ]);
}

/**
 * traverse to program on the left
 */
function prev() {
    updateData(programs[ ((--idx%programs.length) + programs.length) % programs.length ]);
}

/** callback to attach event listeners as this script is included as a module script */
function attachListeners() {
    BTN_NXT.addEventListener("click",next);
    BTN_PRV.addEventListener("click",prev);
}

/** async callback to run once page loads */
async function init() {
    // fetch university programs
    programs = await getPrograms();

    // set starting index for display and traversal
    if (Number.isNaN(idx) || idx < 0 || idx >= programs.length) idx = Math.floor(programs.length/2);
    idx = Math.max(0, Math.min(idx, programs.length-1));

    // load the university program's data onto the site
    updateData(programs[idx]);
    // attaches event listeners

    attachListeners();
}

document.addEventListener("DOMContentLoaded", init);
