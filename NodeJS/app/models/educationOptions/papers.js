var mongoose = require('mongoose');

var PaperSchema = new mongoose.Schema({
	name: String
});


module.exports = mongoose.model('EducationPaper', PaperSchema);