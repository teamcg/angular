var mongoose = require('mongoose');

var AchievementsSchema = new mongoose.Schema({
    text: String
});
///////
AchievementsSchema.pre('remove', function(next){
    this.model('Experience').update(
        { achievements: this },
        { $pull: { achievements: this._id}},
        { multi: true }
    ).exec(next)
});
//////////

module.exports = mongoose.model('ExperienceAchievements', AchievementsSchema);