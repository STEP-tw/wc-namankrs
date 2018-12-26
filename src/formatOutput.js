let { getAllCounts } = require("./fileUtil");

const formatOutput = function(userArgs, fs) {
  let allCounts = getAllCounts(userArgs, fs);
  return allCounts.map(x => x.join("\t")).join("\n");
};

module.exports = { formatOutput };
