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
var moment = require('moment');





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


//Add EXPERIENCE
router.post('/cvexperience', function(req, res){

	var expData = {
		category: req.body.category,
		role: req.body.role,
		companydescription: req.body.companydesc,
		company: req.body.company,
		city: req.body.city,
		country: req.body.country,
		startdate: moment(req.body.startdate).format('L'), 
		enddate: moment(req.body.enddate).format('L')
	}

	CV.findById(req.body.id, function(err, theCV){
		if(err){
			console.log(err);
		} else {
			Experience.create(expData, function(err, newExp){
				if(err){
					console.log(err);
				} else {
					theCV.experience.push(newExp);
					theCV.save();
					console.log(theCV);
					res.json({
						success: true,
						info: newExp
					});
				}
			});
		}
	});

});

//GET Experience
router.post('/getcvexperience', function(req, res){
	CV.findById(req.body.id).populate('experience').exec(function(err, theCV){
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


//Edit EXPERIENCE
router.post('/editcvexperience', function(req, res){

	var expEditedData = {
		category: req.body.category,
		role: req.body.role,
		companydescription: req.body.companydesc,
		company: req.body.company,
		city: req.body.city,
		country: req.body.country,
		startdate: moment(req.body.startdate).format('L'),
		enddate: moment(req.body.enddate).format('L')
	}


	Experience.findByIdAndUpdate(req.body.expid, expEditedData, {new: true}, function(err, editedExp){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: editedExp
			});
		}
	});
});


//Delete EXPERIENCE
router.post('/deletecvexperience', function(req, res){
	Experience.findById(req.body.expid, function(err, experience){
		if(err){
			console.log(err);
		} else {
			experience.remove();
			res.json({
                success: true
			});
		}
	});
});


//Add Responsibilities to Experience
router.post('/addcvexperienceresponsibilities', function(req, res){
	Experience.findById(req.body.expid, function(err, theExperience){
		if(err){
			console.log(err);
		} else {
			ExperienceResponsibilities.create({text: req.body.expResponsibilities}, function(err, newExpResp){
				if(err){
					console.log(err);
				} else {
					theExperience.responsibilities.push(newExpResp);
					theExperience.save();
					res.json({
						success: true,
						info: newExpResp
					});
				}
			});
		}
	});
});

//GET responsibilities in Experience
router.post('/getcvexperienceresponsibilities', function(req,res){
	Experience.findById(req.body.expid).populate('responsibilities').exec(function(err, expResponsibilities){
		if(err){
			console.log(err);
		} else {
			res.json({info: expResponsibilities});
		}
	});
});


//ADD ACHIEVEMENT in Experience
router.post('/addcvexperienceachievements', function(req, res){
    Experience.findById(req.body.expid, function(err, theExperience){
        if(err){
            console.log(err);
        } else {
            var expAch = {
                text: req.body.expAchievements
            }
            ExperienceAchievements.create(expAch, function(err, newExpAch){
                if(err){
                    console.log(err);
                } else {
                    theExperience.achievements.push(newExpAch);
                    theExperience.save();
                    res.json({
                        success: true,
                        info: newExpAch
                    });
                }
            })
        }
    })
})

//Get Ach in EXp
router.post('/getcvexperienceachievements', function(req, res){
    Experience.findById(req.body.expid).populate('achievements').exec(function(err, theExperience){
        if(err){
            console.log(err);
        } else {
            res.json({
                sucess: true,
                info: theExperience
            });
        }
    });
});



//ADD Education
router.post('/cveducation', function(req, res){

	var eduData = {
		qualification: req.body.qualification,
		institution: req.body.institution,
		city: req.body.city,
		country: req.body.country,
		startdate: moment(req.body.startdate).format('L'),
		enddate: moment(req.body.enddate).format('L')
	}

	CV.findById(req.body.id, function(err, theCV){
		console.log(theCV);
		if(err){
			console.log(err);
		} else {
			Education.create(eduData, function(err, newEducation){
				if(err){
					console.log(err);
				} else {
					theCV.education.push(newEducation);
					theCV.save();
					res.json({
						success: true,
						info: newEducation
					});
				}
			});
		}
	});
});



//GET Education
router.post('/getcveducation', function(req, res){
	CV.findById(req.body.id).populate('education').exec(function(err, theCV){
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


//EDIT Education
router.post('/editcveducation', function(req, res){
	var eduEditedData = {
		qualification: req.body.qualification,
		institution: req.body.institution,
		city: req.body.city,
		country: req.body.country,
		startdate: moment(req.body.startdate).format('L'),
		enddate: moment(req.body.enddate).format('L')
	}


	Education.findByIdAndUpdate(req.body.eduid, eduEditedData, {new: true}, function(err, editedEdu){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: editedEdu
			});
		}
	});
});


//DELETE Education
router.post('/deletecveducation', function(req, res){
	Education.findByIdAndRemove(req.body.eduid, function(err, deletedEducation){
		if(err){
			console.log(err);
		} else {
			deletedEducation.remove();
			res.json({success: true});
		}
	});
});


//Add Paper to Education
router.post('/cveducationpaper', function(req, res){
	Education.findById(req.body.eduid, function(err, theEducation){
		if(err){
			console.log(err);
		} else {
			EducationPaper.create({name: req.body.educationpaper}, function(err, newEduPaper){
				if(err){
					console.log(err);
				} else {
					theEducation.papers.push(newEduPaper);
					theEducation.save();
					res.json({
						success: true,
						info: newEduPaper
					});
				}
			});
		}
	})
});


//Get CV Education Paper
router.post('/getcveducationpaper', function(req, res){
	Education.findById(req.body.eduid).populate('papers').exec(function(err, theEducationPapers){
		if(err){
			console.log(err);
		} else {
			res.json({
				info: theEducationPapers
			});
		}
	});
});

//Edit Education Paper
router.post('/editeducationpaper', function(req, res){
	var updatedPaper = {
		name: req.body.updatedPaper
	};

	EducationPaper.findByIdAndUpdate(req.body.educationpaperid, updatedPaper, {new:true}, function(err, updatedPaper){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: updatedPaper
			});
		}
	});
});


//Delete Education Paper
router.post('/deletecveducationpaper', function(req, res){
	EducationPaper.findByIdAndRemove(req.body.educationpaperid, function(err, deletedEducationPaper){
		if(err){
			console.log(err);
		} else {
			deletedEducationPaper.remove();
			res.json({success: true});
		}
	});
});


//Add Education Achievements
router.post('/cveducationachievement', function(req, res){
	Education.findById(req.body.eduid, function(err, theEducation){
		if(err){
			console.log(err);
		} else {
			EducationAchievement.create({name: req.body.educationAchievement}, function(err, newEducationAchievement){
				if(err){
					console.log(err);
				} else {
					theEducation.achievements.push(newEducationAchievement);
					theEducation.save();
					res.json({
						success: true,
						info: newEducationAchievement
					});
				}
			});
		}
	});
});


//Get CV Education Achievement
router.post('/getcveducationachievement', function(req, res){
	Education.findById(req.body.eduid).populate('achievements').exec(function(err, theEducationAchievements){
		if(err){
			console.log(err);
		} else {
			res.json({
				info: theEducationAchievements
			});
		}
	});
});


//Edit CV Education Achievement
router.post('/editeducationachievement', function(req, res){
	EducationAchievement.findByIdAndUpdate(req.body.educationAchievement, {name: req.body.updatedEducationAchievement}, {new: true}, function(err, updatedEducationAchievement){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: updatedEducationAchievement
			});
		}
	});
});


//Delete CV Education Achievement
router.post('/deletecveducationachievement', function(req, res){
	EducationAchievement.findByIdAndRemove(req.body.educationAchievementID, function(err, deletedEducationAchievement){
		if(err){
			console.log(err);
		} else {
			deletedEducationAchievement.remove();
			res.json({success: true});
		}
	});
});


//Add CV Education Project
router.post('/cveducationproject', function(req, res){
	var eduProjData = {
		name: req.body.projectName,
		description: req.body.projectDescription
	}
	Education.findById(req.body.eduid, function(err, theEducation){
		if(err){
			console.log(err);
		} else {
			EducationProject.create(eduProjData, function(err, newEducationProject){
				if(err){
					console.log(err);
				} else {
					theEducation.projects.push(newEducationProject);
					theEducation.save();
					res.json({
						success: true,
						info: newEducationProject
					});
				}
			});
		}
	});
});


//GET CV education project
router.post('/getcveducationproject', function(req, res){
	Education.findById(req.body.eduid).populate('projects').exec(function(err, theEducationProjects){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: theEducationProjects
			});
		}
	});
});


//Edit CV education project
router.post('/editeducationproject', function(req, res){
	var eduProjData = {
		name: req.body.educationProjectName,
		description: req.body.educationProjectDescription
	}

	EducationProject.findByIdAndUpdate(req.body.educationProject, eduProjData, {new: true}, function(err, updatedEducationProject){
			if(err){
				console.log(err);
			} else {
				res.json({
					success: true,
					info: updatedEducationProject
				});
			}
	});
});


//Delete CV Education project
router.post('/deletecveducationproject', function(req, res){
	EducationProject.findByIdAndRemove(req.body.educationProjectID, function(err, deletedEducationProject){
		if(err){
			console.log(err);
		} else {
			deletedEducationProject.remove();
			res.json({success: true})
		}
	});
});



router.post('/cvskill', function(req, res){
	var skillData = {
		name: req.body.name,
		description: req.body.description
	}

	CV.findById(req.body.id, function(err, theCV){
		if(err){
			console.log(err);
		} else {
			Skill.create(skillData, function(err, newSkill){
				if(err){
					console.log(err);
				} else {
					theCV.skills.push(newSkill);
					theCV.save();
					res.json({
						success: true,
						info: newSkill
					});
				}
			});
		}
	});
});

router.post('/getcvskill', function(req, res){
	CV.findById(req.body.id).populate('skills').exec(function(err, theCV){
		if(err){
			console.log(err);
		} else {
			console.log(theCV);
			res.json({
				success: true,
				info: theCV
			});
		}
	});
});



module.exports = router;