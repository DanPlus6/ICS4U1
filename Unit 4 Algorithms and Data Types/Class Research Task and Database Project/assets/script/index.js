/**
 * By: David Fu
 */
'use strict';

// Stores the small disclaimer image that opens the overlay.
const disclaimerTrigger = document.getElementById("stuco-disclaimer-trigger");
// Stores the full-screen disclaimer overlay element.
const disclaimerOverlay = document.getElementById("disclaimer-overlay");
// Stores the button used to close the disclaimer overlay.
const disclaimerClose = document.getElementById("disclaimer-close");

/** display disclaimer overlay */
function openDisclaimer() {
    disclaimerOverlay.classList.add("is-visible");
    disclaimerOverlay.setAttribute("aria-hidden", "false");
}

/** hide disclaimer overlay */
function closeDisclaimer() {
    disclaimerOverlay.classList.remove("is-visible");
    disclaimerOverlay.setAttribute("aria-hidden", "true");
}

disclaimerTrigger.addEventListener("click", openDisclaimer);
disclaimerClose.addEventListener("click", closeDisclaimer);
