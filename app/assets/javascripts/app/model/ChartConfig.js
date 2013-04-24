Ext.define('CM.model.ChartConfig', {
  extend: 'Ext.data.Model',
  fields: [
  	{ name: 'id', type: 'int' },
  	{ name: 'chart_id', type: 'int' },
    { name: 'title', type: 'string' },
    { name: 'subtitle', type: 'string' },
    { name: 'xtitle', type: 'string' },
    { name: 'ytitle', type: 'string' },
  ],
  
});
