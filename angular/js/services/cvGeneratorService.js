var app = angular.module('main');

app.service('cvGenService', function($http, $localStorage){
    
    
    
    
    this.getCV = function(){
        
        var cvGet = {
            method: 'POST',
            url: 'http://localhost:3000/studentfile',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                folder: $localStorage.studentFolder
            }
        }
        
        return $http(cvGet)
            .then(function(response){
                console.log(response.data);
                return true;
        });
    }
    
    
    
    
    
    
    
    
})