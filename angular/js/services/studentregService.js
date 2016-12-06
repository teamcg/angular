var app = angular.module('main');

app.service("studentregService", function($http){
    console.log("Student Service Worked!");
    
    this.register = function(studentid, authcode, firstname, lastname, password, email, linkedin, website, address, phone){
                    
                    var req = {
                        method: 'POST',
                        url: 'http://localhost:3000/register',
                        dataType: 'json',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        
                        data: {
                            studentid: studentid,
                            authcode: authcode,
                            firstname: firstname,
                            lastname: lastname,
                            password: password,
                            email: email,
                            linkedin: linkedin,
                            website: website,
                            address: address,
                            phone: phone
                        }
                    }
                    return $http(req)
                        .then(function(result){
                        console.log('Register Successfully!');
                        return result.data;
            
                        }, function(error){
                            console.log(error);
                            return false;
                    });
                        
                 
   
        
    }
    
    
});
            