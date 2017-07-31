reportsTool.directive('toggleTable', ['$injector',function($injector){
	return {
		restrict: 'C',

		scope: {
			showTable: '=',
			scrollDown: '=',
			tabularData: '=',
			tabularHeader: '='
		},

		link: function(scope, element, attrs) {
			var fileService;
			if(attrs.fileService){
				 fileService  = $injector.get([attrs.fileService]);
			}
			element.on('click', function(e){
				if(!scope.tabularData && fileService != undefined){
					 fileService.getData(getFileName(attrs.fileName)).then(function(response){
					 	scope.tabularHeader = response[0];
					 	response.splice(0,1);
						scope.tabularData = response;
					});
				}
            	scope.$apply(function () {
					scope.showTable  = !scope.showTable ;
					scope.scrollDown = !scope.scrollDown;
				})
        	});
        }
	}	
}]);

reportsTool.directive('tableGenerate', [function(){
	return {
		restrict: 'E',
		scope: {
			tableHeader: '=',
			tabularData: '=',
		},
		templateUrl: 'table.html',
		controller: function($scope, $attrs){
  			$scope.reverseSort = false;
  			$scope.searchText = '';
  			$scope.searchCategory = '';
  			$scope.orderByField = '';
  			for(var key in $scope.tabularData[0]){
  				$scope.searchCategory = key;
  				break;
  			}
			$scope.sortFunction = function(key){
		        $scope.orderByField = key;
		        $scope.reverseSort = !$scope.reverseSort;
		    };
		    $scope.floatTheadOptions = {
		        scrollContainer: function($table){
		            return $table.closest('.center-section');
		        }
		    };
		    $scope.filterFunction = function(item) {
		        var val = item[$scope.searchCategory].toLowerCase();
		        return (val.indexOf($scope.searchText.toLowerCase()) > -1);
		    };
		},
		link: function(scope, element, attrs) {
			
        }
	}	
}]);
