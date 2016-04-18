import * as Api from '../Utils/ApiConnector';

/**
 * Queries the rest API for places matching the provided name.
 *
 * @param name Name of the place to search for.
 * @param placeType (Optional) If provided, only places of this type will be returned (e.g. Area, POI, Stop or Street).
 * @returns {Promise<PlaceInterface[]>} Promise that resolves once the list of places has been retrieved from the API.
 */
export function findPlace(name: string, placeType: string): Promise<PlaceInterface[]> {
    return new Promise<PlaceInterface[]>((resolve, reject) => {
        // Perform some basic validation
        if (name.length === 0) {
            reject(new Error('The name of the place must not be empty'));
        }

        // Query the Ruter API to search the place and get a list of results
        Api.get('/Place/GetPlaces/' + name)
            .then((response: Object) => {
                let places = parseGetPlacesResponse(response);
                if (placeType) {
                    places = places.filter((item:PlaceInterface) => item.PlaceType === placeType);
                }
                resolve(places)
            })
            .catch((error: string) => reject(error));
    });
}

/**
 * Helper function to convert the objects coming from the response into objects that implement PlaceInterface.
 *
 * @param response The response obtained from the API (/Place/GetPlaces).
 * @returns {PlaceInterface[]} Array of places contained in the response.
 */
function parseGetPlacesResponse(response: Object): PlaceInterface[] {
    let places: PlaceInterface[] = [];

    Object.keys(response).forEach((key: string) => {
        let newPlace: PlaceInterface = (<any> response)[key];
        places.push(newPlace);
    });

    return places;
}
