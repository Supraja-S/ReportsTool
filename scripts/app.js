var reportsTool =  angular.module('reportsTool',['ngRoute','ngAnimate','ngCookies','ngSanitize','ngTouch']);

reportsTool.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/home", {
        templateUrl : "../partials/dashboard.html",
	})
	.when("/impact", {
        templateUrl : "../partials/businessProcess.html",
	})
	.when("/sFour", {
        templateUrl : "../partials/s4Hana.html",
	})
   
    .when("/bpview", {
         templateUrl : "../partials/businessProcess.html",
         controller : "bpController"
    })
	 .otherwise({
         redirectTo:'/home'
    });
   
    $locationProvider.html5Mode(true);
});


reportsTool.controller('LandingPageController',['$scope',function($scope){
	
}]);

reportsTool.controller('navController',['$scope',function($scope){
	$scope.menu = 'home';
	
}]);

reportsTool.controller('bpController',['$scope',function($scope){
	$scope.tabularData = [
		{
			name:'object1',
			value1:'value1',
			value2:'value2'
			
		},
		{
			name:'object2',
			value1:'value1',
			value2:'value2'
			
		},
		{
			name:'object3',
			value1:'value1',
			value2:'value2'
			
		},
		{
			name:'object4',
			value1:'value1',
			value2:'value2'
			
		},
		{
			name:'object5',
			value1:'value1',
			value2:'value2'
			
		},
		{
			name:'object1',
			value1:'value1',
			value2:'value2'
			
		}
	]
}]);