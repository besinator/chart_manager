Ext.define('CM.model.Chart', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'int' },
    { name: 'name', type: 'string' },
    { name: 'group', type: 'string' },
    { name: 'chart_type', type: 'string' },
    /*
    { name: 'created_at', type: 'date' },
    { name: 'updated_at', type: 'date' },
    */
  ],
  validations: [
    { type: 'presence', field: 'name' },
    { type: 'presence', field: 'group' },
    { type: 'presence', field: 'chart_type' }
  ],

  idProperty: 'id',
  proxy: {
    url: '/charts',
    type: 'rest',
    format: 'json',

    reader: {
      root: 'charts',
      successProperty: 'success',
      messageProperty: 'errors'
    },
    writer: {
      //redefine getRecordData method
      getRecordData: function(record) {
        return { chart: record.data };
      }
    }
  }
});