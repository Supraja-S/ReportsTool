reportsTool.controller('navController',['$scope','$location',function($scope,$location){
	
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
	$scope.navItems = [/* {
		description:'System Overview',
		linkCode:'/home',
		iconName:'dashboard'
	}, */
	{
		description:'Inventory',
		linkCode:'/inventory',
		iconName:'university',
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
		
	},
	];
	
	
}]);