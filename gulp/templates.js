// -------------------------------------------------------------------
// :: TEMPLATING
// -------------------------------------------------------------------
// - https://mozilla.github.io/nunjucks
// - https://www.npmjs.org/package/gulp-nunjucks

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var nunjucks = require('gulp-nunjucks');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var htmlhint = require('gulp-htmlhint');

gulp.task('render-templates', function() {

	return gulp.src([
			'development/templates/*.njk',
			'development/templates/**/pages/**/*.njk',
			'!development/templates/**/pages/_**/*.njk'
		])
		.pipe(plumber())
		.pipe(nunjucks.compile(getTemplateData()))
		.pipe(rename({extname: ".html"}))
		.pipe(changed('.temp', {hasChanged: changed.compareSha1Digest}))
		.pipe(gulp.dest(process.env.deployLocation));

});

gulp.task('html-lint', function() {
	return gulp.src([
			'.temp/**/*.html'
		])
		.pipe(plumber())
		.pipe(htmlhint('gulp/config/htmlhint.htmlhintrc'))
		.pipe(htmlhint.reporter());
});

var glob = require('glob');
var config = require('../gulp/config/config.json');
var sassVars = require('sass-vars-to-js');

function getTemplateData() {
	var data = {};

	data.CONFIG = config;
	data.VERSION_INFO = JSON.parse(require('fs').readFileSync('version.json', 'utf8'));
	data.ICONS = [];
	data.ATOMS = [];
	data.MOLECULES = [];
	data.ORGANISMS = [];
	data.PAGES = {};

	// Strip icon filenames
	var icons = glob.sync("development/fonts/icons/icon-sources/*.svg");

	for (var i in icons) {
		var filename = icons[i].split('/');
		filename = filename[filename.length -1];
		filename = filename.split('.')[0];
		data.ICONS.push(filename);
	}

	// Get atoms in the templates/atoms folder
	var atoms = glob.sync("development/templates/atoms/*.njk");

	for (var a in atoms) {
		var atomName = atoms[a].replace("development/templates/atoms/", "").replace(".njk", "");

		data.ATOMS.push(atomName);
	}

	// get molecules in the templates/molecules folder
	var molecules = glob.sync("development/templates/molecules/*.njk");

	for (var m in molecules) {
		var moleculeName = molecules[m].replace("development/templates/molecules/", "").replace(".njk", "");

		data.MOLECULES.push(moleculeName);
	}

	// Get organisms in the templates/organisms folder
	var organisms = glob.sync("development/templates/organisms/*.njk");

	for (var o in organisms) {
		var organismName = organisms[o].replace("development/templates/organisms/", "").replace(".njk", "");

		data.ORGANISMS.push(organismName);
	}

	// Get pages in the templates/pages folder
	var pages = glob.sync("development/templates/pages/**/*.njk", { ignore: 'development/templates/**/pages/_**/*.njk'});

	for (var j in pages) {
		var templatePath = pages[j].replace('development/templates/pages/', '').replace('.njk', '');
		var templateName = templatePath.replace(/-/g, " ");
		var folder = "_root";

		if (templatePath.indexOf("/") !== -1) {
			var temp = templatePath.split("/");
			folder = temp[0];
			templateName = temp[1].replace(/-/g, " ");
		}

		if (Array.isArray(data.PAGES[folder])) {
			data.PAGES[folder].push({
				name: templateName,
				path: templatePath
			});
		} else {
			data.PAGES[folder] = [{
				name: templateName,
				path: templatePath
			}];
		}
	}

	data.COLORS = sortColors(sassVars('development/sass/base/_quarks/_colors.scss'));
	data.GLOBALS = sassVars('development/sass/base/_globals.scss');

	return data;
}


function sortColors(colors) {

	var response = {
		FONT_COLORS: {},
		BORDER_COLORS: {},
		UI_COLORS: {},
		COLORS: {}
	};

	for (var color in colors) {
		if (color.includes('text-color')) {
			response.FONT_COLORS[color] = colors[color];
		} else if (color.includes('border-color')) {
			response.BORDER_COLORS[color] = colors[color];
		} else if (color.includes('state-')) {
			response.UI_COLORS[color] = colors[color];
		} else {
			response.COLORS[color] = colors[color];
		}
	}

	return response;
}
