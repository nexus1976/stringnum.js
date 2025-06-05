export interface IStringNum {
    toWords(num: number, formatFinancial?: boolean): string;
    splitNumStringByPlaces(str: string): string[];
    wordize(str: string): string;
}
export default class StringNum implements IStringNum {
    constructor();
    static numberPlaces: Map<number, string>;
    static numberWords: Map<number, string>;
    static reverseString(str: string): string;
    static toProperCase(str: string): string;
    splitNumStringByPlaces(str: string): string[];
    wordize(str: string): string;
    toWords(num: number, formatFinancial?: boolean): string;
}
