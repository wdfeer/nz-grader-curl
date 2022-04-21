const { request } = require("./lib/requests");

request("/", "GET", firstCallback);

function firstCallback(response) {
    console.log(response);
}