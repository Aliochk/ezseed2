var level   = process.argv.indexOf('-d') === -1 ? 6 : 7;
var logger  = require('caterpillar').createLogger({level:level});
var filter  = require('caterpillar-filter').createFilter();
var human   = require('caterpillar-human').createHuman();

logger.pipe(filter).pipe(human).pipe(process.stdout);

logger = require('underscore').extend(logger, 
	{
		error: function() {
			var args = [].splice.call(arguments, 0);
			args.unshift('error');
			this.log.apply(this, args);
		},
		warn: function() {
			var args = [].splice.call(arguments, 0);
			args.unshift('warn');
			this.log.apply(this, args);
		},
		info: function() {
			var args = [].splice.call(arguments, 0);
			args.unshift('info');
			this.log.apply(this, args);
		},
		debug: function() {
			var args = [].splice.call(arguments, 0);
			args.unshift('debug');
			this.log.apply(this, args);
		},
		trace: function() {
			var args = [].splice.call(arguments, 0);

			console.trace(args);
			this.log.apply(this, args);
		},
		alert: function() {
			var args = [].splice.call(arguments, 0);
			args.unshift('alert');
			this.log.apply(this, args);
		}
	}
);

module.exports = logger;