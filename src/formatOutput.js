const { zip } = require("./util");

const sumCounts = function(counts) {
  let zippedCounts = zip.apply(null, counts);
  let countsSum = zippedCounts.map(x => x.reduce((a, b) => a + b));
  countsSum.pop();
  return countsSum.concat("total");
};

module.exports = { sumCounts };
