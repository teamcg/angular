var app = angular.module('main');

app.service('personalInfoService', function($http, $localStorage){
    
    this.cvpi = function(address, phone, email, website, linkedin){
        var currentCV = $localStorage.currentcv;
        
        var CVpersonalinfo = {
            method: 'POST',
            url: 'http://localhost:3000/cvpersonalinfo',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV,
                firstname: $localStorage.studentFirstname,
                lastname: $localStorage.studentLastname,
                address: address,
                phone: phone,
                email: email,
                website: website,
                linkedin: linkedin
            }
        }
        
        return $http(CVpersonalinfo)
            .then(function(response){
                return true;
        });
    }
    
    
});