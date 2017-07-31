
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
	
	$scope.typeArray['COMPLEXITY'] = ['High','Medium','Low'];
	$scope.typeArray['SEVERITY'] = ['Warning','MustFix','Suggestive'];
	$scope.typeArray['ERROR'] = ['Obsolete','Syntax','Unicode','SecondaryIndex','Pool/ClusterTable','ALV'];

	$scope.floatTheadOptions = {
        scrollContainer: function($table){
            return $table.closest('.tabular-data');
        }
    };

	if($scope.tabularData.length ==0){
		s4TabService.getData(getFileName('DEF_ECC_PROG_20140716_182107')).then(function(response){
        	$scope.tabularData = response;
    	});
	}
	$scope.$watch('selected', function(n,o){
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

		var file_name = 'defects_BY_COMPTYPE_'+type;
		console.log(file_name)
		s4TabService.getData(getFileName(file_name)).then(function(response){
			console.log(response);
				$scope.defectsCharts.donutchart.data =  generateDonutdata(response,'',type)
			
			});
	};
	function generateIncompatibilityCharts(){
		
		
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
			s4TabService.getData(getFileName('defects_BY_count')).then(function(response){
				$scope.IncompabilitycountsArray = response;
			});
		}

		if($scope.defectsCharts.piechart.data.length==0){
			s4TabService.getData(getFileName('defects_BY_COMPTYPE')).then(function(response){
				$scope.defectsCharts.piechart.data = response;
			});		
		}
		
		if($scope.defectsCharts.donutchart.data.length ==0){
			s4TabService.getData(getFileName('defects_BY_COMPTYPE_COMPLEXITY')).then(function(response){
				$scope.defectsCharts.donutchart.data =  generateDonutdata(response,'','COMPLEXITY')
			
			});
		}
		$scope.defectsCharts.piechart.options.chart.callback =  function(chart) {
				console.log(chart.pie);
				chart.pie.dispatch.on('elementClick', function(e){
					var file_name = 'defects_BY_COMPTYPE_'+$scope.defectFilter;
				s4TabService.getData(getFileName(file_name)).then(function(response){

					$scope.defectsCharts.donutchart.data = generateDonutdata(response,e.data.key,$scope.defectFilter)
					//$scope.defectsCharts.donutchart.data =  response;
				});                           
			});
				
		}
	}
	function generatePerformaceCharts(){
		$scope.defectFilter = 'COMPLEXITY';
		s4TabService.getData(getFileName('Performance_defects_BY_count')).then(function(response){
			$scope.performanceCountsArray = response;
		});	
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
			s4TabService.getData(getFileName('defects_BY_COMPTYPE')).then(function(response){
				$scope.performanceCharts.piechart.data = response;
			});		
		}
		
		if($scope.performanceCharts.donutchart.data.length ==0){
			s4TabService.getData(getFileName('defects_BY_COMPTYPE_COMPLEXITY')).then(function(response){
				$scope.performanceCharts.donutchart.data = generateDonutdata(response,'','COMPLEXITY')
			
			});
		}
		if($scope.performanceCharts.linechart.data.length ==0){
			s4TabService.getData(getFileName('defects_BY_COMPTYPE_COMPLEXITY')).then(function(response){
				$scope.performanceCharts.linechart.data = response;
			
			});
		}
		$scope.performanceCharts.piechart.options.chart.callback =  function(chart) {
			console.log(chart);
			chart.pie.dispatch.on('elementClick', function(e){
					var file_name = 'defects_BY_COMPTYPE_'+$scope.defectFilter;
				s4TabService.getData(getFileName(file_name)).then(function(response){

					$scope.performanceCharts.donutchart.data  = generateDonutdata(response,e.data.key,$scope.defectFilter)
					//$scope.defectsCharts.donutchart.data =  response;
				});                   
			});
			
		}
	
	}
	function generateUsageCharts(){
		s4TabService.getData(getFileName('Usage_defects_BY_count')).then(function(response){
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
			console.log(chart);
			chart.pie.dispatch.on('elementClick', function(e){
				s4TabService.getData(getFileName('defects_BY_COMPTYPE')).then(function(response){
					$scope.usageCharts.donutchart.data =  response;
					console.log('elementClick in callback',response); 
				});                           
			});
			
		}
		s4TabService.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
			$scope.usageCharts.piechart.data = response;
		});		
		s4TabService.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
			$scope.usageCharts.linechart.options  = response;
		});
		
		s4TabService.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
			$scope.usageCharts.donutchart.data =  response;
		});
	}
	function generateDonutdata(response,compType,type){
		var internalData = [] , typeArray=$scope.typeArray[type];

		if(compType === ''){
			for(var j=0;j<typeArray.length;j++){
				var count = 0;
				for(var i=0;i<response.length;i++){
					
					count = count+parseInt(response[i][typeArray[j]]);
				}	
				internalData.push({
					key:typeArray[j],
					y:count
				});
			}

			
		}else{
			var compObject = {};
			for(var i=0;i<response.length;i++){
					if(compType == response[i].compType){
						compObject = response[i];
						break;
					}
				}
			for(var j=0;j<typeArray.length;j++){
				internalData.push({
					key:typeArray[j],
					y:compObject[typeArray[j]]
				});
			}
		}
		return internalData;
		
	}
	
		
}]);
