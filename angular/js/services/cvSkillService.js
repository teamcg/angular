var app = angular.module('main');

app.service('skillService', function($http, $localStorage){
   
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