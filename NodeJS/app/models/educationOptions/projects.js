var mongoose = require('mongoose');

var EducationProjectSchema = new mongoose.Schema({
	name: String,
	description: String
});


module.exports = mongoose.model('EducationProject', EducationProjectSchema);