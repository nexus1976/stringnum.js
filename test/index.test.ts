import { IStringNum, StringNum } from "../src/index";
import * as assert from "assert";

describe("IStringNum", () => {
  it("should convert number to financial string", () => {
    const input: number = 123;
    const output: string = "One-hundred Twenty-three and no/100";
    const stringNum: IStringNum = new StringNum();
    const result: string = stringNum.toWords(input);
    assert.strictEqual(output, result);
  });

  it("should convert number to non-financial string", () => {
    const input: number = 123;
    const output: string = "one-hundred twenty-three";
    const stringNum: IStringNum = new StringNum();
    const result: string = stringNum.toWords(input, false);
    assert.strictEqual(output, result);
  });

  it("should handle negative numbers to non-financial string", () => {
    const input: number = -10;
    const output: string = "negative ten";
    const stringNum: IStringNum = new StringNum();
    const result: string = stringNum.toWords(input, false);
    assert.strictEqual(output, result);
  });

  it("should handle negative numbers to financial string", () => {
      const input: number = -10;
      const output: string = "Negative Ten and no/100";
      const stringNum: IStringNum = new StringNum();
      const result: string = stringNum.toWords(input);
      assert.strictEqual(output, result);
  });
});
