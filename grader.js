const fs = require('fs');
const jsdom = require('jsdom');
const pathToHTML = process.argv[2];
const htmlText = fs.readFileSync(pathToHTML);
const document = stringToHtml(htmlText);
const gradeTable = document.getElementsByClassName('marks-report')[0];
const subjectNameColumnIndex = -1;
let pairs = getSubjectGradesPairs(gradeTable);
for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    
}

function getAverageScoreFromString(grades) {
    
}
function getSubjectGradesPairs(gradeTable) {
    let result = [];
    
    return result;
}
function stringToHtml(str) {
	let dom = new jsdom.JSDOM(str);
    return dom.window.document;
};