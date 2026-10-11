'use strict';

const DAY = prompt("What is the day of the week?\n").toLocaleLowerCase();
const MTH = prompt("What is the month?\n").toLocaleLowerCase();

const SKL_MTH = ['september','october','november','december','january','february','march','april','may','june'];
const SKL_DAY = ['monday','tuesday','wednesday','thursday','friday'];

if (SKL_DAY.includes(DAY) && SKL_MTH.includes(MTH)) {
    console.log("It's a school day my man.");
} else {
    console.log("No school lol");
}

