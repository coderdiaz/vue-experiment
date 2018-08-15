const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')

gulp.task('styles', function () {
  return gulp.src('./scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['./node_modules']
    })).on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/css'))
})

gulp.task('dev', ['styles'], function () {
  gulp.watch('./scss/**/*.scss', ['styles'])
})

gulp.task('default', ['styles'])
