"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringNum {
    constructor() { }
    static reverseString(str) {
        return str.split('').reverse().join('');
    }
    ;
    static toProperCase(str) {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    ;
    static splitNumStringByPlaces(str) {
        const result = [];
        let placeCounter = 0;
        let placeResult = '';
        for (let i = str.length - 1; i >= 0; i--) {
            placeResult += str.substring(i, i + 1);
            placeCounter++;
            if (placeCounter >= 3) {
                result.push(StringNum.reverseString(placeResult));
                placeCounter = 0;
                placeResult = '';
            }
        }
        if (placeCounter > 0) {
            result.push(StringNum.reverseString(placeResult));
        }
        return result;
    }
    ;
    static wordize(str) {
        let result = '';
        if (str.length === 3) {
            const word = str.substring(0, 1);
            str = str.substring(1, 3);
            const hundredNbr = Number(word);
            if (hundredNbr > 0) {
                result = (StringNum.numberWords.get(hundredNbr) || '') + '-hundred ';
            }
        }
        const nbr = Number(str);
        if (nbr > 0 && nbr <= 19) {
            result += StringNum.numberWords.get(nbr) || '';
        }
        else if (nbr > 0) {
            const nbrFirst = Number(str.substring(0, 1) + '0');
            const nbrSecond = Number(str.substring(1, 2));
            result += StringNum.numberWords.get(nbrFirst) || '';
            if (nbrSecond > 0) {
                result += '-' + (StringNum.numberWords.get(nbrSecond) || '');
            }
        }
        return result.trim();
    }
    ;
    static toWords(num, formatFinancial = true) {
        if (num === null || num === undefined || isNaN(num)) {
            return '';
        }
        let wordNum = num.toString();
        let wordDeci = '';
        if (wordNum.includes('.')) {
            const splitNum = wordNum.split('.');
            wordNum = splitNum[0];
            wordDeci = splitNum[1];
        }
        let myword = '';
        const wordPlaces = StringNum.splitNumStringByPlaces(wordNum);
        for (let i = wordPlaces.length; i > 0; i--) {
            const wordPart = StringNum.wordize(wordPlaces[i - 1]);
            const wordPlace = this.numberPlaces.get(i) || '';
            myword += (`${wordPart} ${wordPlace}`).trim() + ' ';
        }
        if (formatFinancial) {
            myword = StringNum.toProperCase(myword.trim());
            myword += ' and ';
            if (wordDeci.length > 0) {
                const numerator = Number(`0.${wordDeci}`).toFixed(2).substring(2, 4);
                myword += `${numerator}/100`;
            }
            else {
                myword += 'no/100';
            }
        }
        return myword.trim();
    }
    ;
}
StringNum.numberPlaces = new Map([
    [1, ''],
    [2, 'thousand'],
    [3, 'million'],
    [4, 'trillion'],
    [5, 'quadrillion']
]);
StringNum.numberWords = new Map([
    [0, ''],
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
    [4, 'four'],
    [5, 'five'],
    [6, 'six'],
    [7, 'seven'],
    [8, 'eight'],
    [9, 'nine'],
    [10, 'ten'],
    [11, 'eleven'],
    [12, 'twelve'],
    [13, 'thirteen'],
    [14, 'fourteen'],
    [15, 'fifteen'],
    [16, 'sixteen'],
    [17, 'seventeen'],
    [18, 'eighteen'],
    [19, 'nineteen'],
    [20, 'twenty'],
    [30, 'thirty'],
    [40, 'forty'],
    [50, 'fifty'],
    [60, 'sixty'],
    [70, 'seventy'],
    [80, 'eighty'],
    [90, 'ninty']
]);
exports.default = StringNum;
;
const myNum = 50600123665.33687958;
const myWord = StringNum.toWords(myNum);
console.log(myWord);
//# sourceMappingURL=index.js.map