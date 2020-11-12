/*
    File: GUI_HW6.js
    91.61 GUI Programming I Assignment: Creating an Interactive Dynamic Table
    Sean T. Gillis, UMass Lowell Computer Science, Sean_Gillis1@student.uml.edu
    Copyright (c) 2020 by Sean T. Gillis. All rights reserved.
    Created by Sean T. Gillis on November 8, 2020 at 5:12 PM

    This script deletes an exisitng table and replaces it with a new table
    by reading parameters from the html file's input fields.
*/

function createTable()
{
    // get the boundaries of the X and Y axis of the table
    var xFrom = parseInt(document.getElementById("xfrom").value, 10);
    var xTo = parseInt(document.getElementById("xto").value, 10);
    var yFrom = parseInt(document.getElementById("yfrom").value, 10);
    var yTo = parseInt(document.getElementById("yto").value, 10);

    // Do not create a new table if the user's inputs are not valid
    if (isNaN(xFrom) || isNaN(yFrom) || isNaN(xTo) || isNaN(yTo))
    {
        return;
    }
    else if (Math.abs(xFrom) > 100 || Math.abs(yFrom) > 100 || Math.abs(xTo) > 100 || Math.abs(yTo) > 100)
    {
        return;
    }

    var tableDiv = document.getElementById("tableSection");

    // Delete any old tips
    var oldTip = document.getElementById("tip");
    if (oldTip != null) { oldTip.parentNode.removeChild(oldTip) }

    // Delete the old table
    var oldTable = document.getElementById("myTable");
    if (oldTable != null) { oldTable.parentNode.removeChild(oldTable); }

    // Create the new table
    var newTable = document.createElement('TABLE');
    newTable.setAttribute("id", "myTable");
    newTable.border = '1';

    // Create the top row
    var tr = document.createElement('TR');
    newTable.appendChild(tr);

    // Insert blank cell in top left corner
    var td = document.createElement('TD');
    td.setAttribute("style", "background-color: lightgray;")
    tr.appendChild(td);

    // Decide if each axis is ordered smallest to largest or largest to smallest
    var xChange = 0;
    if (xFrom < xTo) {
        xTo++;
        xChange = 1;
    }
    else {
        xTo--;
        xChange = -1;
    }

    var yChange = 0;
    if (yFrom < yTo) {
        yTo++;
        yChange = 1;
    }
    else {
        yTo--;
        yChange = -1;
    }

    // Insert the X axis values into the first row of the table
    var i = xFrom
    while (i != xTo)
    {
        var td = document.createElement('TD');
        td.setAttribute("style", "background-color: lightgray; font-weight: bold;")
        td.width = '75';

        td.appendChild(document.createTextNode(i));
        tr.appendChild(td);

        i += xChange;
    }

    // Create the rest of the table
    var i = yFrom;
    while (i != yTo)
    {
        // Create a new row
        var tr = document.createElement('TR');
        newTable.appendChild(tr);

        // Create the first cell of the row
        var td = document.createElement('TD');
        td.setAttribute("style", "background-color: lightgray; font-weight: bold;")
        td.width = '75';

        // insert each Y axis value into the first column of the table
        td.appendChild(document.createTextNode(i));
        tr.appendChild(td);

        // Create the rest of the cells in the row
        var j = xFrom;
        while (j != xTo)
        {
            // Create a cell
            var td = document.createElement('TD');
            if(Math.abs(i % 2) == 0) { td.setAttribute("style", "background-color: rgb(240, 240, 240);") }
            td.width = '75';

            // insert an X value times a Y value into the cell
            td.appendChild(document.createTextNode(i * j));
            tr.appendChild(td);

            j += xChange;
        }

        i += yChange;
    }

    tableDiv.appendChild(newTable);
}
