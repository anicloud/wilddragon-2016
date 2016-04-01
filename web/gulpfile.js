// Created by Huang Bin on 12/22/15.

'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');

var app = {
  src: 'app',
  dist: 'dist',
  dev: '../public'
};

var paths = {
  scripts: [
    app.src + '/app.js',
    app.src + '/views*/**/*.js',
    app.src + '/components*/**/*.js'
  ],
  styles: [
    app.src + '/app.less',
    app.src + '/views*/**/*.less',
    app.src + '/components*/**/*.less',
    app.src + '/styles*/**/*.less'
  ],
  views: {
    main: app.src + '/index.html',
    files: [
      app.src + '/views*/**/*.html'
    ]
  },
  images: [
    app.src + '/images*/**/*'
  ],
  fonts: [
    app.src + '/fonts*/**/*',
    app.src + '/bower_components/bootstrap/fonts*/*',
    app.src + '/bower_components/font-awesome/fonts*/*'
  ],
  karma: 'karma.conf.js'
};

///////////////////////
// Development tasks //
///////////////////////

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe($.less())
    .pipe($.autoprefixer('>1%'))
    // .pipe($.rev())
    // .pipe($.revReplace())
    .pipe(gulp.dest(app.dev));
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    // .pipe($.rev())
    // .pipe($.revReplace())
    .pipe(gulp.dest(app.dev));
});

gulp.task('copy', function () {
  gulp.src(paths.views.files)
    // .pipe($.rev())
    // .pipe($.revReplace())
    .pipe(gulp.dest(app.dev));
  gulp.src(paths.images)
    // .pipe($.rev())
    // .pipe($.revReplace())
    .pipe(gulp.dest(app.dev));
  gulp.src(paths.fonts)
    // .pipe($.rev())
    // .pipe($.revReplace())
    .pipe(gulp.dest(app.dev));
});

gulp.task('inject', function () {
  var injectStyles = gulp.src([
    app.dev + '/**/*.css'
  ], {read: false});

  var injectScripts = gulp.src([
    app.dev + '/**/*.js',
    '!' + app.dev + '/**/*test.js'
  ]).pipe($.angularFilesort()
    .on('error', $.util.log));

  var injectOptions = {
    ignorePath: app.dev
  };

  var wiredepOptions = {
    optional: 'configuration',
    goes: 'here'
  };

  return gulp.src(paths.views.main)
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(app.dev));
});

//////////////////////
// Production tasks //
//////////////////////

gulp.task('copy:prod', function () {
  gulp.src(paths.views.files)
    .pipe(gulp.dest(app.dist));
  gulp.src(paths.images)
    .pipe($.cache($.imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(app.dist));
  gulp.src(paths.fonts)
    .pipe(gulp.dest(app.dist));
});

gulp.task('minimize', function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  return gulp.src(app.dev + '/index.html')
    .pipe($.useref({searchPath: [app.dev, app.src]}))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.minifyCss({cache: true}))
    .pipe(cssFilter.restore())
    // .pipe($.rev())
    // .pipe($.revReplace())
    .pipe(gulp.dest(app.dist));
});

gulp.task('watch', function () {
  $.watch(paths.styles)
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer('>1%'))
    .pipe(gulp.dest(app.dev))
    .pipe($.connect.reload());

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest(app.dev))
    .pipe($.connect.reload());

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe(gulp.dest(app.dev))
    .pipe($.connect.reload());

  gulp.watch(paths.views.main, ['inject']);
  gulp.watch('bower.json', ['inject']);

});

gulp.task('clean', function (cb) {
  rimraf(app.dev, cb);
});

gulp.task('clean:prod', function (cb) {
  rimraf(app.dist, cb);
});

gulp.task('link', $.shell.task([
  'ln -s ../web/app/bower_components ../public/bower_components'
]));

///////////
// Build //
///////////

gulp.task('serve', function (cb) {
  runSequence(
    'build',
    'start:server',
    'start:client',
    'watch',
    cb);
});

gulp.task('serve:prod', function (cb) {
  runSequence(
    'build:prod',
    'start:server:prod',
    'start:client',
    cb);
});

gulp.task('build', function (cb) {
  runSequence(
    'clean',
    [
      'copy',
      'styles',
      'scripts'
    ],
    'inject',
    'link',
    cb);
});

gulp.task('build:prod', function (cb) {
  runSequence(
    'build',
    'clean:prod',
    [
      'copy:prod',
      'minimize'
    ],
    cb);
});

gulp.task('start:client', function () {
  openURL('http://localhost:8000');
});

gulp.task('start:server', function () {
  $.connect.server({
    root: [app.dev],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 8000
  });
});

gulp.task('start:server:prod', function () {
  return $.connect.server({
    root: [app.dist],
    livereload: true,
    port: 8000
  });
});

gulp.task('default', ['serve']);
