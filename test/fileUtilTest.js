const assert = require("assert");
const { mockReader, mockValidator } = require("./util");
const { wc } = require("../src/fileUtil");

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
