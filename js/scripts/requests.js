
/**
 * The client of this class is the Blockhain Controller. 
 */
class Requests{
    constructor(){
        
    }

    /**
     * This function sends a AJAX GET HTTP request
     * Callbacks are for success and error handling. 
     * @param {String} url 
     * @param {Function} callback 
     * @param {Function} callback2 
     */
    get(url, callback, callback2){
        $.ajax({
            url: url,
            success : callback,
            error: callback2,
            timeout: 30000
        });
    } 
}