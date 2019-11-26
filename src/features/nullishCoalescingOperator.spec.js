const { parse } = require('@babel/parser');

const nullishCoalescingOperator = require('./nullishCoalescingOperator');

test('present', () => {
  const ast = parse('var foo = bar ?? 42', {
    plugins: [nullishCoalescingOperator.parserPlugin],
  });

  expect(nullishCoalescingOperator.within(ast)).toBe(true);
});

test('absent', () => {
  const ast = parse('var foo = bar ? 1 : 2', {
    plugins: [nullishCoalescingOperator.parserPlugin],
  });

  expect(nullishCoalescingOperator.within(ast)).toBe(false);
});
