const { parse } = require('@babel/parser');

const optionalChaining = require('./optionalChaining');

test('present', () => {
  const ast = parse('var foo = bar?.foo', {
    plugins: [optionalChaining.parserPlugin],
  });

  expect(optionalChaining.within(ast)).toBe(true);
});

test('absent', () => {
  const ast = parse('var foo = bar.foo', {
    plugins: [optionalChaining.parserPlugin],
  });

  expect(optionalChaining.within(ast)).toBe(false);
});
