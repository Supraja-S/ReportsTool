reportsTool.controller('inventoryController',['$scope','getFileContent',function($scope,getFileContent){
	$scope.orderByField = '';
  	$scope.reverseSort = false;

    $scope.tabularData = '';

    $scope.chart={
        view1:'pieChart',
        view2:'donutchart'
    };

    $scope.searchCategory = "COMPONENT";
    $scope.searchText = "";

    getFileContent.getData(getFileName('INV_OBJ_SUMMARY')).then(function(response){
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
        var fileName = 'INV_' + objType + '_DATA';
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
            showLabels: false,
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
            callback: function(chart) {
                chart.pie.dispatch.on('elementClick', function(e){
                    fetchSubObjChartData(e.data['OBJTYPE']);                      
                });
            }
        }
    };

    $scope.donutOptions = {
        chart: {
            type: 'pieChart',
            height: 300,
            x: function(d){return d.key;},
            y: function(d){return d.value;},
            showLabels: false,
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

}]);