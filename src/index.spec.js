const supports = require('./');

describe('language features', () => {
  describe('numeric separators', () => {
    // https://developers.google.com/web/updates/2019/06/nic75#num-sep

    const code = 'var abc = 1_000';

    describe('doesnt care', () => {
      test('previous version when numeric literal without separator', () => {
        expect(supports({ name: 'chrome', version: 74 }, 'var abc = 2000')).toBe(true);
      });
    });

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
    });
  });
});
