	<!-- Node js coding here -->
		var fs = require('fs');
		var nodeExcel = require('excel-export');
		var inventoryDownloadData = {};
		var invDownloadKey = "";
		

		var express = require('express');
		var expressApp = express();
		var bodyParser = require('body-parser');
		var gui = require('nw.gui');
		var win = gui.Window.get();
		win.on('loading', function(){
			//alert(server);
			//process.exit(1);
		})
		expressApp.use(bodyParser.json())
		expressApp.post("/excelDownload", function(req, res) {
			var conf ={};
	    conf.cols = [
	    {
	        caption:'Object Type',
	        type:'string',
	        beforeCellWrite:function(row, cellData){
	             return cellData.toUpperCase();
	        },
	        width:28.7109375
	    },{
	        caption:'Object Type Description',
	        type:'string',
	        
	    },{
	        caption:'Sub-Object Type',
	        type:'string'
	    },{
	        caption:'Sub-Object Description',
	        type:'string'              
	    },{
	        caption:'Object Name',
	        type:'string'
	    },{
	        caption:'Object Description	',
	        type:'string'
	    },{
	        caption:'Package',
	        type:'string'
	    },{
	        caption:'Application Area	',
	        type:'string'
	    },{
	        caption:'Main Program	',
	        type:'string'
	    },{
	        caption:'Include Name',
	        type:'string'
	    } ];
	    
	    conf.rows = new Array();
	    conf.rows = inventoryDownloadData[invDownloadKey];
	    $("#ajax_loader").show();			
	    var result = nodeExcel.execute(conf);
			res.setHeader('Content-Type', 'application/vnd.openxmlformats');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
      res.end(result, 'binary');
		});
		expressApp.get("/excelDownload", function(req, res) {
			var conf ={};
			var conf ={};
	    conf.cols = [
		    {
		        caption:'Object Type',
		        type:'string',
		        beforeCellWrite:function(row, cellData){
		             return cellData.toUpperCase();
		        },
		        width:28.7109375
		    },{
		        caption:'Object Type Description',
		        type:'string',
		        
		    },{
		        caption:'Sub-Object Type',
		        type:'string'
		    },{
		        caption:'Sub-Object Description',
		        type:'string'              
		    },{
		        caption:'Object Name',
		        type:'string'
		    },{
		        caption:'Object Description	',
		        type:'string'
		    },{
		        caption:'Package',
		        type:'string'
		    },{
		        caption:'Application Area	',
		        type:'string'
		    },{
		        caption:'Main Program	',
		        type:'string'
		    },{
		        caption:'Include Name',
		        type:'string'
		    } 
		  ];
	    
	    conf.rows = new Array();
      conf.rows = inventoryDownloadData[invDownloadKey];
      var result = nodeExcel.execute(conf);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
      res.end(result, 'binary');
		});
		
		//expressApp.listen(3000);
		console.log('Listening on port 3000');
		
		function getFileContent(filePath,datasetName){
			var data = fs.readFileSync(filePath, "utf8", function (error, data) {
	    });
	    var lines = data.split("\n");
			var columnsCount = 0;
			var isFirstLine = true;
			var columns = null;
			var dataSet = [];
			for (var n = 0; n < lines.length; n++) {
				var elem = lines[n];
				if(elem.trim().charAt(0)== '#'){
					continue;
				}
				if(isFirstLine){
					columns = elem.split("\t");
					isFirstLine = false;
				}else{
					var menuItem = elem.split("\t");
					if(menuItem.length != 1){
						var obj = {};
						for (var i = 0; i < columns.length; i++) {
							var columnName = columns[i];
							obj[$.trim(columnName)] = $.trim(menuItem[i]);
						}
						dataSet.push(obj);
					}						
			  }					
			}
			return dataSet;
		}

		var excelbuilder = require('msexcel-builder');
		

		function writeFile() {
			jQuery("#ajax_loader").show();
// Create a new workbook file in current working-path
  	var workbook = excelbuilder.createWorkbook('./', 'Report.xlsx');
  	 // Create a new worksheet with 10 columns and 12 rows
  	var sheet1 = workbook.createSheet('sheet1', 10, inventoryDownloadData[invDownloadKey].length+1);

  	// Fill some data
	  sheet1.set(1, 1, 'Object Type');
	  sheet1.set(2, 1, 'Object Type Description');
	  sheet1.set(3, 1, 'Sub-Object Type');
	  sheet1.set(4, 1, 'Sub-Object Description');
	  sheet1.set(5, 1, 'Object Name');
	  sheet1.set(6, 1, 'Object Description');
	  sheet1.set(7, 1, 'Package');
	  sheet1.set(8, 1, 'Application Area');
	  sheet1.set(9, 1, 'Main Program');
	  sheet1.set(10, 1, 'Include Name');

	  for (var i = 2; i < inventoryDownloadData[invDownloadKey].length +1; i++) {
	  	var j = i-1;
	  	sheet1.set(1, i, inventoryDownloadData[invDownloadKey][j][0]);
	    sheet1.set(2, i, inventoryDownloadData[invDownloadKey][j][1]);
	    sheet1.set(3, i, inventoryDownloadData[invDownloadKey][j][2]);
	    sheet1.set(4, i, inventoryDownloadData[invDownloadKey][j][3]);
	    sheet1.set(5, i, inventoryDownloadData[invDownloadKey][j][4]);
	    sheet1.set(6, i, inventoryDownloadData[invDownloadKey][j][5]);
	    sheet1.set(7, i, inventoryDownloadData[invDownloadKey][j][6]);
	    sheet1.set(8, i, inventoryDownloadData[invDownloadKey][j][7]);
	    sheet1.set(9, i, inventoryDownloadData[invDownloadKey][j][8]);
	    sheet1.set(10, i, inventoryDownloadData[invDownloadKey][j][9]);


	  }

	  // Save it
	  workbook.save(function(err){
	    if (err) {
	    	jQuery("#ajax_loader").hide();
	      workbook.cancel();
	    }
	    else{
	    	jQuery("#ajax_loader").hide();
	      alert('Workbook downloaded.');
	    }
	  });
		}