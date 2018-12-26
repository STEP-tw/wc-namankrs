const { getCounts } = require("./fileUtil");

const optionCount = { l: "lineCount", c: "characterCount", w: "wordCount" };

const processOutput = function([options, filePath], fs) {
  if (!options.startsWith("-")) {
    filePath = options;
    let { lineCount, wordCount, characterCount } = getCounts(filePath, fs);
    return [lineCount, wordCount, characterCount, filePath].join("\t");
  }
  const option = options[1];
  const counts = getCounts(filePath, fs);
  return [counts[optionCount[option]], filePath].join("\t");
};

module.exports = { processOutput };
