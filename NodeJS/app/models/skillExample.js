var mongoose = require('mongoose');

var skillExampleSchema = new mongoose.Schema({
	title: String,
	description: String
});

module.exports = mongoose.model('SkillExample', skillExampleSchema);