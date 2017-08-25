reportsTool.controller('inventoryController',['$scope','getFileContent',function($scope,getFileContent){

    var bulgedArc = d3.svg.arc().outerRadius(105);
    var regularArc = d3.svg.arc().outerRadius(100);
    var prevArc = null;

    $scope.chart={
        view1:'pieChart',
        view2:'donutchart'
    };

    $scope.floatTheadOptions = {
        scrollContainer: function($table){
            return $table.closest('.tabular-data');
        }
    };

    getFileContent.getData(getFileName('INV_COUNT_SUMMARY')).then(function(response){
        $scope.countSummary = response;
        console.log($scope.countSummary);
    });

    getFileContent.getData(getFileName('INV_ECC_SUMMARY')).then(function(response){
        $scope.objSummary = response;
        $scope.defaultObjType = $scope.objSummary[0]['OBJTYPE'];
        $scope.objTypeDataFile = 'INV_' + $scope.defaultObjType + '_DATA';

        fetchSubObjChartData($scope.defaultObjType);

    });    

    var fetchSubObjChartData = function(objType){
        var fileName = 'INV_' + objType + '_SUMMARY';
        getFileContent.getData(getFileName(fileName)).then(function(response){
            $scope.subObjSummary = response;
        });
        fetchTableData(objType);
    }

    var fetchTableData = function(objType){
        var fileName = 'INV_ECC_' + objType;
        getFileContent.getData(getFileName(fileName)).then(function(response){
            $scope.objTypeHeader = response[0];
            response.splice(0,1);
            $scope.objTypeData = response;
        });
    };


	$scope.pieOptions = {
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
            callback: function(chart) {
                chart.pie.dispatch.on('elementClick', function(e){
                    fetchSubObjChartData(e.data['OBJTYPE']);
                    if(prevArc){
                        d3.select(prevArc).classed('clicked', false);
                        d3.select(prevArc).select("path").transition().duration(70).attr('d', regularArc);
                    }
                    d3.select(e.element).classed('clicked', true);
                    d3.select(e.element).select("path").transition().duration(70).attr('d', bulgedArc);     
                    prevArc = e.element;                   
                });
            },
            legendPosition: "right",
            showTooltipPercent: true,
            growOnHover: false
        }
    };

    $scope.donutOptions = {
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

}]);