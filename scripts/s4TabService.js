reportsTool.factory('s4TabService',['$http','$q',function($http,$q){
	var s4TabService = {};

	s4TabService.getData = function(fname){
		var deferred = $q.defer();
		
		/*Development section - uncomment when using node server command instead of app*/

		/*$http({
			url: "/getFileContent",
			method: "GET",
			contentType : "application/json; charset=utf-8",
			params: {fileName : 'data/'+fname},
		}).
		then(function successCallback(response){
			deferred.resolve(response.data);
		}, function errorCallback(response){
			deferred.reject(response.data);
		})
		return deferred.promise;*/

		/*Development section - comment when using node server command instead of app*/
		var response =getFileContent('data/'+fname);
		deferred.resolve(response);
		
		return deferred.promise;
	};

	return s4TabService;
}]);