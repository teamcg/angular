var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var User = require('../app/models/users');
var CV = require('../app/models/cv');
var Experience = require('../app/models/experience');
var ExperienceResponsibilities = require('../app/models/experienceOptions/responsibilities');
var ExperienceAchievements = require('../app/models/experienceOptions/achievements');
var Education = require('../app/models/education');
var EducationPaper = require('../app/models/educationOptions/papers');
var EducationAchievement = require('../app/models/educationOptions/achievements');
var EducationProject = require('../app/models/educationOptions/projects');
var Skill = require('../app/models/skill');
var SkillExample = require('../app/models/ExampleSkill/skillExample');
var moment = require('moment');
var officegen = require('officegen');
var async = require('async');
var fs = require('fs');





router.post('/updatemyprofile', function(req, res){

	var updateProfile = {
		address: req.body.address,
		phone: req.body.phone,
		email: req.body.email,
		linkedin: req.body.linkedin,
		website: req.body.website
	}

	User.findByIdAndUpdate(req.body.id, updateProfile, {new: true}, function(err, theUser){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: theUser
			});
		}
	});
});


//BIND the profile of user to the CV
router.post('/cvname', function(req, res){
	var cvName = {
		cvname: req.body.cvname
	}

	User.findById(req.body.id, function(err, theUser){
		if(err){
			console.log(err);
		} else if(theUser){
			CV.create(cvName, function(err, newCV){
				if(err){
					console.log(err);
				} else {
					newCV.firstname = theUser.firstname;
					newCV.lastname = theUser.lastname;
					newCV.address = theUser.address;
					newCV.phone = theUser.phone;
					newCV.email = theUser.email;
					newCV.linkedin = theUser.linkedin;
					newCV.website = theUser.website;
					newCV.save();
					res.json({
						success: true,
						firstname: theUser.firstname,
						lastname: theUser.lastname,
						address: theUser.address,
						phone: theUser.phone,
						email: theUser.email,
						linkedin: theUser.linkedin,
						website: theUser.website,
						info: newCV
					});
				}
			});
		}
	});
});


router.post('/cvpersonalinfo', function(req, res){
	var cvPersonalInfo = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		address: req.body.address,
		phone: req.body.phone,
		email: req.body.email,
		website: req.body.website,
		linkedin: req.body.linkedin
	}


	CV.findByIdAndUpdate(req.body.id, cvPersonalInfo, {new: true}, function(err, theCV){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true
			});
		}
	});
});

router.post('/cvpersonalstatement', function(req, res){

	CV.findById(req.body.id, function(err, theCV){
		if(err){
			console.log(err);
		} else {
			theCV.personalstatement = req.body.personalStatement;
			theCV.save();
			res.json({
				success: true,
				info: theCV
			});
		}
	});
});



router.post('/cvexpand', function(req, res){
	CV.findById(req.body.cvid)
	.populate({
		path: 'education',
		populate: {
			path: 'papers',
			model: 'EducationPaper'
		}
	})
	.populate({
		path: 'education',
		populate: {
			path: 'achievements',
			model: 'EducationAchievement'
		}
	})
	.populate({
		path: 'education',
		populate: {
			path: 'projects',
			model: 'EducationProject'
		}
	})
	.populate({
		path: 'experience',
		populate: {
			path: 'responsibilities',
			model: 'ExperienceResponsibilities'
		}
	})
	.populate({
		path: 'experience',
		populate: {
			path: 'achievements',
			model: 'ExperienceAchievements'
		}
	})
	.populate('skills')
	.exec(function(err, theCV){
		if(err){
			console.log(err);
		} else {

			res.json({
				success: true,
				info: theCV
			});
		}
	});
});




router.post('/gencv', function(req, res){
	User.findById(req.body.userid, function(err, theUser){
		if(err){
			console.log(err);
		} else {
			CV.findById(req.body.cvid)
				.populate({
					path: 'education',
					populate: {
						path: 'papers',
						model: 'EducationPaper'
					}
				})
				.populate({
					path: 'education',
					populate: {
						path: 'achievements',
						model: 'EducationAchievement'
					}
				})
				.populate({
					path: 'education',
					populate: {
						path: 'projects',
						model: 'EducationProject'
					}
				})
				.populate({
					path: 'experience',
					populate: {
						path: 'responsibilities',
						model: 'ExperienceResponsibilities'
					}
				})
				.populate({
					path: 'experience',
					populate: {
						path: 'achievements',
						model: 'ExperienceAchievements'
					}
				})
				.populate('skills').exec(function(err, theCV){
					if(err){
						console.log(err);
					} else {
					    var docx = officegen('docx');

					    var pObj = docx.createP();
					    pObj.addText(theCV.firstname.toString());
					    pObj.addText(theCV.lastname.toString());
					    pObj.addLineBreak();
					    pObj.addText(theCV.address.toString());
					    pObj.addLineBreak();
					    pObj.addText(theCV.email.toString(), {color: 'red'});
					    pObj.addLineBreak();
					    pObj.addText(theCV.phone.toString(), {color: 'blue'});
					    pObj.addLineBreak();
					    pObj.addLineBreak();


					    //Education
					    pObj.addText('Education', {bold: true});
					    pObj.addLineBreak();
					    theCV.education.forEach(function(theEducation){
					    	pObj.addText(theEducation.qualification.toString());
					    	pObj.addLineBreak();
					    	pObj.addText(theEducation.institution.toString());
					    	pObj.addLineBreak();
					    	pObj.addText(theEducation.city.toString());
					    	pObj.addLineBreak();
					    	pObj.addText(theEducation.country.toString());
					    	pObj.addLineBreak();
					    	pObj.addText(theEducation.startdate.toString());
					    	pObj.addText(' - ');
					    	pObj.addText(theEducation.enddate.toString());
					    	pObj.addLineBreak();


					    	//Papers
					    	pObj.addText('          Papers', {bold: true});
					    	pObj.addLineBreak();
					    	theEducation.papers.forEach(function(thePaper){
					    		pObj.addText('          ' + '-' + thePaper.name.toString());
					    		pObj.addLineBreak();
					    	});
					    	pObj.addLineBreak();
					    	pObj.addLineBreak();

					    	//Projects
					    	pObj.addText('          Projects', {bold: true});
					    	pObj.addLineBreak();
					    	theEducation.projects.forEach(function(theProject){
					    		pObj.addText('          ' + '-' + theProject.name.toString());
					    		pObj.addLineBreak();
					    		pObj.addText('          ' + '-' + theProject.description.toString());
					    		pObj.addLineBreak();
					    	});
					    	pObj.addLineBreak();
					    	pObj.addLineBreak();

					    	//Achievements
					    	pObj.addText('          Achievements', {bold: true});
					    	pObj.addLineBreak();
					    	theEducation.achievements.forEach(function(theAchievement){
					    		pObj.addText('          ' + '-' + theAchievement.name.toString());
					    		pObj.addLineBreak();
					    	});
							pObj.addLineBreak();
					    	pObj.addLineBreak();					    	
					    });


					    //Experience
					    pObj.addText('Experience', {bold: true});
					    pObj.addLineBreak();
					    theCV.experience.forEach(function(theExperience){
					    	pObj.addText(theExperience.role.toString(), {bold: true});
					    	pObj.addLineBreak();
					    	pObj.addText(theExperience.company.toString());
					    	pObj.addLineBreak();
					    	pObj.addText(theExperience.companydescription.toString());
					    	pObj.addLineBreak();
					    	pObj.addText(theExperience.city.toString());
					    	pObj.addLineBreak();
					    	pObj.addText(theExperience.country.toString());
					    	pObj.addLineBreak();
					    	pObj.addText(theExperience.startdate.toString());
					    	pObj.addText(' - ');
					    	pObj.addText(theExperience.enddate.toString());
					    	pObj.addLineBreak();
					    	pObj.addLineBreak();


					    	//Achievements
					    	pObj.addText('          Achievements', {bold: true});
					    	pObj.addLineBreak();
					    	theExperience.achievements.forEach(function(theAchievement){
					    		pObj.addText('          ' + '-' + theAchievement.text.toString());
					    		pObj.addLineBreak();
					    	});
					    	pObj.addLineBreak();
					    	pObj.addLineBreak();

					    	//Responsibilities
					    	pObj.addText('          Responsibilities', {bold: true});
					    	pObj.addLineBreak();
					    	theExperience.responsibilities.forEach(function(theResponsibility){
					    		pObj.addText('          ' + '-' + theResponsibility.text.toString());
					    		pObj.addLineBreak();
					    	});
					    	pObj.addLineBreak();
					    	pObj.addLineBreak();

					    });


					    //Skills
					    pObj.addText('Skills', {bold: true});
					    pObj.addLineBreak();
					    theCV.skills.forEach(function(theSkill){
					    	pObj.addText('-' + theSkill.name.toString());
					    	pObj.addLineBreak();
					    	pObj.addText('-' + theSkill.description.toString());
					    	pObj.addLineBreak();
					    });
					    pObj.addLineBreak();
					    pObj.addLineBreak();



					    var named = './CV/' + theUser.folder + '/' + theCV.cvname + '.docx'
					    var out = fs.createWriteStream (named.replace(/\s/g,''));

					    out.on ( 'error', function ( err ) {
					      console.log ( err );
					    });

					    async.parallel ([
					      function ( done ) {
					        out.on ( 'close', function () {
					          console.log ( 'Created a CV for ' + theUser.firstname + '' + theUser.lastname );

					          done ( null );
					        });
					        docx.generate (out);
					      }

					    ], function ( err ) {
					      if ( err ) {
					        console.log ( 'error: ' + err );
					      } 
					    });
					          res.json({
					          	success: true
					          });
							}
				});
		}
	});
});




router.post('/studentfile', function(req, res){
  fs.readdir('./CV/' + req.body.folder, function(err, files){
    if(err){
      console.log(err);
    } else {
      res.json({
      	theFiles: files
      })
    }
  });
	
});





// router.get('/CV/:file', function (req, res){

//   var path=require('path');

//     file = req.params.file;

//     var dirname = path.resolve(".")+'/CV/';

//     var img = fs.readFileSync(dirname  + file);

//     res.writeHead(200, {'Content-Type': 'image/jpg' });

//     res.end(img, 'binary');

// });


router.get('/CV/:file(*)', function(req, res, next){ // this routes all types of file 

  var path = require('path');
  var file = req.params.file;
  var path = path.resolve(".")+'/CV/' + file;
  
  res.download(path);


});



module.exports = router