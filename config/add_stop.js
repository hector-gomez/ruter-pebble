/**
 * Event listener for the "Search" button (submits the search form)
 */
document.forms['search-form'].onsubmit = function onSubmitSearch(event) {
    // Obtain the name of the stop the user is looking for
    var stopName = event.target.getElementsByClassName('item-input')[0].value;

    // Perform the search using the SDK
    Ruter.findPlace(stopName, 'Stop').then(onSearchSuccess, onSearchError);

    // Cancel the form submission
    event.stopPropagation();
    return false;
};

/**
 * Event listener for the "Add" button
 */
document.getElementById('add-places-button').onclick = function () {
    saveSelectedPlaces();
    window.location = './';
};

/**
 * Callback invoked after the server has responded to the search query.
 *
 * @param {PlaceInterface[]} resultSet Array of places (see PlaceInterface.ts in the Ruter SDK)
 */
function onSearchSuccess(resultSet) {
    var resultsNode = document.getElementById('search-results');

    // Clean the previous results, if any
    while (resultsNode.firstChild) {
        resultsNode.removeChild(resultsNode.firstChild);
    }

    // Populate the results
    resultSet.forEach(function populateItem(item) {
        resultsNode.appendChild(createListItem(item));
    });

    // Update the styles using Slate
    Zepto('.item-checkbox').itemCheckbox();
}

/**
 * Callback invoked when the search fails, either due to a bug or a failed API request.
 *
 * @param {string} error Error message.
 */
function onSearchError(error) {
    console.error(error);
}

/**
 * Takes the user's current selection and persists it.
 */
function saveSelectedPlaces() {
    var savedPlaces = Persistence.getSavedPlaces();
    getSelectedPlaces().forEach(function (item) {
        savedPlaces.push(item);
    });
    Persistence.savePlaces(savedPlaces);
}

/**
 * Helper function that creates a new DOM element for a list item, ready to be
 * added to the search results.
 *
 * @param {PlaceInterface} place Place to represent in the DOM element.
 * @returns {Element} The DOM element.
 */
function createListItem(place) {
    var labelNode = document.createElement('label');
    labelNode.className = 'item';
    labelNode.textContent = place.Name;

    var inputNode = document.createElement('input');
    inputNode.className = 'item-checkbox';
    inputNode.name = 'place-selection-' + place.ID;
    inputNode.type = 'checkbox';
    inputNode.value = JSON.stringify({
        ID: place.ID,
        Name: place.Name,
        District: place.District,
        Zone: place.Zone,
        PlaceType: place.PlaceType
    });
    labelNode.appendChild(inputNode);

    return labelNode;
}

/**
 * Evaluates the user's currently selected places (stops).
 *
 * @returns {PlaceInterface[]} Places currently selected by the user (as an array of objects).
 */
function getSelectedPlaces() {
    var places = [];
    var selectedNodes = document.getElementById('search-results').querySelectorAll('input:checked');
    for (var i = 0; i < selectedNodes.length; i++) {
        places.push(JSON.parse(selectedNodes[i].value));
    }
    return places;
}
