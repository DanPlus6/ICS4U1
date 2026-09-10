'use strict';

// targets to HTML elements
const IPT_NAME = document.getElementById('ipt-name');
const IPT_SECRET = document.getElementById('ipt-secret');
const IPT_FAV = document.getElementById('ipt-fav');
const P_OPT = document.getElementById('p-output');
const DIV_OPT = document.getElementById('output-field');

// variables to store user inputs
let name;
let secret;
let fav;

function submit() {
    if (IPT_NAME.value != '' && IPT_SECRET.value != '' && IPT_FAV.value != '') {
        name = IPT_NAME.value;
        secret = IPT_SECRET.value;
        fav = IPT_FAV.value;

        IPT_NAME.value = '';
        IPT_SECRET.value = '';
        IPT_FAV.value = '';

        DIV_OPT.style.visibility = 'visible';

        P_OPT.textContent = `${name} walked into a store. ${name} was looking to buy a ${fav} as a
        present for their secret crush. But before buying anything, ${name} started to shiver. What
        if ${name}'s secret crush discovered their deepest, darkest secret? ${name} ${secret}…
        `

    }
    else alert("You must fill in all input fields to save!");
}

