const { NEWLINE } = require("./constants");

const zip = function(a, b) {
  return a.map((e, i) => [a[i], b[i]]);
};

const countCharacters = text => text.length;
const countLines = text => text.split(NEWLINE).length;
const countWords = text => text.split(/[ \n]+/).filter(x => x).length;

module.exports = { zip, countCharacters, countLines, countWords };
