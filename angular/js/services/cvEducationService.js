var app = angular.module('main');

app.service('educationService', function($http, $localStorage){
  
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
    
    
});