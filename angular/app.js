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




$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
        return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);


});





