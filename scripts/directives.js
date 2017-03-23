
reportsTool.directive('tableToggler', ['$injector',function($injector){
	return {
		restrict: 'C',
		link: function(scope, element, attrs){
			var fileService;
			if(attrs.fileService){
				 fileService  = $injector.get([attrs.fileService]);
			}
			element.on('click', function(e){
				if(!scope.tabularData && fileService != undefined){
					 fileService.getData(getFileName(attrs.fileName)).then(function(response){
						scope.tabularData = response;
					});
				}
				scope.$apply(function () {
					scope.showTable  = !scope.showTable ;
					scope.scrollDown = !scope.scrollDown;
				
					
				})
				var scrollValue = scope.scrollDown? document.body.scrollHeight:0;
				$('html, body').animate({ scrollTop:scrollValue }, 800);
			});
		}
	}	
}]);
