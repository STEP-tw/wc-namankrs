let { getAllCounts } = require("./fileUtil");
const lodash = require("lodash");
const { TAB, NEWLINE } = require("./constants");

const formatOutput = function(userArgs, fs) {
  let allCounts = getAllCounts(userArgs, fs);
  let zippedCounts = lodash.zip.apply(null, allCounts);
  let countsSum = zippedCounts.map(x => x.reduce((a, b) => a + b));
  countsSum.pop();
  countsSum.push("total");
  allCounts.push(countsSum);
  return allCounts.map(x => x.join(TAB)).join(NEWLINE);
};

module.exports = { formatOutput };
