'use strict';

/** Event listener to open dropdown menu upon hover/pin upon clicked */
document.querySelectorAll('.nav-item').forEach(navitem => {
    const parent = navitem.querySelector('.nav-parent');

    /** Event listener to show dropdown upon mouse hover */
    navitem.addEventListener('mouseenter', () => {
        if (!navitem.classList.contains('pinned')) {
            navitem.classList.add('open');
        }
    });

    /** Event listener to close dropdown upon mouse leave */
    navitem.addEventListener('mouseleave', () => {
        if (!navitem.classList.contains('pinned')) {
            navitem.classList.remove('open');
        }
    });

    /** Event listener to pin/unpin dropdown upon mouse click */
    parent.addEventListener('click', () => {
        const wasPinned = navitem.classList.contains('pinned');
        /** Close all pinned dropdowns */
        document.querySelectorAll('.nav-item.pinned').forEach(navitem => {
            navitem.classList.remove('pinned', 'open');
        });
        if (!wasPinned) {
            navitem.classList.add('pinned', 'open');
        }
    });
});

/** Event listener for closing currently pinned dropdown menu when clicking outside */
document.addEventListener('click', event => {
    if (!event.target.closest('.nav-item')) {
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('pinned', 'open');
        });
    }
});
