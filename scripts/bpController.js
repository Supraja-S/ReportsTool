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
		view2:'COMPLEXITY',
		piechart:{
			options:chartCreationService.createPieChartData(),
			data:[]
		},
		
		complexity:{
			options:chartCreationService.createMultiBarChartData(),
			data:[  {  
                "key": "NOIMPACT", 
                "keyDescription":"No Impact",
                "color": "#d62728",  
                "values": []  
            },  
            {  	"key": "CONFLICT", 
                "keyDescription":"Conflict with Work around",
                "color": "#1f77b4",  
                "values": []  
            }  ]
		},
		migration:{
			options:chartCreationService.createMultiBarChartData(),
			data:[
			{
			       "key": "HIGH",  
	                "color": "#a22739",  
	                "values": []
		        },  
	            {  
	                "key": "LOW",  
	                "color": "#c85430",  
	                "values": []  
	            },
	              {  
	                "key": "MEDIUM",  
	                "color": "#c69d05",  
	                "values": []  
	            },
	              {  
	                "key": "NA",  
	                "color": "#0b2c5e",  
	                "values": []  
	            }

		        ]
		}
	};


	$scope.fioriData = [];
	if($scope.bpCharts.piechart.data.length == 0){
		s4TabService.getData(getFileName('BP_COUNT_BY_OBJECT')).then(function(response){
			$scope.bpCharts.piechart.data = response;
			for (i = 0; i < response.length; i++) {
			   $scope.bpCount += parseInt(response[i].value);
			}
		});	
		
	}

	$scope.$watch('bpCharts.view2',function(n){
		if(n === 'COMPLEXITY'){
			if($scope.bpCharts.complexity.data[0].values.length == 0 ){
					for (i = 0; i < $scope.bpCharts.complexity.data.length; i++) {
						var fileName = 'BP_COUNT_BY_OBJECT_'+$scope.bpCharts.complexity.data[i].key+'_'+n;
						getBpChartsData(fileName,i,$scope.bpCharts.complexity);
			  			
					}
				}
		}else if(n === 'MIGRATION'){
			if($scope.bpCharts.migration.data[0].values.length == 0 ){
					for (i = 0; i < $scope.bpCharts.migration.data.length; i++) {
						var fileName = 'BP_COUNT_BY_OBJECT_'+$scope.bpCharts.migration.data[i].key+'_'+n;
							
				
			  				 getBpChartsData(fileName,i,$scope.bpCharts.migration);
			  		
					}
				
			}
		}
		console.log($scope.bpCharts);
	});
	function getBpChartsData(fileName,index,target){
			s4TabService.getData(getFileName(fileName)).then(function(response){
				
	  				 target.data[index].values =  response;
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
		/*s4TabService.getData(getFileName('FIROIE_COUNT_BY_OBJECT_BAR')).then(function(response){
			$scope.fioriCharts.barchart.data[0].values =  response;
			for (i = 0; i < response.length; i++) {
			   $scope.fioriCount += parseInt(response[i].value);
			}
		});*/
	}
	
	if($scope.fioriData.length == 0){
		/*s4TabService.getData(getFileName('Fiorie_data')).then(function(response){
	        $scope.fioriData = response;
	    });*/
	}
}]);
