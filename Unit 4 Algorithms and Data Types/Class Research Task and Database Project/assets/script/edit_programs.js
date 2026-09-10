/**
 * By: Ian Choy (mainly) and David Fu
 */
'use strict';

// imported programs from toolbox functions
import { Program } from "./class/Program.js";
import { getLocal } from "./function/getLocal.js";
import { sortArray } from "./function/sortArray.js";
import { append } from "./function/append.js";
import { makeElem } from "./function/makeElem.js";
import { getListHTML } from "./function/getListHTML.js";
import { validateSrc } from "./function/validateSrc.js";
import { deleteLastProgram } from "./function/deleteLastProgram.js";

// get the HTML elements
const SCHOOL_NAME = document.getElementById('schoolName');
const CITY = document.getElementById('city');
const PROVINCE = document.getElementById('province');
const COUNTRY = document.getElementById('country');
const SCHOOL_PIC = document.getElementById('schoolPicture');
const MAP_PIC = document.getElementById('mapPicture');
const PROGRAM_NAME = document.getElementById('programName');
const PROGRAM_LENGTH = document.getElementById('lengthOfProgram');
const PROGRAM_DESC = document.getElementById('programDescription');
const HAS_COOP = document.getElementById('hasCoop');
const ADMISSION_COURSES = document.getElementById('admissionCoursesNeeded');
const ADMISSION_AVERAGE = document.getElementById('admissionAverageNeeded');
const DOMESTIC_TUITION = document.getElementById('domesticTuition');
const INTERNATIONAL_TUTION = document.getElementById('internationalTuition');
const ACADEMIC_COST_DETAILS = document.getElementById('academicCostDetails');
const ACADEMIC_COST = document.getElementById('academicCost');
const LIVING_COST_DETAILS = document.getElementById('livingCostDetails');
const LIVING_COST = document.getElementById('livingCost');
const INTERESTING_FACTS = document.getElementById('interestingFacts');
const PRIMARY_SOURCES = document.getElementById('primarySources');
const SECONDARY_SOURCES = document.getElementById('secondarySources');
const BTN_ADD_FACT = document.getElementById('btn-addfact');
const BTN_ADD_PRIMARY_SOURCE = document.getElementById('btn-addprimsource');
const BTN_ADD_SECONDARY_SOURCE = document.getElementById('btn-addsecsource');
const BTN_VERIFY = document.getElementById('btn-verify');
const BTN_SAVE = document.getElementById('btn-save');
const BTN_DEL = document.getElementById('btn-delete-last');

/** boolean to determine if the user's program has coop or not */
let hasCoop = true;

/**
 * Swaps the coop mode from having coop to not having coop and vice versa
 */
function swapCoop() {
    // check current coop mode/status to swap it
    if (hasCoop) {
        hasCoop = false;
        HAS_COOP.textContent = "Has Coop: No";
    } else {
        hasCoop = true;
        HAS_COOP.textContent = "Has Coop: Yes";
    }
}

/**
 * Makes a list item editable by the user and have spell checking
 * @param {HTMLLIElement} item list item to modify
 */
function setupEditableField(item) {
    item.contentEditable = true;
    item.spellcheck = true;
}

/**
 * Creates and appends a new editable list item
 * @param {HTMLUListElement} list list that receives the new item
 * @param {string} className class to apply to the new item
 */
function addEditableListItem(list, className) {
    // Stores the new list item that the user can edit.
    const item = makeElem({tag:'li', className:className});
    setupEditableField(item);
    list.append(item);
    item.focus();
}

/**
 * Callback to setup non-simple input fields
 */
function setupAllEditableFields() {
    // setup all interesting facts list items input fields
    for (const item of INTERESTING_FACTS.children) setupEditableField(item);
    // setup all primary sources list items input fields
    for (const item of PRIMARY_SOURCES.children) setupEditableField(item);
    // setup all secondary sources list items input fields
    for (const item of SECONDARY_SOURCES.children) setupEditableField(item);
    
    // setup other non-simple input fields
    setupEditableField(PROGRAM_DESC);
    setupEditableField(ACADEMIC_COST_DETAILS);
    setupEditableField(LIVING_COST_DETAILS);
}

/** flag to check if program's values are valid */
let valid = true;

/** Saves programs into local storage */
async function save() {
    // Stores whether all user inputs passed validation before saving.
    const isValid = await verify(false);
    // Check if validation failed and stop saving if the input is invalid.
    if (!isValid){
        alert("Failed to save: Invalid input field(s)!");
        return;
    }

    // Stores the current saved programs from local storage.
    let programs = getLocal();
    sortArray(programs);

    // Stores the new program built from the editor form inputs.
    let newProgram = new Program({
        schoolName: SCHOOL_NAME.value,
        city: CITY.value,
        province: PROVINCE.value,
        country: COUNTRY.value,
        schoolPicture: SCHOOL_PIC.value,
        mapPicture: MAP_PIC.value,
        programName: PROGRAM_NAME.value,
        lengthOfProgram: PROGRAM_LENGTH.value,
        programDescription: PROGRAM_DESC.value,
        hasCoop: hasCoop,
        admissionCoursesNeeded: ADMISSION_COURSES.value,
        admissionAverageNeeded: ADMISSION_AVERAGE.value,
        domesticTuition: DOMESTIC_TUITION.value,
        internationalTuition: INTERNATIONAL_TUTION.value,
        academicCostDetails: ACADEMIC_COST_DETAILS.value,
        academicCost: ACADEMIC_COST.value,
        livingCostDetails: LIVING_COST_DETAILS.value,
        livingCost: LIVING_COST.value,
        interestingFacts: getListHTML(INTERESTING_FACTS),
        primarySources: getListHTML(PRIMARY_SOURCES),
        secondarySources: getListHTML(SECONDARY_SOURCES)
    });
    append(programs, newProgram);

    localStorage.setItem("programs", JSON.stringify(programs));
}

/** 
 * Check if the program is valid
 * @returns {Promise<boolean>} whether the program is valid
 */
async function verify() {
    valid = true;

    // check if domestic tuition is a numerical value
    if (isNaN(DOMESTIC_TUITION.value)) {
        alert("Domestic tuition field should be a valid numerical value!");
        valid = false; 
    }

    // check if international tuition is a numerical value
    if (isNaN(INTERNATIONAL_TUTION.value)) {
        alert("International tuition field should be a valid numerical value!");
        valid = false; 
    }

    // check if academic cost is a numerical value
    if (isNaN(ACADEMIC_COST.value)) {
        alert("Academic cost field should be a valid numerical value!");
        valid = false; 
    }

    // check if living cost is a numerical value
    if (isNaN(LIVING_COST.value)) {
        alert("Living cost field should be a valid numerical value!");
        valid = false; 
    }
    
    // check if program length is a numerical value
    if (isNaN(PROGRAM_LENGTH.value)) {
        alert("Program length field should be a valid numerical value!");
        valid = false; 
    }

    // validate school map image source
    if (!(await validateSrc(MAP_PIC.value))) {
        alert("Map picture source is either invalid or unreachable!");
        valid = false; 
    }

    // validate school image source
    if (!(await validateSrc(SCHOOL_PIC.value))) {
        alert("School picture source is either invalid or unreachable!");
        valid = false; 
    }

    return valid;
}

/** callback to attach event listeners as this script is included as a module script */
function attachListeners() {
    HAS_COOP.addEventListener("click",swapCoop);
    BTN_ADD_FACT.addEventListener("click", () => addEditableListItem(INTERESTING_FACTS, 'Fact'));
    BTN_ADD_PRIMARY_SOURCE.addEventListener("click", () => addEditableListItem(PRIMARY_SOURCES, 'priSource'));
    BTN_ADD_SECONDARY_SOURCE.addEventListener("click", () => addEditableListItem(SECONDARY_SOURCES, 'secSource'));
    BTN_VERIFY.addEventListener("click",verify);
    BTN_SAVE.addEventListener("click",save);
    BTN_DEL.addEventListener("click",deleteLastProgram);
}

/** async callback to run once page loads */
function init() {
    // sets up all non-simple input fields
    setupAllEditableFields();

    // attaches event listeners
    attachListeners();
}

document.addEventListener("DOMContentLoaded", init);
