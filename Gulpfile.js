// -------------------------------------------------------------------
// :: GULP CONFIGURATION
// -------------------------------------------------------------------
// Frontend boilerplate/kickstart/... running on Gulp & Sass
// Build with love for everyday use at Little Miss Robot
// thanks to Rockstar Gwen Vanhee for initial setup and maintainance
//
// Credits & inspiration
// - http://github.com/yeoman/generator-gulp-webapp
// - http://yeoman.io/blog/performance-optimization.html
// - http://smashingmagazine.com/2014/06/11/building-with-gulp
// - http://github.com/flovan/headstart
// - https://github.com/gwenvanhee
//
// -------------------------------------------------------------------
// :: SETUP
// -------------------------------------------------------------------
//
// 1) If not present on your system (aka install once):
// - install Node (http://nodejs.org)
// - install Gulp (globally):  (sudo) npm install gulp -g
//
// 2) Navigate to your project folder (aka install for each project):
// - install dependencies:     (sudo) npm install
//
// -------------------------------------------------------------------
// :: COMMON TASKS
// -------------------------------------------------------------------
//
// - gulp iconfont: create an icon-font from svg-sources (manual task)
// - gulp server:   start a web server for development
// - gulp build:    build a production version with minified code
// - gulp init:   initializes the deliver-repository if the git credentials are correct in the config file.
// - gulp deploy [arguments]:   build a production version and deliver
// 		it to different sources, depening on config-file.
//		press gulp deploy -h to see the possible arguments.
// - gulp:          defaults to 'gulp server' and opens it in the browser

'use strict';

process.env.deployLocation = '.temp';

var gulp = require('gulp'),
	config = require('./gulp/config/config.json');

var build = require('./gulp/build'),
	clean = require('./gulp/clean'),
	copy = require('./gulp/copy'),
	distribute = require('./gulp/distribute'),
	ftp = require('./gulp/ftp'),
	scp = require('./gulp/scp'),
	iconfont = require('./gulp/iconfont'),
	images = require('./gulp/images'),
	push = require('./gulp/push'),
	scripts = require('./gulp/scripts'),
	semver = require('./gulp/semver'),
	server = require('./gulp/server'),
	slack = require('./gulp/slack'),
	styles = require('./gulp/styles'),
	templates = require('./gulp/templates');


// -------------------------------------------------------------------
// :: GULP BUILD
// -------------------------------------------------------------------

gulp.task('default', ['server'], function () {
	// Auto-open browser window
	// - https://www.npmjs.org/package/opn

	require('opn')('http://localhost:9000');
});


gulp.task('build', [

	'clean'

], function (callback) {
	var run = require('run-sequence').use(gulp);

	process.env.deployLocation = 'deploy';

	run(['iconfont', 'images', 'copy'], 'create-build', function () {
		console.log('##### BUILD SUCCEEDED! #####');
		callback();
	});

});


gulp.task('distribute', function (callback) {
	var run = require('run-sequence').use(gulp);

	process.env.deployLocation = 'dist';

	var deploymentsToRun = ['dummie'];
	if (config.DIST_FTP) {
		deploymentsToRun.push('upload-dist');
	}
	if (config.CDN_SCP) {
		deploymentsToRun.push('upload-cdn-scp');
	}

	run('iconfont', ['images', 'copy', 'sass-dist', 'scripts-dist'], 'inject-versioning', 'create-dist-zip', deploymentsToRun, function () {
		console.log('##### DISTRIBUTE SUCCEEDED! #####');
		callback();
	});

});


gulp.task('deploy', function (callback) {
	var run = require('run-sequence').use(gulp);

	var deploymentsToRun = ['dummie'];
	if (config.FTP) {
		deploymentsToRun.push('upload-deploy');
	}
	if (config.DEMO_SCP) {
		deploymentsToRun.push('upload-demo-scp');
	}
	if (config.DIST_FTP || config.CDN_SCP) {
		deploymentsToRun.push('distribute');
	}

	var messagingToRun = ['dummie'];
	if (config.SLACK) {
		messagingToRun.push('slack');
	}

	run('semver', 'clean', 'build', deploymentsToRun, messagingToRun, function () {
		console.log('##### DEPLOY SUCCEEDED! #####');
		callback();
	});
});

//dummie task to prevent empty task array's
gulp.task('dummie', function (callback) {
	//do nothing
	return callback();
});
