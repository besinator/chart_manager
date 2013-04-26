Ext.define('CM.model.ChartConfig', {
  extend: 'Ext.data.Model',
  
  idProperty: 'id',
  fields: [
  	{ name: 'id', type: 'int' },
  	{ name: 'chart_id', type: 'int' },
    { name: 'title', type: 'string' },
    { name: 'subtitle', type: 'string' },
    { name: 'xtitle', type: 'string' },
    { name: 'ytitle', type: 'string' },
  ],
  
});
