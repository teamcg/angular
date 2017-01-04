var app = angular.module('main');

app.service('cvNameService', function($http, $localStorage){
    
        this.cvname = function(cvname){
        
        
        var CVname = {
            method: 'POST',
            url: 'http://localhost:3000/cvname',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: $localStorage.studentID,
                cvname: cvname
            }
        }
        
        return $http(CVname)
            .then(function(response){
            $localStorage.currentcv = response.data.info._id;
            return true
        }, function(response){
            console.log('Error creating CV');
            return false
        });
    }
    
    
});