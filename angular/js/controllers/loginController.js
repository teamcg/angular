var app = angular.module("main");
app.controller("LoginController", function(loginService, $location, $localStorage, $scope, $timeout){

    
//swal({
//  title: 'Do you want to delete experience?',
//  type: 'warning',
//  showCancelButton: true,
//  confirmButtonColor: '#3085d6',
//  cancelButtonColor: '#d33',
//  confirmButtonText: 'Yes'
//}).then(function () {
//      swal({
//      type: 'success',
//      title: 'Experience successfully deleted!',
//      timer: 1000,
//      showConfirmButton: false
//    });
//});
    
    
    
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
        role: '',
        company: '',
        companydesc: '',
        city: '',
        country: '',
        startdate: '',
        enddate: ''
    }
    
    $scope.cveducation = {
        qualification: '',
        institution: '',
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
    $scope.editEducationMessage = false;
    
    $scope.listOfExperience = true;
    $scope.listOfQualification = true;
    
    $scope.expErrorMessage = false;
    $scope.eduErrorMessage = false;

    $scope.editExperienceMessage = '';
    
    $scope.submitExp = true;
    $scope.submitEditExp = false;
    
    $scope.submitEducation = true;
    $scope.submitUpdatedEducation = false;
    
    $scope.educationForm = true;
    $scope.papersField = false;
    $scope.educationAchievementsField = false;
    
    $scope.paperFieldSubmitButtons = true;
    $scope.paperFieldEditButton = false;
    $scope.educationAchievementSubmitButtons = true;
    $scope.educationAchievementEditButton = false;
    $scope.educationProjectSubmitButtons = true;
    $scope.educationProjectEditButton = false;
    
    $scope.paper = {
        name: ''
    }
    $scope.educationAchievement = {
        name: ''
    }
    $scope.educationProject = {
        name: '',
        description: ''
    }
    
    $scope.paperInfos = true;
    $scope.educationAchievementInfos = true;
    $scope.educationProjectInfos = true;
    
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
            if($scope.cvexperience.role !== "" && $scope.cvexperience.company !== "" && $scope.cvexperience.companydesc !== "" && $scope.cvexperience.city !== "" && $scope.cvexperience.country !== "" && $scope.cvexperience.startdate !== "" && $scope.cvexperience.enddate !== ""){
                var result = loginService.cvexp( 
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
            $scope.listOfExperience = false;
            $scope.cvexperience = {
                role: this.info.role,
                company: this.info.company,
                companydesc: this.info.companydescription,
                city: this.info.city,
                country: this.info.country,
                startdate: new Date(this.info.startdate),
                enddate: new Date(this.info.enddate)
            }
            
            $localStorage.editexperienceid = this.info._id;
            
        }
        
        
        $scope.expUpdatedSubmit = function(){
            $scope.listOfExperience = true;
            var result = loginService.cvEditExperience(
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
        
        $scope.expUpdateCancel = function(){
            $scope.listOfExperience = true;
            $scope.cvexperience = {
                role: '',
                company: '',
                companydesc: '',
                city: '',
                country: '',
                startdate: '',
                enddate: ''
            }
            
            $scope.submitExp = true;
            $scope.submitEditExp = false;
            $scope.editExperienceMessage = false;
            
        
        }
        
        
        $scope.deleteExperience = function(){
            var experienceToBeDeleted = this;
            swal({
              title: 'Do you want to delete the selected experience?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '<span class="glyphicon glyphicon-ok"></span>',
              cancelButtonText: '<span class="glyphicon glyphicon-remove"></span>'
            }).then(function () {
                $localStorage.experienceid = experienceToBeDeleted.info._id

                var result = loginService.cvDeleteExperience()
                    .then(function(result){
                        if(result){
                            $scope.tableexp = $localStorage.cvexperience;
                            console.log('Successfully deleted Experience');

                        } else {
                            console.log('ERROR ON EXP DELETION');
                        }
                    });
                      swal({
                      type: 'success',
                      title: 'Experience successfully deleted!',
                      timer: 1000,
                      showConfirmButton: false
                    });
            });
        }
        
        
        
        
        $scope.edusubmit = function(){
            if($scope.cveducation.qualification !== "" && $scope.cveducation.institution !== "" && $scope.cveducation.city !== "" && $scope.cveducation.country !== "" && $scope.cveducation.startdate !== "" && $scope.cveducation.enddate !== "") {
                
                var result = loginService.cvedu(
                    this.cveducation.qualification,
                    this.cveducation.institution,
                    this.cveducation.city,
                    this.cveducation.country,
                    this.cveducation.startdate,
                    this.cveducation.enddate
            )

                .then(function(result){
                    if(result){

                        $scope.tableeducation = $localStorage.cveducation;
                        $scope.cveducation = {
                            qualification: '',
                            institution: '',
                            city: '',
                            country: '',
                            startdate: '',
                            enddate: ''
                        }
                        
                        $scope.educationAddedMessage = true;
                        
                        $timeout(function(){
                            $scope.educationAddedMessage = false;
                        }, 1000);
                        
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
            $scope.editEducationMessage = true;
            $scope.submitUpdatedEducation = true;
            $scope.listOfQualification = false;
            
            $scope.cveducation = {
                qualification: this.info.qualification,
                institution: this.info.institution,
                city: this.info.city,
                country: this.info.country,
                startdate: new Date(this.info.startdate),
                enddate: new Date(this.info.enddate)
            }
            
            $localStorage.editeducationid = this.info._id;
        
        }
        
        
        $scope.submitEditedEducation = function(){
            $scope.editEducationMessage = false;
            $scope.listOfQualification = true;
            var result = loginService.cvEditEducation(
             this.cveducation.qualification,
             this.cveducation.institution,
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
                        qualification: '',
                        institution: '',
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
        
        
        
         $scope.eduUpdateCancel = function(){
            $scope.listOfQualification = true;
            $scope.submitUpdatedEducation = false;
            $scope.editEducationMessage = false;
            $scope.listOfQualification = true;
            $scope.cveducation = {
                qualification: '',
                institution: '',
                city: '',
                country: '',
                startdate: '',
                enddate: ''
            }
            
            $scope.submitEducation = true;
            $scope.submitEditExp = false;
            $scope.editExperienceMessage = false;
            
        
        }
        
        
        $scope.deleteEducation = function(){
            var educationToBeDeleted = this;
            
            swal({
              title: 'Do you want to delete the selected education?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '<span class="glyphicon glyphicon-ok"></span>',
              cancelButtonText: '<span class="glyphicon glyphicon-remove"></span>'
            }).then(function () {
                $localStorage.deleteeducationid = educationToBeDeleted.info._id;

                var result = loginService.cvDeleteEducation()
                    .then(function(result){
                        if(result){
                            $scope.tableeducation = $localStorage.cveducation;
                        } else {
                            console.log('ERROR DELETING EDU');
                        }
                    });
                
                  swal({
                  type: 'success',
                  title: 'Qualification successfully deleted!',
                  timer: 1000,
                  showConfirmButton: false
                });
            });
            
        }
        
            
        
    //Education Additional Options    
        
        $scope.openPapers = function(){
            $localStorage.educationID = this.info._id;
            var result = loginService.cvGetEducationPaper()
                .then(function(result){
                    if(result){
                        $scope.showEducationPapers = $localStorage.cvEducationPapers;
                    }
                });   
            $scope.educationForm = false;
            $scope.papersField = true;    
        }
        
        
        $scope.openEducationAchievements = function(){
            $localStorage.educationID = this.info._id;
            var result = loginService.cvGetEducationAchievement()
                .then(function(result){
                    if(result){
                        console.log('Hey Achievement');
                        $scope.showEducationAchievements = $localStorage.cvEducationAchievements;
                    }
                });
            
            $scope.educationForm = false;
            $scope.educationAchievementsField = true;
        }
        
        
        $scope.openEducationProjects = function(){
            $localStorage.educationID = this.info._id;
            var result = loginService.cvGetEducationProject()
                .then(function(result){
                    if(result){
                        console.log('hey Projects');
                        $scope.showEducationProjects = $localStorage.cvEducationProjects;
                    }
                });
            
            $scope.educationForm = false;
            $scope.educationProjectsField = true;
        }
        
        
        
        $scope.closePaper = function(){
            $scope.showEducationPapers = '';
            
            
            $scope.educationForm = true;
            $scope.papersField = false;
        }
        
        $scope.closeEducationAchievement = function(){
            $scope.showEducationAchievements = '';
            
            $scope.educationForm = true;
            $scope.educationAchievementsField = false;
        }
        
        $scope.closeEducationProject = function(){
            $scope.showEducationProjects = '';
            
            $scope.educationForm = true;
            $scope.educationProjectsField = false;
        }
        
        
        $scope.submitPaper = function(){    
            var result = loginService.cvAddEducationPaper(this.paper.name)
                .then(function(result){
                    if(result){
                        $scope.showEducationPapers = $localStorage.cvEducationPapers;
                        $scope.paper = {
                            name: ''
                        }
                    } else {
                        console.log('error');
                    }
                });
            
            
        }
        
        $scope.submitEducationAchievement = function(){
            var result = loginService.cvAddEducationAchievement(this.educationAchievement.name)
                .then(function(result){
                    if(result){

                        $scope.showEducationAchievements = $localStorage.cvEducationAchievements;
                        $scope.educationAchievement = {
                            name: ''
                        }
                    } else {
                        console.log('error in adding education achievement');
                    }
                });
        }
        
        $scope.submitEducationProject = function(){
            var result = loginService.cvAddEducationProject(
                this.educationProject.name, 
                this.educationProject.description
            )
                .then(function(result){
                    if(result){
                        $scope.showEducationProjects = $localStorage.cvEducationProjects;
                        $scope.educationProject = {
                            name: '',
                            description: ''
                        }
                    } else {
                        console.log('error in adding education project');
                    }
                });
        }
        
        $scope.deleteEducationPaper = function(){
            $localStorage.paperInEducationID = this.papers._id;
            
            var result = loginService.cvDeleteEducationPaper()
                .then(function(result){
                    if(result){
                        $scope.showEducationPapers = $localStorage.cvEducationPapers;
                    } else {
                        console.log('Delete paper education error');
                    }
                    
                });  
        }
        
        $scope.deleteEducationProject = function(){
            $localStorage.projectInEducationID = this.eduProject._id;
            
            var result = loginService.cvDeleteEducationProject()
                .then(function(result){
                    if(result){
                        $scope.showEducationProjects = $localStorage.cvEducationProjects;
                    }
                });
        }
        
        $scope.deleteEducationAchievement = function(){
            $localStorage.achievementInEducationID = this.eduAchievement._id;
            
            var result = loginService.cvDeleteEducationAchievement()
                .then(function(result){
                    if(result){
                        $scope.showEducationAchievements = $localStorage.cvEducationAchievements;
                    }
                })
        }
        
        
        $scope.editEducationPaper = function(){          
            $scope.paper = {
                name: this.papers.name
            }
            $localStorage.paperInEducationID = this.papers._id;
            $scope.paperInfos = false;
            $scope.paperFieldSubmitButtons = false;
            $scope.paperFieldEditButton = true;
        }
        
        $scope.editEducationProject = function(){
            
            $scope.educationProject = {
                name: this.eduProject.name,
                description: this.eduProject.description
            }
            
            $localStorage.projectInEducationID = this.eduProject._id;
            $scope.educationProjectInfos = false;
            $scope.educationProjectSubmitButtons = false;
            $scope.educationProjectEditButton = true;   
        }
        
        $scope.editEducationAchievement = function(){
            $scope.educationAchievement = {
                name: this.eduAchievement.name
            }
            $localStorage.achievementInEducationID = this.eduAchievement._id;
            $scope.educationAchievementSubmitButtons = false;
            $scope.educationAchievementInfos = false;
            $scope.educationAchievementEditButton = true;
        }
        
        
        
        $scope.cancelEditEducationPaper = function(){
            $scope.paperInfos = true;
            $scope.paperFieldEditButton = false;
            $scope.paperFieldSubmitButtons = true;
        }
        
        $scope.cancelEditEducationAchievement = function(){
            $scope.educationAchievement = {
                name: ''
            }
            $scope.educationAchievementInfos = true;
            $scope.educationAchievementEditButton = false;
            $scope.educationAchievementSubmitButtons = true;
        }
        
        $scope.cancelEditEducationProject = function(){
            $scope.educationProject = {
                name: '',
                description: ''
            }
            
            $scope.educationProjectInfos = true;
            $scope.educationProjectSubmitButtons = true;
            $scope.educationProjectEditButton = false;   
        }
        
        
        $scope.updateEducationPaper = function(){
            $scope.paperInfos = true;
            $scope.paperFieldEditButton = false;
            $scope.paperFieldSubmitButtons = true;
            var result = loginService.cvEditEducationPaper(this.paper.name)
                .then(function(result){
                    if(result){
                        $scope.paper = {
                            name: ''
                        }
                        $scope.showEducationPapers = $localStorage.cvEducationPapers;
                    }
                });

        }
        
        $scope.updateEducationProject = function(){
            $scope.educationProjectInfos = true;
            $scope.educationProjectSubmitButtons = true;
            $scope.educationProjectEditButton = false; 
            
            var result = loginService.cvEditEducationProject(this.educationProject.name, this.educationProject.description)
                .then(function(result){
                    if(result){
                        $scope.educationProject = {
                            name: '',
                            description: ''
                        }
                        $scope.showEducationProjects = $localStorage.cvEducationProjects;
                    }
                });
        }
        
        
        $scope.updateEducationAchievement = function(){
            $scope.educationAchievementInfos = true;
            $scope.educationAchievementEditButton = false;
            $scope.educationAchievementSubmitButtons = true;
            
            var result = loginService.cvEditEducationAchievement(this.educationAchievement.name)
                .then(function(result){
                    if(result){
                        $scope.educationAchievement = {
                            name: ''
                        }
                        $scope.showEducationAchievements = $localStorage.cvEducationAchievements;
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

//app.config(function($mdDateLocaleProvider) {
//  $mdDateLocaleProvider.formatDate = function(date) {
//    return moment(date).format('DD-MM-YYYY');
//  };
//});









