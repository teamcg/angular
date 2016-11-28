angular.module("main")
	.controller("LoginController", function(loginService,$location){
	
	var loginController = this;

	loginController.username = "";
	loginController.password = "";
	loginController.msg = "";

	loginController.signin = function(){
		
		loginController.msg = "Proccessing .... ";

		var result = loginService.login(this.username, this.password)
		.then(function (result) {
	      if(result){
				console.log("Portal");
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