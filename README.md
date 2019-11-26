# workie

> Runtime compatibility checker for raw JavaScript

Helps you write code that works without polyfills or transpilation.

This is a feasibility experiment for [module-requests/103](https://github.com/sindresorhus/module-requests/issues/103).

## MVP use cases

⚠️ It doesn't actually do anything yet.

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
