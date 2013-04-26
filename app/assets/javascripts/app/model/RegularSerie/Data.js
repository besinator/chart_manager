Ext.define('CM.model.RegularSerie.Data', {
  extend : 'Ext.data.Model',
  
  idProperty: 'id',
  fields : [
  	{ name: 'id', type: 'int' },
  	{ name: 'regular_serie_id', type: 'int' },
  	{ name: 'x_field', type: 'string' },
		{ name: 'data_index', type: 'float' }
  ],
  
});
