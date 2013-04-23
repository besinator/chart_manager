Ext.define('CM.controller.Charts', {
  extend: 'Ext.app.Controller',

  stores: ['Charts'],
  models: ['Chart'],

  views: [
    'chart.Tree',
    'chart.Form'
  ],

	//create getter methods for chart_tree (use if only one elemnt is there, because it will find first one
  refs: [{
    ref: 'tree',
    selector: 'chart_tree'
  }],

  init: function() {
    this.control({
      'chart_tree': {
        itemdblclick: this.editChart,
        selectionchange: this.selectionChange
      },
      'chart_form button[action=save]': {
        click: this.createOrUpdateChart
      },
      'button[action=addChart]': {
        click: this.addChart
      },
      'button[action=editChart]': {
        click: this.editChart
      },
      'button[action=deleteChart]': {
        click: this.deleteChart
      }
    });
  },

  addChart: function() {
    var view = Ext.widget('chart_form');
    view.show();
  },

  editChart: function() {
    var record = this.getTree().getSelectedChart();
    var view = Ext.widget('chart_form');
    view.down('form').loadRecord(record);
  },

  createOrUpdateChart: function(button) {
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getChartsStore();
    var values = form.getValues();

    var chart = Ext.create('CM.model.Chart', values);
    var errors = chart.validate();

    if (errors.isValid()) {
      var formRecord = form.getRecord();

			//if record exists
      if (formRecord) {
        //update
        formRecord.set(values);
      } else {
        //else create
        store.add(chart);
      }

      store.sync({
        success: function() {
          win.close();
        },
        failure: function(batch, options) {
          //extract server side validation errors
          var serverSideValidationErrors = batch.exceptions[0].error;

          var errors = new Ext.data.Errors();
          for (var field in serverSideValidationErrors) {
            var message = serverSideValidationErrors[field].join(", ");
            errors.add(undefined, { field: field, message: message });
          }
          form.getForm().markInvalid(errors);
        }
      });
    } else {
      form.getForm().markInvalid(errors);
    }
  },

  deleteChart: function() {
    var record = this.getTree().getSelectedChart();

    if (record) {
      var store = this.getChartsStore();
      store.remove(record);
      store.sync();
    }
  },

  selectionChange: function(selectionModel, selections) {
    var tree = this.getTree();
    if (selections.length > 0) {
      tree.enableRecordButtons();
    } else {
      tree.disableRecordButtons();
    }
// access selected rows type data
/*
var record = this.getTree().getSelectedChart();
alert(record.data.chart_type);
*/

  }

});
