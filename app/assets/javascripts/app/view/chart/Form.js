Ext.define('CM.view.chart.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.chart_form',

  title : 'Add / Edit Chart',
  layout: 'fit',
  autoShow: true,

  initComponent: function() {
    this.items = [{
      xtype: 'form',
      //title: 'Chart Form',
      id: 'chart_form',
      layout: 'form',
      bodyPadding: '5 5 5 5',
      width: 350,
      fieldDefaults: {
      	msgTarget: 'side',
      	labelWidth: 75
      },
      items: [{
        xtype: 'hidden',
        name : 'id',
        fieldLabel: 'id'
      }, {
        xtype: 'textfield',
        name : 'name',
        fieldLabel: 'Name',
      }, {
        xtype: 'textfield',
        name : 'group',
        fieldLabel: 'Group'
      }, {
        xtype: 'textfield',
        name : 'chart_type',
        fieldLabel: 'Type'
      }],
    }];

    this.buttons = [{
      text: 'Save',
      action: 'save'
    }, {
      text: 'Cancel',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);
  }
});

