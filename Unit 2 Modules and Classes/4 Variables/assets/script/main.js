'use strict';

// Declare const references for buttons
const BTN_SPIMAN = document.getElementById('btn_spiderman');
const BTN_SUPMAN = document.getElementById('btn_superman');
const BTN_BMAN = document.getElementById('btn_batman');

// Declare const references for profile
const PROF = document.getElementById('profile_container');
const BTN_LOGOFF = document.getElementById('btn-logoff');
const ST_IMG = document.getElementById('st_img');
const ST_FNAME = document.getElementById('st_fname');
const ST_LNAME = document.getElementById('st_lname');
const ST_HAIR = document.getElementById('st_hair');
const ST_EYE = document.getElementById('st_eye');
const ST_AGE = document.getElementById('st_age');
const ST_DESC = document.getElementById('st_desc');


// Declare (unnecessary 😭) placeholder stats that will be modified to the profiles of various characters
let imgsrc = null;
let fname = null;
let lname = null;
let hair = null;
let eye = null;
let age = null;
let desc = null;


/**
 * Opposite of logoff() function, makes dating profile and logoff button visible
 */
function on() {
    PROF.style.display = "flex";
    PROF.hidden = "false";
    PROF.style.visibility = "visible";

    BTN_LOGOFF.style.display = "flex";
    BTN_LOGOFF.hidden = "false";
    BTN_LOGOFF.style.visibility = "visible";
}

/**
 * Log off button; Hides the dating profile and logoff button when clicked
 */
function logoff() {
    PROF.style.display = "none";
    PROF.hidden = "true";
    PROF.style.visibility = "hidden";

    BTN_LOGOFF.style.display = "none";
    BTN_LOGOFF.hidden = "true";
    BTN_LOGOFF.style.visibility = "hidden";
}

/**
 * Called once by each profile displaying function; sets the profile stats on the actual webpage after their variables have been set
 */
function build() {
    ST_IMG.src = imgsrc;
    ST_FNAME.textContent = fname;
    ST_LNAME.textContent = lname;
    ST_HAIR.textContent = hair;
    ST_EYE.textContent = eye;
    ST_AGE.textContent = age;
    ST_DESC.textContent = desc;
}


/**
 * Display profile for spiderman
 */
function prof_spiderman() {
    // Unnecessary variable setting 😭
    imgsrc = "assets/img/spiderman.png";
    fname = "Spider";
    lname = "Man";
    hair = "Unknown";
    eye = "Unknown";
    age = 20;
    desc = 
    "Spider Man is a scientist. He likes taking walks in the park, beating up the bad guys, and disappointing his Uncle Ben.";

    build();
    on();
}

/**
 * Display profile for superman
 */
function prof_superman() {
    // Unnecessary variable setting 😭
    imgsrc = "assets/img/superman.png";
    fname = "Clark";
    lname = "Kent";
    hair = "Black";
    eye = "Blue";
    age = 30;
    desc = 
    "Raised in Smallville as a noble, compassionate figure, he works as a Metropolis reporter.";

    build();
    on();
}

/**
 * Display profile for batman
 */
function prof_batman() {
    // Unnecessary variable setting 😭
    imgsrc = "assets/img/bruce-wayne.png";
    fname = "Bruce";
    lname = "Wayne";
    hair = "Black";
    eye = "Blue";
    age = 39;
    desc = 
    "Bruce Wayne is the billionaire industrialist, philanthropist, and owner of Wayne Enterprises who operates as the brooding, masked vigilante Batman in Gotham City.";

    build();
    on();
}
