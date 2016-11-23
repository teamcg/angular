angular.module("main").service("loginService", function($http, $localStorage){

	this.login = function(user, pass){
		
		var req = {
		 method: 'POST',
		 url: 'https://tokentezt.herokuapp.com/api/authenticate',
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
	        	//First function handles success

	        	console.log(response.data);
	        	$localStorage.token = response.data.token;
	        	console.log($localStorage.token);
		        return response.data.success;

		    }, function(response) {
		        //Second function handles error
		        console.log("Error trying to log in.");
		        return false;
		    });

	}

});