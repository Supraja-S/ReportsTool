var  mapTextFile;
var S4Data;
var request = $.ajax({
  url: "/getFileContent",
  method: "GET",
  data: { fileName : 'data/SAPUATProp.Properties' },
});
request.done(function( response ) {
  mapTextFile = response;
});
request.fail(function( jqXHR, textStatus ) {
  console.log('error');
});


//var  mapTextFile = getFileContent("data/SAPUATProp.Properties");

function getFileName(key){
	var fileName =null;
	$.each(mapTextFile,function(index,item){
		if(item.KEY == key){
			fileName = item.VALUE;
			return false;
		}
	});
	
	return fileName;
}

function findWhere(dataSource,column,key){
	var val =null;
	$.each(dataSource,function(index,item){
		if(item[column] == key){
			val = item;
			return false;
		}
	});
	
	return val;
}


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
