var app = angular.module('main');

app.service('personalInfoService', function($http, $localStorage){
    
    this.cvpi = function(address, phone, email, website, linkedin, visastatus, driverlicence, interests){
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
                linkedin: linkedin,
                visastatus: visastatus,
                driverlicence: driverlicence,
                interest: interests
            }
        }
        
        return $http(CVpersonalinfo)
            .then(function(response){
                return true;
        });
    }
    
    
});