var app = angular.module('main');

app.controller('PSExampleController', function(PSExampleService, $location, $localStorage, $scope, $timeout){
    

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
    

    $scope.showPS = function(){
        $timeout(function(){
            var result = PSExampleService.getPS()
            .then(function(result){
                if(result){
                    console.log('success');
                    $scope.showExPS = $localStorage.psexample;  
                } else {
                    console.log('Getting PS Example error Controller');
                }
            });
        }, 1500);
        
    }

    $scope.showw = function(){
        var result = PSExampleService.getPS()
            .then(function(result){
                if(result){
                    console.log('success');
                    $scope.showExPS = $localStorage.psexample;  
                } else {
                    console.log('Getting PS Example error Controller');
                }
            });
    }

    $scope.showw();


    
    
    
    
    
    
    
    
    
    
    
}); //End Controller