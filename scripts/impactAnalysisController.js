
reportsTool.controller('ImpactController',['$scope','s4TabService','chartCreationService',function($scope,s4TabService,chartCreationService){
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
	
	$scope.defectsCharts = {
		view1:'piechart',
		view2:'donutchart',
		piechart:{
			options:chartCreationService.createPieChartData(),
			data:[]
		},
		linechart:{
			options:chartCreationService.createLineChartData()[0],
			data:chartCreationService.createLineChartData()[1]
		},
		donutchart:{
			options:chartCreationService.createDonutChartData(),
			data:[]
		}
	};
	if($scope.defectsCharts.piechart.data.length==0){
		s4TabService.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
			$scope.defectsCharts.piechart.data = response;
		});		
	}
	
	if($scope.defectsCharts.donutchart.data.length ==0){
		s4TabService.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
			$scope.defectsCharts.donutchart.data =  response;
		});
	}
	$scope.defectsCharts.piechart.options.chart.callback =  function(chart) {
				console.log(chart);
				chart.pie.dispatch.on('elementClick', function(e){
					s4TabService.getData(getFileName('defects_BY_COMPTYPE')).then(function(response){
						$scope.defectsCharts.donutchart.data =  response;
						console.log('elementClick in callback',response); 
					});                           
				});
				
			}
	
	$scope.performanceCharts = {
		view1:'piechart',
		view2:'donutchart',
		callBackCheck:false,
		piechart:{
			options:chartCreationService.createPieChartData(false),
			data:[]
		},
		linechart:{
			options:chartCreationService.createLineChartData(false),
			data:[]
		},
		donutchart:{
			options:chartCreationService.createDonutChartData(false),
			data:[]
		}
	};
	s4TabService.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
		$scope.performanceCharts.piechart.data = response;
	});		
	s4TabService.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
		$scope.performanceCharts.linechart.options  = response;
	});
	
	s4TabService.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
		$scope.performanceCharts.donutchart.data =  response;
	});
	$scope.usageCharts = {
		view1:'piechart',
		view2:'donutchart',
		piechart:{
			options:chartCreationService.createPieChartData(false),
			data:[]
		},
		linechart:{
			options:chartCreationService.createLineChartData(false),
			data:[]
		},
		donutchart:{
			options:chartCreationService.createDonutChartData(false),
			data:[]
		}
	};
	s4TabService.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
		$scope.usageCharts.piechart.data = response;
	});		
	s4TabService.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
		$scope.usageCharts.linechart.options  = response;
	});
	
	s4TabService.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
		$scope.usageCharts.donutchart.data =  response;
	});
	
	
}]);
