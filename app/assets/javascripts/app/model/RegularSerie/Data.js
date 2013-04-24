Ext.define('CM.model.RegularSerie.Data', {
  extend : 'Ext.data.Model',
  fields : [
  	{ name: 'id', type: 'int' },
  	{ name: 'regular_serie_id', type: 'int' },
  	{ name: 'xField', type: 'string' },
		{ name: 'dataIndex', type: 'float' }
  ],
  
  belongsTo: [{ 
  	name:'regular_series',
  	instanceName:'regular_series',
    model:'CM.model.RegularSerie.Config',
    getterName:'getRegularSerieConfig',
    setterName:'setRegularSerieConfig',
    associationKey:'regular_serie',
    foreignKey:'regular_serie_id'
  }],
  
});
