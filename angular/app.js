var app = angular.module("main", ["ngRoute","ngStorage"]);



app.config(function($routeProvider){
	
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



