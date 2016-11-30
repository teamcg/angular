var app = angular.module("main");
app.controller("RegisterController", function(registerService,$location){
               
               var registerController = this;
    
               registerController.studentid = "";
               registerController.authcode = "";
               registerController.msg = "";
               
               registerController.register= function(){
                   
                    var result = registerService.register(this.studentid, this.authcode)
                    .then(function(result){
                        if(result){
                            console.log("Register");
                            $location.path("/register");
                        }else{
                            console.log("Error! Try again.");
                            registerController.msg = "Try again!";
                        }
                    });
               }
              });