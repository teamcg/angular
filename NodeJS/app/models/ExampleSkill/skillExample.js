var mongoose = require('mongoose');

var skillExampleSchema = new mongoose.Schema({
	category: String,
	skill: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ExSkill'
	}]

});

module.exports = mongoose.model('SkillExample', skillExampleSchema);