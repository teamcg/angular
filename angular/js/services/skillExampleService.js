var app = angular.module('main');

app.service('skillExampleService', function($http, $localStorage){
    
    
    
    
    
    this.addSkillExample = function(title, description){
        
        var addSkill = {
            method: 'POST',
            url: 'http://localhost:3000/addexampleskill',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                skillExTitle: title,
                skillExDescription: description
            }
        }
        
        var showSkill = {
            method: 'GET',
            url: 'http://localhost:3000/showexampleskill',
            dataType: 'json',
            contentType: 'application/json'
        }
        
        
        return $http(addSkill)
            .then(function(response){
                return $http(showSkill)
                    .then(function(response2){
                        $localStorage.skillExample = response2.data.info;
                        return true;
                });
        });
    }
    
    this.showSkillExample = function(){
        
        var showSkill = {
            method: 'GET',
            url: 'http://localhost:3000/showexampleskill',
            dataType: 'json',
            contentType: 'application/json'
        }
        
        return $http(showSkill)
            .then(function(response){
                $localStorage.skillExample = response.data.info;
                return true;
        });
    }
    
    this.editSkillExample = function(title, description){
        
        var editSkill = {
            method: 'POST',
            url: 'http://localhost:3000/editexampleskill',
            dataType: 'json',
            contentType: 'applicaiton/json',
            data: {
                id: $localStorage.exampleSkillID,
                title: title,
                description: description
            }
        }
        
        var showSkill = {
            method: 'GET',
            url: 'http://localhost:3000/showexampleskill',
            dataType: 'json',
            contentType: 'application/json'
        }
        
        
        return $http(editSkill)
            .then(function(response){
                return $http(showSkill)
                    .then(function(response2){
                        $localStorage.skillExample = response2.data.info;
                        return true;
                });
        });
    }
    
    
    this.deleteSkillExample = function(id){
        
        var deleteSkillEx = {
            method: 'POST',
            url: 'http://localhost:3000/deleteexampleskill',
            dataType: 'json',
            contenType: 'application/json',
            data: {
                id: id
            }
        }
        
        var showSkill = {
            method: 'GET',
            url: 'http://localhost:3000/showexampleskill',
            dataType: 'json',
            contentType: 'application/json'
        }
        
        return $http(deleteSkillEx)
            .then(function(response){
                return $http(showSkill)
                    .then(function(response2){
                        $localStorage.skillExample = response2.data.info;
                        return true;
                });
        });
        
        
    }
    
    
    
    
    
    
    
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
                })
        })
        
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
            
            return $http(addSkill)
                .then(function(response){
                return true;
            });
        }
        
        
  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});