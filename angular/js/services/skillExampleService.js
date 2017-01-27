var app = angular.module('main');

app.service('skillExampleService', function($http, $localStorage){

    
    //New Skill
    
    this.getSkillCategory = function(){
        
        var skillCategory = {
            method: 'GET',
            url: 'http://localhost:3000/getexskillcategory',
            dataType: 'json',
            contentType: 'application/json',
        }
        
        return $http(skillCategory)
            .then(function(response){
                $localStorage.exskillcategory = response.data.info;
                return true;
        });
    }
    
    
    this.addSkillCategory = function(category){
        
        var addSkill = {
            method: 'POST',
            url: 'http://localhost:3000/addexskillcategory',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                skillcategory: category
            }
        }
        
        var getSkillCategory = {
            method: 'GET',
            url: 'http://localhost:3000/getexskillcategory',
            dataType: 'json',
            contentType: 'application/json',
        }
        
        
        return $http(addSkill)
            .then(function(response){
                return $http(getSkillCategory)
                    .then(function(response2){
                         $localStorage.exskillcategory = response2.data.info;
                         return true;                       
                });
        });
        
          }
    
        
        this.addSkillNameDesc = function(id, name, desc){
            
            var addSkill = {
                method: 'POST',
                url: 'http://localhost:3000/addexskillnamedesc',
                dataType: 'json',
                contentType: 'application/json',
                data: {
                    skillcategoryid: id,
                    skillname: name,
                    skilldescription: desc
                }
            }
            
        var getAllSkill = {
            method: 'GET',
            url: 'http://localhost:3000/getexskillcategory',
            dataType: 'json',
            contentType: 'application/json',
        }
            
            return $http(addSkill)
                .then(function(response){
                    return $http(getAllSkill)
                        .then(function(response2){
                         $localStorage.exskillcategory = response2.data.info;
                         return true;               
                    });
            });
        }
        
        
  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});