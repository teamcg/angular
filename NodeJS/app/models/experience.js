var mongoose = require('mongoose');

var ExperienceSchema = new mongoose.Schema({
	category: String,
	role: String,
	companydescription: String,
	company: String,
	city: String,
	country: String,
	startdate: String,
	enddate: String
});


ExperienceSchema.pre('remove', function (next) {
	console.log(this);
	console.log('PRE SCHEMA IN ORIGINAL');
  this.model('CV').update(
    { experience: this }, 
    { $pull: { experience: this._id } }, 
    { multi: true }
  ).exec(next)
});



module.exports = mongoose.model('Experience', ExperienceSchema);
