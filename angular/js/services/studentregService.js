var app = angular.module('main');

app.service("studentregService", function($http){
    console.log("Student Service Worked!");
    
    this.register = function(studentid, authcode, firstname, lastname, password, email){
                    console.log("student register inside service");
                    console.log(studentid + authcode + firstname + lastname + password + email);
                    
                    var req = {
                        method: 'POST',
                        url: 'https://edenzproj.herokuapp.com/register',
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
                            email: email
                        }
                    }
                    return $http(req)
                        .then(function(result){
                        console.log("service " + result.data);
                        return result.data;
            
                        }, function(error){
                            console.log(error);
                            return false;
                    });
                        
                 
   
        
    }
    
    
});
            