const { ENCODING } = require("./constants");
const { countLines, countWords, countCharacters } = require("./util");

const getSingleFileCounts = function(filePath, fs) {
  let content = fs.readFileSync(filePath, ENCODING);
  let characterCount = countCharacters(content);
  let wordCount = countWords(content);
  let lineCount = countLines(content) - 1;
  return { lineCount, wordCount, characterCount };
};

const getOptionalCounts = function(options, counts) {
  let finalCounts = [];
  let { lineCount, wordCount, characterCount } = counts;

  if (options.includes("l")) finalCounts.push(lineCount);

  if (options.includes("w")) finalCounts.push(wordCount);

  if (options.includes("c")) finalCounts.push(characterCount);

  return finalCounts;
};

const getFileDetails = function(fs, options, acc, filePath) {
  let singleFileDetails = [];
  let counts = getSingleFileCounts(filePath, fs);
  let optionalCounts = getOptionalCounts(options, counts);
  singleFileDetails = optionalCounts.concat(filePath);
  acc.push(singleFileDetails);
  return acc;
};

const getAllCounts = function({ options, files }, fs) {
  const getSingleFileDetails = getFileDetails.bind(null, fs, options);
  return files.reduce(getSingleFileDetails, []);
};

module.exports = { countWords, getSingleFileCounts, getAllCounts };
