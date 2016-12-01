var app = angular.module("main");
app.controller("LoginController", function(loginService,$location, $localStorage, $scope){

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
    
    $scope.cvexperience = {
        category: '',
        role: '',
        company: '',
        companydesc: '',
        city: '',
        country: '',
        startdate: '',
        enddate: ''
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

        
        
        
        $scope.expsubmit = function(){
            
            var result = loginService.cvexp(
                this.cvexperience.category, 
                this.cvexperience.role, 
                this.cvexperience.company,
                this.cvexperience.companydesc,
                this.cvexperience.city,
                this.cvexperience.country,
                this.cvexperience.startdate,
                this.cvexperience.enddate
            )
                .then(function(result){
                    if(result){
                        console.log(result);
                        console.log($localStorage.cvexperience);
                        $scope.tableexp = $localStorage.cvexperience;
                       
                        //Clear the experience input fields
                        $scope.cvexperience = {
                            category: '',
                            role: '',
                            company: '',
                            companydesc: '',
                            city: '',
                            country: '',
                            startdate: '',
                            enddate: ''
                        }
                        
                        
                    } else {
                        console.log('Exp CTRL error');
                    }
                });   
        }
});









