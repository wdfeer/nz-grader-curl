const http = require("http");
const https = require("https");

module.exports = { request };

/**
 * Makes an https request
 * @param {string} path 
 * @param {string} method 
 * @param {(response: http.IncomingMessage) => void} callback 
 * @param {string[]|undefined} data 
 * @param {(() => void)|undefined} onError
 * @param {string} host
 */
function request(path, method, callback, data = undefined, onError = undefined, host = "nz.ua") {
    let options = {
        host: host,
        port: 443,
        path: path,
        method: method
    }
    let req = https.request(options, callback);
    if (data != undefined){
        req.write(data);
    }
    if (onError != undefined){
        req.on("error", onError);
    }
    req.end();
}