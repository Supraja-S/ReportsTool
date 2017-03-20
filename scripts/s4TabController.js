reportsTool.controller('s4Controller',['$scope','s4TabService',function($scope,s4TabService){
	$scope.orderByField = '';
  	$scope.reverseSort = false;
	$scope.selected = 'busFunctions';

    //$scope.supportedCount = 0;
    //$scope.notSupportedCount = 0;

    $scope.showTable = false;
    $scope.scrolDown = false;
    $scope.tabularData = '';


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

    s4TabService.getData(getFileName('S4HANA_COUNT_SUMMARY')).then(function(response){
        $scope.countSummary = response;
    });

    s4TabService.getData(getFileName('S4HANA_BF_BY_CATEGORY')).then(function(response){
        $scope.uniqueBFuncCateg = response;
    });

    s4TabService.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
        $scope.uniqueBFuncCompType = response;
    });

	
    $scope.sortFunction = function(key){
        $scope.orderByField = key;
        $scope.reverseSort = !$scope.reverseSort;
    };

    $scope.toggleTableData= function(){
        if(!$scope.tabularData){
            s4TabService.getData(getFileName('S4HANA_DATA')).then(function(response){
                $scope.tabularData = response;
            });
        }
        $scope.showTable  = !$scope.showTable ;
        $scope.scrolDown = !$scope.scrolDown;
        var scrollValue = $scope.scrolDown? document.body.scrollHeight:0;
        
        $('html, body').animate({ scrollTop:scrollValue }, 800);
    };

	 $scope.options = {
        chart: {
            type: 'pieChart',
            height: 300,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
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

    $scope.data = [
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

}]);