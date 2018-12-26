const fs = require("fs");
const { processOutput } = require("./src/processOutput");

const main = function() {
  let inputArgs = process.argv.slice(2);
  console.log(processOutput(inputArgs, fs));
};

main();
