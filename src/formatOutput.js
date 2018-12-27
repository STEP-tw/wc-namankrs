let { getAllCounts } = require("./fileUtil");
const lodash = require("lodash");
const { TAB, NEWLINE } = require("./constants");

const sumCounts = function(counts) {
  let zippedCounts = lodash.zip.apply(null, counts);
  let countsSum = zippedCounts.map(x => x.reduce((a, b) => a + b));
  countsSum.pop();
  return countsSum.concat("total");
};

const formatOutput = function(userArgs, fs) {
  let allCounts = getAllCounts(userArgs, fs);
  if (allCounts.length > 1) {
    allCounts.push(sumCounts(allCounts));
  }
  return allCounts.map(x => x.join(TAB)).join(NEWLINE);
};

module.exports = { formatOutput };
