var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var User = require('../app/models/users');
var CV = require('../app/models/cv');
var Experience = require('../app/models/experience');
var ExperienceResponsibilities = require('../app/models/experienceOptions/responsibilities');
var ExperienceAchievements = require('../app/models/experienceOptions/achievements');
var moment = require('moment');









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



//EXPERIENCE OPTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




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



// Edit experience responsibilities
router.post('/editcvexperienceresponsibilities', function(req, res){
    
    var expRespUpdated = {
        text: req.body.expRespText
    }       

    ExperienceResponsibilities.findByIdAndUpdate(req.body.expRespID, expRespUpdated, {new:true}, function(err, updatedExpResponsibilities){
        if(err){
            console.log(err);
        } else {
            res.json({
                sucess: true,
                info: updatedExpResponsibilities
            });
        }
    });
});


//Delete experience responsibilities

router.post('/deletecvexperienceresponsibilities', function(req, res){
    ExperienceResponsibilities.findByIdAndRemove(req.body.expRespID, function(err, deletedExpResponsibilities){
        if(err){
            console.log(err);
        } else {
            deletedExpResponsibilities.remove();
            res.json({
                sucess: true
            });
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


// Edit experience Achievement///////////////////

router.post('/editcvexperienceachievements', function(req, res){
    
    var expAchUpdated = {
        text: req.body.expAchText
    }       

    ExperienceAchievements.findByIdAndUpdate(req.body.expAchID, expAchUpdated, {new:true}, function(err, updatedExpAch){
        if(err){
            console.log(err);
        } else {
            res.json({
                sucess: true,
                info: updatedExpAch
            });
        }
    });
});



router.post('/deletecvexperienceachievements', function(req, res){
    ExperienceAchievements.findByIdAndRemove(req.body.expAchID, function(err, deletedExpAch){
        if(err){
            console.log(err);
        } else {
            deletedExpAch.remove();
            res.json({
                sucess: true
            });
        }
    });
});
///////Experience End/////////////////




module.exports = router