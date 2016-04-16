// Zepto is an external dependency to ease the use of JSONP. It is assumed to be a global object (and already loaded).
declare var Zepto: any;

const BASE_URL = 'https://reisapi.ruter.no';
const REQUEST_TIMEOUT_MS = 10000;

/**
 * Perform a HTTP request to the rest API. Note that JSONP is used because at the moment the server does not support CORS.
 *
 * @param url Relative URL within the API, the API location is set by BASE_URL.
 * @returns {Promise<Object>} A Promise that is resolved if the HTTP call is successful or rejected if it fails.
 */
export function get(url: string): Promise<Object> {
    return new Promise<Object>((resolve, reject) => {
        Zepto.ajax({
            url: BASE_URL + url,
            dataType: 'jsonp',
            global: false,
            timeout: REQUEST_TIMEOUT_MS,
            success: (data: Object, status: number, xhr: any) => resolve(data),
            error: (xhr: any, errorType: string, error: any) => { reject(error) }
        });
    });
}
