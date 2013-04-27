/*
 Rules for HasMany Associations in ExtJS:
1.Always put your Proxies in your Models, not your Stores, unless you have a very good reason not to *
2. Always require your child models if using them in hasMany relationships. ** 
3. Always use foreignKey if you want to load the children at will
4. Always use associationKey if you return the children in the same response as the parent
5. You can use both foreignKey and associationKey if you like
6. Always name your hasMany relationships
7. Always use fully qualified model names in your hasMany relationship
8. Consider giving the reader root a meaningful name (other than "data")
9. The child model does not need a belongsTo relationship for the hasMany to work
*/
/*
 Rules for HasOne and BelongsTo Associations in ExtJS
1. Put the proxy in the model, unless you have a very good reason not to [1]
2. Always use fully qualified model name
3. Always set the getterName
4. Always set the setterName
5. Always set the associationKey, if the foreign object is returned in the same response as this object
6. Always set the foreignKey, if you want to load the foreign object at will
7. Consider changing the instanceName to something shorter
8. The getter behaves differently depending on whether the foreign object is loaded or not. If it's loaded, the foreign object is returned. Otherwise, you need to pass in a callback to get it.
9. You should set the name property if you plan to override this association.
10. You do not need a belongsTo relationship for a hasMany to work
11. Set the primaryKey property if the id field of the parent model is not "id"
12. Sometimes you need to use uses or requires for the belongsTo association. Watch out for circular references though.
13. Calling setter() function does not seem to set the instance. Set object.belongsToInstance = obj  if calling the setter().
*/
Ext.define('CM.model.Chart', {
  extend: 'Ext.data.Model',
  
  /* rule 1.2 */
  requires: [
		'CM.model.ChartConfig',
		'CM.model.RegularSerie.Config'
  ],
  
  idProperty: 'id',
  fields: [
    { name: 'id', type: 'int' },
    { name: 'name', type: 'string' },
    { name: 'group', type: 'string' },
    { name: 'chart_type', type: 'string' },
    //{ name: 'created_at', type: 'date' },
    //{ name: 'updated_at', type: 'date' },
    
    /*
    //ChartConfig nested model mapping - to make it accesible from from
    { name: 'chart_config_id', type: 'int', mapping: 'chart_config.id' },
  	{ name: 'chart_config_chart_id', type: 'int', mapping: 'chart_config.chart_id' },
    { name: 'chart_config_title', type: 'string', mapping: 'chart_config.title' },
    { name: 'chart_config_subtitle', type: 'string', mapping: 'chart_config.subtitle' },
    { name: 'chart_config_xtitle', type: 'string', mapping: 'chart_config.xtitle' },
    { name: 'chart_config_ytitle', type: 'string', mapping: 'chart_config.ytitle' },
    */
    
  ],
  
  validations: [
    { type: 'presence', field: 'name' },
    { type: 'presence', field: 'chart_type' },
  ],
  
  hasOne: [{ 
  	name:'chart_config_attributes',
    model:'CM.model.ChartConfig',
    getterName:'getChartConfig',
    setterName:'setChartConfig',
    associationKey:'chart_config',
    foreignKey:'chart_id'
  }],
  
  hasMany: [{ 
  	foreignKey: 'chart_id',          			/* rule 1.3, 1.5 */
    associationKey: 'regular_serie',    		/* rule 1.4, 1.5 */
  	name: 'regular_serie_attributes',								/* rule 1.6 */
  	model: 'CM.model.RegularSerie.Config'	/* rule 1.7 */
  }],

  proxy: {
    url: '/charts',
    type: 'rest',
    format: 'json',

    reader: {
      root: 'charts',
      record: 'chart',
      successProperty: 'success',
      messageProperty: 'errors'
    },
    writer: {
      //redefine getRecordData method to include all nested models
      getRecordData: function(record) {
        var data = record.data;
      	//include all nested data within data
      	Ext.apply(data,record.getAssociatedData());
      	
      	/*
      	//if no series are defined => remove property from data
      	if(data.regular_serie_attributes && data.regular_serie_attributes.length == 0) {
      		delete data.regular_serie_attributes;
      	}
				
				//if no regular series data are defined => remove property from data
      	for(var i in data.regular_serie_attributes) {
      		if(data.regular_serie_attributes[i].regular_serie_datum_attributes && 
							data.regular_serie_attributes[i].regular_serie_datum_attributes.length == 0) {
      			delete data.regular_serie_attributes[i].regular_serie_datum_attributes;
      		}
      	}
	*/
				//gather regular serie attributes from store
				data['regular_serie_attributes'] = [];
				for(var i in record.regular_serie_attributes().data.items) {
					data['regular_serie_attributes'][i] = record.regular_serie_attributes().data.items[i].data;
				}
				
				//return data in specified format => {"chart":{"name":"chart1","id":1, ... },"chart": ... }
    		return { chart: data };
      }
    }
  },

});
