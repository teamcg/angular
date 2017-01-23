var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var User = require('../app/models/users');
var CV = require('../app/models/cv');
var Skill = require('../app/models/skill');
var SkillExample = require('../app/models/skillExample');
var moment = require('moment');



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


router.post('/editcvskill', function(req,res){
	var updatedSkillData = {
		name: req.body.name,
		description: req.body.description
	}

	console.log(updatedSkillData);

	Skill.findByIdAndUpdate(req.body.id, updatedSkillData, {new: true}, function(err, updatedSkill){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: updatedSkill
			});
		}
	});
});


router.post('/deletecvskill', function(req, res){
	Skill.findByIdAndRemove(req.body.id, function(err, deletedSkill){
		if(err){
			console.log(err);
		} else {
			deletedSkill.remove();
			res.json({sucess: true});
		}
	})
})



router.post('/addexampleskill', function(req, res){
	var SkillExData = {
		title: req.body.skillExTitle,
		description: req.body.skillExDescription
	}

	SkillExample.create(SkillExData, function(err, newExampleSkill){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: newExampleSkill
			});
		}
	});
});


router.get('/showexampleskill', function(req, res){
	SkillExample.find({}, function(err, theSkills){
		if(err){
			console.log(err);
		} else {
			res.json({
				info: theSkills
			});
		}
	});
});


router.post('/editexampleskill', function(req, res){

	var newSkillEx = {
		title: req.body.title,
		description: req.body.description
	}


	SkillExample.findByIdAndUpdate(req.body.id, newSkillEx, {new: true}, function(err, updatedSkillEx){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: updatedSkillEx
			});
		}
	});
});


router.post('/deleteexampleskill', function(req, res){
	SkillExample.findByIdAndRemove(req.body.id, function(err, deletedSkillExample){
		if(err){
			console.log(err);
		} else {
			res.json({success: true});
		}
	});
});

module.exports = router;