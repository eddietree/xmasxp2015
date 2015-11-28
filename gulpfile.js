/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
	sass   = require('gulp-sass'),
    browserSync = require('browser-sync'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    inject = require('gulp-inject')
    ;

var reload = browserSync.reload;

var pathsSrc = {
	html: 'source/index.html',
	js: ['source/js/**/*.js'],
	lib: ['source/lib/*.js'],
	scss: ['source/scss/**/*.scss'],
};

var pathsDst = {
	root: 'public/',
	html: 'public/',
	js: 'public/js/',
	lib: 'public/lib/',
	scss: 'public/css/',
};

////////////////////////////////////////////////////////////

gulp.task('build-html', function(){

	var target = pathsDst.html;
	var sources = gulp.src([pathsDst.js+'*.js', pathsDst.scss+'*.css'], {read: false});
	var sourcesLib = gulp.src(pathsDst.lib+'*.js', {read: false});

    return gulp.src(pathsSrc.html)
        .pipe(gulp.dest(target))
        .pipe(inject(sourcesLib, {relative:true, name: 'lib'}))
        .pipe(gulp.dest(target))
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest(target))
});

gulp.task('build-js', function() {
	// pipe libs
	gulp.src(pathsSrc.lib).pipe(gulp.dest(pathsDst.lib));

	// pipe rest of 
	return gulp.src(pathsSrc.js)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(gulp.dest(pathsDst.js)) ;
});

gulp.task('build-scss', function() {
  return gulp.src(pathsSrc.scss)
    .pipe(sass())
    .pipe(gulp.dest(pathsDst.scss));
});

gulp.task('build-clean', function () {
  return gulp.src(pathsDst.root, {read: false})
    .pipe(clean());
});

gulp.task('build' , function() {
	return runSequence(
		'build-clean',
		['build-scss', 'build-js'],
		 'build-html'
	);
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch(pathsSrc.html, ['build-html']);
  gulp.watch(pathsSrc.js, ['build-js']);
  gulp.watch(pathsSrc.scss, ['build-scss']);
  gulp.watch([pathsSrc.js, ], ['inject-index']);
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'public'
    }
  });

  gulp.watch(['*.html', 'css/*.css', 'js/*.js'], {cwd: 'public'}, reload);
});

// create a default task and just log a message
gulp.task('default', function() {
	runSequence( 'build', 'serve' );
});