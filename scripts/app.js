var reportsTool =  angular.module('reportsTool',['ngRoute','ngAnimate','ngCookies','ngSanitize','ngTouch']);

reportsTool.config(function($routeProvider,$locationProvider) {
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

reportsTool.controller('ImpactController',['$scope',function($scope){
	$scope.selected = 'defects';
	
	$scope.IncompabilitycountsArray = [
	{
		count:100,
		color:'white',
		description:'Total Defects'
	},
	{
		color:'red',
		count:33,
		description:'High impact'
	},
	{
		count:33,
		color:'yellow',
		description:'Medium impact'
	},
	{
		count:3,
		color:'green',
		description:'Low impact'
	}
	
	]
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
	];

reportsTool.controller('s4Controller',['$scope',function($scope){
	$scope.orderByField = 'name';
  	$scope.reverseSort = false;
	$scope.tabularData = [
		{
			name:'Farah',
			age:'26',
			city:'Pune'
			
		},
		{
			name:'Supraja',
			age:'26',
			city:'Ongol'
			
		},
		{
			name:'Aneesh',
			age:'20',
			city:'Jabalpur'
			
		},
		{
			name:'Vinit',
			age:'22',
			city:'Mumbai'
			
		},
		{
			name:'Sharath',
			age:'28',
			city:'Hyderabad'
			
		},
		{
			name:'Uday',
			age:'27',
			city:'Vizag'
			
		}
	]

}]);