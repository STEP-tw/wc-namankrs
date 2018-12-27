let { getAllCounts } = require("./fileUtil");
let { parseInputs } = require("./parser");
const { zip } = require("./util");
const { TAB, NEWLINE } = require("./constants");

const sumCounts = function(counts) {
  let zippedCounts = zip.apply(null, counts);
  let countsSum = zippedCounts.map(x => x.reduce((a, b) => a + b));
  countsSum.pop();
  return countsSum.concat("total");
};

const formatOutput = function(userArgs, fs) {
  const parsedInputs = parseInputs(userArgs);

  if ("error" in parsedInputs) return parsedInputs.error;

  let allCounts = getAllCounts(parsedInputs, fs);
  if (allCounts.length > 1) {
    allCounts.push(sumCounts(allCounts));
  }
  return allCounts.map(x => x.join(TAB)).join(NEWLINE);
};

module.exports = { formatOutput };
