var app = angular.module("main");
app.controller("LoginController", function(loginService,$location, $localStorage){

	var loginController = this;

	loginController.username = "";
	loginController.password = "";
	loginController.msg = "";
    loginController.student = {
        firstname: '',
        lastname: '',
        address: '',
        postcode: '',
        phone: '',
        email: '',
        website: '',
        linkedin: '',
        
    }
    
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
        
        
        
        loginController.cv = '';    
        loginController.cvname = '';
    
    
        loginController.createcv = function(){
            
            var result = loginService.cvname(this.cvname)
                .then(function(result){
                    if(result){
                        console.log(result);
                        loginController.cv = $localStorage.currentcv;
                    } else {
                        console.log('error!');
                    }
                });
        }
        
        loginController.cvpersonalinfo = function(){
            
            var result = loginService.cvpi(this.student.firstname, this.student.lastname, this.student.address, this.student.postcode, this.student.email, this.student.website, this.student.linkedin, this.student.phone)
                .then(function(result){
                    if(result){
                        console.log(result);
                        
                    } else {
                        console.log('error!');
                    }
                });
        }

});


  app.controller('DemoCtrl', function($scope) {
    $scope.user = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      suburb: '',
      postalCode: ''
    };

    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      });
  })
  .config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });







