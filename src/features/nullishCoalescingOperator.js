/**
 * https://github.com/babel/babel/blob/master/packages/babel-plugin-proposal-nullish-coalescing-operator/src/index.js
 */
const traverse = require('@babel/traverse').default;

function within(ast) {
  let seen = false;

  traverse(ast, {
    LogicalExpression({ node }) {
      if (node.operator === '??') {
        seen = true;
      }
    },
  });

  return seen;
}

module.exports = {
  compatibilityTableName: 'nullish coalescing operator (??)',
  parserPlugin: 'nullishCoalescingOperator',
  within,
};
