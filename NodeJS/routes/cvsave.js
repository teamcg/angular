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
var PSExample = require('../app/models/personalstatementexample');
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
		linkedin: req.body.linkedin,
		visastatus: req.body.visastatus,
		driverlicence: req.body.driverlicence,
		interest: req.body.interest
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
					    pObj.addText(theCV.firstname.toString() + ' ', {font_face: 'Segoe UI', font_size: 18, bold: true, color: '#244061'});
					    pObj.addText(theCV.lastname.toString(), {font_face: 'Segoe UI', font_size: 18, bold: true, color: '#244061'});
					    pObj.addLineBreak();
					    pObj.addLineBreak();
					    if(theCV.address !== null && theCV.address !== undefined && theCV.address !== ""){
						    pObj.addText('A: ' + theCV.address.toString(), {font_face: 'Segoe UI', font_size: 10});
						    pObj.addLineBreak();				    	
					    }

					    if(theCV.email !== null && theCV.email !== undefined && theCV.email !== ""){
						    pObj.addText('E: ' + theCV.email.toString(), {font_face: 'Segoe UI', font_size: 10});
						    pObj.addLineBreak();					    	
					    }

					    if(theCV.phone !== null && theCV.phone !== undefined && theCV.phone !== ""){
					    	pObj.addText('P: ' + theCV.phone.toString(), {font_face: 'Segoe UI', font_size: 10});
					    	pobj.addLineBreak();					    						    	
					    }

					    if(theCV.linkedin !== null && theCV.linkedin !== undefined && theCV.linkedin !== ""){
					    	pObj.addText('L: ' + theCV.linkedin.toString(), {font_face: 'Segoe UI', font_size: 10});
						    pObj.addLineBreak();
					    }


					    if(theCV.website !== null && theCV.website !== undefined && theCV.website !== ""){
					    	pObj.addText('W: ' + theCV.website.toString(), {font_face: 'Segoe UI', font_size: 10});
						    pObj.addLineBreak();
					    }


					    pObj.addLineBreak();


					    if(theCV.personalstatement !== undefined && theCV.personalstatement !== null && theCV.personalstatement !== ""){
						    //Personal statement
						    pObj.addText('            Personal Statement', {font_face: 'Segoe UI', font_size: 11, bold: true, color: '#244061'});
						    pObj.addLineBreak();
						    pObj.addLineBreak();
						    pObj.addText('                         ' + theCV.personalstatement.toString(), {font_face: 'Segoe UI', font_size: 10});
					    	pObj.addLineBreak();
					    	pObj.addLineBreak();
					    } 


					    if(theCV.skills !== undefined && theCV.skills !== null && theCV.skills !== ""){
						    //Skills
						    pObj.addText('            Summary of Qualities and Skills', {font_face: 'Segoe UI', font_size: 11, bold: true, color: '#244061'});
						    pObj.addLineBreak();

						    theCV.skills.forEach(function(theSkill){
					    		var pObj = docx.createListOfDots ();
						    	pObj.addText(theSkill.name.toString(), {bold: true, underline: true, font_face: 'Segoe UI', font_size: 10, color: '#244061' });
						    	pObj.addText(' - ' + theSkill.description.toString(), {font_face: 'Segoe UI', font_size: 10 });
						    });		
						    var pObj = docx.createP();
				    		
						    pObj.addLineBreak();
						    pObj.addLineBreak();	
					    }
			    



					    //Experience
					    if(theCV.experience !== undefined && theCV.experience !== null && theCV.experience !== ""){
					    pObj.addText('            Full-Time Work', {font_face: 'Segoe UI', font_size: 11, bold: true, color: '#244061'});
					    pObj.addLineBreak();
					    theCV.experience.forEach(function(experience){
					    	var pObj = docx.createP();
					    	pObj.addText(experience.role.toString(), {font_face: 'Segoe UI', font_size: 10, bold: true, underline: true, color: '#244061'});
					    	pObj.addText('     ' + experience.startdate.toString() + ' - ' + experience.enddate.toString(), {font_face: 'Segoe UI', font_size: 10});
							pObj.addLineBreak();
							pObj.addText(experience.company.toString() + ', ' + experience.city.toString() + ', ' + experience.country.toString());

					    	//Responsibilities
					    	if(experience.responsibilities.length > 0){
					    		var pObj = docx.createP();
					    		pObj.addText('Responsibilities:', {font_face: 'Segoe UI', font_size: 10, underline: true});
					    		experience.responsibilities.forEach(function(expResp){
					    			var pObj = docx.createListOfDots ();
					    			pObj.addText(expResp.text.toString(), {font_face: 'Segoe UI', font_size: 10});
					    		});

					    	}



					    	//Achievements
					    	if(experience.achievements.length > 0){
					    		var pObj = docx.createP();
					    		pObj.addText('Achievements:', {font_face: 'Segoe UI', font_size: 10, underline: true});
					    		experience.achievements.forEach(function(expAch){
					    			var pObj = docx.createListOfDots();
					    			pObj.addText(expAch.text.toString(), {font_face: 'Segoe UI', font_size: 10});
					    		});

					    	}
					    
					    }); //End Experience Iteration


					    


					    } //End Experience IF statement


					    //Education
					    if(theCV.education !== undefined && theCV.education !== null && theCV.education !== ""){
					    	var pObj = docx.createP();
					    	pObj.addLineBreak();
					    	pObj.addText('            Education and Training', {font_face: 'Segoe UI', font_size: 11, bold: true, color: '#244061'});
					    	theCV.education.forEach(function(education){
					    		var pObj = docx.createP();
					    		pObj.addLineBreak();
					    		pObj.addText(education.qualification.toString(), {font_face: 'Segoe UI', font_size: 10, bold: true, underline: true, color: '#244061'});
					    		pObj.addText('     ' + education.startdate.toString() + ' - ' + education.enddate.toString(), {font_face: 'Segoe UI', font_size: 10});
					    		pObj.addLineBreak();
					    		pObj.addText(education.institution.toString(), {font_face: 'Segoe UI', font_size: 10});
					    		pObj.addText(', ' + education.city.toString() + ', ' + education.country.toString(), {font_face: 'Segoe UI', font_size: 10});
					    		
					    		pObj.addLineBreak();

					    		//Papers
					    		if(education.papers.length > 0){
					    			var pObj = docx.createP();
					    			pObj.addText('Papers:', {font_face: 'Segoe UI', font_size: 10, underline: true});
					    			education.papers.forEach(function(papers){
					    				var pObj = docx.createListOfDots();
					    				pObj.addText(papers.name.toString(), {font_face: 'Segoe UI', font_size: 10});
					    			}); //End education papers iteration

					    		} //End education papers IF statement


					    		if(education.projects.length > 0){
					    			var pObj = docx.createP();
									pObj.addText('Projects:', {font_face: 'Segoe UI', font_size: 10, underline: true});
					    			education.projects.forEach(function(projects){
					    				var pObj = docx.createListOfDots();
					    				pObj.addText(projects.name.toString(), {font_face: 'Segoe UI', font_size: 10});
					    				pObj.addText(' -- ' + projects.description.toString(), {font_face: 'Segoe UI', font_size: 10});
					    				
					    			}); //End education project iteration

					    		} //End education projects IF statement


					    		if(education.achievements.length > 0){
					    			var pObj = docx.createP();
					    			pObj.addText('Achievements:', {font_face: 'Segoe UI', font_size: 10, underline: true});
					    			education.achievements.forEach(function(achievements){
					    				var pObj = docx.createListOfDots();
					    				pObj.addText(achievements.name.toString(), {font_face: 'Segoe UI', font_size: 10});
					    				
					    			}); //End education achievement iteration

					    		} //End education achievements IF statement



					    	}); //End Education Iteration
					    } //End Education IF Statement
					    console.log(theCV.interest !== null && theCV.interest !== undefined && theCV.interest !== "" )
					    console.log(theCV.driverlicence !== null && theCV.driverlicence !== undefined && theCV.driverlicence !== "")
					    console.log(theCV.visastatus !== null && theCV.visastatus !== undefined && theCV.visastatus !== "")
					    console.log(theCV.interest !== null || theCV.interest !== undefined || theCV.interest !== "" || 
					    	theCV.driverlicence !== null || theCV.driverlicence !== undefined || theCV.driverlicence !== "" ||
					    	theCV.visastatus !== null || theCV.visastatus !== undefined || theCV.visastatus !== "")
					    if(theCV.interest !== null || theCV.interest !== undefined || theCV.interest !== "" || 
					    	theCV.driverlicence !== null || theCV.driverlicence !== undefined || theCV.driverlicence !== "" ||
					    	theCV.visastatus !== null || theCV.visastatus !== undefined || theCV.visastatus !== ""){


		
							    	var pObj = docx.createP();
							    	pObj.addLineBreak();
							    	pObj.addText('            Personal Details', {font_face: 'Segoe UI', font_size: 11, bold: true, color: '#244061'});
							    	pObj.addLineBreak();
							    	pObj.addLineBreak();

							    	if(theCV.visastatus !== null && theCV.visastatus !== undefined && theCV.visastatus !== ""){
							    		pObj.addText('Visa Status', {font_face: 'Segoe UI', font_size: 10, underline: true});
							    		pObj.addText(': ' + theCV.visastatus.toString(), {font_face: 'Segoe UI', font_size: 10});
							    		pObj.addLineBreak();
							    	}

							    	if(theCV.driverlicence !== null && theCV.driverlicence !== undefined && theCV.driverlicence !== ""){
							    		pObj.addText('Driver Licence', {font_face: 'Segoe UI', font_size: 10, underline: true});
							    		pObj.addText(': ' + theCV.driverlicence.toString(), {font_face: 'Segoe UI', font_size: 10});
							    		pObj.addLineBreak();
							    	}

							    	if(theCV.interest !== null && theCV.interest !== undefined && theCV.interest !== ""){
							    		pObj.addText('Interests', {font_face: 'Segoe UI', font_size: 10, underline: true});
							    		pObj.addText(': ' + theCV.interest.toString(), {font_face: 'Segoe UI', font_size: 10});
							    		pObj.addLineBreak();
							    	}
					    }


					    var pObj = docx.createP();
					    pObj.addText('            Referees', {font_face: 'Segoe UI', font_size: 11, bold: true, color: '#244061'});
				    	pObj.addLineBreak();
				    	pObj.addLineBreak();
				    	pObj.addText('Available on request', {font_face: 'Segoe UI', font_size: 10});



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


router.post('/addpersonalstatementexample', function(req, res){
	PSExample.create({text: req.body.pstext}, function(err, thePS){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: thePS
			});
		}
	});
});


router.get('/getpersonalstatementexample', function(req, res){
	PSExample.find({}, function(err, thePS){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: thePS
			});
		}
	});
});



module.exports = router