var gulp = require('gulp'),
  concat = require('gulp-concat'),
  eslint = require('gulp-eslint');

// Concat all js files into roscc.js
gulp.task('js', function () {
  return gulp.src(['app/app.js', 'app/**/*.js'])
    .pipe(concat('roscc.js'))
    .pipe(gulp.dest('assets/js/'));
});

// Lint javascript based on airbnb ES5 linter and angular code style guide
gulp.task('js-lint', function() {
  return gulp.src(['app/**/*.js'])
    .pipe(eslint({
      global: ['_', 'ros', 'ROSLIB'],
      extends: ['airbnb/legacy', 'angular'],
      rules: { 'no-param-reassign': 1 },
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Changes will be detected automatically
gulp.task('watch', function () {
  gulp.watch('app/**/*.js', ['js']);
});

gulp.task('default', ['js-lint', 'watch']);
