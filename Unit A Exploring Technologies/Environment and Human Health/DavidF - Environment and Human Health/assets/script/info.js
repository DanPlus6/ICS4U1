'use strict';

// Declare const targets to html elements
const INFO_HEAD = document.getElementById('info-heading');
const SECT_HEAD = document.getElementById('section-heading');
const SECT_BODY = document.getElementById('section-body');
const BTN_PREV  = document.getElementById('btn-prev');
const BTN_NEXT  = document.getElementById('btn-next');


// Declare const variables/info for displaying topics information
const SECT_CT = { 1: 3, 2: 3, 3: 1, 4: 1, 5: 3, 6: 3 };
const SECTION_HEADINGS = {
    1: ['High Electricity Usage of AI and Data Centres', 'Excessive Use of Paper from Printing', 'Creation of E-Waste'],
    2: ['Reduced Hhysical Activity due to Excessive Computer Technology Use', 'Eye Strain from Screens', 'Mental Hhealth Issues Resulting from Cyberbullying'],
    3: ['Paperless Workplaces'],
    4: ['Ergonomics Standards'],
    5: ['York Region Elgin Mills Community Environmental Centre', 'Staples E-Waste Recycling Drop-offs', 'Kids Help Phone'],
    6: ['Smart Agriculture Reducing Water Consumption', 'AI-Powered Waste Sorting', 'Cloud Computing Reducing E-waste'],
};

// Declare dynamic variables used for section tracking
let topic = 0, section = 0;

/**
 * Fetches the .txt file for the current topic/section and renders it.
 */
async function loadSection() {
    try {
        /** Declare const path to current section's info text file */
        const path = `assets/info/topic${topic}_section${section}.txt`;
        const response = await fetch(path);
        if (!response.ok) console.log('txt not found 😭');

        // Load text from file onto section body
        const text = await response.text();
        SECT_BODY.textContent = text;
    } catch (err) {
        console.log(`couldn't load for some reason 💔 (${err.message})`);
    }
 
    // Update section heading
    SECT_HEAD.textContent = SECTION_HEADINGS[topic][section - 1];
 
    // Update prev/next button visibility
    const total = SECT_CT[topic];
    BTN_PREV.style.visibility = ((total > 1) ? 'visible' : 'hidden');
    BTN_NEXT.style.visibility = ((total > 1) ? 'visible' : 'hidden');
}


/** 
 * Function to display information onto the information body/section; 
 * @param {HTMLElement} btn one parameter, a reference to the button itself
*/
function display(btn) {
    // Clear previous active buttons and set current button to active
    document.querySelectorAll('.nav-child').forEach(el => el.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Display heading
    INFO_HEAD.textContent = btn.textContent;

    // Display section subheading and body
    topic = Number(btn.getAttribute('id'));
    section = 1;
    loadSection();
}

/**
 * Go to the previous section (wrap-around)
 */
function prevSection() {
    /** If somehow navigating while section is 0, do nothing */
    if (topic === 0) return;

    const total = SECT_CT[topic];
    section = ((section === 1) ? total : section - 1);

    loadSection();
}
 
/**
 * Go to the next section (wrap-around)
 */
function nextSection() {
    /** If somehow navigating while section is 0, do nothing */
    if (topic === 0) return;

    // Wrap around logic
    const total = SECT_CT[topic];
    section = ((section === total) ? 1 : section + 1);

    loadSection();
}

