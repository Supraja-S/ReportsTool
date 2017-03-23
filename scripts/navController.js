reportsTool.controller('navController',['$scope','$location',function($scope,$location){
	
	$scope.getClass = function (path) {
	  return ($location.path().substr(0, path.length) === path) ? 'active' : '';
	} 
	$scope.navItems = [{
		description:'System Overview',
		linkCode:'/home',
		iconName:'dashboard'
	},
	{
		description:'Impact Ananlysis',
		linkCode:'/impact',
		iconName:'bar-chart'
	},
	{
		description:'S/4Hana',
		linkCode:'/sFour',
		iconName:'mixcloud'
	},
	{
		description:'Business Process',
		linkCode:'/bpview',
		iconName:'tasks',
		
	}];
	
	
}]);