'use strict';

/**
 * Don't ever do that again.
 * @param {string} audioSrc path to epilepsy warning audio file
 * @param {string} imgSrc path to epilepsy warning image file
 * @param {number} duration duration for epilepsy warning audio/overlay
 */
export function DontEverDoThatAgain(audioSrc = "assets/audio/dont-ever-do-that-again.mp3", imgSrc = "assets/img/dont-ever-do-that-again.png", duration = 3000) {
    // Do not provide epilepsy warnings if a warning is already active
    if (globalThis.epilepsyWarning) return;
    globalThis.epilepsyWarning = true;

    const audio = new Audio(audioSrc);
    audio.play();

    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
        position: "fixed", inset: "0", zIndex: "999998",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0, 0, 0, 0.85)", pointerEvents: "none"
    });

    const img = document.createElement("img");
    img.src = imgSrc;
    Object.assign(img.style, {
        width: "100%", height: "100%", objectFit: "cover"
    });

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    // Reset after warning finishes
    setTimeout(() => {
        overlay.remove();
        audio.pause();
        audio.currentTime = 0;
        globalThis.epilepsyWarning = false;
    }, duration);
}
