const { NEW_LINE, TAB, ENCODING } = require("./constants");

const getCount = function(delimeter, content) {
  return content.split(delimeter).length;
};

const countCharacters = getCount.bind(null, "");
const countLines = getCount.bind(null, NEW_LINE);

const countWords = function(content) {
  let words = content.trim();
  let wordCount = words.split(/[ \n]+/).length;
  return wordCount;
};

const getCounts = function(filePath, fs) {
  let content = fs.readFileSync(filePath, ENCODING);
  let characterCount = countCharacters(content);
  let wordCount = countWords(content);
  let lineCount = countLines(content) - 1;
  return { lineCount, wordCount, characterCount, filePath };
};

module.exports = { countWords, getCounts };
