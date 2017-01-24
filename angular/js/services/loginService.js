angular.module("main").service("loginService", function($http, $localStorage){


    
    this.login = function(user, pass){
		
		var req = {
		 method: 'POST',
		 url: 'http://localhost:3000/authenticate',
		 dataType: 'json',
		 headers: {
		   'Content-Type': 'application/json'
		 },
		 data: { 
                studentid: user,
		 		password: pass 
		 		}
		}
        
		

		return $http(req)
			.then(function(response) {
                if(response.data.success){
                    $localStorage.studentID = response.data.data._id;
                    $localStorage.studentFirstname = response.data.data.firstname;
                    $localStorage.studentLastname = response.data.data.lastname;
                    $localStorage.studentAddress = response.data.data.address;
                    $localStorage.studentEmail = response.data.data.email;
                    $localStorage.studentPhone = response.data.data.phone;
                    $localStorage.studentLinkedin = response.data.data.linkedin;
                    $localStorage.studentWebsite = response.data.data.website;
                    $localStorage.studentFolder = response.data.data.folder;
                    $localStorage.token = response.data.token;
		            return true;
                } else if(!response.data.success){
                    return false;
                }
		    }, function(response) {
		        console.log("Error trying to log in.");
		        return false;
		    });

	}

    
 
//MY PROFILE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    
    
    

        
    
});