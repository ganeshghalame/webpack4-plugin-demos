# webpack4-plugin-demos

Webpack 4 Plugin Demos

## Demo01: Webpack 0 Config

Entry file is a file which Webpack reads to build bundle, default bundle file in zero config is `main.js`.

Default entry file for webpack 4 is `index.js`, so created basic file with just alert

```javascript
// index.js
document.write(
  '<h1>Hello World, Basic Program with Zero config, without webpack.config.js</h1>'
);
```

Creating `index.html` just to load bundle file.
index.html

```html
<html>
  <head>
    <title>Demo01 Webpack Zero Config</title>
  </head>
  <body>
    <script src="./dist/main.js"></script>
  </body>
</html>
```

## Demo02: Webpack simple config using `webpack.config.js`

Default `entry` file `index.js`

```javascript
// index.js
document.write(
  '<h1>Hello World, Basic Program with simple webpack.config.js</h1>'
);
```

```html
<html>
  <head>
    <title>Demo02 Webpack simple Config</title>
  </head>
  <body>
    <script src="./dist/main.js"></script>
  </body>
</html>
```

Same demo01 example with below `webpack.config.js` produce the same build

```javascript
var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  }
};
```

## Demo03: Multiple entry files

Multiple entry files are allowed. It is useful for a multi-page app which has different entry file for each page.

```javascript
// main1.js first entry point
document.write('<h1>In main1 entry point</h1>');

// main2.js second entry point
document.write('<h2>In main2 entry point</h2>');
```

index.html

```html
<html>
  <head>
    <title>Demo03 Multiple entry point for multi page application</title>
  </head>
  <body>
    <script src="dist/bundle1.js"></script>
    <!-- name specified for entry in webpack.config.js -->
    <script src="dist/bundle2.js"></script>
    <!-- name specified for entry in webpack.config.js -->
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: {
    bundle1: './src/main1.js',
    bundle2: './src/main2.js'
  },
  output: {
    filename: '[name].js'
  }
};
```

## Demo04: Babel-loader

Install **React** and **React Dom** using command `npm i react react-dom --save-dev`

**React components** are mostly written in **Javascript ES6**.

Since the browser can’t understand React components as they come there is the need for some kind of transformation.

Webpack doesn’t know how to make the transformation but it has this concept of **loaders**: think of them as of transformers.

A **Webpack** loader takes something as the input and produces something else as the output.

[`babel-loader`](https://webpack.js.org/loaders/babel-loader/) is the Webpack loader responsible for taking in the ES6 code and making it understandable by the browser of choice.

Obsviusly babel-loadermakes use of Babel. And Babel must be configured to use a bunch of `presets`:

1. babel preset env for compiling Javascript ES6 code down to ES5 (please note that babel-preset-es2015 is now deprecated)
2. babel preset react for compiling JSX and other stuff down to Javascript
   Let’s pull in the dependencies with:
   `npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev`

Loaders are preprocessors which transform a resource file of your app ([more info](https://webpack.js.org/loaders/)) before Webpack's building process.

For example, [Babel-loader](https://www.npmjs.com/package/babel-loader) can transform JSX/ES6 file into normal JS files，after which Webpack will begin to build these JS files. Webpack's official doc has a complete list of [loaders](http://webpack.github.io/docs/list-of-loaders.html).

`.babelrc` file for preset config as below:

```javascript
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

`main.jsx` is a JSX file.

```javascript
// main.jsx
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello, world!, Demo04 webpack using babel for react</h1>,
  document.querySelector('#wrapper')
);
```

index.html

```html
<html>
  <head>
    <title>Demo04 Babel loader for react transpilation</title>
  </head>
  <body>
    <div id="wrapper"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: './src/main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
```

The above snippet uses `babel-loader` which needs Babel's preset plugins [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015) and [babel-preset-react](https://www.npmjs.com/package/babel-preset-react) to transpile ES6 and React.
