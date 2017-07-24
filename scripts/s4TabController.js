reportsTool.controller('s4Controller',['$scope','getFileContent',function($scope,getFileContent){

	$scope.selected = 'busFunctions';

	$scope.chart={
		view1:'pieChart',
        view2:'pieChart'
	};

    getFileContent.getData(getFileName('S4HANA_COUNT_SUMMARY')).then(function(response){
        $scope.countSummary = response;
    });

    getFileContent.getData(getFileName('S4HANA_BF_BY_CATEGORY')).then(function(response){
        $scope.uniqueBFuncCateg = response;
    });

    getFileContent.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
        $scope.uniqueBFuncCompType = response;
    });

	 $scope.options = {
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
            }
        }
    };

}]);