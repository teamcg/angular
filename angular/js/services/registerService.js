var app = angular.module('main');

app.service("registerService", function($http){
    console.log("Register Service Worked!");
    this.register = function(studentid,authcode){
        console.log("register inside service");
        var req = {
            method: 'POST',
            url: 'https://edenzproj.herokuapp.com/authreg',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                studentid: studentid,
                authkey: authcode
            }
        }
        return $http(req)
        .then(function(result){
            return result.data;
            
        }, function(error){
            console.log(error);
            return false;
        });
    }
})
            