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

reportsTool.controller('navController',['$scope','$location',function($scope,$location){
	
	$scope.getClass = function (path) {
	  return ($location.path().substr(0, path.length) === path) ? 'active' : '';
	} 
	$scope.navItems = [{
		description:'System Overview',
		linkCode:'/home',
		iconName:'dashboard'
	},
	{
		description:'Impact Ananlysis',
		linkCode:'/impact',
		iconName:'bar-chart'
	},
	{
		description:'S/4Hana',
		linkCode:'/sFour',
		iconName:'mixcloud'
	},
	{
		description:'Business Process',
		linkCode:'/bpview',
		iconName:'tasks',
		
	}];
	
	
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
	$scope.showTable = false;
	$scope.scrolDown = false;
	
	$scope.toggleTableData= function(){
		$scope.showTable  = !$scope.showTable ;
		$scope.scrolDown = !$scope.scrolDown;
		var scrollValue = $scope.scrolDown? document.body.scrollHeight:0;
		
		$('html, body').animate({ scrollTop:scrollValue }, 800);
	};	
	
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
}]);
reportsTool.controller('chartController',['$scope',function($scope){
	$scope.chart={
		view:'',
		piechart:{
			options:[],
			data:[]
		},
		linechart:{
			options:[],
			data:[]
		}
	};
	function createPieChartData(data){
		var options = {
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
	
		var data = [
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
		return [options, data];
	}
	function createLineChartData(data){
		 var options = {
            chart: {
                type: 'lineChart',
                margin: 300,
                showLabels: true,
				useInteractiveGuideline:true,
				transitionDuration:350,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 100
                    }
                }
            }
        };
		var sin = [],cos = [];

		  for (var i = 0; i < 100; i++) {
			sin.push({x: i, y: Math.sin(i/10)});
			cos.push({x: i, y: .5 * Math.cos(i/10)});
		  }

		   var  data= [
			{
			  values: sin,
			  key: 'Sine Wave',
			  color: '#ff7f0e'
			},
			{
			  values: cos,
			  key: 'Cosine Wave',
			  color: '#2ca02c'
			}
		  ];
		  return [options,data];
	}
	function createDonutChartData(data){
		var options = {
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
                },
				donut:true,
				donutRatio:0.35
            }
        };
	
		var data = [
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
		return [options, data];
	}
	$scope.$watch('chart.view',function(newVal, oldVal){
		switch(newVal){
			
			case 'pieChart':
				var results = createPieChartData();
				console.log(results);
				$scope.chart.piechart.options= results[0];
				$scope.chart.piechart.data= results[1];
				break;
			
		case 'lineChart' : 
				var results = createLineChartData();
				console.log(results);
				$scope.chart.linechart.options= results[0];
				$scope.chart.linechart.data= results[1];
				break;
		case 'donutChart':	
				var results = createDonutChartData();
				console.log(results);
				$scope.chart.piechart.options= results[0];
				$scope.chart.piechart.data= results[1];
				break;
		}
	});
	
	
	/* var fileContent = getFileContent('data/' +getFileName("DEF_" + systemID + "_SUMMARY"));
	console.log(fileContent); */
	
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
			city:'Hyderabad'
			
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