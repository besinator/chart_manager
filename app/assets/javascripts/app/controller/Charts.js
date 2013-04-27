Ext.define('CM.controller.Charts', {
  extend: 'Ext.app.Controller',

  stores: ['Charts'],
  models: ['Chart'],

  views: [
    'chart.Tree',
    'chart.Form'
  ],

  init: function() {
    this.control({
      'chart_tree': {
        itemdblclick: this.editChart,
        selectionchange: this.selectionChange
      },
      'chart_form button[action=save]': {
        click: this.createOrUpdateChart
      },
      'button[action=addChart]': {
        click: this.addChart
      },
      'button[action=editChart]': {
        click: this.editChart
      },
      'button[action=deleteChart]': {
        click: this.deleteChart
      }
    });
  },

//-------------------------------------------------------------------------------------
//addChart - open empty form
//-------------------------------------------------------------------------------------
  addChart: function() {
    var formWin = Ext.widget('chart_form');
    formWin.setFieldsToDefaults();
    formWin.show();
  },
  
//-------------------------------------------------------------------------------------
//editChart - open form with preset record data
//-------------------------------------------------------------------------------------
  editChart: function() {
  	var record = Ext.getCmp('chart_tree').getSelectedChart(); //get selected record from grid
    
    Ext.apply(record.data,record.getAssociatedData()); //merge record data with all associated data (chart model with assoc models char_config, ...
    
    var formWin = Ext.widget('chart_form'); //get form window
    
    for(var i = 1; i<record.data.regular_serie_attributes.length; i++)
    {
    	formWin.addRegularSerieTab();
    }
    //formWin.addRegularSerieFormFields(record.data.regular_serie_attributes); //dynamically add fields to according to the number of existing series
    //-------------------------------------------------------------------------------------
    //populate form field with data
    //-------------------------------------------------------------------------------------
    for(var property in record.data) {
    	var formField; //field of form to be written to
    	var base_property = ""; //first part of formField name (eg chart_config.title)
    	//-------------------------------------------------------------------------
    	//regular series
    	//-------------------------------------------------------------------------
    	if(property == "regular_serie_attributes") {
    		base_property = "regular_serie";
    		//iterate regular_serie_attributes - array of objects
    		for(var i=0; i<record.data.regular_serie_attributes.length; i++) {
    			//iterate regular_serie_attributes[i] properties
    			for(var sub_property in record.data.regular_serie_attributes[i]) {
    				//find field for current regular_serie_attribute
    				formField = formWin.down('form').getForm().findField(base_property+"_"+i+"."+sub_property);
    				//if field is found => write data to field
    				if(formField) {
    					formField.setValue(record.data.regular_serie_attributes[i][sub_property]);
    				}
    			}
    		}
    	}
    	else {
    		//-------------------------------------------------------------------------
    		//chart config
    		//-------------------------------------------------------------------------
    		if(property == "chart_config_attributes") {
    			base_property = "chart_config"; //field name is eg => chart_config.title (title == sub_property)
    			//iterate chart_config_attributes
    			for(var sub_property in record.data.chart_config_attributes) {
    				//find field for chart_config_attribute
    				formField = formWin.down('form').getForm().findField(base_property+"."+sub_property);
    				//if field is found => write data to field
    				if(formField) {
    					formField.setValue(record.data.chart_config_attributes[sub_property]);
    				}
    			}
    		}
    		//-------------------------------------------------------------------------
    		//chart - load record will load only not nested data, so only chart data
    		//-------------------------------------------------------------------------
    		else {
    			formWin.down('form').loadRecord(record);
    		}
    	}
    }
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
  },

//-------------------------------------------------------------------------------------
//createOrUpdateChart - after save button on form - create/update store and db
//-------------------------------------------------------------------------------------
  createOrUpdateChart: function(button) {
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getStore('Charts');
    var values = form.getValues();
    
    var val_chart = {};	//object to hold chart values from form
    var val_chart_config = {};	//object to hold chart_config values from form
    var val_regular_serie = [];	//array of objects for regular_serie
    var val_regular_serie_data = [];	//array of objects for regular_serie_data
    
    //-------------------------------------------------------------------------------------
    //populate val_chart .. val_regular_serie_data with corresponding values returned from form
    // - they will be used to create corresponding model and pushed to store
    //form field name formats => regular_serie_0.series_type, chart_config.ytitle, name
    //-------------------------------------------------------------------------------------
    for(var property in values)	{
    	//console.log(property + ': ' + values[property]);
    	var match;	//for regex match
    	//-------------------------------------------------------------------------
    	//populate regular serie data
    	//-------------------------------------------------------------------------
    	if(n = property.indexOf('regular_serie_datum') != -1) {
    		//console.log(property + ': ' + values[property]);
    	}
    	else {
    		//-------------------------------------------------------------------------
    		//populate regular series (regular_serie_0.series_type)
    		//-------------------------------------------------------------------------
    		if(property.indexOf('regular_serie') != -1) {
    			//find first occurence of number in string (field name) = regular_serie number
    			match = property.match(/\d+/);
    			var serie_num = match[0];
    			//if regular serie object doesnt exists - create one
    			if(val_regular_serie.length <= serie_num) {
    				val_regular_serie[serie_num] = {};
    			}
    			//assign property - save only part after dot
    			val_regular_serie[serie_num][property.substr(property.indexOf('.')+1)] = values[property];
    			delete values[property];	//delete regular_serie_0.xxx property from values
    		}
    		else {
    			//-------------------------------------------------------------------------
    			//populate chart config (chart_config.ytitle)
    			//-------------------------------------------------------------------------
    			if(property.indexOf('chart_config') != -1) {
    				//save only last part of property name, aftej the dot"
    				val_chart_config[property.substr(property.indexOf('.')+1)] = values[property];
    				delete values[property]; //after assignment remove propery from values
    			}
    			//-------------------------------------------------------------------------
    			//populate chart (eg. name)
    			//-------------------------------------------------------------------------
    			else {
    				//console.log(property + ': ' + values[property]);
    				val_chart[property] = values[property];
    			}
    		}
    	}
		}
		//-------------------------------------------------------------------------------------
		//-------------------------------------------------------------------------------------
		//-------------------------------------------------------------------------------------
		
		//create new model isntance (filled with chart data) - will be added to store
    var chart = Ext.create('CM.model.Chart', val_chart);
    
		//assign chart config to chart record
    chart.beginEdit();
    	chart.data.chart_config_attributes = {};
			for(var property in val_chart_config)	{
				chart.data.chart_config_attributes[property] = val_chart_config[property];
			}
		chart.endEdit();
		
		//assign regular series to chart record - in store writer manually get this data and put to  			
		//server response
		chart.beginEdit();
		for(var i in val_regular_serie) {
			chart.regular_serie_attributes().data.items[i] = {};
			chart.regular_serie_attributes().data.items[i].data = {}; 
			for(var property in val_regular_serie[i])	{
				chart.regular_serie_attributes().data.items[i].data[property] = 
						val_regular_serie[i][property];
			}
		}
		chart.endEdit();

		
    //validate chart records
    var errors = chart.validate();

		//if char record are valid
    if (errors.isValid()) {
      var chartRecord = form.getRecord();

			//if record exists - only update record
      if (chartRecord) {
        chartRecord.set(val_chart);	//update chart
        //update chart_config
        //if chartRecord.getChartConfig() is not defined (when model has been just created and stored)
        //then catch error and assign values manually - manual assign doesnt work for loaded data
        //from database => wtf??? => created this workaroud
        try {
        	var chartConfigRecord = chartRecord.getChartConfig();
        	chartConfigRecord.set(val_chart_config);
        	
					for(var i in val_regular_serie)
					{
						var regularSerieRecord = chartRecord.regular_serie_attributes().data.items[i];
						regularSerieRecord.set(val_regular_serie[i]);
					}
        }
        //manually set chart_config - this wont happen, if store is loaded from dbimmediatly
        // after chart record creation
        catch(err) {
        	console.log("chart record wasnt saved: "+err);
        	//assign chart config values manually to record and commit changes to store
        	chartRecord.beginEdit();
        		for(var property in val_chart_config)	{
        			//update chart config
							chartRecord.data.chart_config_attributes[property] = val_chart_config[property];
						}
        	chartRecord.endEdit();
        	chartRecord.commit();
    		}
        chartRecord.setDirty();	//set dirty, to be sure the record is saved
      //else - create record - add it to store
      } else {
        store.add(chart);
      }

			//synchronize store - update/create and close window
      store.sync({
        success: function() {
        	//if record was created, then load store from db - fixes issues with not up to date data
        	if(!chartRecord) {
        		store.load();
        	}
        	//after successfull update/create close form
          win.close();
        },
        failure: function(batch, options) {
          //extract server side validation errors
          var serverSideValidationErrors = batch.exceptions[0].error;

          var errors = new Ext.data.Errors();
          for (var field in serverSideValidationErrors) {
            var message = serverSideValidationErrors[field].join(", ");
            errors.add(undefined, { field: field, message: message });
          }
          form.getForm().markInvalid(errors);
        }
      });
    //if chart records are not valid
    } else {
      form.getForm().markInvalid(errors);
    }
  },

//-------------------------------------------------------------------------------------
//deleteChart - delete record
//-------------------------------------------------------------------------------------
  deleteChart: function() {
    var record = Ext.getCmp('chart_tree').getSelectedChart();

    if (record) {
      var store = this.getChartsStore();
      store.remove(record);
      store.sync();
    }
  },

//-------------------------------------------------------------------------------------
//selectionChange - enable/disable buttons according to selection
//-------------------------------------------------------------------------------------
  selectionChange: function(selectionModel, selections) {
    var tree = Ext.getCmp('chart_tree');
    if (selections.length > 0) {
      tree.enableRecordButtons();
    } else {
      tree.disableRecordButtons();
    }
	},
	
});
