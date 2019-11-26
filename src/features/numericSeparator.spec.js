const { parse } = require('@babel/parser');

const numericSeparator = require('./numericSeparator');

test('present', () => {
  const ast = parse('var foo = 1_000', { plugins: [numericSeparator.parserPlugin] });

  expect(numericSeparator.within(ast)).toBe(true);
});

test('absent', () => {
  const ast = parse('var foo = 1000', { plugins: [numericSeparator.parserPlugin] });

  expect(numericSeparator.within(ast)).toBe(false);
});
