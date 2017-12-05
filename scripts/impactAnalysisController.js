
reportsTool.controller('ImpactController',['$scope','s4TabService','chartCreationService',function($scope,s4TabService,chartCreationService){
	$scope.selected = 'defects';
	$scope.orderByField = 'name';
  	$scope.reverseSort = false;
	$scope.showTable = false;
	$scope.scrolDown = false;
	$scope.tabularData = [] ;
	$scope.IncompabilitycountsArray = [];
	$scope.performanceCountsArray = [];
	$scope.usageCountsArray= [];
	$scope.typeArray=[];
	
	var bulgedArc = d3.svg.arc().outerRadius(105);
    var regularArc = d3.svg.arc().outerRadius(100)

	$scope.floatTheadOptions = {
        scrollContainer: function($table){
            return $table.closest('.tabular-data');
        }
    };

	if($scope.tabularData.length ==0){
		s4TabService.getData(getFileName('DEF_ECC_TABLE_SUMMARY')).then(function(response){
        	$scope.tabularData = response;
    	});
	}
	$scope.$watch('selected', function(n,o){
		$(window).trigger('resize'); 
		switch(n){
			case 'defects': generateIncompatibilityCharts();break;
			case 'performance': generatePerformaceCharts();break;
			case 'usage': generateUsageCharts();break;
			default: generateIncompatibilityCharts();break;
		}
	});

	$scope.updateChartType =  function(type,chartSection){
		$scope.defectFilter = type;
		$scope.defectsCharts.view2='donutchart';
		if($scope.defectObjecyType){
			var file_name = 'DEF_ECC_'+$scope.defectObjecyType+'_'+type+'_SUMMARY';	
		}else{
			var file_name = 'DEF_ECC_'+type+'_SUMMARY';	
		}
		
		//console.log(file_name)
		s4TabService.getData(getFileName(file_name)).then(function(response){
			//console.log(response);
				$scope.defectsCharts.donutchart.data = response;
			
			});
	};
	function generateIncompatibilityCharts(){
		
		$scope.defectFilter = 'COMPLEXITY';
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

		if($scope.IncompabilitycountsArray.length == 0){
			s4TabService.getData(getFileName('DEF_ECC_COUNT_SUMMARY')).then(function(response){
				$scope.IncompabilitycountsArray = response;
			});
		}

		if($scope.defectsCharts.piechart.data.length==0){
			s4TabService.getData(getFileName('DEF_ECC_SUMMARY')).then(function(response){
				$scope.defectsCharts.piechart.data = response;
			});		
		}
		
		if($scope.defectsCharts.donutchart.data.length ==0){
			s4TabService.getData(getFileName('DEF_ECC_COMPLEXITY_SUMMARY')).then(function(response){
				$scope.defectsCharts.donutchart.data =  response;
			
			});
		}
		$scope.defectsCharts.piechart.options.chart.callback =  function(chart) {
				//console.log(chart.pie);
				var prevArc = null;
				chart.pie.dispatch.on('elementClick', function(e){
					$scope.defectObjecyType = e.data.Obj;
					var file_name = 'DEF_ECC_'+e.data.Obj+'_'+$scope.defectFilter+'_SUMMARY';
					s4TabService.getData(getFileName(file_name)).then(function(response){

						$scope.defectsCharts.donutchart.data = response;
						//$scope.defectsCharts.donutchart.data =  response;
					});
					if(prevArc){
		                d3.select(prevArc).classed('clicked', false);
		                d3.select(prevArc).select("path").transition().duration(70).attr('d', regularArc);
		            }
		            d3.select(e.element).classed('clicked', true);
		            d3.select(e.element).select("path").transition().duration(70).attr('d', bulgedArc);     
		            prevArc = e.element;                      
			});
				
		}
	}
	function generatePerformaceCharts(){
		$scope.defectFilter = 'COMPLEXITY';
		s4TabService.getData(getFileName('PER_ECC_COUNT_SUMMARY')).then(function(response){
			$scope.performanceCountsArray = response;
		});	
		var fetchSubObjChartData = function(objType){
	        var fileName = 'PER_ECC_' + objType + '_SUMMARY';
	        s4TabService.getData(getFileName(fileName)).then(function(response){
	            $scope.performanceCharts.donutchart.data  = response;
	        });
	        fetchTableData(objType);
	    }
	    var fetchTableData = function(objType){
			$scope.performanceTableDataFile = 'PER_ECC_' + objType;
	        s4TabService.getData(getFileName($scope.performanceTableDataFile)).then(function(response){
	            $scope.performanceTableheader = response[0];
	            response.splice(0,1)
	            $scope.performanceTableData = response;
	        });
	        $rootScope.showLoader = false;
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
		if($scope.performanceCharts.piechart.data.length==0){
			s4TabService.getData(getFileName('PER_ECC_SUMMARY')).then(function(response){
				$scope.performanceCharts.piechart.data = response;
				$scope.defaultObjType =  response[0].obj;
				fetchSubObjChartData($scope.defaultObjType);
			});		
			
		}
		
		
		
		$scope.performanceCharts.piechart.options.chart.callback =  function(chart) {
			//console.log(chart);
			var prevArc = null;
			chart.pie.dispatch.on('elementClick', function(e){
					$rootScope.showLoader = true;
					fetchSubObjChartData(e.data.obj);
					
					if(prevArc){
		                d3.select(prevArc).classed('clicked', false);
		                d3.select(prevArc).select("path").transition().duration(70).attr('d', regularArc);
		            }
		            d3.select(e.element).classed('clicked', true);
		            d3.select(e.element).select("path").transition().duration(70).attr('d', bulgedArc);     
		            prevArc = e.element;                   
			});
			
		}
	
	}
	function generateUsageCharts(){
		$scope.defectFilter = 'COMPLEXITY';
		s4TabService.getData(getFileName('DEF_ECC_COUNT_SUMMARY')).then(function(response){
			$scope.usageCountsArray = response;
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
		
		$scope.usageCharts.piechart.options.chart.callback =  function(chart) {
			//console.log(chart);
			var prevArc = null;
			chart.pie.dispatch.on('elementClick', function(e){
					var file_name = 'DEF_ECC_'+e.data.Obj+'_'+$scope.defectFilter+'_SUMMARY';
					s4TabService.getData(getFileName(file_name)).then(function(response){

						$scope.usageCharts.donutchart.data  = response;
						//$scope.defectsCharts.donutchart.data =  response;
					});
					if(prevArc){
		                d3.select(prevArc).classed('clicked', false);
		                d3.select(prevArc).select("path").transition().duration(70).attr('d', regularArc);
		            }
		            d3.select(e.element).classed('clicked', true);
		            d3.select(e.element).select("path").transition().duration(70).attr('d', bulgedArc);     
		            prevArc = e.element;                                 
			});
			
		}
		s4TabService.getData(getFileName('DEF_ECC_SUMMARY')).then(function(response){
			$scope.usageCharts.piechart.data = response;
		});		
			
		
		if($scope.usageCharts.donutchart.data.length ==0){
			s4TabService.getData(getFileName('DEF_ECC_COMPLEXITY_SUMMARY')).then(function(response){
				$scope.usageCharts.donutchart.data = response;
			
			});
		}
	}

		
}]);
