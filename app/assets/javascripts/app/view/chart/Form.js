Ext.define('CM.view.chart.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.chart_form',
	
  title : 'Add / Edit Chart',
  layout: 'fit',
  autoShow: true,
	
  initComponent: function() {
    this.items = [{
      xtype: 'form',
      //title: 'Chart Form',
      layout: 'form',
      bodyPadding: '5 5 5 5',
      width: 350,
      items: [{
        xtype: 'hidden',
        name : 'id',
        fieldLabel: 'id'
      }, {
        xtype: 'textfield',
        name : 'name',
        fieldLabel: 'Name',
      }, {
        xtype: 'textfield',
        name : 'group',
        fieldLabel: 'Group'
      }, {
        xtype: 'textfield',
        name : 'chart_type',
        fieldLabel: 'Type'
      }, {
        xtype: 'textfield',
        name : 'chart_config.title',
        fieldLabel: 'Title'
      }, {
        xtype: 'textfield',
        name : 'chart_config.subtitle',
        fieldLabel: 'Subtitle'
      }, {
        xtype: 'textfield',
        name : 'chart_config.xtitle',
        fieldLabel: 'X axis title'
      }, {
        xtype: 'textfield',
        name : 'chart_config.ytitle',
        fieldLabel: 'Y axis title'
      }, {
        xtype: 'textfield',
        name : 'regular_serie_0.name',
        fieldLabel: 'serie_name'
      }, {
        xtype: 'textfield',
        name : 'regular_serie_0.series_type',
        fieldLabel: 'series_type'
      }, {
        xtype: 'textfield',
        name : 'regular_serie_0.dash_style',
        fieldLabel: 'dash_style'
      }, {
        xtype: 'textfield',
        name : 'regular_serie_0.color',
        fieldLabel: 'color'
      }],
    }];

    this.buttons = [{
      text: 'Save',
      action: 'save' //action defined in controller => CreateOrUpdate
    }, {
      text: 'Cancel',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);
  },

	//function to dynamically add form fields for regular series
  addRegularSerieFormFields: function(series) {
  	//vars for creating structured field names
  	var serie_property = "regular_serie";
  	var data_property = "regular_serie_datum";
  	var i = 0;	//tracking series number
  	
  	//hold field name and label
  	var field_name = "";
  	var field_label = "";

  	//iterate through series and their properties and create fields accordingly (including series data)
  	for(i = 0; i < series.length; i++)
  	{
  		for(var property in series[i]) {
  			//-------------------------------------------------------------------------
    		//regular series data
    		//-------------------------------------------------------------------------
  			if(property == "regular_serie_datum_attributes") {
  				continue;
  			}
  			//-------------------------------------------------------------------------
    		//regular series
    		//-------------------------------------------------------------------------
  			else {
  				//dont create form fields for id and chart_id properties
  				if(property == "id" || property == "chart_id") {
  					continue;
  				}
  				//create form fields for serie properies (include series number - i)
  				field_name = serie_property+"_"+i+"."+property;
  				field_label = property;
  				//if field_name already exists, dont create field
  				if(this.down('form').getForm().findField(field_name)) {
  					continue;
  				}
  			}
  			//create field and append to form
  			var temp_field = Ext.create('Ext.form.field.Text', {
					name: field_name,
 					fieldLabel: field_label
				});
				this.down('form').add(temp_field);
			}
  	}
  }
});

