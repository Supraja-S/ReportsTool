var reportsTool =  angular.module('reportsTool',['ngRoute','ngAnimate','ngCookies','ngSanitize','ngTouch','nvd3','floatThead']);

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

reportsTool.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});

reportsTool.factory('httpInterceptor', ['$q', '$rootScope', function ($q, $rootScope){
    var requestQueue= [];
    return {
        request: function (config) {
            requestQueue.push(config.url);
            $rootScope.showLoader = true;
            return config || $q.when(config)
        },
        response: function (response) {
            var requestIndex = requestQueue.indexOf(response.config.url);
            if( requestIndex > -1){
                requestQueue.splice(requestIndex, 1);
            };
            if ((requestQueue.length) === 0) { 
                $rootScope.showLoader = false;
                //focusInput();
            };
            return response || $q.when(response);
        },
        responseError: function (response) {
            if ((requestQueue.length) === 0) {
                $rootScope.showLoader = false;
            };
            return $q.reject(response);
        }
    };
}]);

reportsTool.controller('LandingPageController',['$scope',function($scope){
	d3.select(".nv-legendWrap").attr("transform", "translate(200,10)");
    console.log(d3.select(".nv-legendWrap .nv-series"));

}]);
