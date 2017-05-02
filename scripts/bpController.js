reportsTool.controller('bpController',['$scope','s4TabService','chartCreationService',function($scope,s4TabService,chartCreationService){
	
	/*Business process charts*/
	$scope.bpCharts = {
		view1:'piechart',
		view2:'donutchart',
		piechart:{
			options:chartCreationService.createPieChartData(),
			data:[]
		},
		
		bubblechart:{
			options:chartCreationService.createBubbleChartData(),
			data:[{
				key:'sample Group',
				values:[]
			}]
		}
	};
	$scope.fioriData = [];
	if($scope.bpCharts.piechart.data.length == 0){
		s4TabService.getData(getFileName('BP_COUNT_BY_OBJECT')).then(function(response){
			$scope.bpCharts.piechart.data = response;
		});	
	}
	if($scope.bpCharts.bubblechart.data[0].values){
		s4TabService.getData(getFileName('BP_COUNT_BY_OBJECT_BUBBLE')).then(function(response){
			$scope.bpCharts.bubblechart.data[0].values=  response;
		});
	}
	/*Fiori charts*/
	$scope.fioriCharts = {
		view:'barchart',
		barchart:{
			options:chartCreationService.createBarChartData(),
			data:[{
				key:'Cumulative Return',
				values:[]
			}]
		}
	};
	
	if($scope.fioriCharts.barchart.data[0].values.length ==0){
		s4TabService.getData(getFileName('BP_COUNT_BY_OBJECT_BAR')).then(function(response){
			$scope.fioriCharts.barchart.data[0].values =  response;
		});
	}
	
	
	
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
	
	if($scope.fioriData.length == 0){
	s4TabService.getData(getFileName('Fiorie_data')).then(function(response){
        $scope.fioriData = response;
    });
	}
}]);
