# grunt-cleaver

> Grunt [plugin](http://gruntjs.com/) to run [cleaver](https://github.com/jdan/cleaver) and create awesome [slideshows](http://jdan.github.io/cleaver/) from markdown.

[![Build Status](https://secure.travis-ci.org/Bartvds/grunt-cleaver.png?branch=master)](http://travis-ci.org/Bartvds/grunt-cleaver) [![Dependency Status](https://gemnasium.com/Bartvds/grunt-cleaver.png)](https://gemnasium.com/Bartvds/grunt-cleaver) [![NPM version](https://badge.fury.io/js/grunt-cleaver.png)](http://badge.fury.io/js/grunt-cleaver)

Update presentations, demos or walkthroughs as part of your build. Pro tip: use some other tools to dynamically generate the template before building the presentation.


## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm install grunt-cleaver --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cleaver');
```

## The "cleaver" task       

### Default Options

```js
grunt.initConfig({
  cleaver: {
    build: {
      options: {
         
      },
      src: ['./test/main.md', './test/intro.md']
    }
  }
})
```

## History

* 0.2.0 - Updated cleaver to `~0.5.3`
* 0.1.0 - First release

## Contributing

Contributions are very welcome, please create an Issue before doing something major.

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/Bartvds/grunt-cleaver/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

