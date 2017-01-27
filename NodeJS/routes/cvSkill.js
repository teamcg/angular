var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var User = require('../app/models/users');
var CV = require('../app/models/cv');
var Skill = require('../app/models/skill');
var SkillExample = require('../app/models/ExampleSkill/skillExample');
var SkillExampleNameDesc = require('../app/models/ExampleSkill/exSkill');
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








//Skill Example


router.get('/getexskillcategory', function(req, res){
	SkillExample.find().populate('skill').exec(function(err, theSkill){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: theSkill
			});
		}
	});
});


router.post('/addexskillcategory', function(req, res){
	SkillExample.create({category: req.body.skillcategory}, function(err, exSkillCategory){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: exSkillCategory
			});
		}
	});
});

router.post('/addexskillnamedesc', function(req, res){
	SkillExample.findById(req.body.skillcategoryid, function(err, exSkillCategory){
		if(err){
			console.log(err);
		} else {
			var skillNameDesc = {
				name: req.body.skillname,
				description: req.body.skilldescription
			}

			SkillExampleNameDesc.create(skillNameDesc, function(err, exSkill){
				if(err){
					console.log(err);
				} else {
					exSkillCategory.skill.push(exSkill);
					exSkillCategory.save();
					res.json({
						success: true,
						info: exSkill
					});
				}
			});
		}
	});
});











module.exports = router;