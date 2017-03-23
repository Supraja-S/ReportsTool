reportsTool.controller('chartController',['$scope',function($scope){
	$scope.chart={
		view:'',
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
		}
	};
	function createPieChartData(data){
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
	
		var data = [
		{
			key: "One",
			y: 5
		},
		{
			key: "Two",
			y: 2
		},
		{
			key: "Three",
			y: 9
		},
		{
			key: "Four",
			y: 7
		},
		{
			key: "Five",
			y: 4
		},
		{
			key: "Six",
			y: 3
		},
		{
			key: "Seven",
			y: .5
		}
	];
		return [options, data];
	}
	function createLineChartData(data){
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
	function createDonutChartData(data){
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
	
		var data = [
		{
			key: "One",
			y: 5
		},
		{
			key: "Two",
			y: 2
		},
		{
			key: "Three",
			y: 9
		},
		{
			key: "Four",
			y: 7
		},
		{
			key: "Five",
			y: 4
		},
		{
			key: "Six",
			y: 3
		},
		{
			key: "Seven",
			y: .5
		}
	];
		return [options, data];
	}
	function createBubbleChartData(data){
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
	
		var data = [{
		key:'sample Group',
		values:[
			{
			  y: 20,
			  x: 10,
			  size:5
			},
			{
			  y: 20,
			  x: 30,
			  size:5
			},
			{
			  y: 30,
			  x: 40,
			  size:5
			},
			{
			  y: 70,
			  x: 40,
			  size:5
			},
			{
			  y: 50,
			  x: 100,
			  size:5
			},
			{
			  y: 60,
			  x: 80,
			  size:5
			},
			{
			  y: 70,
			  x: 50,
			  size:5
			}
		]
	    }]	
		return [options, data];
	}
	function createBarChartData(data){
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
	
		var data = [{
			
        key: "Cumulative Return",
		values:[
			{
			  y: 20,
			  x: 10,
			},
			{
			  y: 20,
			  x: 30,
			},
			{
			  y: 30,
			  x: 40,
			},
			{
			  y: 70,
			  x: 40,
			},
			{
			  y: 50,
			  x: 100,
			},
			{
			  y: 60,
			  x: 80,
			},
			{
			  y: 70,
			  x: 50,
			}
		]
	    }]	
		return [options, data];
	}
	$scope.$watch('chart.view',function(newVal, oldVal){
		switch(newVal){
			
		case 'pieChart':
				var results = createPieChartData();
				$scope.chart.piechart.options= results[0];
				$scope.chart.piechart.data= results[1];
				break;
			
		case 'lineChart' : 
				var results = createLineChartData();
				$scope.chart.linechart.options= results[0];
				$scope.chart.linechart.data= results[1];
				break;
		case 'donutChart':	
				var results = createDonutChartData();
				$scope.chart.piechart.options= results[0];
				$scope.chart.piechart.data= results[1];
				break;
		case 'bubbleChart' : 
				var results = createBubbleChartData();
				$scope.chart.bubblechart.options= results[0];
				$scope.chart.bubblechart.data= results[1];
				break;
		case 'barChart' : 
				var results = createBarChartData();
				$scope.chart.barchart.options= results[0];
				$scope.chart.barchart.data= results[1];
				break;
		}
	});
	
	
	/* var fileContent = getFileContent('data/' +getFileName("DEF_" + systemID + "_SUMMARY"));
	console.log(fileContent); */
	
}]);