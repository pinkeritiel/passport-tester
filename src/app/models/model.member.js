var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//create a Schema for our food:
var Member = new Schema({
	name: {type: String,required: true},
	ispasswordtemp: Boolean,
	email: {
        type: String,
        index: {
            unique: true
        	}
        },
	cellphone: String,
	gender: String
    });

// Use the schema to register a model with MongoDb
var options = ({missingPasswordError: "Missing password"});
Member.plugin(passportLocalMongoose,options);

module.exports = mongoose.model('Member',Member);