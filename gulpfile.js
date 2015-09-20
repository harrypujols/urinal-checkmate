var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    compass     = require('gulp-compass'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    del         = require('del'),
    browsersync = require('browser-sync').create(),
    deploy      = require('gulp-gh-pages');

// --- Compass ---
gulp.task('compass', function() {
    gulp.src('./dev/sass/*.scss')
    	.pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            css: './build/css',
            sass: './dev/sass',
            image: './build/img'
        }))
		.on('error', notify.onError({
			title: 'Fail',
			message: 'Compass error'
		}))
		.on('error', function (err) {
			return console.log(err);
		})
        .pipe(gulp.dest('./build/css'))
        .pipe(notify({
          title: 'Sucess',
          message: 'Compass compiled'
        }))
});

// --- Concat ---
gulp.task('concat', function() {
  gulp.src('./dev/js/libraries/*.js')
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./build/js'))
});

// --- Scripts ---
gulp.task('js', function() {
  gulp.src('./dev/js/*.js')
    .pipe(gulp.dest('./build/js'))
});

// --- Images ---
gulp.task('img', function() {
  gulp.src('./dev/images/**/*')
    .pipe(gulp.dest('./build/img'))
});

// --- Index ---
gulp.task('html', function() {
  gulp.src('./dev/*.html')
    .pipe(gulp.dest('./build'))
});

// --- Data ---
gulp.task('data', function() {
  gulp.src('./dev/data/*.json')
    .pipe(gulp.dest('./build/data'))
});

// --- Watch ---
gulp.task('watch', function() {
    gulp.watch(['./dev/js/*.js'], ['concat']);
    gulp.watch(['./dev/images/*.*'], ['img']);
    gulp.watch(['./dev/*.html'], ['html']);
    gulp.watch(['./dev/js/*.js'], ['js']);
    gulp.watch(['./dev/data/*.json'], ['data']);
    gulp.watch('./dev/sass/*.scss', ['compass']);
});

// --- Server ---
gulp.task('server', function() {
  browsersync.init({
    server: {
      baseDir: './build'
    }
  });
});

// --- Clean ---
gulp.task('clean', function () {
  return del([
    './build/*'
  ]);
});

// --- Deploy ---
gulp.task('deploy', function () {
  return gulp.src('./build/**/*')
    .pipe(deploy());
});

// --- Default task ---
gulp.task('default', ['img', 'html', 'concat','compass','watch','server', 'js', 'data']);
