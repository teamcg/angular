angular.module("main").service("loginService", function($http){

	this.login = function(user, pass){
		
		var req = {
		 method: 'POST',
		 url: 'https://pure-caverns-19135.herokuapp.com/nglogin',
		 dataType: 'json',
		 headers: {
		   'Content-Type': 'application/json'
		 },
		 data: { username: user,
		 		password: pass 
		 		}
		}
		

		return $http(req)
			.then(function(response) {
	        	//First function handles success
	        	console.log(response.data.success);
		        return response.data.success;

		    }, function(response) {
		        //Second function handles error
		        console.log("Error trying to log in.");
		        return false;
		    });

	}

});