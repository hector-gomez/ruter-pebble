export class PlaceAPI {

    static findPlace(name: string): Promise<PlaceInterface> {
        return new Promise<PlaceInterface>((resolve, reject) => {
            // Perform some basic validation
            if (name.length === 0) {
                reject(new Error('The name of the place must not be empty'));
            }

            //TODO Query the Ruter API to search the place
            let place = {
                ID: 123,
                Name: "Jernbanetorget",
                District: "Oslo",
                Zone: "1",
                PlaceType: "Stop"
            };
            resolve(place);
        });
    }

}
