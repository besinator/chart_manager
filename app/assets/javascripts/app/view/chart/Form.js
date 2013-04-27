Ext.define('CM.view.chart.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.chart_form',
	
  title : 'Add / Edit Chart',
  layout: 'fit',
  autoShow: true,
  
  combo_chart_types: [
  	'Line',
  	'Spline',
		'Step',
		'Area',
		'Bar',
		'Column',
		'Scatter',
		'Funnel',
	],
	
	combo_dash_styles: [
		'Solid',
		'ShortDash',
		'ShortDot',
		'ShortDashDot',
		'ShortDashDotDot',
		'Dot',
		'Dash',
		'LongDash',
		'DashDot',
		'LongDashDot',
		'LongDashDotDot'
  ],
  
  //same as highcharts default colors
  default_colors: [
		'#2F7ED8', 
		'#0D233A', 
		'#8BBC21', 
		'#910000', 
		'#1AADCE', 
		'#492970',
		'#F28F43', 
		'#77A1E5', 
		'#C42525', 
		'#A6C96A'
  ],

	last_tab: 0,
	
	initComponent: function() {

    this.items = [{
      xtype: 'form',
      //title: 'Chart Form',
      layout: 'form',
      bodyPadding: '5 5 5 5',
      width: 350,
      
      //form fields
      items: [{
      	//Base information fieldset and fields
      	xtype:'fieldset',
				title: 'Chart information',
				layout: 'anchor',
				collapsed: false,
				collapsible: true,
				defaults: {
					anchor: '100%'
				},
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
      		xtype: 'combo',
        	name : 'chart_type',
        	fieldLabel: 'Type',
        	displayField: 'name',
        	store: this.combo_chart_types,
        	queryMode: 'local',
        	typeAhead: true
      	}],
      }, {
      	//More information fieldset and fields
      	xtype:'fieldset',
				title: 'Chart configuration',
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				defaults: {
					anchor: '100%'
				},
      	items: [{
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
      	}],
      }, {
      	//Serie configuration - tabbed panel
      	xtype:'tabpanel',
      	plain:true,
        activeTab: 0,
        defaults:{
					bodyPadding: 10
				},
				items:[{
					//tab panel 1 == serie 1
					title:'Serie 1',
					layout: 'anchor',
					defaults: {
						anchor: '100%'
					},
					items:[{
						xtype: 'textfield',
						name : 'regular_serie_0.name',
						fieldLabel: 'serie_name'
      		}, {
						xtype: 'combo',
						name : 'regular_serie_0.series_type',
						fieldLabel: 'series_type',
						displayField: 'name',
						store: this.combo_chart_types,
						queryMode: 'local',
						typeAhead: true
					}, {
						xtype: 'combo',
						name : 'regular_serie_0.dash_style',
						fieldLabel: 'dash_style',
						store: this.combo_dash_styles,
						queryMode: 'local',
						typeAhead: true
    	  	}, {
						xtype: 'colorcbo',
						name : 'regular_serie_0.color',
						fieldLabel: 'color'
					}],
				}],
			}],
		}];
    
    this.buttons = [{
    	text: 'Add Serie',
      handler: this.addRegularSerieTab
    }, {
      text: 'Save',
      action: 'save' //action defined in controller => CreateOrUpdate
    }, {
      text: 'Cancel',
      scope: this,
      handler: this.close
    }];
    
    this.callParent(arguments);
  },
	
	//set field values to default
	setFieldsToDefaults:  function(series) {
		this.down('form').getForm().findField('chart_type').setValue(this.combo_chart_types[0]);
		this.down('form').getForm().findField('regular_serie_0.series_type').setValue(this.combo_chart_types[0]);
		this.down('form').getForm().findField('regular_serie_0.dash_style').setValue(this.combo_dash_styles[0]);
		this.down('form').getForm().findField('regular_serie_0.color').setValue(this.default_colors[0]);
	},
	
	//
	addRegularSerieTab: function() {
		//console.log(this.up('chart_form').down('tabpanel'));

		var win;
		if(this.up('chart_form'))
		{
			win = this.up('chart_form');
		}
		else
		{
			win = this;
		}
		var tab_panel = win.down('tabpanel');
		win.last_tab++;

		//new tab layount
  	var new_serie_panel = tab_panel.add({
  		title: 'Serie '+(win.last_tab+1),
  		layout: 'anchor',
			defaults: {
				anchor: '100%'
			},
			items:[{
				xtype: 'textfield',
				name : 'regular_serie_'+win.last_tab+'.name',
				fieldLabel: 'serie_name'
			}, {
				xtype: 'combo',
				name : 'regular_serie_'+win.last_tab+'.series_type',
				fieldLabel: 'series_type',
				displayField: 'name',
				store: win.combo_chart_types,
				queryMode: 'local',
				typeAhead: true
			}, {
				xtype: 'combo',
				name : 'regular_serie_'+win.last_tab+'.dash_style',
				fieldLabel: 'dash_style',
				store: win.combo_dash_styles,
				queryMode: 'local',
				typeAhead: true
			}, {
				xtype: 'colorcbo',
				name : 'regular_serie_'+win.last_tab+'.color',
				fieldLabel: 'color'
			}],
  	});
		
		//set serie default values (color should be different from last one - ciculate default_color arr)
		win.down('form').getForm().findField('regular_serie_'+win.last_tab+'.series_type').setValue(win.combo_chart_types[0]);
		win.down('form').getForm().findField('regular_serie_'+win.last_tab+'.dash_style').setValue(win.combo_dash_styles[0]);
		win.down('form').getForm().findField('regular_serie_'+win.last_tab+'.color').setValue(win.default_colors[win.last_tab % win.default_colors.length]);
		
		//set added tab as active		
		tab_panel.setActiveTab(new_serie_panel);
		//tab_panel.doLayout();
	},
	
	
	
	//function to dynamically add form fields for regular series - based on received data
  addRegularSerieFormFields: function(series) {
  console.log(this);
  	//vars for creating structured field names
  	var serie_property = "regular_serie";
  	var data_property = "regular_serie_datum";
  	var i = 0;	//tracking series number
 
  	//hold field name and label
  	var field_name = "";
  	var field_label = "";
  	//to store last property => for creating right type of field (textbox, hidden, ... )
  	var last_property = "";
  	
  	//instance of form field to be added
  	var temp_field;
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
  				last_property = property;
  				//if field_name already exists, dont create field
  				if(this.down('form').getForm().findField(field_name)) {
  					continue;
  				}
  			}	
				//create form field according to property type
  			switch(last_property)
  			{
  				//color picker
  				case "color":
  					temp_field = Ext.create('Ext.ux.ColorPickerCombo', {
							name: field_name,
 							fieldLabel: field_label
						});
						this.down('form').add(temp_field);
  					break;
  				//series type combobox
  				case "series_type":
  					temp_field = Ext.create('Ext.form.field.ComboBox', {
							name: field_name,
 							fieldLabel: field_label,
 							store: this.combo_chart_types,
        			queryMode: 'local',
        			typeAhead: true
						});
						var added_field = this.down('form').add(temp_field);	//add field to form
						added_field.setValue(this.combo_chart_types[0]);
  					break;	
  				//series dash style combobox
  				case "dash_style":
  					temp_field = Ext.create('Ext.form.field.ComboBox', {
							name: field_name,
 							fieldLabel: field_label,
 							store: this.combo_dash_styles,
        			queryMode: 'local',
        			typeAhead: true
						});
						var added_field = this.down('form').add(temp_field);	//add field to form
						added_field.setValue(this.combo_dash_styles[0]);
  					break;	
  				//default textfield
  				default:
  					temp_field = Ext.create('Ext.form.field.Text', {
							name: field_name,
 							fieldLabel: field_label
						});
						this.down('form').add(temp_field);	//add field to form
  			} 
			}
  	}
  }
});

