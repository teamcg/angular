var app = angular.module('main');

app.service("registerService", function($http){
    this.register = function(studentid, authcode){
        var req = {
            method: 'POST',
            url: 'http://localhost:3000/authreg',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                studentid: studentid,
                authcode: authcode
            }
        }
        return $http(req)
        .then(function(result){
            if(!result.data.success){
                return false;
            } else if(result.data.success){
                return true;
            }
            
        }, function(error){
            console.log(error);
            return false;
        });
    }
})
            