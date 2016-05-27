'use strict'

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifycss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	cssFiles = [
		
		'./source/assets/css/theme.css',
		'./source/assets/css/post-new.css',
		'./source/assets/css/header.css',
		'./source/assets/css/footer.css',
		'./source/assets/css/layout.css',
		
		
	],
	jsFiles = [
		'./',
		
		
	],
	minCSS = './source/dist/css/style.min.css',
	minJS = './source/dist/js/scripts.min.js',
	pathDist = './',
	//images = './src/img/**', (doble asterisco. images en subcarpetas)
	//images = './src/img/**/*.png', (sólo images.png)
	//images = './src/img/**/!*.png', todas las images excepto.png
	images = './source/img/**',
	imagesMin = './source/dist/img'
	

gulp.task('css', () => {
	gulp
		.src( cssFiles )
		.pipe( concat( minCSS ))
		.pipe( minifycss(  ) )
		.pipe( gulp.dest( pathDist ) )
})

gulp.task('js', () => {
	gulp
		.src( jsFiles )
		.pipe( concat( minJS ))
		.pipe( uglify(  ) )
		.pipe( gulp.dest( pathDist ) )
})

gulp.task('img', () => {
	gulp
		.src( images )
		.pipe( imagemin({
			progressive:true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		} ) )
		.pipe( gulp.dest( imagesMin ) )
})

var input = './stylesheets/**/*.scss';
var output = './public/css';

gulp.task('sass',  () => {
  gulp
    .src(input)
   	.pipe(sass())
    .pipe(gulp.dest(output));
})

gulp.task('min', ['css', 'js', 'img', ])

gulp.task('server', () => {
	connect.server({
		root : './source',
		port : 3000,
		livereload : true
	})
})

gulp.task('reload', () => {
	gulp
		.src(['./source/**/*.*'])
		.pipe( connect.reload() )
})

gulp.task('watch', () => {
	gulp
		.watch(['./source/**/*.*'], ['reload'])
})

gulp.task('start', ['server', 'watch'])

/*
gulp.task('', () => {})
gulp.task('', () => {})
gulp.task('', () => {})
*/
