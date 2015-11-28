/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    browserSync = require('browser-sync'),
    inject = require('gulp-inject')
    ;

var reload = browserSync.reload;

var pathsSrc = {
	html: 'source/index.html',
	javascript: ['source/javascript/**/*.js'],
	lib: ['source/lib/*.js'],
	scss: ['source/scss/**/*.scss'],
};

var pathsDst = {
	html: 'public',
	javascript: 'public/javascript/',
	scss: 'public/assets/stylesheets',
};

////////////////////////////////////////////////////////////

// create a default task and just log a message
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

gulp.task('dependenttask', ['mytask'], function() {
  //do stuff after 'mytask' is done.
});

gulp.task('build-html', function(){
    return gulp.src(pathsSrc.html)
        .pipe(inject(gulp.src(pathsSrc.lib, {read: false}), {name: 'lib'}))
        .pipe(gulp.dest( pathsDst.html ))
        .pipe(inject(gulp.src(pathsSrc.javascript, {read: false}), {relative: true}))
        .pipe(gulp.dest( pathsDst.html ))
        .pipe(inject(gulp.src(pathsSrc.scss, {read: false}), {relative: true}))
        .pipe(gulp.dest(pathsDst.html ));
});

/*gulp.task('build-html', function() {
  gulp.src(pathsSrc.html).pipe(gulp.dest(pathsDst.html));
});*/

gulp.task('build-js', function() {
  return gulp.src(pathsSrc.javascript)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest(pathsDst.javascript));
});

gulp.task('build-scss', function() {
  return gulp.src(pathsSrc.scss)
    .pipe(sass())
    .pipe(gulp.dest(pathsDst.stylesheets));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch(pathsSrc.html, ['build-html']);
  gulp.watch(pathsSrc.javascript, ['build-js']);
  gulp.watch(pathsSrc.scss, ['build-scss']);
  gulp.watch([pathsSrc.javascript, ], ['inject-index']);
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'public'
    }
  });

  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'public'}, reload);
});