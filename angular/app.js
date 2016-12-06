var app = angular.module("main", ["ngRoute", "ngStorage", "ngMaterial", "ngAnimate"]);



app.config(function ($routeProvider, $httpProvider){
	
	$routeProvider
	.when("/",{
		templateUrl : "./templates/frontp.htm",
		controller : "LoginController"
	})
	.when("/portal",{
		templateUrl: "./templates/portal.htm",
		controller: "LoginController"
	})
	.when("/gak",{
		templateUrl: "./templates/genauthkey.htm",
		controller: "GenAuthkeyController"
	})
    .when("/register",{
        templateUrl: "./templates/register.htm",
        controller: "StudentRegController"
    })
	.otherwise({
		templateUrl : "/templates/error404.htm"
	});


});



//INTERCEPTOR FOR TOKEN AUTHENTICATION
// register the interceptor as a service
app.factory('AuthInterceptor', function($q,$localStorage) {
  return {
    // optional method
    'request': function(request) {
      // do something on success
      console.log("myHttpInterceptor request");
      request.headers['Authorization'] = $localStorage.token;
      
      return request;
    },

    // optional method
   'requestError': function(rejection) {
      // do something on error
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    },



    // optional method
    'response': function(response) {
      // do something on success
      console.log("myHttpInterceptor response");
      return response;
    },

    // optional method
   'responseError': function(rejection) {
      // do something on error
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    }
  };
});


app.config(function($httpProvider){
	
	$httpProvider.interceptors.push('AuthInterceptor');


});




