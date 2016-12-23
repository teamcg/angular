var mongoose = require('mongoose');

var EducationAchievementsSchema = new mongoose.Schema({
	name: String
});


EducationAchievementsSchema.pre('remove', function (next) {
  this.model('Education').update(
    { achievements: this }, 
    { $pull: { achievements: this._id } }, 
    { multi: true }
  ).exec(next)
});


module.exports = mongoose.model('EducationAchievement', EducationAchievementsSchema);