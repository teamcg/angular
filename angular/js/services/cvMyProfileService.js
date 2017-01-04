var app = angular.module('main');

app.service('myProfileService', function($http, $localStorage){
   
        this.profileUpdate = function(address, email, phone, linkedin, website){
        var updatedProfile = {
            method: 'POST',
            url: 'http://localhost:3000/updatemyprofile',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: $localStorage.studentID,
                address: address,
                email: email,
                phone: phone,
                linkedin: linkedin,
                website: website
            }
        }
        
        return $http(updatedProfile)
            .then(function(response){
            $localStorage.studentAddress = response.data.info.address;
            $localStorage.studentEmail = response.data.info.email;
            $localStorage.studentPhone = response.data.info.phone;
            $localStorage.studentLinkedin = response.data.info.linkedin;
            $localStorage.studentWebsite = response.data.info.website;
            return response.data.success;
        }, function(error){
            return response.data.success;
            console.log('ERROR on Update Profile');
        });
        
    }
    
    
    
    
    
    
    
});