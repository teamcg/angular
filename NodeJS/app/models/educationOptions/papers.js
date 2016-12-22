var mongoose = require('mongoose');

var PaperSchema = new mongoose.Schema({
	name: String
});


PaperSchema.pre('remove', function (next) {
  this.model('Education').update(
    { papers: this }, 
    { $pull: { papers: this._id } }, 
    { multi: true }
  ).exec(next)
});

module.exports = mongoose.model('EducationPaper', PaperSchema);