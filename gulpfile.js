var gulp        = require('gulp'),
    browsersync = require('browser-sync').create();

// Server
gulp.task('server', function() {
  browsersync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('watch', function () {
  gulp.watch("./*.html").on('change', browsersync.reload);
});

// Default
gulp.task('default', ['server', 'watch']);
