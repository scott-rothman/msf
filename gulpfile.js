var gulp = require('gulp');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var tap = require('gulp-tap');

var sass = require('gulp-sass');
var eslint = require('gulp-eslint');

var fs = require('fs');

var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var browserSync = require('browser-sync').create();

gulp.task('copy', function () {
    return gulp.src('./app/**/*.{png,gif,jpg,jpeg,svg,woff,eot,ttf,woff2}')
        .pipe(gulp.dest('./www'))
});

gulp.task('copy-code', function () {
    return gulp.src('./app/**/*.{html,js}')
        .pipe(gulp.dest('./www'))
});

gulp.task('comb', function () {
    return gulp.src(['./app/scss/*.scss'])
        .pipe(csscomb('./csscomb.json'))
        .pipe(gulp.dest('./app/scss'));
});

gulp.task('sass', function () {
    return gulp.src("./app/scss/*.scss")
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest("./www/css"))
        .pipe(autoprefixer({
            browsers: [
                'last 2 versions',
                'iOS >= 8',
                'Android >= 4'
            ],
            cascade: false
        }))
        .pipe(csscomb('./csscomb.json'))
        .pipe(gulp.dest("./www/css"))
        .pipe(browserSync.stream());
});


gulp.task('watch', ['comb','copy-code'], function () {
    browserSync.init({
        server: "./www"
    });
    gulp.watch('./app/scss/*.scss', ['sass']);
    gulp.watch('./app/**/*.js', ['copy-code']);
    gulp.watch('./app/*.html', ['copy-code']);
    gulp.watch('./app/img/**/*', ['copy']);
    gulp.watch('./www/**/*.html').on('change', browserSync.reload);
});