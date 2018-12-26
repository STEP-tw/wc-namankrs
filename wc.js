const fs = require("fs");
const { wc } = require("./src/fileUtil");

const main = function() {
  let inputArgs = process.argv.slice(2);
  console.log(wc(inputArgs, fs));
};

main();
