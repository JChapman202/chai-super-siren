var babel = require('babel');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

require('babel/register');

gulp.task('lint', function() {
	return gulp.src(['lib/**/*.js', 'test/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task('test', function() {
	return gulp.src(['test/**/*.js'], {read: false})
		.pipe(mocha({
			compilers: {
				js: babel
			},
			reporter: 'spec'
		}));
});

gulp.task('watch', function() {
	gulp.watch(['lib/**/*.js', 'test/**/*.js'], ['lint', 'test']);
});

gulp.task('default', ['lint', 'test', 'watch']);
