// Models are typically used with a Store, which is basically a collection of Model instances.
Ext.define('CM.store.Charts', {
  extend: 'Ext.data.Store',

  model: 'CM.model.Chart',
  autoLoad: true,
  autoSync: false,

	//for debuging
  listeners: {
    load: function() {
      console.log(arguments);
    },
    update: function() {
      console.log(arguments);
    },
    beforesync: function() {
      console.log(arguments);
    }
  }
});
