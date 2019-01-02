const { sumCounts } = require("../src/formatOutput");
const assert = require("assert");

describe("sumCounts", function() {
  it("should return the sum of all counts columnwise ignoring the last column", function() {
    const args = [[1, 2, 3], [4, 5, 6]];
    const expectedOutput = [5, 7, "total"];
    assert.deepEqual(sumCounts(args), expectedOutput);
  });
});
