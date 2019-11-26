/**
 * https://github.com/babel/babel/blob/master/packages/babel-plugin-proposal-optional-chaining/src/index.js
 */
const traverse = require('@babel/traverse').default;

function within(ast) {
  let seen = false;

  traverse(ast, {
    'OptionalCallExpression|OptionalMemberExpression'(path) {
      seen = true;
    },
  });

  return seen;
}

module.exports = {
  compatibilityTableName: 'optional chaining operator (?.)',
  parserPlugin: 'optionalChaining',
  within,
};
