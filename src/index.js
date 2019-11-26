const { parse } = require('@babel/parser');
const dataESNext = require('compat-table/data-esnext');

const nullishCoalescingOperator = require('./features/nullishCoalescingOperator');
const numericSeparator = require('./features/numericSeparator');
const optionalChaining = require('./features/optionalChaining');

module.exports = function supports(runtime, code) {
  const features = [nullishCoalescingOperator, numericSeparator, optionalChaining];

  const ast = parse(code, {
    plugins: features.map(feature => feature.parserPlugin),
  });

  for (const feature of features) {
    if (feature.within(ast) && !supportsFeature(feature, runtime)) {
      return false;
    }
  }

  return true;
};

function supportsFeature(feature, runtime) {
  return (
    runtime.version >=
    firstVersionSupporting(feature.compatibilityTableName, runtime.name)
  );
}

function firstVersionSupporting(featureName, runtimeName) {
  const results = dataESNext.tests.find(test => test.name === featureName).res;

  const entry = Object.entries(results)
    .filter(([key]) => key.startsWith(runtimeName))
    .find(([, value]) => value === true); // exclude behind-a-flag

  return entry && Number(entry[0].slice(name.length));
}
