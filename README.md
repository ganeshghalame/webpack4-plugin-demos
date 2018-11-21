# webpack4-plugin-demos

Webpack 4 Plugin Demos

## Demo01: Webpack 0 Config

Entry file is a file which Webpack reads to build bundle, default bundle file in zero config is `main.js`.

Default entry file for webpack 4 is `index.js`, so created basic file with just alert

```javascript
// index.js
document.write('<h1>Hello World, Basic Program with Zero config, without webpack.config.js</h1>');
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
document.write('<h1>Hello World, Basic Program with simple webpack.config.js</h1>');
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
    <script src="dist/bundle.js"></script>
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
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};
```

## Demo05: CSS-loader

Webpack allows you to include CSS in JS file, then preprocessed CSS file with [CSS-loader](https://github.com/webpack-contrib/css-loader).

Install loaders using command `npm install css-loader style-loader --save-dev`

The `css-loader` interprets `@import` and `url()` like `import/require()` and will resolve them.

index.js

```javascript
require('./src/app.css'); // Just importing it so that it will add be used by dependency graph
```

app.css

```css
body {
  background-color: yellow;
}
```

index.html

```html
<html>
  <head>
    <script type="text/javascript" src="./dist/bundle.js"></script>
  </head>
  <body>
    <h1>Hello World, Background color set using CSS</h1>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

Attention, you have to use two loaders to transform CSS file. First is [CSS-loader](https://www.npmjs.com/package/css-loader) to read CSS file, and another one is [Style-loader](https://www.npmjs.com/package/style-loader) to insert `<style>` tag into HTML page.

Actually, Webpack inserts an internal style sheet into `index.html`.

```html
<head>
  <script type="text/javascript" src="bundle.js"></script>
  <style type="text/css">
    body {
      background-color: yellow;
    }
  </style>
</head>
```

## Demo 06: CSS Extract and HTML plugin

Install `npm i css-loader mini-css-extract-plugin html-webpack-plugin --save-dev`

main.css

```css
body {
  background-color: gray;
}
```

index.js

```javascript
import style from './main.css'; // Just importing file
document.write(
  '<h1>Hello World, Index file generated using HtmlWebPackPlugin and CSS is extracted in to separate file using MiniCssExtractPlugin </h1>'
);
```

webpack.config.js

```javascript
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin(), // Show with template
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
```

```html
<html>
  <head>
    <title>Demo07 Webpack example CSS Extract and HTML Plugin</title>
  </head>
  <body>
    <h1>I am in template file</h1>
  </body>
</html>
```

```javascript
// Update below code to use template file
new HtmlWebPackPlugin({
            template: "./src/template.html",
            filename: "./index.html"
        }),
```
**NOTE: **
```javascript
"sideEffects": false       //Add this in package.json
```
To prevent tree shaking for css import add below in package.json
```javascript
"sideEffects": [
    "*.css"
]
```

## Demo07: Image loader

Install `url-loader` using command `npm i url-loader html-webpack-plugin --save-dev`

Webpack could also include images in JS files.

index.js

```javascript
var img1 = document.createElement('img');
img1.src = require('./small.png');
document.body.appendChild(img1);

var img2 = document.createElement('img');
img2.src = require('./big.png');
document.body.appendChild(img2);
```

webpack.config.js

```javascript
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebPackPlugin()]
};
```

**NOTE** Using `HtmlWebPackPlugin` for generating index.html i.e loading the build bundle.
[url-loader](https://www.npmjs.com/package/url-loader) transforms image files into `<img>` tag (Data URL).

After launching the server, `small.png` and `big.png` have the following URLs.

```html
<img src="data:image/png;base64,iVBO.." /> <img src="data:image/png;base64,iaas.." />
```

**Add Option for image size in `url-loader` options**
If the image size is smaller than 8192 bytes then , it will be transformed into Data URL; otherwise, it will be transformed into normal URL.
Now change the config for loader to use below:

```javascript
{
  loader: 'url-loader',
  options: {
    limit: 8192            // Note here added the limit of 8192 bytes so if image is greater than limit then do not use `url-loader`
  }
}
```

So to load the image `size > limit (8192 bytes) use`file-loader`i.e install dependency using`npm -i D file-loader`

webpack.config.js

```javascript
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebPackPlugin()]
};
```

## Demo08: Tree shaking

math.js

```javascript
export function square(x) {
    console.log('Returning square');
    return x * x;
}

export function cube(x) {
    console.log('Returning cube');
    return x * x * x;
}
```
index.js
```javascript
import { cube } from './math.js';   //Note we just

function component() {
    var element = document.createElement('pre');
    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');
    return element;
}
document.body.appendChild(component());

```

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    output: {
        filename: 'bundle.js'
    },
    optimization: {
        usedExports: true      // This will show unused exports in bundle
    },
    plugins: [new HtmlWebPackPlugin()]
};

```
