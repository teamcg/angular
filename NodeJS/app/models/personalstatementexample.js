var mongoose = require('mongoose');

var personalStatementExampleSchema = new mongoose.Schema({
	text: String
});

module.exports = mongoose.model('ExPersonalStatement', personalStatementExampleSchema);