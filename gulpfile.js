/**
  * @desc Gulpfile
  * @author Anna Buchnowska
*/

var Promise = require('es6-promise').Promise;
var gulp = require("gulp"),
	$ = require("gulp-load-plugins")({
		lazy: true
	}),
	//sass = require("gulp-sass"),
	//autoprefixer = require("gulp-autoprefixer"),
	//plumber = require("gulp-plumber"),
	browserSync = require("browser-sync"),
	del = require("del"),
	//useref = require("gulp-useref"),
 	//uglify = require("gulp-uglify"),
	//gulpif = require("gulp-if"),
	//imagemin = require("gulp-imagemin"),
	runSequence = require("run-sequence"),
	ftp = require("vinyl-ftp"),
	argv = require("yargs").argv,
	gutil = require("gulp-util");

// Compile sass into CSS + watching
gulp.task("css", function() {
	gutil.log(gutil.colors.yellow("Compiling SCSS to CSS..."));
	require('es6-promise').polyfill();
	return gulp.src("svg-diagram/scss/style.scss")
		.pipe($.plumber())
		.pipe($.sass.sync({
			outputStyle: "expanded" //compressed
		}))
		.pipe($.autoprefixer({
			browsers: ["last 5 versions"],
			cascade: true
		}))
		.pipe(gulp.dest("svg-diagram/css/"))
		.pipe(browserSync.stream());
});

gulp.task("server", function(){ //dla gulp4 mozna skorzystac z gulp-series
	browserSync.init({
		server: "svg-diagram/"
	});
});

gulp.task("watch", function() {
	gulp.watch("svg-diagram/scss/**/*.scss", ["css"]);
	gutil.log(gutil.colors.red("Keep watching"));
	gulp.watch(["svg-diagram/*.html", "svg-diagram/**/*.js"], browserSync.reload);
});

gulp.task("clean", function(){
	return del("dist/"); //returns promise (jQuery) with resolved status when dist is deleted
});

gulp.task("html", function(){
	gulp.src("svg-diagram/*html")
		.pipe($.useref() )
		.pipe($.if("*.js", $.uglify() ) )
		.pipe(gulp.dest("dist/"));
});


gulp.task("images", function(){
	return gulp.src("dist/images/*", {
		base: "dist/"
		})
		.pipe($.imagemin())
		.pipe(gulp.dest("dist/"));
});


gulp.task("copy", function(){
	return gulp.src(["svg-diagram/css/**/*.css", "svg-diagram/images/*"], {
		base: "svg-diagram/"
	})
		.pipe(gulp.dest("dist/"));
});

gulp.task("upload", function(){
	var conn = ftp.create({
			host: "ftp.myweb.pl",
			user: "user",
			password: "pw"
	})
	return gulp.src("dist/**/*")
	 	.pipe($.if(argv.upload,conn.dest("/public_html/")));
});

gulp.task("build", function(cb){
	runSequence("clean", "html", "copy", "images", "upload", cb); //synchronous
});


gulp.task("build:server", ["build"], function(){
	browserSync.init({
		server: "dist/"
	});
});


gulp.task("default", ["css", "server", "watch"]); //asynchronous
