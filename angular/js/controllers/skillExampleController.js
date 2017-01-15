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
                    
                    console.log($scope.skillExampleData);
                }

            });

    }
    
    
});