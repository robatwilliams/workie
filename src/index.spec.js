const supports = require('./');

const code = 'var abc = 1_000';

describe('not supported', () => {
  test('browser family where no version supports it', () => {
    expect(supports({ name: 'ie', version: 11 }, code)).toBe(false);
  });

  test('previous version', () => {
    expect(supports({ name: 'chrome', version: 74 }, code)).toBe(false);
  });
});

describe('supported', () => {
  test('introduced version', () => {
    expect(supports({ name: 'chrome', version: 75 }, code)).toBe(true);
  });

  test('later version', () => {
    expect(supports({ name: 'chrome', version: 76 }, code)).toBe(true);
  });

  test('previous version when feature not used', () => {
    expect(supports({ name: 'chrome', version: 74 }, 'var abc = 2000')).toBe(true);
  });
});
