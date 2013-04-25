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

  addChart: function() {
    var view = Ext.widget('chart_form');
    view.show();
  },

  editChart: function() {
    var record = Ext.getCmp('chart_tree').getSelectedChart(); //get selected record from grid
    Ext.apply(record.data,record.getAssociatedData()); //merge record data with all associated data (chart model with assoc models char_config, ...
    var view = Ext.widget('chart_form'); //get form window

    view.addRegularSerieFormFields(record.data.regular_serie_attributes); //dynamically add fields to according to the number of existing series
    //view.down('form').loadRecord(record);
    //view.down('form').loadRecord(record.getChartConfig());
    
    //populate form field with data
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
    				formField = 
    					Ext.getCmp('chart_form').getForm().findField(base_property+"_"+i+"."+sub_property);
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
    				formField = Ext.getCmp('chart_form').getForm().findField(base_property+"."+sub_property);
    				//if field is found => write data to field
    				if(formField) {
    					formField.setValue(record.data.chart_config_attributes[sub_property]);
    				}
    				/*
    				else {
    					console.log(base_property+"."+sub_property+": field doesnt exist");
    				}
    				*/
    			}
    		}
    		//-------------------------------------------------------------------------
    		//chart - load record will load only not nested data, so only chart data
    		//-------------------------------------------------------------------------
    		else {
    			view.down('form').loadRecord(record);
    		}
    	}
    }
  },

  createOrUpdateChart: function(button) {
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getChartsStore();
    var values = form.getValues();
    
    var val_chart = {};	//object to hold chart values from form
    var val_chart_config = {};	//object to hold chart_config values from form
    var val_regular_serie = [];	//array of objects for regular_serie
    var val_regular_serie_data = [];	//array of objects for regular_serie_data
    
    //populate val_chart .. val_regular_serie_data with corresponding values returned from form - they will be used to create corresponding model and pushed to store
    for(var property in values)	{
    	//console.log(property + ': ' + values[property]);
    	var n;
    	//populate regular serie data
    	if(n = property.indexOf('regular_serie_datum') != -1) {
    		//console.log(property + ': ' + values[property]);
    	}
    	else {
    		//populate regular series
    		if(n = property.indexOf('regular_serie') != -1) {
    			//console.log(property + ': ' + values[property]);
    		}
    		else {
    			//populate chart config
    			if(n = property.indexOf('chart_config') != -1) {
    				//save only last part of property name, 13==length of "chart_config_"
    				val_chart_config[property.substr(13)] = values[property];
    			}
    			//populate chart
    			else {
    				//console.log(property + ': ' + values[property]);
    				val_chart[property] = values[property];
    			}
    		}
    	}
		}
		
    var chart = Ext.create('CM.model.Chart', val_chart);
    var errors = chart.validate();

    if (errors.isValid()) {
      var formRecord = form.getRecord();

			//if record exists
      if (formRecord) {
        //update
        formRecord.set(val_chart);
      } else {
        //else create
        store.add(chart);
        //store.add(chart_config);
      }

      store.sync({
        success: function() {
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
    } else {
      form.getForm().markInvalid(errors);
    }
  },

  deleteChart: function() {
    var record = Ext.getCmp('chart_tree').getSelectedChart();

    if (record) {
      var store = this.getChartsStore();
      store.remove(record);
      store.sync();
    }
  },

  selectionChange: function(selectionModel, selections) {
    var tree = Ext.getCmp('chart_tree');
    if (selections.length > 0) {
      tree.enableRecordButtons();
    } else {
      tree.disableRecordButtons();
    }
// access selected rows type data
/*
var record = Ext.getCmp('chart_tree').getSelectedChart();
alert(record.getChartConfig().get('title'));
*/

  }

});
