var mongoose = require('mongoose');

var ExperienceSchema = new mongoose.Schema({
	role: String,
	companydescription: String,
	company: String,
	city: String,
	country: String,
	startdate: String,
	enddate: String,
	responsibilities: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ExperienceResponsibilities'
	}]
});


ExperienceSchema.pre('remove', function (next) {
  this.model('CV').update(
    { experience: this }, 
    { $pull: { experience: this._id } }, 
    { multi: true }
  ).exec(next)
});



module.exports = mongoose.model('Experience', ExperienceSchema);
