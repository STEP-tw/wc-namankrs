const { NEW_LINE, TAB, ENCODING } = require("./constants");
const { parseInputs } = require("./parser");

const getCount = function(delimeter, content) {
  return content.split(delimeter).length;
};

const countCharacters = getCount.bind(null, "");
const countLines = getCount.bind(null, NEW_LINE);

const countWords = function(content) {
  let words = content.trim();
  let wordCount = words.split(/[ \n]+/).filter(x => x).length;
  return wordCount;
};

const getCounts = function(filePath, fs) {
  let content = fs.readFileSync(filePath, ENCODING);
  let characterCount = countCharacters(content);
  let wordCount = countWords(content);
  let lineCount = countLines(content) - 1;
  return { lineCount, wordCount, characterCount };
};

const getAllCounts = function(userArgs, fs) {
  const { options, files } = parseInputs(userArgs);
  let filesCopy = files.slice();
  let allFileCounts = [];
  while (filesCopy.length) {
    let filePath = filesCopy[0];
    let { lineCount, wordCount, characterCount } = getCounts(filePath, fs);
    let singleFileDetails = [];

    if (options.includes("l")) singleFileDetails.push(lineCount);

    if (options.includes("w")) singleFileDetails.push(wordCount);

    if (options.includes("c")) singleFileDetails.push(characterCount);

    singleFileDetails.push(filePath);
    allFileCounts.push(singleFileDetails);
    filesCopy.shift();
  }
  return allFileCounts;
};
module.exports = { countWords, getCounts, getAllCounts };
