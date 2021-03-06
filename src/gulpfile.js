var gulp = require('gulp'),
    install = require("gulp-install"),
    plumber = require('gulp-plumber'),
    browserify = require('gulp-browserify');

var paths = {
    js: ['js/*.js', 'js/**/*.js', 'js/**/*.jsx']
};

gulp.task('install', function(){
    gulp.src(['./package.json']).pipe(install());
});

gulp.task('bower', function(cb){
  bower.commands.install([], {save: true}, {})
    .on('end', function(installed){
      cb(); // notify gulp that this task is finished
    });
});

// Basic usage
gulp.task('scripts', function() {
    // Single entry point to browserify
    return gulp.src('js/app.js')
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(browserify({
            insertGlobals : false,
            debug : false,
            transform: ['reactify', 'debowerify', 'deamdify']
        }))
        .pipe(gulp.dest('./build/js'))
});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
    gulp.watch(paths.js, ['scripts']);
});

gulp.task('default', ['install', 'scripts', 'watch'])
