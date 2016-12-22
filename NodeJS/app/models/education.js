var mongoose = require('mongoose');

var EducationSchema = new mongoose.Schema({
	qualification: String,
	institution: String,
	city: String,
	country: String,
	startdate: String,
	enddate: String,
	papers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'EducationPaper'
	}],
	achievements: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'EducationAchievement'
	}]
});


EducationSchema.pre('remove', function (next) {
  this.model('CV').update(
    { education: this }, 
    { $pull: { education: this._id } }, 
    { multi: true }
  ).exec(next)
});

module.exports = mongoose.model('Education', EducationSchema);