"use strict";

var gulp = require('gulp');
var config = require('./config');
var del = require('del');
var size = require('gulp-size');
var gitrev = require('git-rev');
var File = require('vinyl');

gulp.task('content', function() {
    del.sync([config.dest.content]);
    return gulp.src(config.src.content + '/**/*.{xml,json,yml}')
        .pipe(gulp.dest(config.dest.content))
        .pipe(size({
            title: "content"
        }));
});


gulp.task('index', function() {
    del.sync([config.dest.public]);
    return gulp.src(config.src.app + '/index.php')
        .pipe(gulp.dest(config.dest.public));
});


gulp.task('version', function() {
	return gitrev.long(function(str) {
		return string_src('version.cache', str).pipe(gulp.dest(config.dest.public));
	});
});

gulp.task('content:watch', function() {
    gulp.watch(config.src.content + '/**/*', ['content']);
});

// create vinyl file from string
function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true });
  src._read = function () {
    this.push(new File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
    this.push(null)
  }
  return src;
}
