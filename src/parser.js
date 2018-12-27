const { HYPHEN, EMPTYSTRING } = require("./constants");
const isNotOption = x => x != "l" && x != "w" && x != "c";

const getOptionError = function(option) {
  return `wc: illegal option -- ${option}\nusage: wc [-clmw] [file ...]`;
};

const parseInputs = function(userArgs) {
  let args = userArgs.slice();
  let options = [];

  while (args[0].startsWith(HYPHEN)) {
    options = options.concat(args[0].slice(1).split(EMPTYSTRING));
    args.shift();
  }
  let files = args;

  let wrongOptions = options.filter(isNotOption);
  if (wrongOptions.length) {
    return { error: getOptionError(wrongOptions[0]) };
  }

  if (!options.length) options = ["l", "w", "c"];

  return { options, files };
};

module.exports = { parseInputs };
