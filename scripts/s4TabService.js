reportsTool.factory('s4TabService',['$http','$q',function($http,$q){
	var s4TabService = {};

	s4TabService.getData = function(fname){
		var deferred = $q.defer();
		$http({
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
		return deferred.promise;
	};

	return s4TabService;
}]);
//BF_Check_20161107114158.txt