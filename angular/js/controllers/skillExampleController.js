var app = angular.module('main');

app.controller('SkillExampleController', function(skillExampleService, $location, $scope, $localStorage){
        $('.ui.accordion')
            .accordion()
        ;
    $scope.exSkilCategory = '';
    $scope.skill = {
        name: '',
        description: '',
        category: ''
    }
    
    this.open = function(){
        $location.path("/addskillexample");
    }
    
    
       
       
       //New SKill
       
       $scope.showSkillCategory = function(){
        
           var result = skillExampleService.getSkillCategory()
            .then(function(result){
                if(result){
                    $scope.showExSkillCategory = $localStorage.exskillcategory;
                }
            });
       }
       // $scope.showSkillCategory();
    
        $scope.addSkillCategory = function(){
            
            var result = skillExampleService.addSkillCategory($scope.exSkillCategory)
                .then(function(result){
                    if(result){
                        $scope.showExSkillCategory = $localStorage.exskillcategory
                        $scope.exSkillCategory = '';
                    }
                });
        }
        
        
        $scope.addSkillNameDesc = function(){
            var result = skillExampleService.addSkillNameDesc($scope.skillCategory, $scope.skill.name, $scope.skill.desc)
                .then(function(result){
                    if(result){
                        $scope.showExSkillCategory = $localStorage.exskillcategory
                        $scope.skill = {
                            name: '',
                            desc: ''
                        }
                    }
                })
        }
        
        
    
});