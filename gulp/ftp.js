// FTP ------------------------------------------------------------
// Pushes the contents of the deploy folder to a FTP server.


var gulp = require('gulp');
var plumber = require('gulp-plumber');
var run = require('run-sequence');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
var config = require('../gulp/config/config.json');
var merge = require('merge-stream');
var GulpSSH = require("gulp-ssh");

gulp.task('ftp', function(callback){

	return run('build', 'upload-deploy', function(){
		callback();
	});

});

gulp.task("upload-deploy", function() {

	var sshConfig = {
		host: config.FTP_HOST,
		username: config.FTP_USER,
		password: config.FTP_PASS,
		port: 22
	};

	var gulpSSH = new GulpSSH({
		ignoreErrors: false,
		sshConfig: sshConfig
	});

	return gulp
		.src("./deploy/**")
		.pipe(gulpSSH.dest(config.FTP_PATH));
});

gulp.task('upload-dist', function(){
	var versions = JSON.parse(require('fs').readFileSync('version.json', 'utf8'));

	var conn  = ftp.create({
		host: config.DIST_FTP_HOST,
		user: config.DIST_FTP_USER,
		pass: config.DIST_FTP_PASS,
		port: 21,
		// log: gutil.log,
		parallel: 3
	});

	merged = merge();

	conn.rmdir(config.DIST_FTP_PATH + '/latest' , function(){
		 merged.add(gulp.src(['dist/**', 'dist/.htaccess'])
			.pipe( conn.dest(config.DIST_FTP_PATH + '/latest' ))
			.pipe( conn.dest(config.DIST_FTP_PATH + '/' + versions.current_version )));
	});

	return merged;

});
