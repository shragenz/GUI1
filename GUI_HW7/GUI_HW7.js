/*
    File: GUI_HW7.js
    91.61 GUI Programming I Assignment: Using the jQuery UI Slider and Tab Widgets
    Sean T. Gillis, UMass Lowell Computer Science, Sean_Gillis1@student.uml.edu
    Copyright (c) 2020 by Sean T. Gillis. All rights reserved.
    Created by Sean T. Gillis on November 20, 2020 at 4:54 PM

    This file contains facilities for creating, updating and deleting
    multiplication tables using the jQuery tabs widget and slider widgets.
*/

// used to keep track of the next tab's ID
var lastTab = 0;

// used to track total number of tabs
var numTabs = 0;

// create all of the jQuery widgets and functions that will be used on the page
$(document).ready(function () {
    // stop the page from refreshing when the form is submitted
    $('#inputSection').submit(function (event) {
        event.preventDefault();
    });

    // every field requires a valid input and it must be between -100 and 100
    $("#inputSection").validate({
        rules:
        {
            xfrom:
            {
                required: true,
                number: true,
                min: -100,
                max: 100,
                step: 1
            },
            xto:
            {
                required: true,
                number: true,
                min: -100,
                max: 100,
                step: 1
            },
            yfrom:
            {
                required: true,
                number: true,
                min: -100,
                max: 100,
                step: 1
            },
            yto:
            {
                required: true,
                number: true,
                min: -100,
                max: 100,
                step: 1
            },
        },
        messages:
        {
            xfrom:
            {
                required: "All entry fields must be filled.",
                number: "All entries must be numbers.",
                min: "All values must be between -100 and 100.",
                max: "All values must be between -100 and 100.",
                step: "All entries must be integers."
            },
            xto:
            {
                required: "All entry fields must be filled.",
                number: "All entries must be numbers.",
                min: "All values must be between -100 and 100.",
                max: "All values must be between -100 and 100.",
                step: "All entries must be integers."
            },
            yfrom:
            {
                required: "All entry fields must be filled.",
                number: "All entries must be numbers.",
                min: "All values must be between -100 and 100.",
                max: "All values must be between -100 and 100.",
                step: "All entries must be integers."
            },
            yto:
            {
                required: "All entry fields must be filled.",
                number: "All entries must be numbers.",
                min: "All values must be between -100 and 100.",
                max: "All values must be between -100 and 100.",
                step: "All entries must be integers."
            },
        },
    });

    // sets the parameters for each jQuery slider and connects the slide
    // signal to the updateTab function, so that the current tab will be updated
    // when the user moves the slider.
    $("#xFromSlider").slider({
      value: -5,
      step: 1,
      min: -100,
      max: 100,
      slide: function( event, ui ) {
          $("#xfrom").val(ui.value);
          updateTab();
      }
    });
    // connect the input box's change function to the updateTab function so
    // that the current table is updated whenever the user changes the value
    // in the input box.
    $("#xfrom").change(function () {
      var val = this.value;
      $("#xFromSlider").slider("value", parseInt(val));
      updateTab();
    });

    $("#xToSlider").slider({
      value: 5,
      step: 1,
      min: -100,
      max: 100,
      slide: function( event, ui ) {
          $("#xto").val(ui.value);
          updateTab();
      }
    });
    $("#xto").change(function () {
      var val = this.value;
      $("#xToSlider").slider("value", parseInt(val));
      updateTab();
    });

    $("#yFromSlider").slider({
      value: -5,
      step: 1,
      min: -100,
      max: 100,
      slide: function( event, ui ) {
          $("#yfrom").val(ui.value);
          updateTab();
      }
    });
    $("#yfrom").change(function () {
      var val = this.value;
      $("#yFromSlider").slider("value", parseInt(val));
      updateTab();
    });

    $("#yToSlider").slider({
      value: 5,
      step: 1,
      min: -100,
      max: 100,
      slide: function( event, ui ) {
          $("#yto").val(ui.value);
          updateTab();
      }
    });
    $("#yto").change(function () {
      var val = this.value;
      $("#yToSlider").slider("value", parseInt(val));
      updateTab();
    });

    // transform the tabs div into a jQuery tabs object
    $("#tabs").tabs();
    // create the first tab
    createNewTab();

    // set the newly created tab as the active tab
    $("#tabs").tabs("option", "active", 0);
});

// create a new tab with a new table in it
function createNewTab()
{
    if($("#inputSection").valid() == false)
    {
        return;
    }

    lastTab += 1;

    rawTabID = "tab-" + lastTab;
    tabID = "#" + rawTabID;
    rawPanelID = "tab-panel-" + lastTab;
    panelID = "#" + rawPanelID;

    // create a new tab panel within the panel container, which will contain a
    // new table
    $("#panelBox").append("<div id=\"" + rawPanelID + "\"></div>");
    // create the new tab head
    $("#tabs ul").append("<li id=\"" + rawTabID + "\"></li>");
    // link the newly created tab to the newly created panel
    $(tabID).append("<a href=\"" + panelID + "\"></a>");

    // add the check box to each tab
    $(tabID).append("<input type=\"checkbox\" class=\"tabCB\">");

    // create the label for the new tab based on the values currently set in
    // the form
    var tabLabel = createTabLabel();
    $(tabID + " a").append("<div id=\"tabText\">" + tabLabel + "</div>");

    // create the new table for the new tab
    createTable(lastTab);

    $("#tabs").tabs("refresh");

    $("#tabs").tabs("option", "active", numTabs);

    numTabs += 1;
}

function createTabLabel()
{
    return $("#xfrom").val() + " to " + $("#xto").val() + "<br>" + $("#yfrom").val() + " to " + $("#yto").val();
}

// create a new table in the current tab and update the tab label
function updateTab()
{
    // only update the current table if there are valid values in the form
    if($("#inputSection").valid() == false)
    {
        return;
    }

    // Get the ID of the current active tab
    var activeTabIndex = $("#tabs").tabs("option", "active");
    var tabID = $("#tabs ul li").eq(activeTabIndex).attr("id");
    var tabNum = tabID.substr(4);

    // Replace the tab label with a enw, updated tab label
    $("#" + tabID + " a #tabText").remove();
    var tabLabel = createTabLabel();
    $("#" + tabID + " a").append("<div id=\"tabText\">" + tabLabel + "</div>");

    $("#tabs").tabs("refresh");

    // Create a new, updated table
    createTable(tabNum);
}

// replace the table in the current tab with a new table
function createTable(panelNum)
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

    var rawPanelID = "tab-panel-" + panelNum;
    var panelID = "#" + rawPanelID;
    var oldTable = panelID + " table";

    // Delete the old table
    $(oldTable).remove();

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

    $(panelID).append(newTable);
}

// delete all tabs that have their check boxes checked
function deleteSelected()
{
    $("#tabs ul li").each(function() {
        var tabID = "#" + $(this).attr("id");

        // remove any tab that has its box checked
        if($(tabID + " .tabCB").prop("checked"))
        {
            numTabs -= 1;

            var panelID = "#tab-panel-" + tabID.substr(5);
            $(panelID).remove();
            $(tabID).remove();
        }
    });

    $("#tabs").tabs("refresh");
}

// delete a specific tab selected by the user
function deleteCurrent()
{
    // find the current tab
    var activeTabIndex = $("#tabs").tabs("option", "active");
    var tabID = $("#tabs ul li").eq(activeTabIndex).attr("id");
    var tabNum = tabID.substr(4);
    var panelID = "tab-panel-" + tabNum;

    // delete the current tab
    $("#" + tabID).remove();
    $("#" + panelID).remove();

    $("#tabs").tabs("refresh");

    numTabs -= 1;

    // set the next tab to the new current tab
    $("#tabs").tabs("option", "active", activeTabIndex);

}
