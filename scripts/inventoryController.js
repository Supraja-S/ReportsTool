reportsTool.controller('inventoryController',['$scope','getFileContent','chartCreationService',function($scope,getFileContent,chartCreationService){

    var bulgedArc = d3.svg.arc().outerRadius(105);
    var regularArc = d3.svg.arc().outerRadius(100);

    $scope.chart={
        view1:'pieChart',
        view2:'donutchart'
    };

    $scope.floatTheadOptions = {
        scrollContainer: function($table){
            return $table.closest('.tabular-data');
        }
    };

    getFileContent.getData(getFileName('INV_ECC_COUNT')).then(function(response){
        $scope.countSummary = response;
        console.log($scope.countSummary);
    });

    getFileContent.getData(getFileName('INV_ECC_SUMMARY')).then(function(response){
        $scope.objSummary = response;
        $scope.defaultObjType = $scope.objSummary[0]['OBJTYPE'];
        $scope.objTypeDataFile = 'INV_ECC' + $scope.defaultObjType + '_DATA';

        fetchSubObjChartData($scope.defaultObjType);

    });    

    var fetchSubObjChartData = function(objType){
        var fileName = 'INV_ECC_' + objType + '_SUMMARY';
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

    $scope.pieOptions = chartCreationService.createPieChartData();
    $scope.donutOptions = chartCreationService.createDonutChartData();

	$scope.pieOptions.chart.callback = function(chart) {
        var prevArc = null;
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
    }

}]);