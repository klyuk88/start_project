const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create();



function styles(cb) {
    gulp.src('./assets/sass/*.sass')
    .pipe(sass({
        errortoConsol: true
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(browsersync.stream());
    cb();
}

function sync(cb) {
    browsersync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    })
    cb();
}

function reload(cb) {
    browsersync.reload();
    cb();
}

function watchFiles() {
    gulp.watch('./assets/sass/*.sass',styles);
    gulp.watch('./**/*.html',reload);
    gulp.watch('./**/*.js',reload);
    gulp.watch('./**/*.php',reload);
}

gulp.task('default', gulp.parallel(watchFiles,sync));