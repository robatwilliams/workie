const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const dataESNext = require('compat-table/data-esnext');

module.exports = function supports(browser, code) {
  const ast = parse(code, {
    plugins: ['numericSeparator'],
  });

  let usesNumericSeparators = false;

  traverse(ast, {
    NumericLiteral({ node }) {
      // Look for tell-tale sign of the plugin, not an ideal approach but it gets us started
      // https://github.com/babel/babel/blob/master/packages/babel-plugin-proposal-numeric-separator/src/index.js
      if (node.extra.raw !== node.extra.rawValue.toString()) {
        usesNumericSeparators = true;
      }
    },
  });

  if (usesNumericSeparators) {
    const results = dataESNext.tests.find(test => test.name === 'numeric separators').res;
    return browser.version >= firstSupportedVersion(results, browser.name);
  }

  return true;
};

function firstSupportedVersion(results, name) {
  const entry = Object.entries(results)
    .filter(([key]) => key.startsWith(name))
    .find(([, value]) => value === true); // exclude behind-a-flag

  return entry && Number(entry[0].slice(name.length));
}
