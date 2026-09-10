'use strict';

// HTML targets
const P_DISPLAY1 = document.getElementById('p-display1');
const P_DISPLAY2 = document.getElementById('p-display2');
const TXT_IPT = document.getElementById('txt-input');

// arrays to be used as test data for the algorithms
const stringArray = [
    'noodles', 'dumplings',
    'pizza', 'burger',
    'noodles'
];

const numbersArray = [
    89, 578, 1, 2, 30, 4, 1, 50123, 7, 4, 28, 2, 9, 481, 291
];


// Base functions
/**
 * Return all elements of a string where each element is on a different line
 * @param {Array} arr the array
 * @returns {string} string of all elements separated by line break characters
 */
function printArray(arr) {
    /** string buffer to store output */
    let res = "";

    // iterate through each element of the given array
    for (const e of arr)
        // append element value and a linebreak character to output buffer
        res += e + '<br>';
    return res;
}

/**
 * Count the number of occurences of a value in an array
 * @param {Array} arr the array to search in
 * @param {*} val the value to search for
 * @param {number} start the index to start searching at
 * @returns {number} the number of occurences of search value in the array
 */
function countOccurences(arr, val, start=0) {
    /** value to track how many times search value was found */
    let count = 0;

    // iterate through each element of the given array
    for (let i = start; i < arr.length; i++) 
        // if current element is equal to search value, increment counter
        if (arr[i] == val) ++count;

    return count;
}

/**
 * Finds the maximum element in a number array
 * @param {number[]} arr an array of real numbers
 * @returns the greatest element in given array 
 */
function findMaximum(arr) {
    /** value to store the running max as we iterate */
    let curMax = arr[0];

    // iterate through all elements of the number array
    for (let i = 0; i < arr.length; i++) {
        // replace running max with current element if current element is greater
        curMax = (arr[i] > curMax ? arr[i] : curMax);
    }

    return curMax;
}

/**
 * Find the index of the first occurence of a value in an array
 * @param {Array} arr the array to search in
 * @param {*} val the value to search for
 * @param {number} start the index to start searching at
 * @returns index of the search value if it is found, else -1
 */
function searchArray(arr, val, start=0) {
    // iterate through array to search for value
    for (let i = start; i < arr.length; i++) {
        // check if current element is equal to search value
        if (arr[i] == val) return i;
    }
    return -1;
}

/**
 * Finds the second maximum element in a number array
 * @param {number[]} arr an array of real numbers
 * @returns the second greatest element in given array
 */
function findSecondBiggest(arr) {
    /** variable to store the first maximum */
    let fMax;
    /** variable to store the second maximum */
    let sMax;

    // check whether first or second element is greater to decide the starting first/second maximum
    if (arr[0] > arr[1]) { fMax = arr[0]; sMax = arr[1]; }
    else { fMax = arr[1]; sMax = arr[0]; }
    
    // iterate through array elements
    for (let i = 2; i < arr.length; i++) {
        // check if element is greater than current first maximum
        if (arr[i] > fMax) fMax = arr[i];
        // check if element is smaller than first maximum but greater than current second maximum
        else if (arr[i] > sMax) sMax = arr[i];
    }

    return sMax;
}

/**
 * Finds the index of the maximum element in a number array
 * @param {number[]} arr an array of real numbers
 * @returns the index of the greatest element
 */
function findIndexOfMaximum(arr) {
    /** variable to track our running maximum */
    let curMax = arr[0];
    /** variable to track index of our running maximum */
    let idx = 0;

    // iterate through array elements
    for (let i = 0; i < arr.length; i++) {
        // check if current element is greater than current maximum
        if (arr[i] > curMax) {
            curMax = arr[i];
            idx = i;
        }
    }
    return idx;
}

/**
 * Finds the index of the minimum element in a number array
 * @param {number[]} arr an array of real numbers
 * @returns the index of the smallest element
 */
function findIndexOfMinimum(arr) {
    /** variable to track our running minimum */
    let curMin = arr[0];
    /** variable to track index of our running minimum */
    let idx = 0;

    // iterate through elements of array
    for (let i = 0; i < arr.length; i++) {
        // check if current element is lesser than current minimum
        if (arr[i] < curMin) {
            curMin = arr[i];
            idx = i;
        }
    }
    return i;
}

/**
 * "Prints" out all the elements in a (number) array between (inclusive) the lower and upper bounds provided
 * @param {number[]} arr input number array
 * @param {number} low lower bound
 * @param {number} high upper bound
 * @returns {string} a string buffer containing all elements within bounds separated by a linebreak character
 */
function printElementsInRange(arr, low, high) {
    /** string buffer to store output */
    let res = "";

    // iterate through elements of array
    for (let i = 0; i < arr.length; i++) {
        // check if current element is within bounds
        if (arr[i] > low && arr[i] < high) {
            res += arr[i] + '<br>';
        }
    }
    
    return res;
}

/**
 * Gets the mean of all positive numbers in a number array
 * @param {number[]} arr an array of real numbers
 * @returns the average of all positive numbers in given array
 */
function calculateMeanOfPositives(arr) {
    /** variable to store the sum of positive numbers */
    let sum = 0;
    /** variable to track number of positive numbers */
    let posNums = 0;

    // iterate through numbers in array
    for (let num of arr) {
        // check if current number is positive
        if (num > 0) {
            ++posNums;
            sum += num;
        }
    }

    return sum/posNums;
}

/**
 * Are we serious -- returns a copy of a provided array -_-
 * @param {Array} arr Input array
 * @returns a copy of provided array
 */
function copyArray(arr) {
    // return arr;
    
    /** variable to store copy of the array */
    let copiedArr = new Array(arr.length);
    // loop through input array to copy elements
    for (let i = 0; i < arr.length; i++) {
        copiedArr[i] = arr[i];
    }

    return arr;
}

/**
 * Get index of all the occurences of a value in an array
 * @param {Array} arr the input array
 * @param {*} val the search value
 * @returns {number[]} an array containing all indices where value is found in array
 */
function searchAllMatches(arr, val) {
    /** array to store all indexes of the value in the array */
    let idxs = [];

    // loop through array elements
    for (let i = 0; i < arr.length; i++) {
        // check if current element is equal to search value
        if (arr[i] == val) idxs.push(i);
    }
    return idx;
}

/**
 * Sorts an array in-place in ascending order using selection-sort algorithm
 * @param {number[]} arr A number array sorted in ascending order
 */
function sortAscending(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i+1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }

        [arr[i],arr[minIdx]] = [arr[minIdx],arr[i]];
    }
}

/**
 * Appends a specified number of empty cells to an array
 * @param {Array} arr the array to resize
 * @param {number} len number of elements to add to the array
 * @returns resized array
 */
function resizeArray(arr, len) {
    // check if array does not need to be resized
    if (!len) return copyArray(arr);
    
    /** temporary variable to store array we're resizing */
    let arr = copyArray(arr);

    // add empty elements to array as specified
    for (let i = 0; i < len; i++) arr += [];

    return arr;
}

/**
 * Shifts an array left without wrap-around, meaning last element becomes NULL
 * @param {Array} arr an input array
 * @returns an array with every element shifted to the left by 1 and the last element set to NULL
 */
function shiftArrayLeft(arr) {
    /** our working array that will be shifted */
    let workingArr = new Array(arr.length);
    
    // traverse array
    for (let i = 1; i < arr.length; i++) {
        // move current element to the left by 1 in our working array
        workingArr[i-1] = arr[i];
    }
    // set last element in working array to null
    workingArr[arr.length-1] = null;

    return workingArr;
}

/**
 * Gets a copy of an array with the first occurence of a specified value deleted and rest of array collapsed
 * @param {*} arr the input array
 * @param {*} val the value to be deleted
 * @returns array with first occurences of deletion value deleted and rest of array collapsed
 */
function deleteElement(arr, val) {
    /** flag to check whether deletion value was found */
    let found = false;
    /** a working array to copy elements into */
    let wArr = new Array(arr.length+1);

    // iterate through array
    let i = 0;
    for (; i < arr.length; i++) {
        // if not deletion value, copy element over
        if (arr[i] != val) wArr[i] = arr[i];
        // if deletion value, set the flag and stop the current loop
        else {
            found = true;    
            break;
        }
    }

    // copy elements into working array starting from after element to be deleted
    ++i;
    for (; i < arr.length; i++) {
        wArr[i-1] = arr[i];
    }

    // if element was not found
    if (!found) wArr.pop();

    return wArr;
}

// -----------------------------------------------------------------------------------------------------------

// Test button callbacks
/**
 * callback to clear all output and input fields
 */
function clear() {
    P_DISPLAY1.innerHTML = '';
    P_DISPLAY2.innerHTML = '';
    TXT_IPT.innerHTML = '';
}

/**
 * test the printArray function by printing both stringArray and numbersArray to the console
 */
function printArrayTest() {
    clear();

    P_DISPLAY1.innerHTML = printArray(stringArray);
    P_DISPLAY2.innerHTML = printArray(numbersArray);
}

/**
 * test the countOccurences function by counting number of occurences of input value inside of the string or number array
 */
function countOccurencesTest() {
    /** temporary variable to track input field's value */
    let ipt = TXT_IPT.value;
    
    clear();

    // check if input value is a number of string to determine whether to check occurences inside numbers or strings array
    if (isNaN(ipt)) 
        P_DISPLAY1.textContent = `Input value occurs ${countOccurences(stringArray,TXT_IPT.value)} times in the strings array.`;
    else
        P_DISPLAY2.textContent = `Input value occurs ${countOccurences(numbersArray,+TXT_IPT.value)} times in the number array.`;
}

/** test the findMaximum function by finding max element in the numbers array */
function findMaximumTest() {
    clear();

    P_DISPLAY1.innerHTML = findMaximum(numbersArray);
}

/** test the searchArray function by search for an input value inside of the string or numbers array */
function searchArrayTest() {
    /** temporary variable to track input field's value */
    let ipt = TXT_IPT.value;
    
    clear();

    // check if input value is a number of string to determine whether to search for input value inside numbers or strings array
    if (isNaN(ipt)) {
        let res = searchArray(stringArray,ipt);
        P_DISPLAY1.textContent = (res != -1 ? `Input value is first found at index ${res} in the strings array.` : 'Input value was not found in the strings array.');
    } else {
        let res = searchArray(numbersArray,+ipt);
        P_DISPLAY2.textContent = (res != -1 ? `Input value is first found at index ${res} in the numbers array.` : 'Input value was not found in the numbers array.');
    }
}

/** test the findSecondBiggest function by finding second max element in the numbers array */
function findSecondBiggestTest() {
    clear();

    P_DISPLAY1.innerHTML = findSecondBiggest(numbersArray);
}

/** test the findIndexOfMaximum function by getting index of maximum element in numbers array */
function findIndexOfMaximumTest() {
    clear();

    P_DISPLAY1.innerHTML = findIndexOfMaximum(numbersArray);
}

/** test the findIndexOfMinimum function by getting index of minimum element in numbers array */
function findIndexOfMaximumTest() {
    clear();

    P_DISPLAY1.innerHTML = findIndexOfMinimum(numbersArray);
}

/** test the printElementsInRange function by printing all elements in numbers array in the interval [60,80] */
function printElementsInRangeTest() {
    clear();

    P_DISPLAY1.innerHTML = printElementsInRange(numbersArray, 60, 80);
}

/** test the calculateMeanOfPositives function by printing average of all positive numbers in numbers array */
function calculateMeanOfPositivesTest() {
    clear();

    P_DISPLAY1.innerHTML = calculateMeanOfPositives(numbersArray);
}

/** test the copyArray function by printing the strings array and its copy inside of the paragraphs */
function copyArrayTest() {
    clear();

    P_DISPLAY1.innerHTML = stringArray;
    P_DISPLAY2.innerHTML = stringArray;
}

/** test the searchAllMatches function by finding all indices of 1 in numbers array and 'noodles' in strings array */
function searchAllMatchesTest() {
    clear();

    P_DISPLAY1.innerHTML = searchAllMatches(numbersArray,1);
    P_DISPLAY2.innerHTML = searchAllMatches(stringArray, 'noodles');
}

/** tests the sortAscending function by sorting a copy of the numbers array and printing it to the paragraph */
function sortArrayTest() {
    clear();

    let arr = numbersArray;
    sortAscending(arr);
    P_DISPLAY1.innerHTML = printArray(arr);
}
