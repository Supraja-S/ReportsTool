reportsTool.controller('s4Controller',['$scope','getFileContent','chartCreationService',function($scope,getFileContent,chartCreationService){

	$scope.selected = 'busFunctions';

	$scope.chart={
		view1:'pieChart',
        view2:'pieChart'
	};

    $scope.floatTheadOptions = {
        scrollContainer: function($table){
            return $table.closest('.tabular-data');
        }
    }

    getFileContent.getData(getFileName('S4HANA_COUNT_SUMMARY')).then(function(response){
        $scope.countSummary = response;
    });

    getFileContent.getData(getFileName('S4HANA_BF_BY_CATEGORY')).then(function(response){
        $scope.uniqueBFuncCateg = response;
    });

    getFileContent.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
        $scope.uniqueBFuncCompType = response;
    });

	$scope.options = chartCreationService.createPieChartData();

}]);