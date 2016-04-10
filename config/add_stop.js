document.forms['search-form'].onsubmit = function onSubmitSearch(event) {
    // Obtain the name of the stop the user is looking for
    var stopName = event.target.getElementsByClassName('item-input')[0].value;

    // Perform the search using the SDK
    Ruter.places.findPlace(stopName).then(onSearchSuccess, onSearchError);

    // Cancel the form submission
    event.stopPropagation();
    return false;
};

function onSearchSuccess(data) {
    //TODO Implement properly
    console.log('This is what we found', data);
}

function onSearchError(error) {
    console.error(error);
}
