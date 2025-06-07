import { IStringNum } from './IStringNum';
export declare class StringNum implements IStringNum {
    constructor();
    static numberPlaces: Map<number, string>;
    static numberWords: Map<number, string>;
    static reverseString(str: string): string;
    static toProperCase(str: string): string;
    static splitNumStringByPlaces(str: string): string[];
    static wordize(str: string): string;
    toWords(num: number, formatFinancial?: boolean): string;
}
