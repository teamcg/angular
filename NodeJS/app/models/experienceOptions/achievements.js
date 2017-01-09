var mongoose = require('mongoose');

var AchievementsSchema = new mongoose.Schema({
    text: String
});

module.exports = mongoose.model('ExperienceAchievements', AchievementsSchema);