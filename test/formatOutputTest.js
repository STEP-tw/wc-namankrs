const { sumCounts, formatOutput } = require("../src/formatOutput");
const assert = require("assert");
const { mockReader, mockValidator } = require("./testUtil");

describe("sumCounts", function() {
  it("should return the sum of all counts columnwise ignoring the last column", function() {
    const args = [[1, 2, 3], [4, 5, 6]];
    const expectedOutput = [5, 7, "total"];
    assert.deepEqual(sumCounts(args), expectedOutput);
  });
});

describe("formatOutput ", function() {
  let file = "a\nb\nab\ncd";
  let readFileSync = mockReader(file, "a\nb\nab\ncd");
  let existsSync = mockValidator(file);
  const fs = { readFileSync, existsSync };
  it("should return the final output after formatting for a single file and  valid count", function() {
    const args = ["-c", file];
    const expectedOutput = "9\ta\nb\nab\ncd";
    assert.deepEqual(formatOutput(args, fs), expectedOutput);
  });
  it("should return the final output after formatting for 2 files", function() {
    const args = ["-l", file, file];
    const expectedOutput = "3\ta\nb\nab\ncd\n3\ta\nb\nab\ncd\n6\ttotal";
    assert.deepEqual(formatOutput(args, fs), expectedOutput);
  });
  it("should return an error for a invalid option", function() {
    const args = ["-b", file];
    const expectedOutput =
      "wc: illegal option -- b\nusage: wc [-clmw] [file ...]";
    assert.deepEqual(formatOutput(args, fs), expectedOutput);
  });
});
