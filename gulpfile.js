// Gulpfile
var gulp = require('gulp'),
utils =  require('gulp-util'),
sass =  require('gulp-sass'),
uglify =  require('gulp-uglify'),
browserSync = require('browser-sync'),
rename =  require('gulp-rename'),
concat = require('gulp-concat');

gulp.task('styles',function(){
gulp.src('styles/*.scss')
.pipe(sass({styles:'expanded'}))
.pipe(gulp.dest('dist/css'));
	
});


gulp.task('minifyJs',function(){
 gulp.src('scripts/*.js')
  .pipe(uglify())
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest('dist/js'));
 
});

gulp.task('html',function(){
	gulp.src('*.html');
	
});

gulp.task('browserSync',function(){
	browserSync({
		server:{base:'./gulp-project-master'}
	})
	
});

gulp.task('images', function () {
	gulp.src('icons/*.*')
  	.pipe(gulp.dest('dist/icons'));
});

gulp.task('watch',function(){
	gulp.watch('scripts/*.js',['minifyJs']);
	gulp.watch('styles/*.scss',['styles']);
	gulp.watch('partials/*.html',['html']);
	
	
})

gulp.task('default',['styles','minifyJs','html','images','browserSync','watch']);