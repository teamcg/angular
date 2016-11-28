var app = angular.module('main');

app.service('genauthkeyService', function($http){
    console.log('SERVICE WORKED!');
    this.generate = function(studentid){
        console.log('Inside SERVICE FUNCTION');
        console.log(studentid);
        var req = {
            method: 'POST',
            url: 'https://edenzproj.herokuapp.com/getkey',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                studentid: studentid
            }
        }
        
        return $http(req)
        .then(function(result){
            

            return result.data;
            
        }, function(error){
            console.log(error);
            return false
        });
        
        
    }
    
    
    
})