var app = angular.module('main');

app.service('personalStatementService', function($http, $localStorage){

    
     this.cvps = function(personalStatement){
        var currentCV = $localStorage.currentcv;
        
        var CVpersonalstatement = {
            method: 'POST',
            url: 'http://localhost:3000/cvpersonalstatement',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV,
                personalStatement: personalStatement
            }
        }
        
        return $http(CVpersonalstatement)
            .then(function(response){
                return true;
        });
        
    }

    
    
    
    
    
});