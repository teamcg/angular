var app = angular.module("main");
app.controller("RegisterController", function(registerService,$location, $localStorage){
               
               var registerController = this;
    
               registerController.studentid = "";
               registerController.authcode = "";
               registerController.msg = "";
               
               registerController.register= function(){
                   
                   registerController.msg = "Validating...";
                   
                    var result = registerService.register(this.studentid, this.authcode)
                    .then(function(result){
                        if(result){
                            $localStorage.a = {
                                studentid: registerController.studentid,
                                authcode: registerController.authcode
                            }
                            
                            $location.path("/register");
                        } else {

                            registerController.msg = "Student ID/Authorisation Code invalid. Try again!";
                        }
                    });
               }
              });