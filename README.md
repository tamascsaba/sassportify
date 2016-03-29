# sassportify #

[Sassport](https://github.com/davidkpiano/sassport) transform for browserify.

Install sassportify:

```
$ npm i sassportify --save-dev
```

## Setup
The default settings are listed below. They may be overridden though the CLI, package.json
or though the API options.

In order for PostCSS plugins to be used, they must be installed in your projects `package.json`

``` js
  var browserify = require('browserify');
  var sassportify = require('sassportify');
  browserify('entry.js')
    .transform(sassportify, {
      modules: [
        // These modules will be passed to SassPort
        require('sassport-foo'),
        require('sassport-bar')
      ],
      sass: {
        sourceComments: false,
        sourceMap: false,
        sourceMapEmbed: false,
        sourceMapContents: false,
        outputStyle: 'compressed'
      },
      //you may specify what postcss plugins to use here
      postcss: {
        autoprefixer: {
          browsers: ['last 2 versions'] //optional config, use an empty object for defualts
        }
      },
    })
    .bundle()
````

#Development

  1. Clone the repo
  2. `npm install`
  3. `npm run dev`

This project uses TypeScript to transpile to ES5.

# License

[MIT](/LICENSE)
