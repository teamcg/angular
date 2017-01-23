var app = angular.module('main');

app.controller('SkillExampleController', function(skillExampleService, $location, $scope, $localStorage){
    
    
    
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

    
    
});