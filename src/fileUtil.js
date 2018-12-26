const getCount = function(delimeter, content) {
  return content.split(delimeter).length;
};

const countCharacters = getCount.bind(null, "");
const countLines = getCount.bind(null, "\n");

const countWords = function(content) {
  let words = content.trim();
  let wordCount = words.split(/[ \n]+/).length;
  return wordCount;
};

const wc = function([filePath], fs) {
  let content = fs.readFileSync(filePath, "utf8");
  let characterCount = countCharacters(content);
  let wordCount = countWords(content);
  let lineCount = countLines(content) - 1;
  return [lineCount, wordCount, characterCount, filePath].join("\t");
};

module.exports = { wc };
