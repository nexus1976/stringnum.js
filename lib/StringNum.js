"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringNum = void 0;
var StringNum = /** @class */ (function () {
    function StringNum() {
    }
    StringNum.reverseString = function (str) {
        return str.split('').reverse().join('');
    };
    ;
    StringNum.toProperCase = function (str) {
        return str.toLowerCase().split(' ').map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); }).join(' ');
    };
    ;
    StringNum.splitNumStringByPlaces = function (str) {
        var result = [];
        var placeCounter = 0;
        var placeResult = '';
        for (var i = str.length - 1; i >= 0; i--) {
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
    };
    ;
    StringNum.wordize = function (str) {
        var result = '';
        if (str.length === 3) {
            var word = str.substring(0, 1);
            str = str.substring(1, 3);
            var hundredNbr = Number(word);
            if (hundredNbr > 0) {
                result = (StringNum.numberWords.get(hundredNbr) || '') + '-hundred ';
            }
        }
        var nbr = Number(str);
        if (nbr > 0 && nbr <= 19) {
            result += StringNum.numberWords.get(nbr) || '';
        }
        else if (nbr > 0) {
            var nbrFirst = Number(str.substring(0, 1) + '0');
            var nbrSecond = Number(str.substring(1, 2));
            result += StringNum.numberWords.get(nbrFirst) || '';
            if (nbrSecond > 0) {
                result += '-' + (StringNum.numberWords.get(nbrSecond) || '');
            }
        }
        return result.trim();
    };
    ;
    StringNum.prototype.toWords = function (num, formatFinancial) {
        if (formatFinancial === void 0) { formatFinancial = true; }
        if (num === null || num === undefined || isNaN(num)) {
            return '';
        }
        var wordNum = num.toString();
        var wordDeci = '';
        if (wordNum.includes('.')) {
            var splitNum = wordNum.split('.');
            wordNum = splitNum[0];
            wordDeci = splitNum[1];
        }
        var myword = '';
        var wordPlaces = StringNum.splitNumStringByPlaces(wordNum);
        for (var i = wordPlaces.length; i > 0; i--) {
            var wordPart = StringNum.wordize(wordPlaces[i - 1]);
            var wordPlace = StringNum.numberPlaces.get(i) || '';
            myword += ("".concat(wordPart, " ").concat(wordPlace)).trim() + ' ';
        }
        if (formatFinancial) {
            myword = StringNum.toProperCase(myword.trim());
            myword += ' and ';
            if (wordDeci.length > 0) {
                var numerator = Number("0.".concat(wordDeci)).toFixed(2).substring(2, 4);
                myword += "".concat(numerator, "/100");
            }
            else {
                myword += 'no/100';
            }
        }
        if (num < 0) {
            myword = (formatFinancial ? 'Negative ' : 'negative ') + myword;
        }
        return myword.trim();
    };
    ;
    StringNum.numberPlaces = new Map([
        [1, ''],
        [2, 'thousand'],
        [3, 'million'],
        [4, 'billion'],
        [5, 'trillion'],
        [6, 'quadrillion'],
        [7, 'quintillion']
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
        [90, 'ninety']
    ]);
    return StringNum;
}());
exports.StringNum = StringNum;
;
//# sourceMappingURL=StringNum.js.map