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
                y: function(d){return d.value;},
                showLabels: true,
                labelType: "value",
                duration: 500,
                labelThreshold: 0.05,
                legend: {
                    margin: {
	                    top: 5,
	                    right: 35,
	                    bottom: 5,
	                    left: 0
	                }
                },
				legendPosition: "right",
	            showTooltipPercent: true,
	            growOnHover: false

            }
        };
	return options;
	}
	chartCreationService.createLineChartData = function(data){
		 var options = {
            chart: {
                type: 'lineChart',
                margin: 300,
                showLabels: false,
				useInteractiveGuideline:true,
				transitionDuration:350,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 0,
                        bottom: 5,
                        left: 100
                    }
                },
                legendPosition: "right"
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
	            y: function(d){return d.value;},
	            showLabels: true,
	            labelType: "value",
	            duration: 500,
	            labelThreshold: 0.05,
	            legend: {
	                margin: {
	                    top: 5,
	                    right: 35,
	                    bottom: 5,
	                    left: 0
	                }
	            },
	            donut:true,
	            donutRatio:0.35,
	            legendPosition: "right",
	            showTooltipPercent: true,
	            growOnHover: false
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
                showLabels: false,
                duration: 500,
                showDistX: true,
				showDistY: true,
				forceX: [0, 100],
				forceY: [0, 100],
				color:d3.scale.category10().range(),
				xAxis: {
				  axisLabel: "X Axis",
				  axisLabelDistance: 5
			
				},
				yAxis: {
				  axisLabel: "Y Axis",
				  axisLabelDistance: 5
				},
				pointRange: [100, 100],
				legendPosition: "right"
				
			}
        };
	
		
	return options;
	}
	chartCreationService.createBarChartData= function(){
		var options = {
		  chart: {
			type: "discreteBarChart",
			x: function(d){return d.key;},
            y: function(d){return d.value;},
			height: 300,
			showValues: true,
			duration: 500,
			staggerLabels:true,
			xAxis: {
			  axisLabel: "X Axis",
			  rotateLabels:-45,
			  extraBottomOffset:10
			},
			yAxis: {
			  axisLabel: "Y Axis",
			  axisLabelDistance: 5
			},
			legendPosition: "right"
		  }
		};
	
			
	return options;
	}
	
	return chartCreationService;
}]);