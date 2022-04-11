const fs = require('fs');
const jsdom = require('jsdom');
const pathToHTML = process.argv[2];
const htmlText = fs.readFileSync(pathToHTML);
console.log(getCsrf(htmlText));

function getCsrf(htmlDocumentString) {
    let html = stringToHtml(htmlDocumentString); 
    let inputs = html.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        let element = inputs[i];
        let name = element.getAttribute('name');
        if (name != '_csrf') continue;
        return element.getAttribute('value');
    }
    return null;
}
function stringToHtml(str) {
	let dom = new jsdom.JSDOM(str);
    return dom.window.document;
};