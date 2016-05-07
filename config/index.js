// Code to be executed once the page is loaded and ready
document.onreadystatechange = function () {
    if (document.readyState === 'interactive') {
        populateStoredPlaces();
    }
};

/**
 * Reads the stored places from localStore and populates the UI with them.
 */
function populateStoredPlaces() {
    var places = JSON.parse(localStorage.getItem('places'));
    var listNode = document.getElementById('place-list');
    places.forEach(function createDomNode(place) {
        listNode.appendChild(createListNode(place));
    });
}

/**
 * Helper that creates a DOM element to represent a place in a draggable or dynamic list.
 *
 * @param {PlaceInterface} place Place to represent in the DOM element.
 * @returns {Element} The DOM element.
 */
function createListNode(place) {
    var labelNode = document.createElement('label');
    labelNode.className = 'item';
    labelNode.textContent = place.Name;
    labelNode.dataset.placeObject = JSON.stringify(place);
    return labelNode;
}
