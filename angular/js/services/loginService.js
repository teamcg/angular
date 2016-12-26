angular.module("main").service("loginService", function($http, $localStorage){


    
    this.login = function(user, pass){
		
		var req = {
		 method: 'POST',
		 url: 'http://localhost:3000/authenticate',
		 dataType: 'json',
		 headers: {
		   'Content-Type': 'application/json'
		 },
		 data: { 
                studentid: user,
		 		password: pass 
		 		}
		}
        
		

		return $http(req)
			.then(function(response) {
                if(response.data.success){
                    console.log(response.data.data);
                    $localStorage.studentID = response.data.data._id;
                    $localStorage.studentFirstname = response.data.data.firstname;
                    $localStorage.studentLastname = response.data.data.lastname;
                    $localStorage.studentAddress = response.data.data.address;
                    $localStorage.studentEmail = response.data.data.email;
                    $localStorage.studentPhone = response.data.data.phone;
                    $localStorage.studentLinkedin = response.data.data.linkedin;
                    $localStorage.studentWebsite = response.data.data.website;
                    $localStorage.token = response.data.token;
		            return true;
                } else if(!response.data.success){
                    return false;
                }
		    }, function(response) {
		        console.log("Error trying to log in.");
		        return false;
		    });

	}

    
 
//MY PROFILE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.profileUpdate = function(address, email, phone, linkedin, website){
        var updatedProfile = {
            method: 'POST',
            url: 'http://localhost:3000/updatemyprofile',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: $localStorage.studentID,
                address: address,
                email: email,
                phone: phone,
                linkedin: linkedin,
                website: website
            }
        }
        
        return $http(updatedProfile)
            .then(function(response){
            console.log(response.data);
            $localStorage.studentAddress = response.data.info.address;
            $localStorage.studentEmail = response.data.info.email;
            $localStorage.studentPhone = response.data.info.phone;
            $localStorage.studentLinkedin = response.data.info.linkedin;
            $localStorage.studentWebsite = response.data.info.website;
            return response.data.success;
        }, function(error){
            return response.data.success;
            console.log('ERROR on Update Profile');
        });
        
    }

    
    
    
    
    
//CV NAME~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.cvname = function(cvname){
        
        
        var CVname = {
            method: 'POST',
            url: 'http://localhost:3000/cvname',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: $localStorage.studentID,
                cvname: cvname
            }
        }
        
        return $http(CVname)
            .then(function(response){
            $localStorage.currentcv = response.data.info._id;
            return true
        }, function(response){
            console.log('Error creating CV');
            return false
        });
    }

    
    
//PERSONAL INFO~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    this.cvpi = function(address, phone, email, website, linkedin){
        var currentCV = $localStorage.currentcv;
        
        var CVpersonalinfo = {
            method: 'POST',
            url: 'http://localhost:3000/cvpersonalinfo',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV,
                firstname: $localStorage.studentFirstname,
                lastname: $localStorage.studentLastname,
                address: address,
                phone: phone,
                email: email,
                website: website,
                linkedin: linkedin
            }
        }
        
        return $http(CVpersonalinfo)
            .then(function(response){
                console.log('SERVICE!!!');
                return true;
        });
    }
    
//PERSONAL STATEMENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.cvps = function(personalStatement){
        var currentCV = $localStorage.currentcv;
        
        var CVpersonalstatement = {
            method: 'POST',
            url: 'http://localhost:3000/cvpersonalstatement',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV,
                personalStatement: personalStatement
            }
        }
        
        return $http(CVpersonalstatement)
            .then(function(response){
                console.log(response.data);
                return true;
        });
        
    }
    
    
//EXPERIENCE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
    this.cvexp = function(role, company, companydesc, city, country, startdate, enddate){
        var currentCV = $localStorage.currentcv;
        
        var CVexperience = {
            method: 'POST',
            url: 'http://localhost:3000/cvexperience',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV,
                role: role,
                company: company,
                companydesc: companydesc,
                city: city,
                country: country,
                startdate: startdate,
                enddate: enddate
            }
        }
        
        var cvUpdateExp = {
            method: 'POST',
            url: 'http://localhost:3000/getcvexperience',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV
            }
        }
        
        return $http(CVexperience)
            .then(function(response){
                return $http(cvUpdateExp)
                    .then(function(response2){
                        $localStorage.cvexperience = response2.data.info.experience;
                        return true;
            }, function(error2){
                    console.log('update EXP erro!');
                    return false;
                });
        }, function(error){
            console.log('EXPERIENCE error');
            return false;
        });
    }
    
    
//EDIT EXPERIENCE
    this.cvEditExperience = function(role, company, companydesc, city, country, startdate, enddate){
        var currentCV = $localStorage.currentcv;
        var experienceID = $localStorage.editexperienceid;
        
        var editExperience = {
            method: 'POST',
            url: 'http://localhost:3000/editcvexperience',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                expid: experienceID,
                role: role,
                company: company,
                companydesc: companydesc,
                city: city,
                country: country,
                startdate: startdate,
                enddate: enddate
            }
        }
        
        var cvUpdateExp = {
            method: 'POST',
            url: 'http://localhost:3000/getcvexperience',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV
            }
        }
        
        return $http(editExperience)
            .then(function(response){
                return $http(cvUpdateExp)
                    .then(function(response2){
                        $localStorage.cvexperience = response2.data.info.experience;
                        return true;
                }, function(error2){
                    console.log(error2);
                    return false;
                });
        }, function(error){
            console.log(error);
            return false;
        });
        
        
        
    }
    
    this.cvDeleteExperience = function(){
        var currentCV = $localStorage.currentcv;
        var experienceID = $localStorage.experienceid;
        
        var cvDeleteExperience = {
            method: 'POST',
            url: 'http://localhost:3000/deletecvexperience',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV,
                expid: experienceID
            }
        }
        
        var cvUpdateExp = {
            method: 'POST',
            url: 'http://localhost:3000/getcvexperience',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV
            }
        }
        
        return $http(cvDeleteExperience)
            .then(function(response){
                return $http(cvUpdateExp)
                    .then(function(response2){
                        $localStorage.cvexperience = response2.data.info.experience;
                        return true;
                }, function(error2){
                    console.log('ERROR DELETING EXP');
                    return false;
                });
        }, function(error){
            console.log('ERROR DELETING EXP 2');
            return false;
        });
    }
    

    
//EDUCATION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    
    
    //Add Education
    this.cvedu = function(qualification, institution, city, country, startdate, enddate){
        var currentCV = $localStorage.currentcv;
        
        var CVeducation = {
            method: 'POST',
            url: 'http://localhost:3000/cveducation',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV,
                qualification: qualification,
                institution: institution,
                city: city,
                country: country,
                startdate: startdate,
                enddate: enddate
            }
        }
        
        var cvUpdateEducation = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducation',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV
            }
        }
        
        return $http(CVeducation)
            .then(function(response){
            return $http(cvUpdateEducation)
                .then(function(response2){
                $localStorage.cveducation = response2.data.info.education;
                return true;
            }, function(error2){
                console.log(error2);
                return false;
            });
        
        }, function(err){
            console.log(err);
            return false;
        
        });
    
    
    }
    
    
    //Edit Education
    this.cvEditEducation = function(qualification, institution, city, country, startdate, enddate){
        var currentCV = $localStorage.currentcv;
        var educationID = $localStorage.editeducationid;
        
        var editEducation = {
            method: 'POST',
            url: 'http://localhost:3000/editcveducation',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: educationID,
                qualification: qualification,
                institution: institution,
                city: city,
                country: country,
                startdate: startdate,
                enddate: enddate
            }
        }
        
        var cvUpdateEducation = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducation',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV
            }
        }
        
        
        return $http(editEducation)
            .then(function(response){
                return $http(cvUpdateEducation)
                    .then(function(response2){
                        $localStorage.cveducation = response2.data.info.education;
                        return true;
                }, function(error2){
                    console.log('ERROR EDIT EDU');
                    return false;
                });
        }, function(error){
            console.log('ERROR1 EDIT EDU');
            return false;
        });
        
        
    }
    
    //Delete Education
    this.cvDeleteEducation = function(){
        var currentCV = $localStorage.currentcv;
        var educationID = $localStorage.deleteeducationid;
        
        var deleteEducation = {
            method: 'POST',
            url: 'http://localhost:3000/deletecveducation',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.deleteeducationid
            }
        }
        
        var cvUpdateEducation = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducation',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV
            }
        }
        
        return $http(deleteEducation)
            .then(function(response){
                return $http(cvUpdateEducation)
                    .then(function(response2){
                        $localStorage.cveducation = response2.data.info.education;
                        return true;
                }, function(error2){
                    console.log(error2);
                    return false;
                });
        }, function(error){
            console.log(error);
            return false;
        });
    }
    
    
   //Add Paper to education
    this.cvAddEducationPaper = function(name){
        var CVeducationpaper = {
            method: 'POST',
            url: 'http://localhost:3000/cveducationpaper',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID,
                educationpaper: name
            }
        }
        
        var getEducationPaper = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducationpaper',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID
            }
        }
        
        
        return $http(CVeducationpaper)
            .then(function(response){
                return $http(getEducationPaper)
                    .then(function(response2){
                    $localStorage.cvEducationPapers = response2.data.info.papers;
                    return true;
                });
        });
    }
    
    
    //Add Achievements in Education
    this.cvAddEducationAchievement = function(name){
        var cvEducationAchievement = {
            method: 'POST',
            url: 'http://localhost:3000/cveducationachievement',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID,
                educationAchievement: name
            }
        }
        
        var getEducationAchievement = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducationachievement',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID
            }
        }
        
        
        return $http(cvEducationAchievement)
            .then(function(response){
                return $http(getEducationAchievement)
                    .then(function(response2){
                        $localStorage.cvEducationAchievements = response2.data.info.achievements;
                        return true;
                });
        });
    }
    
    
    //Add Project in Education
    this.cvAddEducationProject = function(name, description){
        var addEducationProject = {
            method: 'POST',
            url: 'http://localhost:3000/cveducationproject',
            dataType:'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID,
                projectName: name,
                projectDescription: description
            }
        }
        
        var getEducationProject = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducationproject',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID
            }
        }
        
        return $http(addEducationProject)
            .then(function(response){
                return $http(getEducationProject)
                    .then(function(response2){
                        $localStorage.cvEducationProjects = response2.data.info.projects;
                        return true;
                });
        });
    }
    
    
    this.cvGetEducationPaper = function(){
        
        var getEducationPaper = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducationpaper',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID
            }
        }
        
        return $http(getEducationPaper)
            .then(function(response){
                $localStorage.cvEducationPapers = response.data.info.papers;
                return true;
        }); 
    }
    
    this.cvGetEducationAchievement = function(){
        
        var getEducationAchievement = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducationachievement',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID
            }
        }
        
        return $http(getEducationAchievement)
            .then(function(response){
                $localStorage.cvEducationAchievements = response.data.info.achievements;
                return true;
        });
    }
    
    
    this.cvGetEducationProject = function(){
        
        var getEducationProject = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducationproject',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID
            }
        }
        
        return $http(getEducationProject)
            .then(function(response){
                $localStorage.cvEducationProjects = response.data.info.projects;
                return true;
        });
    }
    
    //Edit Education Paper
    
    this.cvEditEducationPaper = function(papername){
        
        var editEducationPaper = {
            method: 'POST',
            url: 'http://localhost:3000/editeducationpaper',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                educationpaperid: $localStorage.paperInEducationID,
                updatedPaper: papername
            }
        }
        
        var getEducationPaper = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducationpaper',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID 
            }
        }
        
        return $http(editEducationPaper)
            .then(function(response){
                return $http(getEducationPaper)
                    .then(function(response2){
                        console.log('Paper service');
                        $localStorage.cvEducationPapers = response2.data.info.papers;
                        return true;
                });
        });
    }
    
    //Edit Education Achievement
    this.cvEditEducationAchievement = function(name){
        
        var editEducationAchievement = {
            method: 'POST',
            url: 'http://localhost:3000/editeducationachievement',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                educationAchievement: $localStorage.achievementInEducationID,
                updatedEducationAchievement: name
            }
        }
        
        var getEducationAchievement = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducationachievement',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID
            }
        }
        
        return $http(editEducationAchievement)
            .then(function(response){
                return $http(getEducationAchievement)
                    .then(function(response2){
                        $localStorage.cvEducationAchievements = response2.data.info.achievements;
                        return true;
                });
        });
    }
    
    
    //Edit Education Project
    this.cvEditEducationProject = function(name, description){
        var editEducationProject = {
            method: 'POST',
            url: 'http://localhost:3000/editeducationproject',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                educationProject: $localStorage.projectInEducationID,
                educationProjectName: name,
                educationProjectDescription: description
            }
        }
        
        var getEducationProject = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducationproject',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID
            }
        }
        
        return $http(editEducationProject)
            .then(function(response){
                return $http(getEducationProject)
                    .then(function(response2){
                        $localStorage.cvEducationProjects = response2.data.info.projects;
                        return true;
                });
        });
    }
    
    
    //Delete Education Paper
    this.cvDeleteEducationPaper = function(){
        var deleteEducationPaper = {
            method: 'POST',
            url: 'http://localhost:3000/deletecveducationpaper',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                educationpaperid: $localStorage.paperInEducationID 
            }
        }
        
        var getEducationPaper = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducationpaper',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID
            }
        }
        
        return $http(deleteEducationPaper)
            .then(function(response){
                return $http(getEducationPaper)
                    .then(function(response2){
                        console.log(response2);
                        $localStorage.cvEducationPapers = response2.data.info.papers;
                        return true;
                });        
        });
    }
    
    
    //Delete Education Project
    this.cvDeleteEducationProject = function(){
        var deleteEducationProject = {
            method: 'POST',
            url: 'http://localhost:3000/deletecveducationproject',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                educationProjectID: $localStorage.projectInEducationID
            }
        }
        
        var getEducationProject = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducationproject',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID
            }
        }
        
        return $http(deleteEducationProject)
            .then(function(response){
                return $http(getEducationProject)
                    .then(function(response2){
                        $localStorage.cvEducationProjects = response2.data.info.projects;
                        return true;
                });
        });
    }
    
    
    //Delete Education Achievement
    this.cvDeleteEducationAchievement = function(){
        var deleteEducationAchievement = {
            method: 'POST',
            url: 'http://localhost:3000/deletecveducationachievement',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                educationAchievementID: $localStorage.achievementInEducationID
            }
        }
        
        var getEducationAchievement = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducationachievement',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                eduid: $localStorage.educationID
            }
        }
        
        return $http(deleteEducationAchievement)
            .then(function(response){
                return $http(getEducationAchievement)
                    .then(function(response2){
                        $localStorage.cvEducationAchievements = response2.data.info.achievements;
                        return true;
                });
        });
        
    }
    
    
    
    
    this.cvskills = function(name, description){
       var currentCV = $localStorage.currentcv;
        
        var CVskill = {
            method: 'POST',
            url: 'http://localhost:3000/cvskill',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV,
                name: name,
                description: description
            }
        }
        
        var cvUpdateSkill = {
            method: 'POST',
            url: 'http://localhost:3000/getcvskill',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV
            }
        }
        
        return $http(CVskill)
            .then(function(response){
                console.log(response);
                return $http(cvUpdateSkill)
                    .then(function(response2){
                    console.log(response2.data.info.skills);
                    $localStorage.cvskill = response2.data.info.skills;
                     return true;
                }, function(error2){
                    console.log(error2);
                   return false;
                });
        }, function(error){
            console.log(error);
            return false;
        });
    }
        
    
});