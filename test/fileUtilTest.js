const assert = require("assert");
const { mockReader, mockValidator } = require("./util");
const { wc } = require("../src/fileUtil");

describe("wc", function() {
  let file = "1 5\n2\n4 3 ";
  let readFileSync = mockReader(file, "1 5\n2\n4 3");
  let existsSync = mockValidator(file);
  const fs = { readFileSync, existsSync };

  it("should return the count of lines,word and characters when given a single file with no option", function() {
    const expectedOutput = `3\t5\t7\t${file}`;
    assert.deepEqual(wc([file], fs), expectedOutput);
  });
});
