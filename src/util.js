const zip = function(a, b) {
  return a.map((e, i) => [a[i], b[i]]);
};

module.exports = { zip };
