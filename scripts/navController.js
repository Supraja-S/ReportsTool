reportsTool.controller('navController',['$scope','$location','getFileContent',function($scope,$location,getFileContent){
	
	$scope.getClass = function (path) {
		var locationPath = $location.path().substr(0, path.length);
		console.log(locationPath);
		//remove the ifelse once summary tab is uncommented
		if(locationPath =='/home' && path == '/inventory'){
			return 'active';
		}else{
			return ($location.path().substr(0, path.length) === path) ? 'active' : '';
		} 
	}
	  getFileContent.getData(getFileName('Tabs')).then(function(response){
        $scope.navItems  = response;
        console.log($scope.countSummary);
    });
	
	
	
}]);