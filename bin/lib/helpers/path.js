var cache = require('memory-cache'), jf = require('json-file');

module.exports = function () {
	return p = cache.get('path') ? cache.get('path') : jf.readFileSync(global.app_path + '/app/config.json').path; 
}