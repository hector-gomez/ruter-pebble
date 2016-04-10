# RuterJS

This is a convenience library to make calls to the Ruter Reise API. At the moment it is integrated into the Ruter Pebble
project to allow rapid development but it can be decoupled if necessary.

It is written using [TypeScript](http://www.typescriptlang.org) to be able to ensure a stable API for the model classes,
so that you know what properties to expect.

## Usage

Add the `dist/ruter.js` file to your web page. A global `Ruter` object will be available. See the _Library API_ section
for detailed information.

### Browser support

Key browser versions not supported:
- Android < 4.4.4
- Mobile Safari < 8.4
- Desktop Safari < 7.1
- Internet Explorer (all)

Currently the reason these are the minimum versions supported is the use of ES6 promises, if it is necessary to support
any of them a polyfill could be introduced.

## How to build

If you want you can make changes to the code and then build it yourself. To build just run:

```
npm install
npm run build
```

This will create a `ruter.js` file in the `dist` folder, plus its source map.

It uses [webpack](http://webpack.github.io) as the module bundler. This uses `ts-loader` to offload compiling the `.ts`
files to the TypeScript compiler.

As you can see in [`tsconfig.json`](tsconfig.json) the TypeScript compiler is instructed to create ES6 code and generate
the source maps. Webpack is configured in [`webpack.config.js`](webpack.config.js) and has `Ruter.ts` as the entry point.
It is going to pass all `.ts` files to the TypeScript compiler, then to Babel – which transpiles the ES6 code to ES5 so
that today's browsers can use it – and then bundles them into a single file, exposing a global `Ruter` object. Webpack
is configured to minify the output (using UglifyJS) and preserve the source maps.

Overview of the process:

> Multiple .ts files ––> TypeScript compiler (ES6) ––> Babel (ES5) ––> Webpack bundler  ––> UglifyJS ––> Single .js file

## Library API

This section will cover the most important methods the `Ruter` object exposes. Will be filled as they are finalized.

### Promises

This library intends to provide _promises_ as responses due to its asynchronous nature. For a brief introduction on ES6
promises head over to [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
Another great resource is the [Promises/A+ website](https://promisesaplus.com).

If you use the TypeScript code the `Promise` objects are typed with interfaces, which allows you to know what to expect
when it resolves. For instance:

```typescript
Ruter.places.findPlace("Jernbanetorget").then((place: PlaceInterface) => {
    // Do something with the data
    console.log(place.Name + " is in zone " + place.Zone + " in " + place.District);
});
```

Note that the properties start with an uppercase letter. This is due to Ruter's API naming convention. The interfaces
provided in this library are meant to establish a baseline you can rely on, but the objects may contain many more values,
some of them being nested objects. All these values are available to you and renaming them for the sake of following a
different convention is an unnecessary overhead.
You will find the complete list in Ruter's [Reise API documentation page](http://reisapi.ruter.no/help).

### Reference

(pending)

## License

The source code is provided under the MIT License. See [the LICENSE file](LICENSE) for details.
