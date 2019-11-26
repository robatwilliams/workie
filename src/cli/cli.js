#!/usr/bin/env node

const fs = require('fs');
const util = require('util');

const logSymbols = require('log-symbols');

const readFile = util.promisify(fs.readFile);

const supports = require('../');

(async () => {
  const [targetsArg, filename] = process.argv.slice(2);

  if (!targetsArg || !filename) {
    console.log('Usage: workie --targets=runtime@version,... <file>');
    process.exitCode = 1;
    return;
  }

  const code = (await readFile(filename)).toString('utf8');

  const targets = targetsArg
    .split('=')[1]
    .split(',')
    .map(spec => {
      const [name, version] = spec.split('@');
      return { name, version };
    });

  const targetsSupport = targets.map(target => ({
    target,
    supportsCode: supports(target, code),
  }));

  for (const { target, supportsCode } of targetsSupport) {
    console.log(
      supportsCode ? logSymbols.success : logSymbols.error,
      target.name,
      target.version
    );
  }

  if (targetsSupport.some(({ supportsCode }) => !supportsCode)) {
    process.exitCode = 1;
  }
})();
