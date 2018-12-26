const { HYPHEN } = require("./constants");

const parseInputs = function(userArgs) {
  let args = userArgs.slice();
  let options = [];

  while (args[0].startsWith(HYPHEN)) {
    options = options.concat(args[0].slice(1).split(""));
    args.shift();
  }
  let files = args;

  if (!options.length) options = ["l", "w", "c"];

  return { options, files };
};

module.exports = { parseInputs };
