'use strict';

const P_PRINTER1 = document.getElementById('printer1');
const P_PRINTER2 = document.getElementById('printer2');
const NAME_IPT = document.getElementById('name-input');

function makeCar(colour) {
    console.log(`Making a ${colour} car!`);
}

function sayHello(name) {
    let helloMsg = `Hello ${name}.`;
    console.log(helloMsg);
    alert(helloMsg);
    P_PRINTER1.textContent = helloMsg;
    P_PRINTER2.textContent = helloMsg;
    
    NAME_IPT.value = "";
}

function makeRandomInt(minimum, maximum) {
    console.log(Math.floor(Math.random() * (maximum - minimum + 1)) + minimum);
}

function roundp(x, places) {
    console.log(Math.round(x * (10**places)) / (10**places));
}

function calcHypotenuse(a,b) {
    alert(roundp(Math.sqrt(a**2 + b**2), 2));
}

function start() {
    makeCar("blue");
    makeCar("yellow");
    makeCar("red");
}
