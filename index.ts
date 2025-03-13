export default class StringNum {
    constructor() { }
    static numberPlaces: Map<number, string> = new Map([
        [1, ''],
        [2, 'thousand'],
        [3, 'million'],
        [4, 'billion'],
        [5, 'trillion'],
        [6, 'quadrillion'],
        [7, 'quintillion']

    ]);
    static numberWords: Map<number, string> = new Map([
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
    static reverseString(str: string): string {
        return str.split('').reverse().join('');
    };
    static toProperCase(str: string): string {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    static splitNumStringByPlaces(str: string): string[] {
        const result: string[] = [];
        let placeCounter: number = 0;
        let placeResult: string = '';
        for (let i = str.length-1; i >= 0; i--) {
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
    static wordize (str: string): string {
        let result: string = '';
        if (str.length === 3) {
            const word: string = str.substring(0, 1);
            str = str.substring(1, 3);
            const hundredNbr: number = Number(word);
            if (hundredNbr > 0) {
                result = (StringNum.numberWords.get(hundredNbr) || '') + '-hundred ';
            }
        }
        const nbr: number = Number(str);
        if (nbr > 0 && nbr <= 19) {
            result += StringNum.numberWords.get(nbr) || '';
        } else if (nbr > 0) {
            const nbrFirst: number = Number(str.substring(0, 1) + '0');
            const nbrSecond: number = Number(str.substring(1, 2))
            result += StringNum.numberWords.get(nbrFirst) || '';
            if (nbrSecond > 0) {
                result += '-' + (StringNum.numberWords.get(nbrSecond) || '');
            }
        }
        return result.trim();
    };
    
    static toWords (num: number, formatFinancial: boolean = true): string {
        if (num === null || num === undefined || isNaN(num)) {
            return '';
        }
        let wordNum: string = num.toString();
        let wordDeci: string = '';
        if (wordNum.includes('.')) {
            const splitNum: string[] = wordNum.split('.');
            wordNum = splitNum[0];
            wordDeci = splitNum[1];
        }
        let myword: string = '';
        const wordPlaces: string[] = StringNum.splitNumStringByPlaces(wordNum);

        for (let i = wordPlaces.length; i > 0; i--) {
            const wordPart: string = StringNum.wordize(wordPlaces[i-1])
            const wordPlace: string = this.numberPlaces.get(i) || '';
            myword += (`${wordPart} ${wordPlace}`).trim() + ' ';
        }

        if (formatFinancial) {
            myword = StringNum.toProperCase(myword.trim());
            myword += ' and ';
            if (wordDeci.length > 0) {
                const numerator: string = Number(`0.${wordDeci}`).toFixed(2).substring(2, 4);
                myword += `${numerator}/100`;
            } else {
                myword += 'no/100';
            }
        }

        return myword.trim();
    };
};
