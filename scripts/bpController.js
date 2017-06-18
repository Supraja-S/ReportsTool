reportsTool.controller('bpController',['$scope','s4TabService','chartCreationService',function($scope,s4TabService,chartCreationService){
	
	$scope.selected = 'summary'; 
	$scope.bpCount = 0;
	$scope.fioriCount = 0;
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
			data:[]
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
	if($scope.bpCharts.bubblechart.data.length == 0 ){
		s4TabService.getData(getFileName('BP_COUNT_BY_OBJECT_BUBBLE')).then(function(response){
			var groups = [] ;
			var j=0;
			for(var i=0;i<response.length;i++){
				if(i===0){
					groups[j]=response[i].group;
					j++;
				}
				if(response[i+1] && response[i].group != response[i+1].group){
					groups[j]=response[i+1].group;
					j++;
				}
				
			}
			for (i = 0; i < groups.length; i++) {
			    $scope.bpCharts.bubblechart.data.push({
			      key:groups[i],
			      values: []
			    });
			}
			for (i = 0; i < groups.length; i++) {
				for(var j=0;j<response.length;j++){
					if(groups[i] === response[j].group){

						$scope.bpCharts.bubblechart.data[i].values.push({
							y:response[i].y,
							x:response[i].x,
							size:response[i].size
						});
					}
				}
			}
			console.log($scope.bpCharts.bubblechart.data)

			//$scope.bpCharts.bubblechart.data[0].values=  response;
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
		s4TabService.getData(getFileName('FIROIE_COUNT_BY_OBJECT_BAR')).then(function(response){
			$scope.fioriCharts.barchart.data[0].values =  response;
			for (i = 0; i < response.length; i++) {
			   $scope.fioriCount += parseInt(response[i].y);
			}
		});
	}
	
	s4TabService.getData(getFileName('BP_data')).then(function(response){
        $scope.tabularData = response;
    });
	
	if($scope.fioriData.length == 0){
		s4TabService.getData(getFileName('Fiorie_data')).then(function(response){
	        $scope.fioriData = response;
	    });
	}
}]);
