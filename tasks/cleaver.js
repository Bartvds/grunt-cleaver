/*
 * grunt-cleaver
 * https://github.com/Bartvds/grunt-cleaver
 *
 * Copyright (c) 2013 Bart van der Schoor
 * Licensed under the MIT license.
 */

'use strict';

var Cleaver = require('cleaver');
var path = require('path');

module.exports = function (grunt) {

	function compileCleaver(file, options, callback) {
		//TODO inject file.dest and options into source (or pass to cleaver once it supporst these)

		//trick output directory
		var cwd = process.cwd();
		var restore = function () {
			process.chdir(cwd);
		};

		var cleaver = new Cleaver(path.resolve(file.src));
		process.chdir(path.dirname(file.src));

		//running with cleavers
		return cleaver.run().then(function () {
			restore();
			callback();
		}, function (err) {
			restore();
			callback(err);
		});
	}

	grunt.registerMultiTask('cleaver', 'Run cleaver to build slideshows from markdown', function () {
		var options = this.options({});
		var done = this.async();
		var files = [];

		var fileCount = 0;
		var success = 0;
		var failed = 0;

		//flatten list for sanity
		grunt.util._.each(this.files, function (f) {
			grunt.util._.each(f.src, function (filePath) {
				if (!grunt.file.exists(filePath)) {
					grunt.log.writeln('file does not exist '.warn + filePath);
					return false;
				}
				fileCount++;
				/*var dest = f.dest;
				 if (!dest) {
				 dest = filePath.replace(/.djs$/, '.js');
				 }*/
				files.push({src: filePath, /*dest: dest,*/ options: options});
			});
		});

		if (fileCount === 0) {
			grunt.log.warn('zero files selected');
			grunt.log.writeln();
			done(false);
			return;
		}

		grunt.util.async.forEach(files, function (file, callback) {
			compileCleaver(file, options, function (err) {
				if (err) {
					grunt.log.writeln(file.src.red);
					grunt.fail.warn(err);
					failed++;
				}
				else {
					grunt.log.writeln(file.src); //  file.dest.cyan
					success++;
				}
				callback();
			});

		}, function (err) {
			grunt.log.writeln();
			if (err) {
				grunt.log.error('error running cleaver');
				if (err) {
					grunt.log.error(err);
				}
				grunt.log.writeln();
				done(false);
			}
			else {
				if (success < fileCount || fileCount === 0) {
					grunt.log.error('cleaver ' + ('completed ' + success).yellow + ' and ' + ('failed ' + failed).red + ' of ' + (fileCount + ' total').green);
					grunt.log.writeln();
					done(false);
				}
				else {
					grunt.log.ok('cleaver ' + ('completed ' + success).green + ' of ' + (fileCount + ' total').green);
					done();
				}
			}
		});
	});
};
