var app = angular.module("main", ["ngRoute"]);

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
	.otherwise({
		templateUrl : "/templates/error404.htm"
	});

});



