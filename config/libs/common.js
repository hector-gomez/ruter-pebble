/*********************************************************************************************************************
 * This file contains methods commonly used across the configuration app.                                            *
 * The functions are namespaced to act as modules. For simplicity (to avoid having to bundle them)                   *
 * they are all kept in this file, although they can be split in multiple files if they get complex.                 *
 *********************************************************************************************************************/

/**
 * Persistence layer, single point for all interactions with localStorage.
 */
var Persistence = {};

/**
 * Keys used to store and access data in localStorage.
 *
 * @const
 */
Persistence.localStorageKeys = {
    PLACES: 'places'
};

/**
 * Retrieves the places saved in localStorage. They should comply with PlaceInterface from RuterJS
 * although this is not enforced. If no place has been saved or the data has been corrupted, an empty
 * array is returned.
 *
 * @returns {PlaceInterface[]} Array of PlaceInterface objects, or empty if the data is corrupt.
 */
Persistence.getSavedPlaces = function () {
    var storedJson = localStorage.getItem(this.localStorageKeys.PLACES);
    if (storedJson == null) {
        return [];
    }
    try {
        return JSON.parse(storedJson);
    } catch (e) {
        console.warn('Could not read stored places, omitting.', e);
        return [];
    }
};

/**
 * Persists the provided items as places into localStorage. All items should implement the RuterJS's PlaceInterface.
 *
 * @param {PlaceInterface[]} places Collection of PlaceInterface objects (areas, POIs, stops, streets)
 */
Persistence.savePlaces = function (places) {
    localStorage.setItem(this.localStorageKeys.PLACES, JSON.stringify(places));
};
