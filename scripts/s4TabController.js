reportsTool.controller('s4Controller',['$scope','getFileContent','chartCreationService',function($scope,getFileContent,chartCreationService){

	$scope.selected = 'busFunctions';
    $scope.haveBFData = false;
    $scope.haveSYCMData = false;
    $scope.haveReadinessData = false;
    $scope.pieOptions = chartCreationService.createPieChartData();
    $scope.pieOptionsSYCM = chartCreationService.createPieChartData();
    $scope.pieOptionsReadiness = chartCreationService.createPieChartData();
    $scope.donutOptions = chartCreationService.createDonutChartData();
    var bulgedArc = d3.svg.arc().outerRadius(105);
    var regularArc = d3.svg.arc().outerRadius(100)

	$scope.chart={
		view1:'pieChart',
        view2:'pieChart'
	};

    $scope.floatTheadOptions = {
        scrollContainer: function($table){
            return $table.closest('.tabular-data');
        }
    }

    $scope.showTab = function(tabName){
        $scope.selected = tabName;
        getTabData(tabName);
    };

    var getTabData = function(tabName){
        switch(tabName){
            case 'busFunctions': 
                if(!$scope.haveBFData){
                    getFileContent.getData(getFileName('S4HANA_COUNT_SUMMARY')).then(function(response){
                        $scope.countSummary = response;
                    });

                    getFileContent.getData(getFileName('S4HANA_BF_BY_CATEGORY')).then(function(response){
                        $scope.uniqueBFuncCateg = response;
                    });

                    getFileContent.getData(getFileName('S4HANA_BF_BY_COMPTYPE')).then(function(response){
                        $scope.uniqueBFuncCompType = response;
                    }); 
                    $scope.haveBFData = true;
                }
                break;

            case 'SYCM':
                if(!$scope.haveSYCMData){
                    getFileContent.getData(getFileName('SYCM_COUNT_SUMMARY')).then(function(response){
                        $scope.SYCMCountSummary = response;
                    });

                    getFileContent.getData(getFileName('SYCM_OBJTYPE_SUMMARY')).then(function(response){
                        $scope.SYCMObjTypeSummary = response;
                        $scope.selectedObjType = $scope.SYCMObjTypeSummary[0]['OBJTYPE'];
                        $scope.filterType = 'COMPLEXITY';
                        $scope.SYCMobjTypeDataFile = 'SYCM_' + $scope.selectedObjType + '_DATA';

                        $scope.updateChartType($scope.filterType, $scope.selected);
                        fetchTableData($scope.selectedObjType, $scope.selected);
                    });
                    $scope.haveSYCMData = true;
                }
                break;

            case 'readycheck':
                if(!$scope.haveReadinessData){
                    getFileContent.getData(getFileName('READINESS_COUNT_SUMMARY')).then(function(response){
                        $scope.ReadinessCountSummary = response;
                    });

                    getFileContent.getData(getFileName('READINESS_PROC_AREA_SUMMARY')).then(function(response){
                        $scope.ReadinessAreaSummary = response;
                        $scope.selectedAreaName = $scope.ReadinessAreaSummary[0]['AREANAME'];

                        $scope.updateChartType($scope.selectedAreaName, $scope.selected);
                        fetchTableData($scope.selectedAreaName, $scope.selected);

                    });
                    $scope.haveReadinessData = true;
                }
                break;

        }
    }

    $scope.updateChartType =  function(type, tabName){
        switch(tabName){
            case 'SYCM':
                $scope.filterType = type;
                $scope.chart.view2='donutchart';

                var file_name = 'SYCM_'+$scope.selectedObjType+'_'+type+'_SUMMARY';
                getFileContent.getData(getFileName(file_name)).then(function(response){
                    $scope.SYCMfilteredData = response;
                
                });
                break;

            case 'readycheck':
                var fileName = 'READINESS_'+type + '_IMPACT';
                getFileContent.getData(getFileName(fileName)).then(function(response){
                    $scope.readinessImpact = response;
                });
                break;
        }
        
    };

    var fetchTableData = function(objType, tabName){
        switch(tabName){
            case 'SYCM':
                var fileName = 'SYCM_' + objType+'_DATA';
                getFileContent.getData(getFileName(fileName)).then(function(response){
                    $scope.SYCMobjTypeHeader = response[0];
                    response.splice(0,1);
                    $scope.SYCMobjTypeData = response;
                });
                break;

            case 'readycheck':
                var fileName = 'READINESS_' + objType + '_DATA';
                getFileContent.getData(getFileName(fileName)).then(function(response){
                    $scope.readinessHeader = response[0];
                    response.splice(0,1);
                    $scope.readinessData = response;
                });
                break;
        }
    };

    $scope.pieOptionsSYCM.chart.callback =  function(chart) {
        var prevArc = null;

        chart.pie.dispatch.on('elementClick', function(e){
            $scope.selectedObjType = e.data['OBJTYPE'];
            
            $scope.updateChartType($scope.filterType, $scope.selected);
            fetchTableData($scope.selectedObjType, $scope.selected);

            if(prevArc){
                d3.select(prevArc).classed('clicked', false);
                d3.select(prevArc).select("path").transition().duration(70).attr('d', regularArc);
            }
            d3.select(e.element).classed('clicked', true);
            d3.select(e.element).select("path").transition().duration(70).attr('d', bulgedArc);     
            prevArc = e.element;                      
        });
            
    }

    $scope.pieOptionsReadiness.chart.callback = function(chart) {
        var prevArc = null;
        chart.pie.dispatch.on('elementClick', function(e){
            $scope.selectedAreaName = e.data['AREANAME'];
            
            $scope.updateChartType($scope.selectedAreaName, $scope.selected);
            fetchTableData($scope.selectedAreaName, $scope.selected);

            if(prevArc){
                d3.select(prevArc).classed('clicked', false);
                d3.select(prevArc).select("path").transition().duration(70).attr('d', regularArc);
            }
            d3.select(e.element).classed('clicked', true);
            d3.select(e.element).select("path").transition().duration(70).attr('d', bulgedArc);     
            prevArc = e.element;                   
        });   
    };

    $scope.showTab($scope.selected);

}]);