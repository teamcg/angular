var app = angular.module("main");

app.controller('GenAuthkeyController', function(genauthkeyService, $location){
    
    var genauthkeyController = this;
    
    genauthkeyController.studentid = '';
    genauthkeyController.msg = '';
    genauthkeyController.authCode ='';
    
    genauthkeyController.submit = function(){
        console.log('BUTTON PRESSED');
        var result = genauthkeyService.generate(this.studentid)
        .then(function(result){
            if(result){
                console.log("Returned result data")
                console.log(result.authcode);
                genauthkeyController.authCode = result.authcode;
            } else {
                genauthkeyController.msg = 'Student id is wrong!';
            }
        })
    }
    
    
    	genauthkeyController.gak = function(){
		
		$location.path("/gak");
	
	}
    
    
    
    
});