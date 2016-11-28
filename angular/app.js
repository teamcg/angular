var app = angular.module("main", ["ngRoute","ngStorage"]);



app.config(function($routeProvider, $httpProvider){
	
	$routeProvider
	.when("/",{
		templateUrl : "/templates/frontpage.htm",
		controller : "LoginController"
	})
	.when("/portal",{
		templateUrl: "/templates/portal.htm",
		controller: "PortalController"
	})
	.when("/gotoauthgen",{
		templateUrl: "/templates/gotoauthgen.htm",
		controller: "LoginController"
	})
	.otherwise({
		templateUrl : "/templates/error404.htm"
	});

	
});



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





