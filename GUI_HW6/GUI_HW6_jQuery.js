/*
    File: GUI_HW6_jQuery.js
    91.61 GUI Programming I Assignment: Creating an Interactive Dynamic Table
    Sean T. Gillis, UMass Lowell Computer Science, Sean_Gillis1@student.uml.edu
    Copyright (c) 2020 by Sean T. Gillis. All rights reserved.
    created by Sean T. Gillis on November 8, 2020 at 7:20 PM

    This script checks for invalid user inputs and displays apropriate error
    messages using jQuery.
*/

$(document).ready(function () {
    // stop the page from refreshing when the form is submitted
    $('#inputSection').submit(function (event) {
        event.preventDefault();
    });

    // every field requires an input and it must be between -100 and 100
    $("#inputSection").validate({
        rules:
        {
            xfrom:
            {
                required: true,
                min: -100,
                max: 100,
            },
            xto:
            {
                required: true,
                min: -100,
                max: 100,
            },
            yfrom:
            {
                required: true,
                min: -100,
                max: 100,
            },
            yto:
            {
                required: true,
                min: -100,
                max: 100,
            },
        },
        messages:
        {
            xfrom:
            {
                required: "All entry fields must be filled.",
                min: "All values must be between -100 and 100",
                max: "All values must be between -100 and 100",
            },
            xto:
            {
                required: "All entry fields must be filled.",
                min: "All values must be between -100 and 100",
                max: "All values must be between -100 and 100",
            },
            yfrom:
            {
                required: "All entry fields must be filled.",
                min: "All values must be between -100 and 100",
                max: "All values must be between -100 and 100",
            },
            yto:
            {
                required: "All entry fields must be filled.",
                min: "All values must be between -100 and 100",
                max: "All values must be between -100 and 100",
            },
        },
    });
});
