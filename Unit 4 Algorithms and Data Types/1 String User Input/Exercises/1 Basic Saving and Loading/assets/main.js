'use strict';

// targets to HTML elements
const P_LOAD = document.getElementById('p-load');
const IPT_NAME = document.getElementById('ipt-name')
const IPT_AGE = document.getElementById('ipt-age');

// variables to store user inputs
let name;
let age;

function save() {
    if (IPT_NAME.value != '' && IPT_AGE.value != '') {
        if (Number.isFinite(+IPT_AGE.value)) age = IPT_AGE.value;
        else {
            alert("Age must be a valid number!");
            return;
        }
        name = IPT_NAME.value;

        IPT_NAME.value = '';
        IPT_AGE.value = '';
    } else alert("You must fill in both input fields to save!");
}

function load() {
    if (IPT_NAME && IPT_AGE) P_LOAD.textContent = `Your name is ${name} and you're ${age} years old.`;
    else alert("You must save first before loading.");
}



