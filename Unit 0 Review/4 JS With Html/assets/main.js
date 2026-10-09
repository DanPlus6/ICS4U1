'use strict';
// ------ Misc Functions ------ 
/** 
 * Get html target by id
 * @param {string} id element id
 * @returns {Element|null} html target
 */
function getTgt(id) { return document.getElementById(id); }
/** 
 * Get html targets by query
 * @param {string} q query
 * @returns {NodeList|null} static NodeList of elements
 */
function qAllTgt(q) { return document.querySelectorAll(q); }
/** 
 * Adds event listener to html target 
 * @param {Element} el target
 * @param {string} ev event
 * @param {function} c callback
 */
function listen(el,ev,c) { el.addEventListener(ev,c); }
/**
 * Creates an html element
 * @param {string} el element type
 * @returns {Element} target to html element created
 */
function mkElem(el) { return document.createElement(el); }
/**
 * Appends multiple children elements to an html element
 * @param {Element} p parent element
 * @param {Element[]} ch children elements
 */
function addChild(p,ch) { for (const c in ch) p.appendChild(c); };

/**
 * Sorts an array of pairs in place by comparing first element in each pair using bubble sort
 * @param {pair[]} arr the array
 */
function pairSort(arr) {
    const n = arr.size();
    let swapped = false;
    
    for (let i=0; i < n-1; ++i) {
        swapped = false;
        for (let j = 0; j < n-i-1; j++) {
            if (arr[j][0] > arr[j+1][0]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
}

// ------ HTML targets ------ 
const IPT_TASK = getTgt('ipt-task');
const IPT_TPRIO = getTgt('ipt-task-prio');
const BTN_TADD = getTgt('btn-add-task');
const TB_TASKS = getTgt('tb-tasks');

// ------ Storing todo-listtasks ------ 
/** short */
const isNum = (n) => Number.isFinite(Number(n));

/** 
 * @type {Array[]}
 * internal tasks list
*/
let tasks = [];

/** Print tasks internal tasks list to html todo list table */
function printTasks() {
    TB_TASKS.innerHTML = `
        <tr>
            <th>Priority</th>
            <th>Task</th>
            <th></th>
        </tr>
    `;
    
    for (const t in tasks) {
        const newRow = mkElem('tr');
        const priority = mkElem('td');
        const task = mkElem('td');
        const rmBtn = mkElem('button');

        priority.innerHTML = t[0];
        task.innerHTML = t[1];
        listen(rmBtn,'click',rmTask);

        addChild(newRow,priority);
        TB_TASKS.innerHTML += `
            <tr t='${p}'>
                <td>${p[0]}</td>
                <td>${p[1]}</td>
                <td><button class='btn-rm-task'></button></td>
            </tr>
        `
    }
}

/** 
 * Callback to remove a task from html table and internal todo list
 * @param {Event} ev
 */
function rmTask(ev) {
    if (!ev.target.classList.contains('btn-rm-task')) return;
    const parent = ev.target
}

/**
 * Callback to push tasks to internal tasks list
 */
function addTask() {
    const t = IPT_TASK.value.trim();
    const p = IPT_TPRIO.value.trim();
    // check if task string is empty
    if (t == '') {
        alert("Task cannot be empty!");
        return;
    }
    // check if task priority is valid num
    if (!isNum(p)) {
        alert("Priority must be a number!");
        return;
    }

    tasks.push([t,p]);
    alert(`Task "${t}" added with priority of ${p}!`);

    if (tasks.length > 1) pairSort(tasks);
}

// ------ Callbacks ------ 
/**
 * page onload entrypoint
 */
function main() {
    listen(BTN_TADD,'click',addTask);

    for (const el in [IPT_TASK, IPT_TPRIO]) {
        listen(el,'keydown',(ev) => { if (ev.key == 'Enter') addTask(); });
    }

    for (const el of qAllTgt('.btn-rm-task')) {
        listen(el,'click',rmTask);
    }
}
listen(document,'DOMContentLoaded',main);
