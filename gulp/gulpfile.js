const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))

gulp.task('styles', () => {
    return gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('../src/'))
})

gulp.task("watch", () => {
    gulp.watch("scss/**/*.scss", gulp.series("styles"))
})

gulp.task('default', gulp.series(['styles', "watch"]))