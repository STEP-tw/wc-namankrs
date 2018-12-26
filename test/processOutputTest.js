const assert = require("assert");
const { mockReader, mockValidator } = require("./util");
const { processOutput } = require("../src/processOutput");

describe("processOutput", function() {
  let file = "a/nb/nab/ncd";
  let readFileSync = mockReader(file, "a\nb\nab\ncd");
  let existsSync = mockValidator(file);
  const fs = { readFileSync, existsSync };
  it("should return the count according to option given with the fileName", function() {
    const expectedOutput = "9\ta/nb/nab/ncd";
    assert.deepEqual(processOutput(["-c", file], fs), expectedOutput);
  });

  it("should return the all three counts if no option is given for single file", function() {
    const expectedOutput = "3\t4\t9\ta/nb/nab/ncd";
    assert.deepEqual(processOutput([file], fs), expectedOutput);
  });
});
