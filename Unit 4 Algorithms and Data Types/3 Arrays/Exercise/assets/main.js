'use strict';

// HTML targets
const IMG_CUR = document.getElementById('img-current');

// "Windows spotlight"
const IMG_PATHS = [
    'minecraft.webp', 'library-of-ruina.jpeg', 'lobotomy-corporation.jpg', 'limbus-company.jpg', 'project-creedbreaker.webp'
];
/** index of current image in file paths array */
let cur_idx = Math.floor(IMG_PATHS.length/2);
IMG_CUR.src = "assets/img/" + IMG_PATHS[cur_idx];

/** switch the image slideshow "windows spotlight" to the next image */
function nextPicture() {
    cur_idx++;
    if (cur_idx >= IMG_PATHS.length) cur_idx = IMG_PATHS.length-1;
    IMG_CUR.src = "assets/img/" + IMG_PATHS[cur_idx];
}

/** switch the image slideshow to the previous image */
function prevPicture() {
    cur_idx--;
    if (cur_idx < 0) cur_idx = 0;
    IMG_CUR.src = "assets/img/" + IMG_PATHS[cur_idx];
}
