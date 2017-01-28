var app = angular.module('main');

app.controller('PSExampleController', function(PSExampleService, $location, $localStorage, $scope){
    

    $scope.open = function(){
        $location.path('/addpsexample')
    }
    
    
    $scope.submitPS = function(){

        var result = PSExampleService.addPS($scope.exPersonalStatement)
            .then(function(result){
                if(result){
                    $scope.showExPS = $localStorage.psexample;
                }
            });
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}); //End Controller