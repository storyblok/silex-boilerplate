var gulp = require('gulp');
var config = require('./config');
var php = require('gulp-connect-php');
var browserSync = require('browser-sync');

gulp.task('serve',  ['icons:watch', 'fonts:watch', 'styles:watch', 'scripts:watch', 'images:watch', 'content:watch'], function () {
    php.server({
        hostname: '0.0.0.0',
        base: 'public',
        port: 4040,
        open: true 
    });
});

