reportsTool.controller('s4Controller',['$scope','getFileContent',function($scope,getFileContent){
	$scope.orderByField = '';
  	$scope.reverseSort = false;
	$scope.selected = 'busFunctions';

    //$scope.supportedCount = 0;
    //$scope.notSupportedCount = 0;

    $scope.tabularData = '';
	$scope.chart={
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
		}
	};

    $scope.searchCategory = "COMPONENT";
    $scope.searchText = "";
    /*$scope.floatTheadOptions = {
        scrollContainer: function($table){
            return $table.closest('.center-section');
        }
    };*/

    /*$scope.filterFunction = function(item) {
        var val = item[$scope.searchCategory].toLowerCase();
        return (val.indexOf($scope.searchText.toLowerCase()) > -1);
    };*/

	/*s4TabService.getData(getFileName('S4HANA_DATA')).then(function(response){
		$scope.tabularData = response;

        $scope.uniqueBFuncCateg = [];
        angular.forEach($scope.tabularData, function(value, index){
            if(value.CURRSTAT == 'ON'){
                var found = false;
                for(var i=0; i<$scope.uniqueBFuncCateg.length; i++){
                    if($scope.uniqueBFuncCateg[i].key == value.BFUNCCATEG){
                        $scope.uniqueBFuncCateg[i].y++;
                        found = true;
                        break;
                    }
                }

                if(!found){
                    $scope.uniqueBFuncCateg.push({key:value.BFUNCCATEG, y:1})
                }
            }
            if(value.FUTURESTAT == 'ON'){
                $scope.supportedCount++;
            }
            else if(value.FUTURESTAT == 'OFF'){
                $scope.notSupportedCount++;
            }
        });
	});*/

    getFileContent.getData(getFileName('S4HANA_COUNT_SUMMARY')).then(function(response){
        $scope.countSummary = response;
    });

    getFileContent.getData(getFileName('S4HANA_BF_BY_CATEGORY')).then(function(response){
        $scope.uniqueBFuncCateg = response;
    });

    getFileContent.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
        $scope.uniqueBFuncCompType = response;
    });

	
    /*$scope.sortFunction = function(key){
        $scope.orderByField = key;
        $scope.reverseSort = !$scope.reverseSort;
    };*/

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