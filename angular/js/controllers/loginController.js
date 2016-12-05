var app = angular.module("main");
app.controller("LoginController", function(loginService,$location, $localStorage, $scope, $mdToast){

    
    
    
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
                        $scope.expToast();
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
        
        
        $scope.edusubmit = function(){
            
            var result = loginService.cvedu(
            this.cveducation.category,
                this.cveducation.school,
                this.cveducation.city,
                this.cveducation.country,
                this.cveducation.startdate,
                this.cveducation.enddate
            )
            
            .then(function(result){
                if(result){
                    console.log(result);
                    $scope.tableeducation = $localStorage.cveducation;
                    $scope.eduToast();
                } else {
                    console.log('error');
                }
            })
            
        }
        
        
        
        
        //TOAST
          var last = {
              bottom: false,
              top: true,
              left: false,
              right: true
          };
    
     $scope.toastPosition = angular.extend({},last);
    
      $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };
    
    function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }

      $scope.expToast = function() {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent('Experience successfully added!')
        .position(pinTo)
        .hideDelay(2000)
    );
  };

     $scope.eduToast = function() {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent('Education successfully added!')
        .position(pinTo)
        .hideDelay(2000)
    );
  };
        
        
        
        
});









