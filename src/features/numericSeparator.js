/**
 * https://github.com/babel/babel/blob/master/packages/babel-plugin-proposal-numeric-separator/src/index.js
 */
const traverse = require('@babel/traverse').default;

function within(ast) {
  let seen = false;

  traverse(ast, {
    NumericLiteral({ node }) {
      if (node.extra.raw !== node.extra.rawValue.toString()) {
        seen = true;
      }
    },
  });

  return seen;
}

module.exports = {
  compatibilityTableName: 'numeric separators',
  parserPlugin: 'numericSeparator',
  within,
};
