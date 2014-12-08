var jsface       = require('jsface'),
	Globals      = require('./Globals'),
	log          = require('./Logger'),
	fs           = require('fs'),
	DOT          = require('dot');

/**
 * @class HtmlExporter
 * @classdesc Class Used to generate pretty html reports
 */
var HtmlExporter = jsface.Class({
	$singleton: true,
	templates: null,
	generateHTML: function(resultObj) {
		var template;
		//check if .js file exists
		if (!fs.existsSync(__dirname + "/../templates/htmlResponseTemplate.js")) {
			if (!this.templates) {
				//Disable console.log for DOT process
				var oldConsoleLog = console.log;
				console.log = function() {};
				this.templates = DOT.process({path: __dirname + "/../templates"});
				console.log = oldConsoleLog;
			}
		}
		template = require('../templates/htmlResponseTemplate');
		var htmlPath = Globals.html;
		fs.writeFileSync(htmlPath, template(resultObj));
		log.note("\nHTML Report written to: " + htmlPath+"\n");
	}
});

module.exports = HtmlExporter;