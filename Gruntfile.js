/*
 * grunt-cleaver
 * https://github.com/Bartvds/grunt-cleaver
 *
 * Copyright (c) 2013 Bart van der Schoor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-continue');

	grunt.loadTasks('tasks');

	grunt.initConfig({
		clean: {
			test: ['./test/tmp', './test/cases/*.html']
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				//'lib/**/*.js',
				'tasks/**/*.js'
			]
		},
		cleaver: {
			example: {
				options: {

				},
				src: ['./test/cases/example.md']
			},
			not_exists: {
				options: {

				},
				src: ['./test/cases/__not_exists__.md']
			}
		}
	});

	grunt.registerTask('verify', function () {
		var failed = [];

		function verify(src) {
			//what more?
			if (grunt.file.exists(src)) {
				return;
			}
			var content = grunt.file.read(src);
			if (content.length > 0) {
				return;
			}
			//TODO more testing?
			failed.push(src);
		}

		//add more here
		verify('./test/cases/example.html');

		if (failed.length > 0) {
			grunt.log.error('missing output:'.red);
			grunt.log.error(failed.join('\n'));
			grunt.log.writeln();
			return false;
		}
		else {
			grunt.log.ok('output verified');
		}
	});

	grunt.registerTask('pass', ['cleaver:example']);
	grunt.registerTask('fail', ['cleaver:not_exists']);

	grunt.registerTask('build', ['clean', 'jshint']);
	grunt.registerTask('test', ['build', 'pass', 'continueOn', 'fail', 'continueOff', 'verify']);
	grunt.registerTask('default', ['test']);
};
