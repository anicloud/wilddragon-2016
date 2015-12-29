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
  tmp: 'public'
};

var paths = {
  scripts: [
    app.src + '/app.js',
    app.src + '/views*/**/*.js',
    app.src + '/components*/**/*.js'
  ],
  styles: [
    app.src + '/app.css',
    app.src + '/views*/**/*.css'
  ],
  views: {
    main: app.src + '/index.html',
    files: [
      app.src + '/views*/**/*.html'
    ]
  },
  images: [
    app.src + '/images/**/*'
  ],
  fonts: [
    app.src + '/fonts*/**/*'
  ],
  test: ['test/spec/**/*.js'],
  testRequire: [
    '/bower_components/angular/angular.js',
    '/bower_components/angular-mocks/angular-mocks.js',
    '/bower_components/angular-resource/angular-resource.js',
    '/bower_components/angular-cookies/angular-cookies.js',
    '/bower_components/angular-sanitize/angular-sanitize.js',
    '/bower_components/angular-route/angular-route.js',
    'test/mock/**/*.js',
    'test/spec/**/*.js'
  ],
  karma: 'karma.conf.js',
};

////////////////////////
// Reusable pipelines //
////////////////////////

var styles = lazypipe()
  .pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, app.tmp);

var scripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish')
  .pipe(gulp.dest, app.tmp)

///////////
// Tasks //
///////////

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(styles());
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(scripts());
});

gulp.task('htmls', function () {
  return gulp.src(paths.views.files)
    .pipe(gulp.dest(app.tmp));
});

gulp.task('htmls:prod', function () {
  return gulp.src(paths.views.files)
    .pipe(gulp.dest(app.dist));
});

gulp.task('images', function () {
  return gulp.src(app.src + '/images*/**/*')
    .pipe(gulp.dest(app.tmp));
});

gulp.task('images:prod', function () {
  return gulp.src(app.src + '/images*/**/*')
    .pipe($.cache($.imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })))
    .pipe(gulp.dest(app.dist));
});

gulp.task('fonts', function () {
  return gulp.src(app.src + '/fonts*/**/*')
    .pipe(gulp.dest(app.tmp));
});

gulp.task('fonts:prod', function () {
  return gulp.src(app.src + '/fonts*/**/*')
    .pipe(gulp.dest(app.dist));
});

gulp.task('extras', function () {
  return gulp.src(app.src + '/*/.*', { dot: true })
    .pipe(gulp.dest(app.tmp));
});

gulp.task('extras:prod', function () {
  return gulp.src(app.src + '/*/.*', { dot: true })
    .pipe(gulp.dest(app.dist));
});

gulp.task('inject', function () {
  var injectStyles = gulp.src([
    app.tmp + '/**/*.css'
  ], {read: false});
  
  var injectScripts = gulp.src([
    app.tmp + '/**/*.js',
    '!' + app.tmp + '/**/*test.js'
  ]).pipe($.angularFilesort()
          .on('error', $.util.log));

  var injectOptions = {
    ignorePath: app.tmp
  };
        
  var wiredepOptions = {
    optional: 'configuration',
    goes: 'here'
  };
  
  return gulp.src(paths.views.main)
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(app.tmp));
});

gulp.task('optimize', function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  return gulp.src(app.tmp + '/index.html')
    .pipe($.useref({searchPath: [app.src, app.tmp]}))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.minifyCss({cache: true}))
    .pipe(cssFilter.restore())
    .pipe($.rev())
    .pipe($.revReplace())
    .pipe(gulp.dest(app.dist));
});

gulp.task('watch', function () {
  $.watch(paths.styles)
    .pipe($.plumber())
    .pipe(styles())
    .pipe($.connect.reload());

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(scripts())
    .pipe($.connect.reload());

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe(gulp.dest(app.tmp))
    .pipe($.connect.reload());

  $.watch(paths.test)
    .pipe($.plumber())
    .pipe(scripts());

  gulp.watch(paths.views.main, ['inject']);  
  gulp.watch('bower.json', ['inject']);
  
});

gulp.task('test', ['start:server:test'], function () {
  var testToFiles = paths.testRequire.concat(paths.scripts, paths.test);
  return gulp.src(testToFiles)
    .pipe($.karma({
      configFile: paths.karma,
      action: 'watch'
    }));
});

gulp.task('clean:tmp', function (cb) {
  rimraf(app.tmp, cb);
});

gulp.task('clean:dist', function (cb) {
  rimraf(app.dist, cb);
});

gulp.task('link', $.shell.task ([
  'ln -s ../app/bower_components public/bower_components'
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

gulp.task('serve:prod', function(cb) {
  runSequence(
    'build:prod',
    'start:server:prod',
    'start:client',
    cb);
});

gulp.task('build', function (cb) {
  runSequence(
    'clean:tmp',
    [
      'styles',
      'scripts',
      'htmls',
      'images',
      'fonts',
      'extras'
    ],
    'inject',
    'link',
    cb);
});

gulp.task('build:prod', function (cb) {
  runSequence(
    'build',
    'clean:dist',
    [
      'htmls:prod',
      'images:prod',
      'fonts:prod',
      'extras:prod',
      'optimize'
    ],
    cb);
});

gulp.task('start:client', function () {
  openURL('http://localhost:8000');
});

gulp.task('start:server', function() {
  $.connect.server({
    root: [app.tmp],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 8000
  });
});

gulp.task('start:server:prod', function() {
  return $.connect.server({
    root: [app.dist],
    livereload: true,
    port: 8000
  });
});

gulp.task('start:server:test', function() {
  return $.connect.server({
    root: ['test', app.src, '.tmp'],
    livereload: true,
    port: 8001
  });
});

gulp.task('default', ['serve']);
