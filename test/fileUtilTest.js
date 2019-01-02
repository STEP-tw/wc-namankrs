const assert = require("assert");
const { mockReader } = require("./testUtil");

const {
  countWords,
  getSingleFileCounts,
  getAllCounts,
  wc
} = require("../src/fileUtil");

describe("countWords", function() {
  it("should return 1 for a single word string", function() {
    assert.deepEqual(countWords("naman"), 1);
  });
});

describe("getSingleFileCounts", function() {
  let file = "a\nb\nab\ncd";
  let readFileSync = mockReader(file, "a\nb\nab\ncd");
  const fs = { readFileSync };

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
  const fs = { readFileSync };
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

describe("wc ", function() {
  let file = "a\nb\nab\ncd";
  let readFileSync = mockReader(file, "a\nb\nab\ncd");
  const fs = { readFileSync };
  it("should return the final output after formatting for a single file and  valid count", function() {
    const args = ["-c", file];
    const expectedOutput = "9\ta\nb\nab\ncd";
    assert.deepEqual(wc(args, fs), expectedOutput);
  });
  it("should return the final output after formatting for 2 files", function() {
    const args = ["-l", file, file];
    const expectedOutput = "3\ta\nb\nab\ncd\n3\ta\nb\nab\ncd\n6\ttotal";
    assert.deepEqual(wc(args, fs), expectedOutput);
  });
  it("should return an error for a invalid option", function() {
    const args = ["-b", file];
    const expectedOutput =
      "wc: illegal option -- b\nusage: wc [-clmw] [file ...]";
    assert.deepEqual(wc(args, fs), expectedOutput);
  });
});
