reportsTool.factory('chartCreationService',['s4TabService',function(s4TabService){
	
	var chartCreationService = {};
	
	
	/* $scope.chart={
		view:'',
		callBackCheck:false,
		piechart:{
			options:[],
			data:[]
		},
		linechart:{
			options:[],
			data:[]
		},
		barchart:{
			options:[],
			data:[]
		},
		bubblechart:{
			options:[],
			data:[]
		},
		donutchart:{
			options:[],
			data:[]
		}
	}; */
	
	chartCreationService.createPieChartData= function(callbackRequired){
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
	return options;
	}
	chartCreationService.createLineChartData = function(data){
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
	chartCreationService.createDonutChartData = function(callbackRequired){
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
	
	
	return options;
	}
	chartCreationService.createBubbleChartData =  function(){
		var options = {
            chart: {
                type: 'scatterChart',
                height: 300,
				width:300,
                showLabels: true,
                duration: 500,
                showDistX: true,
				showDistY: true,
				forceX: [0, 100],
				forceY: [0, 100],
				color:['#ff7f0e'],
				xAxis: {
				  axisLabel: "X Axis",
				  axisLabelDistance: 5
			
				},
				yAxis: {
				  axisLabel: "Y Axis",
				  axisLabelDistance: 5
				},
				pointRange: [100, 100]
				
			}
        };
	
		
	return options;
	}
	chartCreationService.createBarChartData= function(){
		var options = {
		  "chart": {
			"type": "discreteBarChart",
			"height": 300,
			"showValues": true,
			"duration": 500,
			"xAxis": {
			  "axisLabel": "X Axis"
			},
			"yAxis": {
			  "axisLabel": "Y Axis",
			  "axisLabelDistance": 5
			}
		  }
		};
	
			
	return options;
	}
	
	return chartCreationService;
}]);