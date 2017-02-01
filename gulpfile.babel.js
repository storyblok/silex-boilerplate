const autoprefixer = require('gulp-autoprefixer')
const browserify = require('browserify')
const browserSync = require('browser-sync')
const buffer = require('vinyl-buffer')
const concat = require('gulp-concat')
const del = require('del')
const File = require('vinyl')
const fs = require('fs')
const globbing = require('gulp-css-globbing')
const gulp = require('gulp')
const gitrev = require('git-rev')
const imagemin = require('gulp-imagemin')
const plumber = require('gulp-plumber')
const php = require('gulp-connect-php')
const reload = browserSync.reload
const sass = require('gulp-sass')
const source = require('vinyl-source-stream')
const size = require('gulp-size')
const tsify = require('tsify')

const externals = require('./externals.js')

gulp.task('clean', function () {
  del.sync(['public']);
});

gulp.task('version', function () {
  return gitrev.long(function (str) {
    return string_src('version.cache', str).pipe(gulp.dest('public'))
  })
})

gulp.task('content', function () {
  return gulp.src('app/**/*.{xml,json,yml,php}')
    .pipe(gulp.dest('public'))
    .pipe(size({
      title: "content"
    }))
})

gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('public/fonts'))
    .pipe(size({
      title: "fonts"
    }))
})

gulp.task('scripts', function () {
  return browserify({
    entries: 'app/scripts/main.ts',
    debug: true
  }).plugin('tsify', {
    noImplicitAny: true,
    target: 'ES5'
  })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('public/scripts'))
    .pipe(browserSync.stream());
})

gulp.task('scripts:vendor', function () {
  return gulp.src(externals)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/scripts'))
})

gulp.task('styles', function () {
  return gulp.src('app/styles/**/*.{sass,scss}')
    .pipe(plumber())
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/styles'))
    .pipe(browserSync.stream())
})

gulp.task('images', function () {
  return gulp.src('app/images/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('public/images'))
    .pipe(size({
      title: "images"
    }))
})

gulp.task('php', function () {
  php.server({
    hostname: '0.0.0.0',
    base: 'public',
    port: 4040,
    open: false
  })
})

gulp.task('default', ['clean', 'version', 'styles', 'scripts', 'scripts:vendor', 'fonts', 'images', 'content', 'php'], function () {
  browserSync({
    port: 4200,
    proxy: {
      target: 'http://0.0.0.0:4040',
      reqHeaders: function (config) {
        return {
          'accept-encoding': 'identity',
          'agent': false
        }
      }
    },
    reloadDelay: 1000,
    notify: true,
    open: true,
    logLevel: 'silent'
  })

  gulp.watch('app/styles/**/*', ['styles'])
  gulp.watch('app/scripts/**/*', ['scripts'])
});

gulp.task('build', ['clean', 'version', 'styles', 'scripts', 'scripts:vendor', 'fonts', 'images', 'content']);

function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true });
  src._read = function () {
    this.push(new File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
    this.push(null)
  }
  return src;
}
