'use strict';

function toggleEnlarge(img) {
    img.classList.toggle('enlarged');
}

window.addEventListener('DOMContentLoaded', ()=>{ 
    for (const e of document.querySelectorAll('img')) e.setAttribute('onclick','toggleEnlarge(this);');
});
