# workie

> Runtime compatibility checker for raw JavaScript

Helps you write code that works without polyfills or transpilation.

This is a feasibility experiment for [module-requests/103](https://github.com/sindresorhus/module-requests/issues/103).

**In conclusion,** considering the effort required and limitations (see notes below), it's probably not worth the effort for quite a niche use case.

## Feasibility notes

Language feature detection via AST

- tedious to implement for all ES2016+/ESNext features
- potential for mistakes
- some may be difficult

API usage detection via `@financial-times/js-features-analyser`

- prone to false-positives because JS is untyped (e.g. `foo.description` detects `Symbol.prototype.description`)
- needs to be able initialise its babel parser with the plugins we need

Browser support data source - which one to use?

## MVP use cases

⚠️ Only a few basic use cases are currently implemented, as a proof of concept.

### Where will this code work?

```javascript
const thousand = 1_000;
```

```
$ npx workie source.js
✔ Chrome 75
✖ Edge
✔ Firefox 70
✔ iOS 13
```

### Will this code work there?

```javascript
const thousand = 1_000;
```

```
$ npx workie -- --targets=chrome@78,firefox@69 source.js
✔ Chrome 78
✖ Firefox 69
```

### How could this code be made more widely compatible?

```javascript
const x = y ?? 'default value'; // Chrome 80
const obj = Object.fromEntries([['key', 'value']]); // Chrome 73
```

```
$ npx workie -- --targets=chrome --suggest source.js
✔ Chrome 80
    73 without
      nullish coalescing operator (??)
    earlier without
      Object.fromEntries [or polyfill]
```

## Nice to haves

- Show release date alongside versions, for context. Data from [here](https://github.com/mdn/browser-compat-data/tree/master/browsers).

## Potentially useful tools and resources

- https://astexplorer.net
- https://github.com/Financial-Times/js-features-analyser
- https://github.com/Fyrd/caniuse
- https://github.com/kangax/compat-table
- https://github.com/mdn/browser-compat-data
- https://github.com/zloirock/core-js/tree/master/packages/core-js-compat
