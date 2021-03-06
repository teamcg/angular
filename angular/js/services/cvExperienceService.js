var app = angular.module('main');

app.service('experienceService', function($http, $localStorage){
    
    
//Add Experience
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
    
    this.addExperienceResponsibilities = function(text){
        var addExpResp = {
            method: 'POST',
            url: 'http://localhost:3000/addcvexperienceresponsibilities',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                expid: $localStorage.experienceID,
                expResponsibilities: text
            }
        }
        
        var getExpResp = {
            method: 'POST',
            url: 'http://localhost:3000/getcvexperienceresponsibilities',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                expid: $localStorage.experienceID
            }
        }
        
        return $http(addExpResp)
            .then(function(response){
                return $http(getExpResp)
                    .then(function(response2){
                        $localStorage.experienceResponsibilities = response2.data.info.responsibilities;
                        return true;
                });
        });
    }
    
    
    this.getExperienceResponsibilities = function(){
        
        var getExpResp = {
            method: 'POST',
            url: 'http://localhost:3000/getcvexperienceresponsibilities',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                expid: $localStorage.experienceID
            }
        }
        
        return $http(getExpResp)
            .then(function(response){
                $localStorage.experienceResponsibilities = response.data.info.responsibilities;
                return true;
        });
    }
    
    
    // Edit experience responsibilities
    
    
   this.cvEditExperienceResponsibilities = function(text){
        
       var editExpResp = {
           method: 'POST',
           url: 'http://localhost:3000/editcvexperienceresponsibilities',
           dataType: 'json',
           data: {
               expRespID: $localStorage.expRespID,
               expRespText: text
           }
       }
       
        var getExpResp = {
            method: 'POST',
            url: 'http://localhost:3000/getcvexperienceresponsibilities',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                expid:  $localStorage.experienceID
            }
        }
        
        
        return $http(editExpResp)
            .then(function(response){
                return $http(getExpResp)
                    .then(function(response2){
                        $localStorage.cvExperienceResponsibilities = response2.data.info.responsibilities; 
                        return true;
                });
        });
       
   }
   
   //Delete expereience Responsibilities
   
   
   
    this.cvDeleteExperienceResponsibilities = function(id){
       
       var deleteExpResp = {
           method: 'POST',
           url: 'http://localhost:3000/deletecvexperienceresponsibilities',
           dataType: 'json',
           contentType: 'application/json',
           data: {
               expRespID: id
           }
       }
       
        var getExpResp = {
            method: 'POST',
            url: 'http://localhost:3000/getcvexperienceresponsibilities',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                expid:  $localStorage.experienceID
            }
        }
        
        
        return $http(deleteExpResp)
            .then(function(response){
                return $http(getExpResp)
                    .then(function(response2){
                        //console.log(responsea2.data);
                        $localStorage.cvExperienceResponsibilities = response2.data.info.responsibilities; 
                        return true;
                });
        });
   }
    
    this.addExperienceAchievements = function(text){
        var addExpAch = {
            method: 'POST',
            url: 'http://localhost:3000/addcvexperienceachievements',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                expid:  $localStorage.experienceID,
                expAchievements: text
            }
        }
        
        
        var getExpAch = {
            method: 'POST',
            url: 'http://localhost:3000/getcvexperienceachievements',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                expid:  $localStorage.experienceID
            }
        }
        
        
        return $http(addExpAch)
            .then(function(response){
                return $http(getExpAch)
                    .then(function(response2){
                        $localStorage.experienceAchievements = response2.data.info.achievements;
                        return true;
                });
        });
    }
      
    
    this.getExperienceAchievements = function(){
        
        var getExpAch = {
            method: 'POST',
            url: 'http://localhost:3000/getcvexperienceachievements',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                expid:  $localStorage.experienceID
            }
        }
        
        return $http(getExpAch)
            .then(function(response){
                $localStorage.experienceAchievements = response.data.info.achievements;
                return true;
        });
    }
    
    
    
    
   this.cvEditExperienceAchievements = function(text){
        
       var editExpAch = {
           method: 'POST',
           url: 'http://localhost:3000/editcvexperienceachievements',
           dataType: 'json',
           data: {
               expAchID: $localStorage.expAchievementID,
               expAchText: text
           }
       }
       
        var getExpAch = {
            method: 'POST',
            url: 'http://localhost:3000/getcvexperienceachievements',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                expid:  $localStorage.experienceID
            }
        }
        
        
        return $http(editExpAch)
            .then(function(response){
                return $http(getExpAch)
                    .then(function(response2){
                        //console.log(responsea2.data);
                        $localStorage.cvExperienceAchievements = response2.data.info.achievements; 
                        return true;
                })
        })
       
   }
   
   
   this.cvDeleteExperienceAchievements = function(id){
       
       var deleteExpAch = {
           method: 'POST',
           url: 'http://localhost:3000/deletecvexperienceachievements',
           dataType: 'json',
           contentType: 'application/json',
           data: {
               expAchID: id
           }
       }
       
        var getExpAch = {
            method: 'POST',
            url: 'http://localhost:3000/getcvexperienceachievements',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                expid:  $localStorage.experienceID
            }
        }
        
        return $http(deleteExpAch)
            .then(function(response){
                return $http(getExpAch)
                    .then(function(response2){
                         $localStorage.cvExperienceAchievements = response2.data.info.achievements; 
                         return true;
                });
        });
   }
   
   
});