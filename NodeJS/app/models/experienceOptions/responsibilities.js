var mongoose = require('mongoose');

var ResponsibilitiesSchema = new mongoose.Schema({
	text: String
});

ResponsibilitiesSchema.pre('remove', function(next){
    this.model('Experience').update(
        { responsibilities: this },
        { $pull: { responsibilities: this._id}},
        { multi: true }
    ).exec(next)
});


module.exports = mongoose.model('ExperienceResponsibilities', ResponsibilitiesSchema);