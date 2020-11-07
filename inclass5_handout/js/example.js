var list = document.getElementsByTagName('ul')[0];

// ADD NEW ITEM TO END OF LIST
var listEnd = document.createElement('li');
listEnd.appendChild(document.createTextNode("cream"));

list.appendChild(listEnd);

// ADD NEW ITEM START OF LIST
var listStart = document.createElement('li');
listStart.appendChild(document.createTextNode("kale"));

list.prepend(listStart);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var listItems = document.getElementsByTagName('li');
var numItems = listItems.length

for(var i = 0; i < numItems; i++)
{
    listItems[i].setAttribute("class", "cool");
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var header = document.getElementsByTagName('h2')[0];
header.innerHTML += " (" + numItems + ")";
