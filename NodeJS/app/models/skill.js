var mongoose = require('mongoose');

var SkillSchema = new mongoose.Schema({
	name: String,
	description: String
});


SkillSchema.pre('remove', function (next) {
  this.model('CV').update(
    { skills: this }, 
    { $pull: { skills: this._id } }, 
    { multi: true }
  ).exec(next)
});



module.exports = mongoose.model('Skill', SkillSchema);