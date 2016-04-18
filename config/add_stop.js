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
 * Callback invoked after the server has responded to the search query.
 *
 * @param resultSet Array of places (see PlaceInterface.ts in the Ruter SDK)
 */
function onSearchSuccess(resultSet) {
    var resultsNode = document.getElementById('search-results');

    // Clean the previous results, if any
    while (resultsNode.firstChild) {
        resultsNode.removeChild(resultsNode.firstChild);
    }

    // Populate the results
    resultSet.forEach(function populateItem(item) {
        resultsNode.appendChild(createListItem(item.Name, item.ID));
    });

    // Update the styles using Slate
    Zepto('.item-radio').itemRadio();
}

function onSearchError(error) {
    console.error(error);
}

/**
 * Helper function that creates a new DOM element for a list item, ready to be
 * added to the search results.
 *
 * @param {string} placeName Name of the place.
 * @param {string} placeId Id of the place.
 * @returns {Element} The DOM element.
 */
function createListItem(placeName, placeId) {
    var labelNode = document.createElement('label');
    labelNode.className = 'item';
    labelNode.textContent = placeName;

    var radioNode = document.createElement('input');
    radioNode.className = 'item-radio';
    radioNode.name = 'place-selection';
    radioNode.type = 'radio';
    radioNode.value = placeId;
    labelNode.appendChild(radioNode);

    return labelNode;
}
