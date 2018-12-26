const fs = require("fs");
const { formatOutput } = require("./src/formatOutput");

const main = function() {
  let inputArgs = process.argv.slice(2);
  console.log(formatOutput(inputArgs, fs));
};

main();
