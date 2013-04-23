Ext.define('CM.view.Viewport', {
  extend: 'Ext.container.Viewport',

  layout: 'fit',

  items: [{
    xtype: 'chart_tree',
    title: 'Charts',
    html : 'Treeview of charts'
  }]
});
