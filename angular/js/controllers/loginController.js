var app = angular.module("main");
app.controller("LoginController", function(loginService,$location, $localStorage){

	var loginController = this;

	loginController.username = "";
	loginController.password = "";
	loginController.msg = "";
    
    loginController.firstname = $localStorage.firstname;
    loginController.lastname = $localStorage.lastname;
    

	loginController.signin = function(){
		
		loginController.msg = "Proccessing .... ";

		var result = loginService.login(this.username, this.password)
		.then(function(result) {
	      if(result){
                console.log(result);
				$location.path("/portal");
			}else{
				console.log("Not Logged");
				loginController.msg = "User/Password wrong. Try again!";
			}
	    }); 

	}

    	loginController.gak = function(){
		console.log("goToGenAuthCode");
		
		$location.path("/gak");
	
	}


});


