const assert = require("assert");
const { parseInputs } = require("../src/parser");

describe("parseInputs", function() {
  it("should return all three options when no option is given with single file", function() {
    let args = ["file"];
    let expectedOutput = { options: ["l", "w", "c"], files: ["file"] };
    assert.deepEqual(parseInputs(args), expectedOutput);
  });

  it("should return all three inputs when no option is given with more than one file", function() {
    let args = ["file1", "file2"];
    let expectedOutput = {
      options: ["l", "w", "c"],
      files: ["file1", "file2"]
    };
    assert.deepEqual(parseInputs(args), expectedOutput);
  });

  it("should return the given option and file in an object", function() {
    let args = ["-l", "file"];
    let expectedOutput = {
      options: ["l"],
      files: ["file"]
    };
    assert.deepEqual(parseInputs(args), expectedOutput);
  });

  it("should return the given options and files in an object when options are combined", function() {
    let args = ["-clw", "file1", "file2"];
    let expectedOutput = {
      options: ["c", "l", "w"],
      files: ["file1", "file2"]
    };
    assert.deepEqual(parseInputs(args), expectedOutput);
  });

  it("should return the given options and files in an object when options are seperated", function() {
    let args = ["-c", "-lw", "file1", "file2"];
    let expectedOutput = {
      options: ["c", "l", "w"],
      files: ["file1", "file2"]
    };
    assert.deepEqual(parseInputs(args), expectedOutput);
  });
});
