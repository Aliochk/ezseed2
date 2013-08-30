var fs = require('fs')
	, _ = require('underscore');

//Requires all the modedl database
var mongoose = require('mongoose')
	, models = require('../models')
	, Pathes = mongoose.model('Pathes')
	, Movies = mongoose.model('Movies')
	, Albums = mongoose.model('Albums')
	, Others = mongoose.model('Others')
	, Users = mongoose.model('Users')
	, F = mongoose.model('File');

exports.watch = function(req, res) {
	var path = new Buffer(req.params.id, 'hex').toString(); 
	
	Movies.findById(req.params.id).lean(true).exec(function(err, doc) {
		if(err) { 
			console.log(err);
			req.session.error = 'Aucun fichier trouvé';
			res.redirect('/');
		} else {
			var cwd = process.cwd().replace('/app', '');

			path = path.replace(cwd, '');

			console.log(cwd, path);

			var fullUrl = 'http://' + req.host + ':3001' + path;

			res.render('watch', { title: 'Ezseed V2 - ' + doc.title , movie: doc, path: path, fullUrl: fullUrl  });
		}
		
	});

}