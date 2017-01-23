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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});