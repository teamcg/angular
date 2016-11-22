angular.module("main").controller("LoginController", function(loginService,$location){
	var loginController = this;

	loginController.username = "";
	loginController.password = "";
	loginController.msg = "";

	loginController.signin = function(){
		
		
		var result = loginService.login(this.username, this.password)
		.then(function (result) {
	      if(result){
				console.log("Returnoooooo");
				$location.path("/portal");
			}else{
				console.log("Not Logged");
				loginController.msg = "User/Password wrong. Try again!";
			}
	    }); 
		

		//$location.path("/");
	}


});