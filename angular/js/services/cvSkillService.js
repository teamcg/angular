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
                return $http(cvUpdateSkill)
                    .then(function(response2){
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
     
     
     this.editcvskill = function(name, description){
         
         var editSkill = {
             method: 'POST',
             url: 'http://localhost:3000/editcvskill',
             dataType: 'json',
             contentType: 'application/json',
             data: {
                 id: $localStorage.skillID,
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
                id: $localStorage.currentcv
            }
        }
         
         return $http(editSkill)
            .then(function(response){
                return $http(cvUpdateSkill)
                    .then(function(response2){
                        $localStorage.cvskill = response2.data.info.skills;
                        return true;
                });
         });
         
     }
     
     
     this.deletecvskill = function(id){
         
         var deleteSkill = {
             method: 'POST',
             url: 'http://localhost:3000/deletecvskill',
             dataType: 'json',
             contentType: 'application/json',
             data: {
                 id: id
             }
         }
         
         var cvUpdateSkill = {
            method: 'POST',
            url: 'http://localhost:3000/getcvskill',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: $localStorage.currentcv
            }
        }
         
         return $http(deleteSkill)
            .then(function(response){
                return $http(cvUpdateSkill)
                    .then(function(response2){
                        $localStorage.cvskill = response2.data.info.skills;
                        return true;
                });
         });
         
     }
    
});