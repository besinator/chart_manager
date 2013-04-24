// Models are typically used with a Store, which is basically a collection of Model instances.
Ext.define('CM.store.Charts', {
  extend: 'Ext.data.Store',

  model: 'CM.model.Chart',
  id: 'chart_store',
  autoLoad: true,
  autoSync: false,

  

	//for debuging
  listeners: {
    load: function() {
      //console.log(arguments);
      var chart = this.first();
      console.log("Charts: " + chart.get('name'));
      console.log("ChartConfigs: " + chart.getChartConfig().get('title'));
      chart.regular_series().each(function(serie) {
      	console.log("RegularSeries: " + serie.get('name'));
      })
    },
    update: function() {
      //console.log(arguments);
    },
    beforesync: function() {
      //console.log(arguments);
    }
  }
  
});
