var mongoose = require('mongoose');

var EducationProjectSchema = new mongoose.Schema({
	name: String,
	description: String
});


EducationProjectSchema.pre('remove', function (next) {
  this.model('Education').update(
    { projects: this }, 
    { $pull: { projects: this._id } }, 
    { multi: true }
  ).exec(next)
});

module.exports = mongoose.model('EducationProject', EducationProjectSchema);