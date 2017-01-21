var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var User = require('../app/models/users');
var CV = require('../app/models/cv');
var Education = require('../app/models/education');
var EducationPaper = require('../app/models/educationOptions/papers');
var EducationAchievement = require('../app/models/educationOptions/achievements');
var EducationProject = require('../app/models/educationOptions/projects');
var moment = require('moment');




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
// router.post('/getcveducation', function(req, res){
// 	CV.findById(req.body.id).populate('education').exec(function(err, theCV){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			res.json({
// 				success: true,
// 				info: theCV
// 			});
// 		}
// 	});
// });





router.post('/getcveducation', function(req,res){
	CV.findById(req.body.id)
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
		.exec(function(err, theCV){
			if(err){
				console.log(err);
			} else {
				res.json({
					success: true,
					info: theCV
				});
			}
		})
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

module.exports = router;