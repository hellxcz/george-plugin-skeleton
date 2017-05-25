var gulp = require('gulp');
var path = require('path');
var del = require('del');
var $ = require('gulp-load-plugins')({
  pattern: '*',
});

var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js')[environment];

var port = $.util.env.port || 1337;
var src = 'src/';
var dist = 'dist/';

//var sandboxFolder = '../georgesandbox-master/sandboxStatic/plugins/testPlugin';
var sandboxFolder = false;

var autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];


gulp.task('scripts', function() {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpackStream(webpackConfig))
    .on('error', function(error) {
      $.util.log($.util.colors.red(error.message));
      this.emit('end');
    })
    .pipe(gulp.dest(dist + ''))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

gulp.task('html', function() {
  return gulp.src(src + 'index.html')
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

gulp.task('styles',function(cb) {
  return gulp.src(src + 'stylus/plugin.styl')
    .pipe($.stylus({
      compress: isProduction,
      'include css' : true
    }))
    .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.size({ title : 'css' }))
    .pipe($.connect.reload());

});

gulp.task('misc', ['pluginConfig', 'translation']);

gulp.task('pluginConfig', function(cb) {
  return gulp.src(src + 'pluginConfig.json')
    .pipe(gulp.dest(dist))

});

gulp.task('translation', function(cb) {
  return gulp.src(src + 'app/translation/**/*')
    .pipe(gulp.dest(dist + 'translation'))
});

gulp.task('copyToSandbox', function(cb) {

  return

});

gulp.task('serve', function() {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35728
    }
  });
});

gulp.task('static', function(cb) {
  return gulp.src(src + 'static/**/*')
    .pipe($.size({ title : 'static' }))
    .pipe(gulp.dest(dist + 'static/'));
});

gulp.task('watch', function() {
  gulp.watch(src + 'stylus/*.styl', ['styles']);
  gulp.watch(src + 'index.html', ['html']);
  gulp.watch([src + 'app/**/*.js', src + 'app/**/*.hbs'], ['scripts']);
});

gulp.task('clean', function(cb) {
  del([dist], cb);
});



// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('runner', ['scripts','styles', 'misc'], function(cb){

  if (isProduction && sandboxFolder){

    console.log('sandbox copy');

    return gulp.src(dist + '**/*')
      .pipe(gulp.dest(sandboxFolder));

  }
});


// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function(cb){

  // gulp.start(['static', 'html','scripts','styles']);

  gulp.start(['runner']);

});
