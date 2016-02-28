# RuterJS

This is a convenience library to make calls to the Ruter Reise API. At the moment it is integrated into the Ruter Pebble
project to allow rapid development but it can be decoupled if necessary.

It is written using [TypeScript](http://www.typescriptlang.org) to be able to ensure a stable API for the model classes,
so that you know what properties to expect.

## Usage

Add the `dist/ruter.js` file to your web page. A global `Ruter` object will be available. See the _Library API_ section
for detailed information.

## How to build

If you want you can make changes to the code and then build it yourself. To build just run:

```
npm install
npm run build
```

This will create a `ruter.js` file in the `dist` folder, plus its source map.

It uses [webpack](http://webpack.github.io) as the module bundler. This uses `ts-loader` to offload compiling the `.ts`
files to the TypeScript compiler.

As you can see in [`tsconfig.json`](tsconfig.json) the TypeScript compiler is instructed to create ES5 CommonJS modules
and generate the source maps. Webpack is configured in [`webpack.config.js`](webpack.config.js) and has `Ruter.ts` as
the entry point. It is going to pass all `.ts` files to the TypeScript compiler, then bundle all the resulting CommonJS
modules into a single file and expose a global `Ruter` object. Webpack is configured to minify the output and preserve
the source maps.

## Library API

This section will cover the most important methods the `Ruter` object exposes. Will be filled as they are finalized.

This library intends to provide Promises as responses due to its asynchronous nature.
Visit the [Promises/A+ website](https://promisesaplus.com) for more details.

## License

The source code is provided under the MIT License. See [the LICENSE file](LICENSE) for details.
