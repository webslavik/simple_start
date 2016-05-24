var gulp            = require('gulp'),
    jade            = require('gulp-jade'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    cleanCSS        = require('gulp-clean-css'), // minify css
    notify          = require("gulp-notify"), // catch errors
    browserSync     = require('browser-sync');


// JADE
//-------------------------------------------
gulp.task('jade', function() {
  return gulp.src('index.jade')
    .pipe(jade({
        pretty: true
    }))
    .on('error', notify.onError(function(err) {
        return {
          title: 'Jade',
          message: err.message
        }
    }))
    .pipe(gulp.dest(''));
});


// SASS
//-------------------------------------------
gulp.task('sass', function() {
  return gulp.src('assets/sass/main.sass')
    .pipe(sass())
    .on('error', notify.onError(function(err) {
        return {
          title: 'Sass',
          message: err.message
        }
    }))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('assets/css/'))
    .pipe(browserSync.reload({stream: true}));
});


// JAVASCRIPT (maybe this task not needed?)
//-------------------------------------------
gulp.task('scripts', function() {
  return gulp.src('assets/js/function.js')
    .pipe(gulp.dest('assets/js/'));
});


// SERVER
//-------------------------------------------
gulp.task('browser-sync', ['sass'], function() {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false
    });
});


// WATCH
//-------------------------------------------
gulp.task('watch', ['browser-sync','sass','jade'], function() {
  gulp.watch([ 'index.jade','_includes/**/*', '_layouts/**/*'], ['jade']);
  gulp.watch('assets/sass/**/*', ['sass']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('assets/js/**/*', browserSync.reload);
})


// DEFAULT
//-------------------------------------------
gulp.task('default', ['watch']);
