var gulp = require('gulp');
var size = require('gulp-size');
var config = require('./config');

gulp.task('fonts', function() {
    return gulp.src(config.src.fonts + '/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('fonts:watch', function() {
    gulp.watch(config.src.fonts + '/**/*.{eot,svg,ttf,woff,woff2}', ['fonts']);
});
