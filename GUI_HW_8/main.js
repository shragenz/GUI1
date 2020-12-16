/*
    File: main.js
    91.61 GUI Programming I Assignment: Implementing a Bit of Scrabble with
    Drag-and-Drop (with Extra Credits)
    Sean T. Gillis, UMass Lowell Computer Science, Sean_Gillis1@student.uml.edu
    Copyright (c) 2020 by Sean T. Gillis. All rights reserved.
    created by Sean T. Gillis on December 2, 2020 at 1:34 PM

    This webpage is a web app that allows the user to play a miniature game of
    Scrabble. This is implimented using tiles that can be dragged and dropped,
    each with point values that are tallied as the game progresses
*/

// This is the data structure that holds the scrabble Ties, their values,
// their original distributions, and their current distributions, which diminish
// as more tiles are played
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

var emptyBoard = true;
var previousPoints = 0;

// When the page is loaded, create a new set of tiles
$(document).ready(function()
{
    newTiles();
});

// random integer generator
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// function that starts a new game of scrabble. Equivalent to refreshing
// the page
function newGame()
{
    // reset tile distributions
    resetDistro();

    // Delete all tiles from the rack
    $("#tileRack .tile").remove();

    // Create all new tiles
    newTiles();

    // Reset score
    previousPoints = 0;
    $("#previousPoints").text(previousPoints);
}

// resets the distribution of the scrabble tiles in the data structure. This is
// called when a new game is started
function resetDistro()
{
    var tileLetter;

    for(var i = 0; i < 26; i++) // Reset distributions of letter tiles
    {
        tileLetter = String.fromCharCode(65 + i);
        ScrabbleTiles[tileLetter]["number-remaining"] = ScrabbleTiles[tileLetter]["original-distribution"];
    }

    // Reset distribution of blank tiles
    ScrabbleTiles["_"]["number-remaining"] = ScrabbleTiles["_"]["original-distribution"];
}

// clears the scrabble board and refills the tile rack with new tiles. This is
// called when the user presses the 'Next Word' button
function newTiles()
{
    // Update total score
    previousPoints += calculatePoints();
    $("#previousPoints").text(previousPoints);

    emptyBoard = true;

    // Remove all tiles from the board
    $("#scrabbleBoard .tile").remove();
    $("#scrabbleBoard .space").removeClass("filled");
    $("#scrabbleBoard .space").addClass("valid");

    var spaces = $("#tileRack .space");

    for(var i = 0; i < spaces.length; i++)
    {
        // Add a new tile to the rack if the current space in the
        // rack is empty
        if($(spaces[i]).find(".tile").length == 0)
        {
            $(spaces[i]).append(createTile());
        }
    }

    var tiles = $(".tile");
    var spaces = $(".space");

    // create drag and drop events for each tile
    for(tile of tiles)
    {
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragend", dragEnd);
    }

    // create drag and drop events for each space
    for(space of spaces)
    {
        space.addEventListener("dragover", dragOver);
        space.addEventListener("dragenter", dragEnter);
        space.addEventListener("dragleave", dragLeave);
        space.addEventListener("drop", drop);
    }

    // Recalculate score
    calculatePoints();
}

// Generates a new tile
function createTile()
{
    var tileIndex;
    var tileLetter;

    // randomly generate letters until you pick a letter with a distribution
    // above 0
    do {

        tileIndex = getRandomArbitrary(0, 26);

        if(tileIndex == 26)
        {
            tileLetter = "_";
        }
        else
        {
            tileLetter = String.fromCharCode(65 + tileIndex);
        }

    } while(ScrabbleTiles[tileLetter]["number-remaining"] == 0);

    // Decrment distribution number for the chosen letter tile
    ScrabbleTiles[tileLetter]["number-remaining"] = (parseInt(ScrabbleTiles[tileLetter]["number-remaining"]) - 1);

    if(tileLetter == "_")
    {
        tileLetter = "Blank";
    }

    // Create the letter tile
    var newTile = "<div class=\"tile\" draggable=\"true\" style=\"background-image: url('Scrabble_Tiles/Scrabble_Tile_" + tileLetter + ".jpg')\"></div>"

    return newTile;
}

// called when tile is picked up
function dragStart()
{
    $(this).addClass("held");
}

// called when tile is released
function dragEnd()
{
    $(this).removeClass("held");

    // Recalculate score when a tile is dropped on the scrabble board
    calculatePoints();
}

// called when tile is over space
function dragOver(event)
{
    event.preventDefault();
}

// called when tile intersects with space
function dragEnter(event)
{
    event.preventDefault();
    $(this).addClass("hovered");
}

// called when tile stops intersecting with space
function dragLeave()
{
    $(this).removeClass("hovered");
}

// called when tile is dropped on space
function drop()
{
    var heldTile = $(".held")[0];

    $(this).removeClass("hovered");

    // Only allow the user to drop tiles on valid spaces
    if($(this).hasClass("valid") == true)
    {
        this.append(heldTile);

        // Do not allow  user to drag tiles that have been placed on the board
        $(heldTile).attr("draggable", "false");

        $(this).removeClass("valid");
        $(this).addClass("filled");

        // the emptyBoard variable is used to check if all spaces on the
        // board should be valid
        if(emptyBoard == true)
        {
            emptyBoard = false;
            var spaces = $("#scrabbleBoard .space");

            for(var i = 0; i < spaces.length; i++)
            {
                $(spaces[i]).removeClass("valid");
            }
        }

        var currentID = $(this).attr("id");
        var currentIDnum = parseInt(currentID.substr(1));

        // Only set the tiles immediately left and right of the current word
        // to valid
        if(currentIDnum != 0)
        {
            previousIDnum = currentIDnum - 1;
            if($("#b" + previousIDnum).hasClass("filled") == false)
            {
                $("#b" + previousIDnum).addClass("valid");
            }
        }

        if(currentIDnum != 9)
        {
            nextIDnum = currentIDnum + 1;
            if($("#b" + nextIDnum).hasClass("filled") == false)
            {
                $("#b" + nextIDnum).addClass("valid");
            }
        }
    }
}

// Sums the total number values of all tiles on the board, including doubled
// tile values
function calculatePoints()
{
    var points = 0;
    $("#word").text("");

    var spaces = $("#scrabbleBoard .space" )

    for(var i = 0; i < spaces.length; i++)
    {
        if($(spaces[i]).hasClass("filled") == true)
        {
            // Acquire the curren tile's letter name, and use that to acquire
            // the tile's value
            var tile = $(spaces[i]).find(".tile")[0];

            var imageUrl = $(tile).css("background-image");
            var urlTokens = imageUrl.split("/");

            var lastIndex = urlTokens.length - 1;
            var imageName = urlTokens[lastIndex];
            var tileLetter = imageName[14];

            $("#word").append(tileLetter);

            var tileValue = parseInt(ScrabbleTiles[tileLetter]["value"]);

            if($(spaces[i]).hasClass("double") == true)
            {
                points += (tileValue * 2);
            }
            else
            {
                points += tileValue;
            }
        }
    }

    $("#newPoints").text("(+" + points + ")");

    return points;
}
