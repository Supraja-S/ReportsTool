
reportsTool.controller('ImpactController',['$scope',function($scope){
	$scope.selected = 'defects';
	$scope.orderByField = 'name';
  	$scope.reverseSort = false;
	$scope.showTable = false;
	$scope.scrolDown = false;
	
	$scope.toggleTableData= function(){
		$scope.showTable  = !$scope.showTable ;
		$scope.scrolDown = !$scope.scrolDown;
		var scrollValue = $scope.scrolDown? document.body.scrollHeight:0;
		
		$('html, body').animate({ scrollTop:scrollValue }, 800);
	};	
	
	$scope.IncompabilitycountsArray = [
	{
		count:100,
		color:'blue',
		description:'Total Defects'
	},
	{
		color:'red',
		count:33,
		description:'High impact'
	},
	
	{
		count:3,
		color:'green',
		description:'Low impact'
	}
	
	]
	$scope.tabularData = [
	{
			name:'object1',
			value1:'value1',
			value2:'value2'
			
		},
		{
			name:'object2',
			value1:'value1',
			value2:'value2'
			
		},
		{
			name:'object3',
			value1:'value1',
			value2:'value2'
			
		},
		{
			name:'object4',
			value1:'value1',
			value2:'value2'
			
		},
		{
			name:'object5',
			value1:'value1',
			value2:'value2'
			
		},
		{
			name:'object1',
			value1:'value1',
			value2:'value2'
			
		}
	];
}]);
