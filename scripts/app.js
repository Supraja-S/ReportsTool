var reportsTool =  angular.module('reportsTool',['ngRoute','ngAnimate','ngCookies','ngSanitize','ngTouch','nvd3']);

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
	 $scope.options = {
            chart: {
                type: 'pieChart',
                height: 300,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.data = [
            {
                key: "One",
                y: 5
            },
            {
                key: "Two",
                y: 2
            },
            {
                key: "Three",
                y: 9
            },
            {
                key: "Four",
                y: 7
            },
            {
                key: "Five",
                y: 4
            },
            {
                key: "Six",
                y: 3
            },
            {
                key: "Seven",
                y: .5
            }
        ];
}]);

reportsTool.controller('ImpactController',['$scope',function($scope){
	$scope.selected = 'defects';
	$scope.orderByField = 'name';
  	$scope.reverseSort = false;
	
	$scope.IncompabilitycountsArray = [
	{
		count:100,
		color:'blue',
		description:'Total Defects'
	},
	{
		color:'red',
		count:33,
		description:'High impact'
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
	
 $scope.options = {
            chart: {
                type: 'pieChart',
                height: 300,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.data = [
            {
                key: "One",
                y: 5
            },
            {
                key: "Two",
                y: 2
            },
            {
                key: "Three",
                y: 9
            },
            {
                key: "Four",
                y: 7
            },
            {
                key: "Five",
                y: 4
            },
            {
                key: "Six",
                y: 3
            },
            {
                key: "Seven",
                y: .5
            }
        ];
	
}]);
reportsTool.controller('s4Controller',['$scope',function($scope){
	$scope.orderByField = 'name';
  	$scope.reverseSort = false;
	$scope.selected = 'busFunctions';
	
	$scope.tabularData = [
		{
			name:'Farah',
			age:'26',
			city:'Pune',
			age:'27',
			city:'Vizag'
			
		},
		{
			name:'Supraja',
			age:'26',
			city:'Ongol',
			age:'27',
			city:'Vizag'
			
		},
		{
			name:'Aneesh',
			age:'20',
			city:'Jabalpur',
			age:'27',
			city:'Vizag'
			
		},
		{
			name:'Vinit',
			age:'22',
			city:'Mumbai',
			age:'27',
			city:'Vizag'
			
		},
		{
			name:'Sharath',
			age:'28',
			city:'Hyderabad',
			age:'27',
			city:'Vizag'
			
		},
		{
			name:'Uday',
			age:'27',
			city:'Vizag',
			age:'27',
			city:'Vizag'
			
		}
	];
	 $scope.options = {
            chart: {
                type: 'pieChart',
                height: 300,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.data = [
            {
                key: "One",
                y: 5
            },
            {
                key: "Two",
                y: 2
            },
            {
                key: "Three",
                y: 9
            },
            {
                key: "Four",
                y: 7
            },
            {
                key: "Five",
                y: 4
            },
            {
                key: "Six",
                y: 3
            },
            {
                key: "Seven",
                y: .5
            }
        ];

}]);