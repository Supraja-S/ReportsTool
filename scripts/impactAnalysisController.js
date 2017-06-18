
reportsTool.controller('ImpactController',['$scope','s4TabService','chartCreationService',function($scope,s4TabService,chartCreationService){
	$scope.selected = 'defects';
	$scope.orderByField = 'name';
  	$scope.reverseSort = false;
	$scope.showTable = false;
	$scope.scrolDown = false;
	$scope.tabularData = [] ;
	
	$scope.toggleTableData= function(){
		$scope.showTable  = !$scope.showTable ;
		$scope.scrolDown = !$scope.scrolDown;
		var scrollValue = $scope.scrolDown? document.body.scrollHeight:0;
		
		$('html, body').animate({ scrollTop:scrollValue }, 800);
	};	
	
	s4TabService.getData(getFileName('defects_BY_count')).then(function(response){
			$scope.IncompabilitycountsArray = response;
	});	
	if($scope.tabularData.length ==0){
		s4TabService.getData(getFileName('DEF_ECC_PROG_20140716_182107')).then(function(response){
        	$scope.tabularData = response;
    	});
	}
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
		s4TabService.getData(getFileName('defects_BY_COMPTYPE')).then(function(response){
			$scope.defectsCharts.piechart.data = response;
		});		
	}
	
	if($scope.defectsCharts.donutchart.data.length ==0){
		s4TabService.getData(getFileName('defects_BY_COMPTYPE_complexity')).then(function(response){
			generateDonutdata(response,'')
		
		});
	}
	$scope.defectsCharts.piechart.options.chart.callback =  function(chart) {
				console.log(chart.pie);
				chart.pie.dispatch.on('elementClick', function(e){
					s4TabService.getData(getFileName('defects_BY_COMPTYPE_complexity')).then(function(response){

						generateDonutdata(response,e.data.key)
						//$scope.defectsCharts.donutchart.data =  response;
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
	$scope.performanceCharts.piechart.options.chart.callback =  function(chart) {
		console.log(chart);
		chart.pie.dispatch.on('elementClick', function(e){
			s4TabService.getData(getFileName('defects_BY_COMPTYPE')).then(function(response){
				$scope.performanceCharts.donutchart.data =  response;
				console.log('elementClick in callback',response); 
			});                           
		});
		
	}
	
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
	$scope.floatTheadOptions = {
		        scrollContainer: function($table){
		            return $table.closest('.center-section');
		        }
		    };
	 
	function generateDonutdata(response,compType){
		var internalData = [] , complexityArry=['High','Medium','Low'];

		if(compType === ''){
			for(var j=0;j<complexityArry.length;j++){
				var count = 0;
				for(var i=0;i<response.length;i++){
					
					count = count+parseInt(response[i][complexityArry[j]]);
				}	
				internalData.push({
					key:complexityArry[j],
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
			for(var j=0;j<complexityArry.length;j++){
				internalData.push({
					key:complexityArry[j],
					y:compObject[complexityArry[j]]
				});
			}
		}
		$scope.defectsCharts.donutchart.data =  internalData;
		
	}
	
		
}]);
