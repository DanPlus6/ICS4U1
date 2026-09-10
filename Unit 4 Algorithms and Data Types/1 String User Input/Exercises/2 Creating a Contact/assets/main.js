'use strict';

// targets to HTML elements
const IPT_FNAME = document.getElementById('ipt-fname');
const IPT_LNAME = document.getElementById('ipt-lname');
const IPT_NICK = document.getElementById('ipt-nick');
const IPT_AGE = document.getElementById('ipt-age');
const IPT_ADDRESS = document.getElementById('ipt-address');
const IPT_PHONE = document.getElementById('ipt-phone');
const IPT_EMAIL = document.getElementById('ipt-email');
const IPT_NOTES = document.getElementById('ipt-notes');

// variables to store user inputs
let firstName;
let lastName;
let nickname;
let age;
let address;
let phone;
let email;
let notes;

function save() {
    if (
        IPT_FNAME.value != '' && IPT_LNAME.value != '' &&
        IPT_AGE.value != ''&& IPT_ADDRESS.value != '' &&
        IPT_PHONE.value != '' && IPT_EMAIL.value != '' &&
        IPT_NOTES.value != ''
    ) {
        if (Number.isFinite(+IPT_AGE.value)) age = IPT_AGE.value;
        else {
            alert("Age must be a valid number!");
            return;
        }

        firstName = IPT_FNAME.value;
        lastName = IPT_LNAME.value;
        nickname = IPT_NICK.value;
        age = IPT_AGE.value;
        address = IPT_ADDRESS.value;
        phone = IPT_PHONE.value;
        email = IPT_EMAIL.value;
        notes = IPT_NOTES.value;

        IPT_FNAME.value = '';
        IPT_LNAME.value = '';
        IPT_NICK.value = '';
        IPT_AGE.value = '';
        IPT_ADDRESS.value = '';
        IPT_PHONE.value = '';
        IPT_EMAIL.value = '';
        IPT_NOTES.value = '';
    }
    else alert("You must fill in all input fields to save!");
}

function load() {
    if (
        firstName != undefined && lastName != undefined &&
        age != undefined && address != undefined &&
        phone != undefined && email != undefined &&
        notes != undefined
    ) {
        IPT_FNAME.value = firstName;
        IPT_LNAME.value = lastName;
        IPT_NICK.value = nickname;
        IPT_AGE.value = age;
        IPT_ADDRESS.value = address;
        IPT_PHONE.value = phone;
        IPT_EMAIL.value = email;
        IPT_NOTES.value = notes;
    }
    else alert("You must save first before loading.");
}



