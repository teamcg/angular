angular.module("main").controller("PortalController", function(loginService){
	var portalController = this;

	
	portalController.doSomethingAuth = function(){
		console.log("doSomethingAuth PortalController");

		var result = loginService.authenticateUrlTest()
		.then(function (result) {
	      if(result){
				console.log("Something happened");
				
			}else{
				console.log("Not working");
			}
	    }); 


		console.log("result: " + result);

		return "blabla";
	}


});