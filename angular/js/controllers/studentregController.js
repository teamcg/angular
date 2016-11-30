var app = angular.module("main");
app.controller("StudentRegController", function(studentregService,$location){
               
               var studentregController = this;
    
                studentregController.studentid = "";
                studentregController.authcode = "";
                studentregController.msg = "";
                studentregController.firstname = "";
                studentregController.lastname = "";
                studentregController.password = "";
                studentregController.email = "";
                
           
               studentregController.register= function(){
                   
                   var result  = studentregService.register(this.studentid, this.authcode, this.firstname, this.lastname, this.password, this.email)
                   .then(function(result){
                       if(result.success){
                           console.log(result);
                           console.log("register success");
                            $location.path("/");
                       }else{
                            console.log("Error! Try again.");
                            registerController.msg = "Please Try again!";
                        }
                   });
               }
               
              });

