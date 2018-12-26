const assert = require("assert");
const { mockReader, mockValidator } = require("./util");
const { countWords, getCounts } = require("../src/fileUtil");

describe("countWords", function() {
  it("should return 1 for a single word string", function() {
    assert.deepEqual(countWords("naman"), 1);
  });
});

describe("getCounts", function() {
  let file = "a/nb/nab/ncd";
  let readFileSync = mockReader(file, "a\nb\nab\ncd");
  let existsSync = mockValidator(file);
  const fs = { readFileSync, existsSync };

  it("should return the count of lines,word and characters when given a single file with no option", function() {
    const expectedOutput = {
      lineCount: 3,
      wordCount: 4,
      characterCount: 9,
      filePath: "a/nb/nab/ncd"
    };
    assert.deepEqual(getCounts(file, fs), expectedOutput);
  });
});
