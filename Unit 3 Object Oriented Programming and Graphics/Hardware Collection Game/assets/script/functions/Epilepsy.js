'use strict';

import { DontEverDoThatAgain } from "./DontEverDoThatAgain.js";

/**
 * Jumpscare the user with flashing lights, thereby giving the user a seizure if activated at night.
 * @param {string} audioSrc path to audio to play
 * @param {number} audioDelay ms of audio to play before visuals start
 * @param {number} duration duration of the flashing in milliseconds
 * @param {number} hz frequency of the flashes in hertz
 */
export function Epilepsy(audioSrc = "assets/audio/epilepsy.wav", audioDelay = 2000, duration = 2000, hz = 20) {
    // Do not give the user epilepsy jumpscares if one is already active
    if (globalThis.active) return;
    // Show the warning first before allowing the full effect
    if (!globalThis.epilepsyWarned) { globalThis.epilepsyWarned = true; DontEverDoThatAgain(); return; }
    // Do not give the user normal epilepsy jumpscares when giving a warning
    if (globalThis.epilepsyWarning) return;
    globalThis.active = true;

    const audio = new Audio(audioSrc);
    audio.play();

    setTimeout(() => {
        const overlay = document.createElement("div");
        Object.assign(overlay.style, {
            position: "fixed", inset: "0", zIndex: "999999",
            pointerEvents: "none", mixBlendMode: "difference"
        });
        document.body.appendChild(overlay);

        const interval = 1000 / hz;
        let tick = 0;
        const flash = setInterval(() => {
            overlay.style.background = tick++ % 2 === 0 ? "white" : "black";
        }, interval);

        // Reset after epilepsy jumpscare finishes
        setTimeout(() => {
            clearInterval(flash);
            overlay.remove();
            globalThis.active = false;
        }, duration);
    }, audioDelay);
}
