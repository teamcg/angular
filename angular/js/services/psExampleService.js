var app = angular.module('main');

app.service('PSExampleService', function($http, $localStorage){
    
    this.addPS = function(text){
        var addPSExample = {
            method: 'POST',
            url: 'http://localhost:3000/addpersonalstatementexample',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                pstext: text
            }
        }
        
        var getPSExample = {
            method: 'GET',
            url: 'http://localhost:3000/getpersonalstatementexample',
            dataType: 'json',
            contentType: 'application/json'
        }
        
        return $http(addPSExample)
            .then(function(response){
                if(response.data.success){
                    return $http(getPSExample)
                        .then(function(response2){
                            $localStorage.psexample = response2.data.info;
                            return true;
                    });
                } else {
                    console.log('PSExample Service Error');
                    return false;
                }
        });
    }
    

    
    
    
    
    
    
    
}); //End Service

