var mongoose = require('mongoose');

var ResponsibilitiesSchema = new mongoose.Schema({
	text: String
});

module.exports = mongoose.model('ExperienceResponsibilities', ResponsibilitiesSchema);