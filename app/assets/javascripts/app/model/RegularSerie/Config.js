Ext.define('CM.model.RegularSerie.Config', {
  extend : 'Ext.data.Model',
  
  requires: [
		'CM.model.RegularSerie.Data'
  ],
  
  fields: [
    { name: 'id', type: 'int' },
    { name: 'chart_id', type: 'int' },
    { name: 'name', type: 'string' },
    { name: 'serie_type', type: 'string' },
    { name: 'dash_style', type: 'string' },
    { name: 'color', type: 'string' },
  ],
  
	belongsTo: [{ 
  	name:'chart',
  	instanceName:'chart',
    model:'CM.model.Chart',
    getterName:'getChart',
    setterName:'setChart',
    associationKey:'chart',
    foreignKey:'chart_id'
  }],
  
  hasMany: [{ 
  	foreignKey: 'regular_serie_id',          			/* rule 1.3, 1.5 */
    associationKey: 'regular_serie_datum',    		/* rule 1.4, 1.5 */
  	name: 'regular_serie_data',								/* rule 1.6 */
  	model: 'CM.model.RegularSerie.Data'	/* rule 1.7 */
  }],
  
});
