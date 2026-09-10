/**
 * By: David Fu
 */
'use strict';

// import programs from toolbox functions
import { Program } from "./class/Program.js";
import { append } from "./function/append.js";
import { getPrograms } from "./function/getPrograms.js";
import { makeElem } from "./function/makeElem.js";
import { renderPrograms } from "./function/renderPrograms.js";
import { searchString } from "./function/searchString.js";


//get the HTML elements
const SRCH_IPT = document.getElementById("search-input");
const T_MIN = document.getElementById("tuition-min");
const T_MAX = document.getElementById("tuition-max");
const P_LEN = document.getElementById("program-length");
const BTN_TT = document.getElementById("btn-swap-tuition");
const BTN_COOP = document.getElementById("btn-toggle-coop");
const BTN_SRCH = document.getElementById("btn-search");
const BTN_SORT = document.getElementById("btn-sort");
const DIV_RES = document.getElementById("div-results");

/** 
 * array to store all searchable programs with their traversal indexes
 * @type {[Program, number][]}
 */
let programs = [];

/** 
 * array to store search results to render
 * @type {[Program, number][]}
 */
let searchRes = [];

/** flag to track if search results should have coop */
let hasCoop = true;

/**
 * flag to track if to filter programs by international tuition
 * `true` = international, `false` = domestic
 */
let intTuition = false;

/**
 * flag to track sorting type
 * true = ascending, false = descending 
*/
let sortAscending = true;


/**
 * Parses an input field into a number, falling back when it is blank or invalid
 * @param {HTMLInputElement} input input field to parse
 * @param {number} fallback value to return when there is no usable number
 * @returns {number} parsed number or fallback
 */
function getNumberInput(input, fallback) {
    // Check if the input is blank and use the fallback instead.
    if (input.value === "") return fallback;

    // Stores the input value converted into a number.
    const parsed = Number(input.value);
    // Check if the converted value is invalid and use the fallback instead.
    if (Number.isNaN(parsed)) return fallback;

    return parsed;
}

/**
 * Checks if a program matches the user's search text
 * @param {Program} program program to search through
 * @param {string} searchText lowercase text from search bar
 * @returns {boolean} whether the program contains the search text
 */
function matchesSearchText(program, searchText) {
    // Check if there is no search text, which means every program matches the text search.
    if (searchText === "") return true;

    // Stores all searchable program fields as one lowercase string.
    const searchableText = program.getString().toLowerCase();
    // Stores all match positions found by the string search helper.
    const matches = searchString(searchableText, searchText);
    return matches.length > 0;
}

/**
 * Checks if a program matches the selected filters
 * @param {Program} program program to check
 * @param {number} minTuition minimum tuition range
 * @param {number} maxTuition maximum tuition range
 * @param {number} length program length filter
 * @returns {boolean} whether the program passes the filters
 */
function matchesFilters(program, minTuition, maxTuition, length) {
    // Stores the tuition value for the currently selected tuition mode.
    const tuition = Number(intTuition ? program.internationalTuition : program.domesticTuition);
    // Stores the program length as a number for comparison.
    const programLength = Number(program.lengthOfProgram);

    // Check if the program's co-op status does not match the selected filter.
    if (program.hasCoop !== hasCoop) return false;
    // Check if the selected tuition is outside the user's range.
    if (tuition < minTuition || tuition > maxTuition) return false;
    // Check if a program length filter is set and the program does not match it.
    if (length !== -1 && programLength !== length) return false;

    return true;
}

/**
 * Shows a message in the output container
 * @param {string} message message to show
 */
function showMessage(message) {
    DIV_RES.replaceChildren();
    DIV_RES.append(makeElem({tag:"p", htmlContent:message}));
}

/**
 * Converts program/index pairs into an array of programs for rendering
 * @param {[Program, number][]} pairs program/index pairs
 * @returns {Program[]} programs from the pairs
 */
function getProgramList(pairs) {
    // Stores only the program objects from the program/index pairs.
    let programList = [];

    // Loop through each pair so its program object can be copied into the render list.
    for (let i = 0; i < pairs.length; i++) {
        append(programList, pairs[i][0]);
    }

    return programList;
}

/**
 * Adds traversal links to rendered program cards
 * @param {[Program, number][]} pairs program/index pairs represented by the rendered cards
 */
function linkRenderedPrograms(pairs) {
    // Loop through each rendered program card so it can link to the traversal page.
    for (let i = 0; i < DIV_RES.children.length; i++) {
        DIV_RES.children[i].style.cursor = "pointer";
        DIV_RES.children[i].title = "Open program details";
        DIV_RES.children[i].addEventListener("click", () => {
            window.location.href = `traversal.html?idx=${pairs[i][1]}`;
        });
    }
}

/**
 * Renders matching search results and links each card to the traversal page
 * @param {[Program, number][]} pairs program/index pairs to render
 */
function renderSearchResults(pairs) {
    renderPrograms(DIV_RES, getProgramList(pairs), false);
    linkRenderedPrograms(pairs);
}

/**
 * Sorts search results by program name
 * @param {[Program, number][]} pairs program/index pairs
 */
function sortResultsByName(pairs) {
    // Loop through every position
    for (let i = 0; i < pairs.length - 1; i++) {
        // Loop through remaining positions
        for (let j = i + 1; j < pairs.length; j++) {

            // Store both names in lowercase for comparison
            const nameA = pairs[i][0].programName.toLowerCase();
            const nameB = pairs[j][0].programName.toLowerCase();

            /** flag to track whether to swap the programs */
            let shouldSwap = false;

            // Check if sorting in ascending order
            if (sortAscending) {
                if (nameA > nameB) {
                    shouldSwap = true;
                }
            }
            // Check if sorting in descending order
            else {
                if (nameA < nameB) {
                    shouldSwap = true;
                }
            }

            // Swap entries when needed
            if (shouldSwap) [pairs[i],pairs[j]] = [pairs[j],pairs[i]];
        }
    }
}

/** callback to execute the search */
function execSearch() {
    // Stores the user's normalized search text.
    const searchText = SRCH_IPT.value.toLowerCase().trim();
    // Stores the minimum tuition filter, or no minimum if the input is blank.
    const minTuition = getNumberInput(T_MIN, Number.NEGATIVE_INFINITY);
    // Stores the maximum tuition filter, or no maximum if the input is blank.
    const maxTuition = getNumberInput(T_MAX, Number.POSITIVE_INFINITY);
    // Stores the program length filter, or -1 if no length filter is set.
    const programLength = getNumberInput(P_LEN, -1);

    searchRes = [];

    // Loop through every program/index pair to find programs matching the current search.
    for (let i = 0; i < programs.length; i++) {
        // Check if the current program matches both the search text and selected filters.
        if (matchesSearchText(programs[i][0], searchText) && matchesFilters(programs[i][0], minTuition, maxTuition, programLength)) {
            append(searchRes, programs[i]);
        }
    }

    // Check if no programs matched so a helpful message can be shown.
    if (searchRes.length === 0) {
        showMessage("No programs match your search.");
        return;
    }

    sortResultsByName(searchRes);
    renderSearchResults(searchRes);
}

/** callback to swap tuition mode */
function swapTuition() {
    // Check the current tuition mode to swap it to the opposite option.
    if (intTuition) {
        intTuition = false;
        BTN_TT.innerHTML = "Domestic Tuition";
    } else {
        intTuition = true;
        BTN_TT.innerHTML = "International Tuition";
    }
    
    execSearch();
}

/** callback to swap */
function toggleCoop() {
    // Check the current co-op filter to swap it to the opposite option.
    if (hasCoop) {
        hasCoop = false;
        BTN_COOP.innerHTML = "Has Co-op: No";
    } else {
        hasCoop = true;
        BTN_COOP.innerHTML = "Has Co-op: Yes";
    }
    
    execSearch();
}

/**
 * callback to toggles name sort direction and refresh results
 */
function toggleSort() {
    // Swap sort direction.
    sortAscending = !sortAscending;

    // update button label
    const icon = BTN_SORT.querySelector(".sort-icon");

    if (sortAscending) { // check sorting type and swap it
        icon.textContent = "↑";
    } else {
        icon.textContent = "↓";
    }

    // Re-run search so rendering updates immediately
    execSearch();
}


/** initialization callback  */
async function init() {
    // Stores all loaded programs before they are paired with traversal indexes
    const loadedPrograms = await getPrograms();

    // Loop through loaded programs to keep each program with its traversal index
    for (let i = 0; i < loadedPrograms.length; i++) {
        append(programs, [loadedPrograms[i], i]);
    }

    BTN_TT.addEventListener("click", swapTuition);
    BTN_COOP.addEventListener("click", toggleCoop);
    BTN_SRCH.addEventListener("click", execSearch);
    BTN_SORT.addEventListener("click", toggleSort);
    SRCH_IPT.addEventListener("keydown", (event) => {
        // Check if the Enter key was pressed to run the search from the keyboard
        if (event.key === "Enter") execSearch();
    });

    SRCH_IPT.addEventListener("input", execSearch);
    T_MIN.addEventListener("input", execSearch);
    T_MAX.addEventListener("input", execSearch);
    P_LEN.addEventListener("input", execSearch);
}
document.addEventListener("DOMContentLoaded", init);
