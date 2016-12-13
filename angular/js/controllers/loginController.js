var app = angular.module("main");
app.controller("LoginController", function(loginService,$location, $localStorage, $scope, $timeout){

    
    
    
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
    
    $scope.cveducation = {
        category: '',
        school: '',
        city: '',
        country: '',
        startdate: '',
        enddate: ''
    }
    
    $scope.cvskill = {
        name: '',
        description: ''
    }
    
    $scope.personalInfo = {
        address: '',
        email: '',
        phone: '',
        website: '',
        linkedin: ''
    }
    $scope.experienceAddedMessage = false;
    $scope.educationAddedMessage = false;
    $scope.myprofileAddedMessage = false;
    $scope.personalInfoAddedMessage = false;
    $scope.personalStatementAddedMessage = false;
    $scope.skillsAddedMessage = false;
    
    $scope.editExperienceMessage = false;

    
    $scope.expErrorMessage = false;
    $scope.eduErrorMessage = false;

    $scope.editExperienceMessage = '';
    
    $scope.submitExp = true;
    $scope.submitEditExp = false;
    
    $scope.submitEducation = true;
    $scope.submitUpdatedEducation = false;
    
    loginController.studentinfo = {
        firstname: $localStorage.studentFirstname,
        lastname: $localStorage.studentLastname,
        address: $localStorage.studentAddress,
        phone: $localStorage.studentPhone,
        email: $localStorage.studentEmail,
        website: $localStorage.studentWebsite,
        linkedin: $localStorage.studentLinkedin
    }
    

	loginController.signin = function(){
		
		loginController.msg = "Logging in...";

		var result = loginService.login(this.username, this.password)
		.then(function(result) {
	      if(result){
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
                        $scope.personalInfo.address = $localStorage.studentAddress;
                        $scope.personalInfo.phone = $localStorage.studentPhone;
                        $scope.personalInfo.email = $localStorage.studentEmail;
                        $scope.personalInfo.linkedin = $localStorage.studentLinkedin;
                        $scope.personalInfo.website = $localStorage.studentWebsite;
                        console.log(result);
                        loginController.cv = $localStorage.currentcv;
                    } else {
                        console.log('error!');
                    }
                });
        }
        
        
        loginController.updateProfile = function(){
            var result = loginService.profileUpdate(
                this.studentinfo.address, 
                this.studentinfo.email, 
                this.studentinfo.phone, 
                this.studentinfo.linkedin, 
                this.studentinfo.website
            )
                .then(function(result){
                    if(result){
                        $scope.myprofileAddedMessage = true;
                        
                        $timeout(function(){
                            $scope.myprofileAddedMessage = false;
                        }, 1500);
                        
                    } else {
                        console.log('ERROR! on updating profile!!');
                    }
                });
            
        }
        
        
        $scope.piSubmit = function(){
            var result = loginService.cvpi(
                this.personalInfo.address,
                this.personalInfo.phone,
                this.personalInfo.email,
                this.personalInfo.website,
                this.personalInfo.linkedin
            )
                
                .then(function(result){
                    if(result){ 
                        $scope.personalInfoAddedMessage = true;
                        
                        $timeout(function(){
                            $scope.personalInfoAddedMessage = false;
                        }, 1500);
                    } else {
                        console.log('Personal Info submit failed');
                    }
                });
        }
        
        
        $scope.psSubmit = function(){
            var result = loginService.cvps(this.cvpersonalstatement)
                .then(function(result){
                    if(result){
                    $scope.personalStatementAddedMessage = true;
                        
                        $timeout(function(){
                            $scope.personalStatementAddedMessage = false;
                        }, 1500)
                    } else {
                        console.log('error');
                    }
                });
            
        }

        
        
        
        $scope.expsubmit = function(){
            if($scope.cvexperience.category !== "" && $scope.cvexperience.role !== "" && $scope.cvexperience.company !== "" && $scope.cvexperience.companydesc !== "" && $scope.cvexperience.city !== "" && $scope.cvexperience.country !== "" && $scope.cvexperience.startdate !== "" && $scope.cvexperience.enddate !== ""){
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
                        
                        
                        $scope.experienceAddedMessage = true;
                        
                        $timeout(function(){
                            $scope.experienceAddedMessage = false;
                        }, 1500);
                        
                        
                    } else {
                        console.log('Exp CTRL error');
                    }
                });   
            } else {
                $scope.expErrorMessage = true;
                
                $timeout(function(){
                    $scope.expErrorMessage = false;
                }, 2000);
                

                
                console.log('Fill up the remaining fields');
            }
            
           
        }
        
        
        $scope.editExpBTN = function(){
            $scope.submitExp = false;
            $scope.submitEditExp = true;
            $scope.editExperienceMessage = true;
            $scope.cvexperience = {
                category: this.info.category,
                role: this.info.role,
                company: this.info.company,
                companydesc: this.info.companydescription,
                city: this.info.city,
                country: this.info.country,
                startdate: new Date(this.info.startdate),
                enddate: new Date(this.info.enddate)
            }
            
            $localStorage.editexperienceid = this.info._id;
            console.log($localStorage.editexperienceid);
            
        }
        
        
        $scope.expUpdatedSubmit = function(){
            var result = loginService.cvEditExperience(
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
                    $scope.tableexp = $localStorage.cvexperience;
                    $scope.submitExp = true;
                    $scope.submitEditExp = false;
                    $scope.editExperienceMessage = false;
                        
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
                    console.log('Error editing experience. Try again');
                }
            });
            
        }
        
        
        $scope.deleteExperience = function(){

            $localStorage.experienceid = this.info._id
            
            var result = loginService.cvDeleteExperience()
                .then(function(result){
                    if(result){
                        $scope.tableexp = $localStorage.cvexperience;
                        console.log('Successfully deleted Experience');
                        
                    } else {
                        console.log('ERROR ON EXP DELETION');
                    }
                });
        }
        
        
        
        
        $scope.edusubmit = function(){
            if($scope.cveducation.category !== "" && $scope.cveducation.school !== "" && $scope.cveducation.city !== "" && $scope.cveducation.country !== "" && $scope.cveducation.startdate !== "" && $scope.cveducation.enddate !== "") {
                
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

                        $scope.tableeducation = $localStorage.cveducation;
                        $scope.cveducation = {
                            category: '',
                            school: '',
                            city: '',
                            country: '',
                            startdate: '',
                            enddate: ''
                        }
                        
                        $scope.educationAddedMessage = true;
                        
                        $timeout(function(){
                            $scope.educationAddedMessage = false;
                        }, 1500);
                        
                    } else {
                        console.log('error');
                    }
                });
                
             } else {
                $scope.eduErrorMessage = true;
                
                $timeout(function(){
                    $scope.eduErrorMessage = false;
                }, 2000);
             }
              
        }
        
        
        $scope.editEducationButton = function(){
            $scope.submitEducation = false;
            $scope.submitUpdatedEducation = true;
            
            $scope.cveducation = {
                category: this.info.category,
                school: this.info.school,
                city: this.info.city,
                country: this.info.country,
                startdate: new Date(this.info.startdate),
                enddate: new Date(this.info.enddate)
            }
            
            $localStorage.editeducationid = this.info._id;
            console.log($localStorage.editeducationid);
        
        }
        
        
        $scope.submitEditedEducation = function(){
            var result = loginService.cvEditEducation(
             this.cveducation.category,
             this.cveducation.school,
             this.cveducation.city,
             this.cveducation.country,
             this.cveducation.startdate,
             this.cveducation.enddate
            )
            
            .then(function(result){
                if(result){
                    $scope.tableeducation = $localStorage.cveducation;
                    $scope.submitEducation = true;
                    $scope.submitUpdatedEducation = false;
                    
                    $scope.cveducation = {
                        category: '',
                        school: '',
                        city: '',
                        country: '',
                        startdate: '',
                        enddate: ''
                    }
                } else {
                    console.log('error! EDITING EDU!!!');
                }
            });
        }
        
        
        $scope.deleteEducation = function(){
            $localStorage.deleteeducationid = this.info._id;
            
            var result = loginService.cvDeleteEducation()
                .then(function(result){
                    if(result){
                        $scope.tableeducation = $localStorage.cveducation;
                    } else {
                        console.log('ERROR DELETING EDU');
                    }
                });
        }
        
        
        
        
        
        
        $scope.skillsubmit = function(){
            var result = loginService.cvskills(
                this.cvskill.name,
                this.cvskill.description
            )
            
            .then(function(result){
                if(result){

                    $scope.tableskill = $localStorage.cvskill;
                    
                    $scope.skillsAddedMessage = true;
                    
                    $timeout(function(){
                        $scope.skillsAddedMessage = false;
                    }, 1500);
                    
                } else {
                    console.log('ERROR SKILL SUBMIT');
                }
            });
            
        }
        
        
        
        
        
      
    
    
    
    
    
    
    
    
    
});









