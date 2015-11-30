/* File: gulpfile.js */

// the main game directory to use
var gameDir = 'source/js/game/xmas2015';

// grab our gulp packages
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	clean = require('gulp-clean'),
	runSequence = require('run-sequence'),
	inject = require('gulp-inject');

var reload = browserSync.reload;

var pathsSrc = {
	html: 'source/index.html',
	js: ['source/js/**/*.js'],
	resource: ['source/resource/**/*.*'],
	lib: ['source/lib/*.js'],
	scss: ['source/scss/**/*.scss'],
};

var pathsDst = {
	root: 'public/',
	html: 'public/',
	js: 'public/js/',
	resource: 'public/resource/',
	lib: 'public/lib/',
	scss: 'public/css/',
};

////////////////////////////////////////////////////////////

gulp.task('build-html', function() {

	var target = pathsDst.html;
	var sources = gulp.src([pathsDst.js + '**/*.js', pathsDst.scss + '*.css'], {
		read: false
	});
	var sourcesLib = gulp.src(pathsDst.lib + '*.js', {
		read: false
	});

	return gulp.src(pathsSrc.html)
		.pipe(gulp.dest(target))
		.pipe(inject(sourcesLib, {
			relative: true,
			name: 'lib'
		}))
		.pipe(gulp.dest(target))
		.pipe(inject(sources, {
			relative: true
		}))
		.pipe(gulp.dest(target))
});

gulp.task('build-js', function() {
	// pipe libs
	gulp.src(pathsSrc.lib).pipe(gulp.dest(pathsDst.lib));

	// pipe js
	return gulp.src(pathsSrc.js)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(gulp.dest(pathsDst.js));
});

gulp.task('build-scss', function() {
	return gulp.src(pathsSrc.scss)
		.pipe(sass())
		.pipe(gulp.dest(pathsDst.scss));
});

gulp.task('build-resource', function() {
	return gulp.src(pathsSrc.resource)
		.pipe(gulp.dest(pathsDst.resource));
});


gulp.task('build-clean', function() {
	return gulp.src(pathsDst.root, {
			read: false
		})
		.pipe(clean());
});

gulp.task('build', function(callback) {
	runSequence(
		'build-clean', ['build-scss', 'build-js'],
		'build-html',
		callback
	);
});

// configure which files to watch and what tasks to use on file changes
// and handles reload
gulp.task('serve', function() {

	browserSync({
		server: {baseDir: 'public'}
	});

	gulp.watch(pathsSrc.html, ['build-html', reload]);
	gulp.watch(pathsSrc.js, function() {runSequence('build-js', 'build-html', reload); });
	gulp.watch(pathsSrc.lib, function() {runSequence('build-js', 'build-html', reload); });
	gulp.watch(pathsSrc.scss, function() {runSequence('build-scss', 'build-html', reload); });
	gulp.watch(pathsSrc.resource, function() {runSequence('build-resource', reload); });
});

// create a default task and just log a message
gulp.task('default', function(callback) {
	//return gulp.src('build');//.src('serve');
	//runSequence( 'build', 'serve', callback );

	runSequence(
		'build-clean', 
		['build-scss', 'build-js', 'build-resource'],
		'build-html',
		'serve',
		callback
	);
});