var config = require('./config');
var gulp = require('gulp');
var util = require('gulp-util');
var zip = require('gulp-zip');

var globs = [
    'public/**',
    'webapp/**',
    'cache/**',
    'data/**',
    '.htaccess',
    'web.config'
]

function compress() {
    return gulp.src(globs, { base: '.' })
        .pipe(zip(config.project + '.zip'))
        .pipe(gulp.dest( config.dest.compress ));
}

gulp.task('compress', function () {
    return compress();
});