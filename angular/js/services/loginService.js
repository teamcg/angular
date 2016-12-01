angular.module("main").service("loginService", function($http, $localStorage){


    
    this.login = function(user, pass){
		
		var req = {
		 method: 'POST',
		 url: 'https://edenzproj.herokuapp.com/authenticate',
		 dataType: 'json',
		 headers: {
		   'Content-Type': 'application/json'
		 },
		 data: { email: user,
		 		password: pass 
		 		}
		}
		

		return $http(req)
			.then(function(response) {
	        	console.log(response.data.data.firstname);
                $localStorage.firstname = response.data.data.firstname;
                $localStorage.lastname = response.data.data.lastname;
	        	$localStorage.token = response.data.token;
	        	console.log($localStorage.token);
		        return response.data.success;

		    }, function(response) {
		        console.log("Error trying to log in.");
		        return false;
		    });

	}

    
    this.authenticateUrlTest = function(){
		
		var req = {
		 method: 'GET',
		 url: 'https://edenzproj.herokuapp.com/authenticate',
		 dataType: 'json',
		 headers: {
		   'Content-Type': 'application/json'
		 }
		}
		

		return $http(req)
			.then(function(response) {
	        	console.log(response.data);
	        	return true;

		    }, function(response) {
		        console.log("Error trying to log in.");
		        return false;
		    });

	}
    
    
    this.cvname = function(cvname){
        
        var CVname = {
            method: 'POST',
            url: 'http://localhost:3000/cvname',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                cvname: cvname
            }
        }
        
        return $http(CVname)
            .then(function(response){
            $localStorage.currentcv = response.data.info._id;
            console.log(response.data.info);
            return true
        }, function(response){
                console.log('Error creating CV');
            return false
        });
    }
    
    
    this.cvpi = function(firstname, lastname, address, postcode, email, website, linkedin, phone){
        var currentCV = $localStorage.currentcv;
        var CVpersonalinfo = {
            method: 'POST',
            url: 'http://localhost:3000/cvpersonalinfo',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV,
                firstname: firstname,
                lastname: lastname,
                address: address,
                phone: phone,
                website: website,
                linkedin: linkedin,
                email: email,
                postcode: postcode
            }
        }
        
        
        return $http(CVpersonalinfo)
            .then(function(response){
            console.log(response.data);
            return true
        }, function(response){
            console.log('Error!');
            return false;
        });
    }
    
    
    
    
});