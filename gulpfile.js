var Promise = require('es6-promise').Promise;
var gulp = require("gulp"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer");

/*gulp.task("hello", function() {
	console.log("hello world");
}); */

gulp.task("css", function() {
	require('es6-promise').polyfill();
	gulp.src("svg-diagram/scss/style.scss")
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ["last 3 versions"],
			cascade: true
		}))
		.pipe(gulp.dest("svg-diagram/css/"));
});
/*
var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')
    autoprefixer = require('gulp-autoprefixer');

gulp.task('doesntWork', function () {
    gulp.src("svg-diagram/scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: true
		}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("svg-diagram/css/"))
});

gulp.task('doesWork', function () {
    gulp.src("svg-diagram/scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: true
		}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("svg-diagram/css/"))
});

gulp.task('default', ['doesWork', 'doesntWork']); */