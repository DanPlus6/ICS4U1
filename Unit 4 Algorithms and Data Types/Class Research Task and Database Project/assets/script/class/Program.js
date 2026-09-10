/**
 * By: David Fu
 */
'use strict';

export class Program {
    /** 
     * object to store research for an university program 
     * @param {object} data raw json research data
     */
    constructor(data) {
        this.schoolName = data.schoolName;
        this.city = data.city;
        this.province = data.province;
        this.country = data.country;
        this.schoolPicture = data.schoolPicture;
        this.mapPicture = data.mapPicture;
        this.programName = data.programName;
        this.lengthOfProgram = data.lengthOfProgram;
        this.programDescription = data.programDescription;
        this.hasCoop = data.hasCoop;
        this.admissionCoursesNeeded = data.admissionCoursesNeeded;
        this.admissionAverageNeeded = data.admissionAverageNeeded;
        this.domesticTuition = data.domesticTuition;
        this.internationalTuition = data.internationalTuition;
        this.academicCostDetails = data.academicCostDetails;
        this.academicCost = data.academicCost;
        this.livingCostDetails = data.livingCostDetails;
        this.livingCost = data.livingCost;
        this.interestingFacts = data.interestingFacts;
        this.primarySources = data.primarySources || [];
        this.secondarySources = data.secondarySources || [];
    }

    /**
     * method to return all properties stored together as a string for searching purposes
     * @returns {string} string cocantenation of all fields and properties of the program
     */
    getString() {
        /** string to store concantenation of all fields and properties */
        let resCocant = "";

        // iterate through every property of this object
        for (const v of Object.values(this)) {
            // if property is a string, cocantenate it
            if (typeof v === "string") resCocant += v;
        }

        return resCocant;
    }

    /** 
     * callback to convert raw json data into a Program class
     * @param {object} data raw json data
     * @returns {Program} a new Program class from raw data
     */
    static fromJson(data) {
        return new Program(data);
    }

    /** 
     * function to convert organized json array into array of Program objects
     * @param {object[]} jsonArr array of raw json data
     * @returns {Program[]} parsed array of Program objects
     */
    static fromJsonArray(jsonArr) {
        /** array to store json data parsed into Program objects */
        let parsedArr = new Array(jsonArr.length);
        // iterate through and parse raw data into Program objects
        for (let i=0;i<jsonArr.length;i++) parsedArr[i] = Program.fromJson(jsonArr[i]);
        return parsedArr;
    }
}
