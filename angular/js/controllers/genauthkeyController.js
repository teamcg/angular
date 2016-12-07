var app = angular.module("main");

app.controller('GenAuthkeyController', function(genauthkeyService, $location, $localStorage){
    
    var genauthkeyController = this;
    
    genauthkeyController.studentid = '';
    genauthkeyController.msg = '';
    genauthkeyController.authCode ='';
    
    genauthkeyController.submit = function(){
        console.log('BUTTON PRESSED');
        var result = genauthkeyService.generate(this.studentid)
        .then(function(result){
            if(result){
                console.log(result);
                genauthkeyController.authCode = $localStorage.authcode;
            } else {
                genauthkeyController.studentid = '';
                genauthkeyController.msg = 'Student ID already exists!';
            }
        })
    }
    
    
    	genauthkeyController.gak = function(){
		
		$location.path("/gak");
	
	}
    
    
    
    
});