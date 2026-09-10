'use strict';

// HTML targets
const IMG_CUR = document.getElementById('img-current');

// "Windows spotlight"
const IMG_PATHS = [
    'lor-binahteaparty.jpg', 'lor-chesedbattle.jpg', 'lor-credits.jpg', 'lor-emptylibrary.png', 'lor-floor-of-art.png',
    'lor-floor-of-philosophy.jpeg', 'lor-floor-of-religion.png', 'lor-floor-of-social-science.jpg', 'lor-librarytree.png',
    'lor-palelibrarian.png', 'lor-rolandAndAngelaNoLogo.jpg', 'lor-rolandAndAngelaWithLogo.jpg', 'lor-seedoflight.png', 'lor.jpg'
];
/** index of current image in file paths array */
let cur_idx = Math.floor(IMG_PATHS.length/2);
IMG_CUR.src = "assets/img/" + IMG_PATHS[cur_idx];

/** switch the image slideshow "windows spotlight" to the next image */
function nextPicture() {
    cur_idx++;
    cur_idx %= IMG_PATHS.length;
    IMG_CUR.src = "assets/img/" + IMG_PATHS[cur_idx];
}

/** switch the image slideshow to the previous image */
function prevPicture() {
    cur_idx--;
    cur_idx = ((cur_idx % IMG_PATHS.length) + IMG_PATHS.length) % IMG_PATHS.length;
    IMG_CUR.src = "assets/img/" + IMG_PATHS[cur_idx];
}
