//Katie pustolski
//11/7/14
//Rich Meia web app II MVC project
// code referenced from : https://github.com/IGM-RichMedia-at-RIT/LoginApp/blob/master/src/models/Account.js

//variables
var crypto =require('crypto');
var mongoose = require('mongoose');

var AccountModel;
var iterations = 10000;
var saltLength = 64;
var keyLength = 64;

// set up database to hold accounts
var AccountSchema = new mongoose.Schema({

	username:{
		type:String,
		required:true,
		trim:true,
		unique:true,
		match: /^[A-Za-z0-9_\-\.]{1,16}$/

	},

	salt:{
		type:Buffer,
		required:true

	},

	password:{
		type:String,
		required:true
	},

	createData:{
		type:Date,
		default:Date.now
	}


});

//find unique id for each user 
AccountSchema.methods.toAPI = function(){

	return{
		username:this.username,
		_id:this._id
	};
};

// validate password
AccountSchema.methods.validatePassword = function(password,callback){
	var pass = this.password;

	crypto.pbkdf2(password,this.salt,iterations,keyLength,function(err, hash){
		if(hash.toString('hex') !== pass){
			return callback(false);
		}
		return callback(true);

	});
};
// find a user by their username
AccountSchema.statics.findByUsername = function(name,callback){

	var search = {
		username:name
	};

	return AccountModel.findOne(search,callback);
};
// generate a hash
AccountSchema.statics.generateHash = function(password,callback){
	var salt = crypto.randomBytes(saltLength);

	crypto.pbkdf2(password,salt,iterations,keyLength,function(err, hash){
		return callback(salt,hash.toString('hex'));
	});
};

// authenticate username and password
AccountSchema.statics.authenticate = function(username,password,callback){
	return AccountModel.findByUsername(username,function(err,doc){

		if(err){
			return callback(err);

		}

		if(!doc){
			return callback();
		}

		doc.validatePassword(password,function(result){
			if(result===true){
				return callback(null,doc);
			}

			return callback();

		});

	});

};

// connect to mongoose database
AccountModel = mongoose.model('Account', AccountSchema);
// export
module.exports.AccountModel = AccountModel;
module.exports.AccountSchema = AccountSchema;