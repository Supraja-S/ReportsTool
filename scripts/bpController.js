reportsTool.controller('bpController',['$scope','s4TabService','chartCreationService',function($scope,s4TabService,chartCreationService){
	
	$scope.selected = 'summary'; 
	$scope.bpCount = 0;
	$scope.fioriCount = 0;

	$scope.floatTheadOptions = {
        scrollContainer: function($table){
            return $table.closest('.tabular-data');
        }
    };
	/*Business process charts*/
	$scope.bpCharts = {
		view1:'piechart',
		view2:'donutchart',
		piechart:{
			options:chartCreationService.createPieChartData(),
			data:[]
		},
		
		complexity:{
			options:chartCreationService.createBarChartData(),
			data:[{
				key:'complexity',
				values:[]
			}]
		},
		migration:{
			options:chartCreationService.createBarChartData(),
			data:[{
				key:'Migration',
				values:[]
			}]
		}
	};
	$scope.fioriData = [];
	if($scope.bpCharts.piechart.data.length == 0){
		s4TabService.getData(getFileName('BP_COUNT_BY_OBJECT')).then(function(response){
			$scope.bpCharts.piechart.data = response;
			for (i = 0; i < response.length; i++) {
			   $scope.bpCount += parseInt(response[i].y);
			}
		});	
		
	}

	$scope.$watch('bpCharts.view2',function(n){
		if(n === 'COMPLEXITY'){
			if($scope.bpCharts.complexity.data[0].values.length == 0 ){
				var fileName = 'BP_COUNT_BY_OBJECT_'+n;
				s4TabService.getData(getFileName(fileName)).then(function(response){
					$scope.bpCharts.complexity.data[0].values  = response;
				});
			}
		}else if(n === 'MIGRATION'){
			if($scope.bpCharts.migration.data[0].values.length == 0 ){
				var fileName = 'BP_COUNT_BY_OBJECT_'+n;
				s4TabService.getData(getFileName(fileName)).then(function(response){
					$scope.bpCharts.migration.data[0].values  = response;
				});
			}
		}
		console.log($scope.bpCharts);
	})
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
		s4TabService.getData(getFileName('FIROIE_COUNT_BY_OBJECT_BAR')).then(function(response){
			$scope.fioriCharts.barchart.data[0].values =  response;
			for (i = 0; i < response.length; i++) {
			   $scope.fioriCount += parseInt(response[i].y);
			}
		});
	}
	
	if($scope.fioriData.length == 0){
		s4TabService.getData(getFileName('Fiorie_data')).then(function(response){
	        $scope.fioriData = response;
	    });
	}
}]);
