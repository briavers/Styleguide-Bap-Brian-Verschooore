// -------------------------------------------------------------------
// :: GULP SERVER
// -------------------------------------------------------------------

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var run = require('run-sequence');

gulp.task('server', function(callback) {

	return run('clean', ['iconfont', 'sass', 'render-templates', 'sass-lint'], function() {
		livereload.listen();
		gulp.start('connect');
		gulp.watch('development/fonts/icon-sources/*.svg', ['iconfont']);
		gulp.watch('development/sass/**/*.scss', ['sass']);
		gulp.watch('development/sass/base/_quarks/_colors.scss', ['render-templates']);
		gulp.watch('development/templates/**/*.njk', ['render-templates']);
		gulp.watch('.temp/**/*.html', ['html-lint']);
		gulp.watch([

			// 'development/**/*.html',
			'development/**/*.js',
			'development/img/**',
			'development/fonts/*.*',
			'.temp/**/*.css',
			'.temp/**/*.html'

		]).on('change', livereload.changed);

		callback();
	});



});

// -------------------------------------------------------------------
// :: CONNECT
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/serve-static
// - https://www.npmjs.org/package/serve-index
// - https://www.npmjs.org/package/connect
// - https://www.npmjs.org/package/connect-livereload
// - https://www.npmjs.org/package/http

// Create middleware functions to serve static
// files and pages that contain directory
// listings for a given root directory

var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var connect = require('connect');
var connectLivereload = require('connect-livereload');
var http = require('http');

gulp.task('connect', function() {

	// Create the middleware and
	// add the live-reload script
	var app = connect().use(connectLivereload({port: 35729}))
		 .use(serveStatic('.temp'))
		 .use(serveIndex('.temp'))
		 .use(serveStatic('development'));

	// Create server and
	// start listening
	return http.createServer(app).listen(9000);

});
