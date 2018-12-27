const assert = require("assert");
const { mockReader, mockValidator } = require("./testUtil");

const {
  countWords,
  getSingleFileCounts,
  getAllCounts
} = require("../src/fileUtil");

describe("countWords", function() {
  it("should return 1 for a single word string", function() {
    assert.deepEqual(countWords("naman"), 1);
  });
});

describe("getSingleFileCounts", function() {
  let file = "a\nb\nab\ncd";
  let readFileSync = mockReader(file, "a\nb\nab\ncd");
  let existsSync = mockValidator(file);
  const fs = { readFileSync, existsSync };

  it("should return the count of lines,word and characters when given a single file with no option", function() {
    const expectedOutput = {
      lineCount: 3,
      wordCount: 4,
      characterCount: 9
    };
    assert.deepEqual(getSingleFileCounts(file, fs), expectedOutput);
  });
});

describe("getAllCounts", function() {
  let file = "a\nb\nab\ncd";
  let readFileSync = mockReader(file, "a\nb\nab\ncd");
  let existsSync = mockValidator(file);
  const fs = { readFileSync, existsSync };
  it("should return details with default options when only a single file is given", function() {
    let args = { options: ["l", "c", "w"], files: [file] };
    let expectedOutput = [[3, 4, 9, "a\nb\nab\ncd"]];
    assert.deepEqual(getAllCounts(args, fs), expectedOutput);
  });
  it("should return details option when -l is given with single file", function() {
    let args = { options: ["l"], files: [file] };
    let expectedOutput = [[3, "a\nb\nab\ncd"]];
    assert.deepEqual(getAllCounts(args, fs), expectedOutput);
  });
  it("should return details option when -c is given with single file", function() {
    let args = { options: ["c"], files: [file] };
    let expectedOutput = [[9, "a\nb\nab\ncd"]];
    assert.deepEqual(getAllCounts(args, fs), expectedOutput);
  });
  it("should return details when -w is given with single file", function() {
    let args = { options: ["w"], files: [file] };
    let expectedOutput = [[4, "a\nb\nab\ncd"]];
    assert.deepEqual(getAllCounts(args, fs), expectedOutput);
  });
  it("should return details of files in a two dimensional array for more than one file", function() {
    let args = { options: ["l", "w", "c"], files: [file, file] };
    let expectedOutput = [[3, 4, 9, "a\nb\nab\ncd"], [3, 4, 9, "a\nb\nab\ncd"]];
    assert.deepEqual(getAllCounts(args, fs), expectedOutput);
  });
});
