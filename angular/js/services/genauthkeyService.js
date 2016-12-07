var app = angular.module('main');

app.service('genauthkeyService', function($http, $localStorage){
    console.log('SERVICE WORKED!');
    this.generate = function(studentid){
        console.log('Inside SERVICE FUNCTION');
        console.log(studentid);
        var req = {
            method: 'POST',
            url: 'http://localhost:3000/getkey',
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
            if(!result.data.success){
                return false;
            } else if(result.data.success){
                $localStorage.authcode = result.data.authcode;
                return true;
            }
            
        }, function(error){
            console.log(error);
            return false
        });
        
        
    }
    
    
    
})