/**
 * By: David Fu
 */
'use strict';

/** not found page path */
const PATH = "404.html";

/** 
 * callback to redirect user to 404 page
 */
export function redirect404() {
    window.location.href = PATH;
}
