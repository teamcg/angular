var mongoose = require('mongoose');

var EducationAchievementsSchema = new mongoose.Schema({
	name: String
});


module.exports = mongoose.model('EducationAchievement', EducationAchievementsSchema);