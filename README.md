# webpack4-plugin-demos
Webpack 4 Plugin Demos
## Demo01: Webpack 0 Config
Entry file is a file which Webpack reads to build bundle, default bundle file in zero config is  `main.js`.

Default entry file for webpack 4 is `index.js`, so created basic file with just alert

```javascript
// main.js
document.write('<h1>Hello World</h1>');
```
Creating `index.html` just to load bundle file.
index.html

```html
<html>
  <body>
    <script type="text/javascript" src="main.js"></script>
  </body>
</html>
```

## Demo02: Webpack simple config using `webpack.config.js`
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
// main1.js
document.write('<h1>In main1 entry point</h1>');

// main2.js
document.write('<h2>In main2 entry point</h2>');
```

index.html

```html
<html>
  <body>
    <script src="bundle1.js"></script> <!-- name specified for entry in webpack.config.js-->
    <script src="bundle2.js"></script> <!-- name specified for entry in webpack.config.js-->
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

