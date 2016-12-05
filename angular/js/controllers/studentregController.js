var app = angular.module("main");
app.controller("StudentRegController", function(studentregService,$location, $localStorage){
               
               var studentregController = this;
    
                studentregController.studentid = $localStorage.a.studentid;
                studentregController.authcode = $localStorage.a.authcode;
                studentregController.msg = "";
                studentregController.firstname = "";
                studentregController.lastname = "";
                studentregController.password = "";
                studentregController.email = "";
                studentregController.linkedin = "";
                studentregController.website = "";
                studentregController.address = "";
                
           
               studentregController.register= function(){
                   
                   var result  = studentregService.register(this.studentid, this.authcode, this.firstname, this.lastname, this.password, this.email, this.linkedin, this.website, this.address)
                   .then(function(result){
                       if(result.success){
        
                           console.log("register success");
                            $location.path("/");
                       }else{
                            console.log("Error! Try again.");
                            registerController.msg = "Please Try again!";
                        }
                   });
               }
               
              });

