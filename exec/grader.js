const fs = require('fs');
const jsdom = require('jsdom');
const pathToHtml = process.argv[2];
const document = getDocument(pathToHtml);
const gradeTable = document.getElementsByClassName('marks-report')[0];
let output = getOutput(gradeTable);
console.log(output);

function getSubjectNameColumnIndex(gradeTable) {
    let thead = gradeTable.getElementsByTagName('thead')[0];
    let ths = thead.getElementsByTagName('tr')[0].getElementsByTagName('th');
    for (let i = 0; i < ths.length; i++) {
        let header = ths.item(i);
        let name = header.innerHTML;
        if (name == 'Назва предмету')
            return i;
    }
    return -1;
}
function getOutput(gradeTable) {
    let tbody = gradeTable.getElementsByTagName('tbody')[0];
    let result = [];
    let subjects = getEveryItemOnTheColumn(tbody, getSubjectNameColumnIndex(gradeTable));
    let grades = getAverageGrades(tbody, getSubjectNameColumnIndex(gradeTable) + 1);
    for (let i = 0; i < subjects.length; i++) {
        let subject = subjects[i];
        let grade = grades[i];
        result.push(subject + ': ' + grade + '\n');
    }
    result.push('Total average: ' + average(grades));
    return result;
}
function getEveryItemOnTheColumn(tbody, columnIndex) {
    let result = [];
    let rows = tbody.getElementsByTagName('tr');
    for (let y = 0; y < rows.length; y++) {
        let row = rows[y].getElementsByTagName('td');
        for (let x = 0; x < row.length; x++) {
            if (x != columnIndex)
                continue;
            let element = row[x];
            result.push(element.innerHTML);
        }
    }
    return result
}
function getAverageGrades(tbody, gradesColumnIndex) {
    let result = getEveryItemOnTheColumn(tbody, gradesColumnIndex);
    result = result.map(getAverageScoreFromString);
    return result;
}
function getAverageScoreFromString(grades) {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let items = grades.split(',');
    let integers = items.map((string) => {
        let numbers = '';
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            if (digits.includes(char))
                numbers = numbers + char;
        }
        return Number.parseInt(numbers);
    });
    return average(integers);
}
function average(numArray) {
    numArray = numArray.filter((num) => {
        return !isNaN(num);
    });
    let sum = 0;
    for (let i = 0; i < numArray.length; i++) {
        try {
            let num = numArray[i];
            sum += num;
        } catch (error) {
            continue;
        }
    }
    return sum / numArray.length;
}
function getDocument(pathToHtml) {
    let htmlText = fs.readFileSync(pathToHtml);
    let document = stringToHtml(htmlText);
    return document;
}
function stringToHtml(str) {
    let dom = new jsdom.JSDOM(str);
    return dom.window.document;
};