var mongoose = require('mongoose');

var exSkillSchema = new mongoose.Schema({
	name: String,
	description: String
});

module.exports = mongoose.model('ExSkill', exSkillSchema);