# StringNum.js
JavaScript library for converting a number to words.

## Install
`$ npm install stringnum`

## Usage

    import { IStringNum, StringNum } from 'stringnum';
    
    const sn: IStringNum = new StringNum();
    cont nbr: number = 123;
    const nbrstr: string = sn.toWords(nbr, true);
    console.log(nbrstr);

`Output: "One-hundred Twenty-three and no/100"`

## API
**toWords(num, formatFinancial)**
---

**num**  
Type: `number`  
The number to be converted to a textual string value.

**formatFinancial**  
Type: `boolean`  
Default: `true`  
Indicates whether or not to format the textual string using financial formatting.
