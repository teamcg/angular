var app = angular.module('main');

app.controller('SkillExampleController', function(skillExampleService, $location, $scope, $localStorage){
    
    $scope.exSkilCategory = '';
    $scope.skill = {
        name: '',
        description: '',
        category: ''
    }
    
    var showAllSkills = skillExampleService.showSkillExample(
    )
    .then(function(result){
        if(result){
            $scope.skillExampleData = $localStorage.skillExample;
        }

    });
    
    
    
    
    
    $scope.skillExample = {
        title: '',
        description: ''
    }
    
    $scope.exSkillSubmitButton = true;
    $scope.exSkillEditButton = false;
    
    this.open = function(){
        $location.path("/addskillexample");
    }
    
    
    this.submit = function(){

        var result = skillExampleService.addSkillExample($scope.skillExample.title, $scope.skillExample.description)
            .then(function(result){
                if(result){
                    $scope.skillExample = {
                        title: '',
                        description: ''
                    }
                    
                    $scope.skillExampleData = $localStorage.skillExample;
                    
                }

            });

    }
    
    
    $scope.editExampleSkill = function(){
        $scope.skillExample = {
            title: this.skill.title,
            description: this.skill.description
        }
        
        $localStorage.exampleSkillID = this.skill._id;
        
        $scope.exSkillSubmitButton = false;
        $scope.exSkillEditButton = true;
        
    }
    
    $scope.updateExampleSkill = function(){
        
        var result = skillExampleService.editSkillExample($scope.skillExample.title, $scope.skillExample.description)
            .then(function(result){
                if(result){
                     $scope.skillExampleData = $localStorage.skillExample;
                     $scope.exSkillSubmitButton = true;
                     $scope.exSkillEditButton = false;
                    
                    $scope.skillExample = {
                        title: '',
                        description: ''
                    }
                }
            });
    }
    
       $scope.deleteExampleSkill = function(){
       var skillExToBeDeleted = this;
           


        var result = skillExampleService.deleteSkillExample(skillExToBeDeleted.skill._id)
            .then(function(result){
                if(result){
                    $scope.skillExampleData = $localStorage.skillExample;
                }
            });

   }

       
       
       //New SKill
       
       $scope.showSkillCategory = function(){
//           console.log('hahhah');
//           
           var result = skillExampleService.getSkillCategory()
            .then(function(result){
                if(result){
                    $scope.showExSkillCategory = $localStorage.exskillcategory;
                }
            });
       }
       $scope.showSkillCategory();
    
        $scope.addSkillCategory = function(){
            
            var result = skillExampleService.addSkillCategory($scope.exSkillCategory)
                .then(function(result){
                    if(result){
                        $scope.showExSkillCategory = $localStorage.exskillcategory
                        $scope.exSkillCategory = '';
                    }
                })
        }
        
        
        $scope.addSkillNameDesc = function(){
            var result = skillExampleService.addSkillNameDesc($scope.skillCategory, $scope.skill.name, $scope.skill.desc)
                .then(function(result){
                    if(result){
                        console.log('Controller');
                        $scope.skill = {
                            name: '',
                            desc: ''
                        }
                    }
                })
        }
    
});