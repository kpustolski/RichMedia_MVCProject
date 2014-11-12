var _ = require('underscore');
var models = require('../models');

var appPage = function(req,res){

	res.render('app');
};

module.exports.appPage = appPage;