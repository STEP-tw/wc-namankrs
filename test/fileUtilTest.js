const assert = require("assert");
const { mockReader, mockValidator } = require("./util");
const { countWords, wc } = require("../src/fileUtil");

describe("countWords", function() {
  it("should return 1 for a single word string", function() {
    assert.deepEqual(countWords("naman"), 1);
  });
});

describe("wc", function() {
  let file = "a/nb/nab/ncd";
  let readFileSync = mockReader(file, "a\nb\nab\ncd");
  let existsSync = mockValidator(file);
  const fs = { readFileSync, existsSync };

  it("should return the count of lines,word and characters when given a single file with no option", function() {
    const expectedOutput = `3\t4\t9\t${file}`;
    assert.deepEqual(wc([file], fs), expectedOutput);
  });
});
