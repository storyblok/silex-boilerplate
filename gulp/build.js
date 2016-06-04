var gulp = require('gulp');

gulp.task('build', ['clean', 'fonts', 'icons', 'scripts:prod', 'styles:prod', 'images', 'index', 'content', 'version']);
