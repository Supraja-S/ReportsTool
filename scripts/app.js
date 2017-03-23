var reportsTool =  angular.module('reportsTool',['ngRoute','ngAnimate','ngCookies','ngSanitize','ngTouch','nvd3']);

reportsTool.config(function($routeProvider,$locationProvider,$compileProvider) {
	   
   $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/), 
    $routeProvider
    .when("/home", {
        templateUrl : "../partials/dashboard.html",
	})
	.when("/impact", {
        templateUrl : "../partials/impactAnalysis.html",
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
